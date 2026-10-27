"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

// Natural width of a 10-letter name in Zalando Sans Expanded Black at this size is ~1000 units,
// so textLength only nudges the spacing and the glyphs keep their true width.
const SIZE = 129;
const HEIGHT = 96;
const BASELINE = HEIGHT - 6;
// Room under the letters for the paint to run.
const DRIP_ROOM = 46;

/** Final registration of each channel, and where it slides in from. */
const CHANNELS = [
  { fill: "var(--a-accent)", x: -3, y: 0, fromX: -70, fromY: 0 },
  { fill: "var(--a-accent2)", x: 0, y: 1.5, fromX: 0, fromY: 26 },
  { fill: "var(--a-accent3)", x: 3, y: 0, fromX: 70, fromY: 0 },
];

// Letters whose left stem meets the baseline, so paint can run off it.
const STEMMED = new Set("BDEFHIKLMNPR");

type Drip = { x: number; len: number; w: number };

/**
 * The artist's name, brushed on once on load. It's set three times in neon red, green and
 * blue with screen blending: where all three overlap the letters are white, and the edges
 * keep a thin misregistered fringe, like a stage light through a lens. The type is worn
 * with the page's grunge filter, and wet paint runs off a few of the stems.
 */
export default function PaintedName({ name }: { name: string }) {
  const uid = useId().replace(/:/g, "");
  const rough = `rough-${uid}`;
  const mask = `brush-${uid}`;
  const textRef = useRef<SVGTextElement>(null);
  const [drips, setDrips] = useState<Drip[]>([]);
  const upper = name.toUpperCase();

  // Drips hang from real stems, so measure the set type once the font has loaded.
  useEffect(() => {
    let live = true;
    document.fonts.ready.then(() => {
      const t = textRef.current;
      if (!live || !t) return;
      const out: Drip[] = [];
      let k = 0;
      for (let i = 0; i < upper.length; i++) {
        if (!STEMMED.has(upper[i])) continue;
        // Every other stem, so it reads as a few runs, not a fringe.
        if (k++ % 2) continue;
        const box = t.getExtentOfChar(i);
        out.push({ x: box.x + SIZE * 0.075, len: 16 + ((i * 37) % 28), w: 7 + ((i * 13) % 5) });
      }
      setDrips(out);
    });
    return () => {
      live = false;
    };
  }, [upper]);

  return (
    <svg viewBox={`0 0 1000 ${HEIGHT + DRIP_ROOM}`} className="block h-auto w-full overflow-visible" role="img" aria-label={name}>
      <defs>
        <filter id={rough} filterUnits="userSpaceOnUse" x="-120" y="-60" width="1240" height={HEIGHT + 120}>
          <feTurbulence type="fractalNoise" baseFrequency="0.03 0.13" numOctaves="2" seed="11" />
          <feDisplacementMap in="SourceGraphic" scale="26" />
        </filter>
        <mask id={mask} maskUnits="userSpaceOnUse" x="-100" y="-40" width="1200" height={HEIGHT + 80}>
          <g filter={`url(#${rough})`}>
            <path
              className="brush-stroke"
              d={`M -90 ${HEIGHT * 0.2} L 1090 ${HEIGHT * 0.18} L -90 ${HEIGHT * 0.52} L 1090 ${HEIGHT * 0.5} L -90 ${HEIGHT * 0.84} L 1090 ${HEIGHT * 0.82}`}
              pathLength={1}
              fill="none"
              stroke="white"
              strokeWidth={HEIGHT * 0.46}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </mask>
      </defs>
      <g filter="url(#grunge)" style={{ isolation: "isolate" }}>
        {CHANNELS.map((c, ci) => (
          <g
            key={c.fill}
            className="rgb-ch"
            fill={c.fill}
            style={{ "--x": `${c.x}px`, "--y": `${c.y}px`, "--from-x": `${c.fromX}px`, "--from-y": `${c.fromY}px` } as CSSProperties}
          >
            <text
              ref={ci === 0 ? textRef : undefined}
              x="0"
              y={BASELINE}
              textLength="1000"
              lengthAdjust="spacing"
              mask={`url(#${mask})`}
              className="font-display"
              style={{ fontSize: SIZE, fontWeight: 900, letterSpacing: "-0.02em" }}
            >
              {upper}
            </text>
            {drips.map((d) => (
              <path
                key={d.x}
                className="drip"
                d={`M${d.x - d.w / 2} ${BASELINE - 4} L${d.x - d.w / 2} ${BASELINE + d.len} a${d.w / 2} ${d.w / 2} 0 0 0 ${d.w} 0 L${d.x + d.w / 2} ${BASELINE - 4} Z M${d.x + d.w / 2} ${BASELINE - 1} q3 1 4 4 l-4 0 Z`}
              />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}

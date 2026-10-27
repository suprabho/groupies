"use client";

import { useId } from "react";

/**
 * The artist's name, brushed on in bone paint once on load.
 * A rough-edged brush path sweeps back and forth as a mask over the type.
 */
export default function PaintedName({ name }: { name: string }) {
  const uid = useId().replace(/:/g, "");
  const rough = `rough-${uid}`;
  const dry = `dry-${uid}`;
  const mask = `brush-${uid}`;

  return (
    <svg viewBox="0 0 1000 192" className="block h-auto w-full" role="img" aria-label={name}>
      <defs>
        <filter id={rough} filterUnits="userSpaceOnUse" x="-80" y="-40" width="1160" height="280">
          <feTurbulence type="fractalNoise" baseFrequency="0.03 0.11" numOctaves="2" seed="11" />
          <feDisplacementMap in="SourceGraphic" scale="34" />
        </filter>
        <filter id={dry}>
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" seed="3" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -16 12.4" result="a" />
          <feComposite in="SourceGraphic" in2="a" operator="in" />
        </filter>
        <mask id={mask} maskUnits="userSpaceOnUse" x="-50" y="-20" width="1100" height="240">
          <g filter={`url(#${rough})`}>
            <path
              className="brush-stroke"
              d="M -60 62 L 1060 58 L -60 100 L 1060 98 L -60 142 L 1060 138"
              pathLength={1}
              fill="none"
              stroke="white"
              strokeWidth="76"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </mask>
      </defs>
      <g mask={`url(#${mask})`}>
        <text
          x="0"
          y="176"
          textLength="1000"
          lengthAdjust="spacingAndGlyphs"
          className="font-display"
          style={{ fontSize: 214, fontWeight: 900 }}
          fill="var(--a-ink)"
          filter={`url(#${dry})`}
        >
          {name.toUpperCase()}
        </text>
      </g>
    </svg>
  );
}

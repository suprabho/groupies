"use client";

import { useId } from "react";

/**
 * Goth motifs and grunge for artist worlds. Everything is drawn in SVG and coloured
 * with currentColor, so it follows the theme and stays sharp at any size.
 */

/** Filters and clip paths shared by the whole page. Render once, near the root. */
export function GrungeDefs() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <defs>
        {/* Worn print: eats small holes out of the shape and roughens its edges */}
        <filter id="grunge" x="-4%" y="-10%" width="108%" height="130%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="speck" />
          <feColorMatrix in="speck" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -24 19" result="holes" />
          <feTurbulence type="fractalNoise" baseFrequency="0.035 0.08" numOctaves="2" seed="17" result="scuff" />
          <feColorMatrix in="scuff" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -20 15.9" result="scuffs" />
          <feComposite in="holes" in2="scuffs" operator="in" result="keep" />
          <feComposite in="SourceGraphic" in2="keep" operator="in" result="worn" />
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="9" result="warp" />
          <feDisplacementMap in="worn" in2="warp" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* A pointed gothic arch, for framing images like a church window */}
        <clipPath id="arch" clipPathUnits="objectBoundingBox">
          <path d={ARCH} />
        </clipPath>
      </defs>
    </svg>
  );
}

const ARCH = "M0,1 L0,0.36 C0,0.17 0.22,0.05 0.5,0 C0.78,0.05 1,0.17 1,0.36 L1,1 Z";

/** The arch outline, drawn over an image clipped with `clip-path: url(#arch)`. */
export function ArchFrame({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1 1" preserveAspectRatio="none" className={`pointer-events-none absolute inset-0 h-full w-full overflow-visible ${className}`}>
      <path d={ARCH} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <path d="M0.5,0 L0.5,1" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.35" />
    </svg>
  );
}

/** A budded gothic cross. */
export function Cross({ className = "", size = 16 }: { className?: string; size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
      <rect x="10.6" y="3" width="2.8" height="18" />
      <rect x="4" y="8.1" width="16" height="2.8" />
      <circle cx="12" cy="2.6" r="2.2" />
      <circle cx="12" cy="21.6" r="2.2" />
      <circle cx="3.2" cy="9.5" r="2.2" />
      <circle cx="20.8" cy="9.5" r="2.2" />
      <path d="M12 6.6 L14.9 9.5 L12 12.4 L9.1 9.5 Z" fill="var(--a-bg)" />
    </svg>
  );
}

/** A thorned vine running either side of a cross. Use between sections. */
export function Thorns({ className = "" }: { className?: string }) {
  const id = `thorn-${useId().replace(/:/g, "")}`;
  const vine = (
    <svg aria-hidden className="h-6 min-w-0 flex-1" preserveAspectRatio="none">
      <defs>
        <pattern id={id} width="160" height="24" patternUnits="userSpaceOnUse">
          <path d="M0 12 C40 3, 120 21, 160 12" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <path d="M0 13 C40 21, 120 4, 160 13" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
          {/* thorns */}
          <path fill="currentColor" d="M22 8.6 L26 1.5 L28 8 Z M58 12 L63 5 L64 12.6 Z M96 14.6 L99 22.5 L102 15.5 Z M134 16 L139 23 L140 15.4 Z" />
          {/* a bud */}
          <path fill="currentColor" d="M80 12 C84 6, 90 6, 92 9 C88 9, 84 10, 80 12 Z" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
  return (
    <div aria-hidden className={`flex items-center gap-4 text-(--a-ink)/20 ${className}`}>
      {vine}
      <Cross size={18} className="shrink-0 text-(--a-ink)/45" />
      <span className="flex min-w-0 flex-1 -scale-x-100">{vine}</span>
    </div>
  );
}

/** Wrought-iron flourishes in the four corners of a relative parent. */
export function Corners({ className = "text-(--a-ink)/30", size = 44 }: { className?: string; size?: number }) {
  const corner = (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <path d="M3 45 V15 C3 8.4 8.4 3 15 3 H45" />
      <path d="M8 45 V18 C8 12.5 12.5 8 18 8 H45" opacity="0.5" />
      <path d="M3 30 C11 30 15 24 11.5 20.5 C8.8 17.8 5.5 20.3 7.4 22.6" />
      <path d="M30 3 C30 11 24 15 20.5 11.5 C17.8 8.8 20.3 5.5 22.6 7.4" />
      <path d="M3 3 L7 7 M3 9.5 L3 3 L9.5 3" />
      <circle cx="14" cy="14" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
  const at = ["left-1.5 top-1.5", "right-1.5 top-1.5 -scale-x-100", "bottom-1.5 left-1.5 -scale-y-100", "bottom-1.5 right-1.5 -scale-100"];
  return (
    <span aria-hidden className={`pointer-events-none ${className}`}>
      {at.map((p) => (
        <span key={p} className={`absolute ${p}`}>
          {corner}
        </span>
      ))}
    </span>
  );
}

/** A cathedral rose window in line art. Ghost it behind sections at low opacity. */
export function RoseWindow({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 12 }, (_, i) => (i * Math.PI * 2) / 12);
  const lights = Array.from({ length: 6 }, (_, i) => (i * Math.PI * 2) / 6 + Math.PI / 6);
  const r = (n: number) => Math.round(n * 100) / 100;
  return (
    <svg aria-hidden viewBox="-50 -50 100 100" className={`pointer-events-none ${className}`} fill="none" stroke="currentColor" strokeWidth="0.35">
      <circle r="49" />
      <circle r="46.5" />
      <circle r="17" />
      <circle r="5" />
      {petals.map((a) => (
        <g key={a}>
          <circle cx={r(Math.cos(a) * 32)} cy={r(Math.sin(a) * 32)} r="10.5" />
          <circle cx={r(Math.cos(a) * 42)} cy={r(Math.sin(a) * 42)} r="3.2" />
          <line x1={r(Math.cos(a + Math.PI / 12) * 17)} y1={r(Math.sin(a + Math.PI / 12) * 17)} x2={r(Math.cos(a + Math.PI / 12) * 46.5)} y2={r(Math.sin(a + Math.PI / 12) * 46.5)} />
        </g>
      ))}
      {lights.map((a) => (
        <circle key={a} cx={r(Math.cos(a) * 10.5)} cy={r(Math.sin(a) * 10.5)} r="5.2" />
      ))}
    </svg>
  );
}

/** A ragged paper edge in the page colour. Put it at the top or bottom of a full-bleed image. */
export function TornEdge({ flip = false, className = "" }: { flip?: boolean; className?: string }) {
  // Deterministic jitter so server and client draw the same edge.
  let seed = 7;
  const rand = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const pts: string[] = [];
  for (let x = 0; x <= 1000; x += 6 + rand() * 14) pts.push(`${Math.round(x)},${Math.round(4 + rand() * 13)}`);
  const d = `M0,24 L0,10 L${pts.join(" L")} L1000,10 L1000,24 Z`;
  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 24"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 h-4 w-full text-(--a-bg) md:h-6 ${flip ? "-top-px -scale-y-100" : "-bottom-px"} ${className}`}
    >
      <path d={d} fill="currentColor" />
    </svg>
  );
}

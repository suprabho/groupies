import type { ReactNode } from "react";
import Image from "next/image";
import { Thorns } from "./Goth";

/** Shared button looks for artist worlds. White pills with wide caps, worn like a pasted-up tour poster. */
export const btn = {
  primary:
    "distress inline-flex items-center justify-center gap-2 rounded-full bg-(--a-ink) px-6 py-3 font-display text-[13px] font-extrabold uppercase tracking-[0.04em] text-(--a-bg) transition-colors hover:bg-(--a-accent) hover:text-black disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-(--a-ink)",
  secondary:
    "distress inline-flex items-center justify-center gap-2 rounded-full border border-(--a-ink)/35 px-6 py-3 font-display text-[13px] font-extrabold uppercase tracking-[0.04em] text-(--a-ink) transition-colors hover:border-(--a-ink) hover:bg-(--a-ink)/5 disabled:cursor-not-allowed disabled:opacity-40",
  quiet:
    "inline-flex items-center gap-1.5 text-[15px] text-(--a-ink) underline decoration-(--a-accent) decoration-1 underline-offset-[6px] hover:decoration-2",
};

/** Static class names per accent, so Tailwind can see them. */
export const tone = {
  accent: { text: "text-(--a-accent)", bg: "bg-(--a-accent)", border: "border-(--a-accent)" },
  accent2: { text: "text-(--a-accent2)", bg: "bg-(--a-accent2)", border: "border-(--a-accent2)" },
  accent3: { text: "text-(--a-accent3)", bg: "bg-(--a-accent3)", border: "border-(--a-accent3)" },
};
export type Tone = keyof typeof tone;

export function SectionHeading({ title, note, noteTone = "accent", children }: { title: string; note?: string; noteTone?: Tone; children?: ReactNode }) {
  return (
    <div className="mb-10 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
      <div className="md:col-span-7">
        {note ? <p className={`mb-4 font-hand text-[20px] leading-none ${tone[noteTone].text}`}>{note}</p> : null}
        <h2 className="grunge font-display text-[clamp(2.25rem,5.2vw,4.5rem)] font-black uppercase leading-[0.92] tracking-[-0.025em]">{title}</h2>
      </div>
      {children ? <div className="max-w-[46ch] text-[17px] leading-relaxed text-(--a-muted) md:col-span-5 md:justify-self-end">{children}</div> : null}
    </div>
  );
}

export function Section({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`scroll-mt-20 overflow-x-clip ${className}`}>
      <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-10 md:px-10 md:pb-28 md:pt-14">
        <Thorns className="mb-14 md:mb-20" />
        {children}
      </div>
    </section>
  );
}

/**
 * A photo pushed to black and white, then lit by one neon accent.
 * Multiply keeps the blacks black and turns the whites into the accent colour.
 * Film scratches, dust and burnt edges sit on top.
 */
export function Duotone({
  src,
  alt,
  sizes,
  wash,
  priority = false,
  className = "",
  imgClassName = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  wash?: Tone;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={`relative isolate overflow-hidden bg-black ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover grayscale contrast-125 ${imgClassName}`} />
      {wash ? <div className={`absolute inset-0 mix-blend-multiply ${tone[wash].bg}`} aria-hidden /> : null}
      <div className="grime absolute inset-0" aria-hidden />
      <div className="burn absolute inset-0" aria-hidden />
    </div>
  );
}

export const field =
  "w-full rounded-md border border-(--a-ink)/15 bg-(--a-bg) px-4 py-3 text-[16px] text-(--a-ink) placeholder:text-(--a-muted)/70 focus:border-(--a-ink) focus:outline-none";
export const label = "mb-1.5 block text-[14px] text-(--a-muted)";

import type { ReactNode } from "react";

/** Shared button looks for artist worlds. Pills read like a dab of paint. */
export const btn = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-full bg-(--a-accent) px-5 py-3 text-[15px] font-semibold text-(--a-bg) transition-colors hover:bg-(--a-ink) disabled:cursor-not-allowed disabled:opacity-40",
  secondary:
    "inline-flex items-center justify-center gap-2 rounded-full border border-(--a-ink)/30 px-5 py-3 text-[15px] font-semibold text-(--a-ink) transition-colors hover:border-(--a-ink) disabled:cursor-not-allowed disabled:opacity-40",
  quiet:
    "inline-flex items-center gap-1.5 text-[15px] font-semibold text-(--a-ink) underline decoration-(--a-accent) decoration-2 underline-offset-4 hover:text-(--a-accent)",
};

export function SectionHeading({ title, note, children }: { title: string; note?: string; children?: ReactNode }) {
  return (
    <div className="mb-10 grid gap-4 md:mb-14 md:grid-cols-12 md:items-end">
      <h2 className="font-stencil text-[clamp(3.25rem,8vw,6.5rem)] font-extrabold leading-[0.86] md:col-span-7">{title}</h2>
      {children ? (
        <div className="max-w-[46ch] text-[17px] leading-relaxed text-(--a-muted) md:col-span-5 md:justify-self-end">
          {note ? <p className="mb-2 font-hand text-[24px] leading-none text-(--a-accent) [transform:rotate(-1.5deg)]">{note}</p> : null}
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function Section({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`scroll-mt-20 border-t border-(--a-ink)/10 ${className}`}>
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">{children}</div>
    </section>
  );
}

export const field =
  "w-full rounded-md border border-(--a-ink)/15 bg-(--a-bg) px-4 py-3 text-[16px] text-(--a-ink) placeholder:text-(--a-muted)/70 focus:border-(--a-accent) focus:outline-none";
export const label = "mb-1.5 block text-[14px] font-medium text-(--a-muted)";

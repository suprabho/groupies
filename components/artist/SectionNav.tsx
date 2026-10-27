"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "@phosphor-icons/react";
import { useWorld } from "./state";

const LEFT = [
  { id: "music", label: "Music" },
  { id: "diary", label: "Diary" },
  { id: "fan-zone", label: "Fan zone" },
];
const RIGHT = [
  { id: "live", label: "Live" },
  { id: "merch", label: "Merch" },
  { id: "membership", label: "Membership" },
];
const LINKS = [...LEFT, ...RIGHT];

/** Poster-style header: marker-caps links either side of the name, like the artist's own site. */
export default function SectionNav() {
  const { artist, cart, setCartOpen } = useWorld();
  const [active, setActive] = useState<string | null>(null);
  const count = cart.reduce((n, l) => n + l.qty, 0);

  useEffect(() => {
    const els = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const hero = document.getElementById("top");
    const ho = new IntersectionObserver(([e]) => e.isIntersecting && setActive(null), { rootMargin: "-40% 0px -55% 0px" });
    if (hero) ho.observe(hero);
    return () => {
      io.disconnect();
      ho.disconnect();
    };
  }, []);

  const link = (l: { id: string; label: string }) => (
    <li key={l.id}>
      <a
        href={`#${l.id}`}
        aria-current={active === l.id ? "true" : undefined}
        className={`relative block whitespace-nowrap px-1 py-1 font-hand text-[17px] leading-none transition-colors lg:text-[19px] ${
          active === l.id ? "text-(--a-ink)" : "text-(--a-ink)/55 hover:text-(--a-ink)"
        }`}
      >
        {l.label}
        {active === l.id ? <span className="neon absolute inset-x-1 -bottom-1 h-[2px] rounded-full bg-(--a-accent) text-(--a-accent)" aria-hidden /> : null}
      </a>
    </li>
  );

  const bag = (
    <button
      type="button"
      onClick={() => setCartOpen(true)}
      className="relative flex shrink-0 items-center gap-2 rounded-full border border-(--a-ink)/25 px-3.5 py-2 font-hand text-[16px] leading-none hover:border-(--a-ink)"
      aria-label={`Open bag, ${count} item${count === 1 ? "" : "s"}`}
    >
      <ShoppingBag size={18} />
      <span className="hidden sm:inline">Bag</span>
      {count > 0 && (
        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-(--a-accent2) px-1 font-sans text-[12px] text-black">{count}</span>
      )}
    </button>
  );

  const wordmark = (
    <a href="#top" className="font-display text-[20px] font-black uppercase leading-none tracking-[-0.02em] [text-shadow:-1.5px_0_var(--a-accent),1.5px_0_var(--a-accent3)] lg:text-[26px]">
      {artist.name}
    </a>
  );

  return (
    <nav aria-label={`${artist.name} sections`} className="sticky top-0 z-40 border-b border-(--a-ink)/10 bg-(--a-bg)/85 backdrop-blur-md">
      {/* Desktop: links, name, links */}
      <div className="mx-auto hidden h-20 max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-10 px-10 lg:grid">
        <ul className="flex items-center justify-end gap-8 xl:gap-12">{LEFT.map(link)}</ul>
        {wordmark}
        <div className="flex items-center justify-between gap-8">
          <ul className="flex items-center gap-8 xl:gap-12">{RIGHT.map(link)}</ul>
          {bag}
        </div>
      </div>

      {/* Mobile and tablet: name and bag, links scroll underneath */}
      <div className="lg:hidden">
        <div className="flex h-14 items-center justify-between gap-4 px-5 md:px-10">
          {wordmark}
          {bag}
        </div>
        <ul className="flex items-center gap-6 overflow-x-auto px-5 pb-3 [scrollbar-width:none] md:px-10">{LINKS.map(link)}</ul>
      </div>
    </nav>
  );
}

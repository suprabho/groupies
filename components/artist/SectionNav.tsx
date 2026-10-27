"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "@phosphor-icons/react";
import { useWorld } from "./state";

const LINKS = [
  { id: "music", label: "Music" },
  { id: "diary", label: "Diary" },
  { id: "fan-zone", label: "Fan zone" },
  { id: "live", label: "Live" },
  { id: "merch", label: "Merch" },
  { id: "membership", label: "Membership" },
];

export default function SectionNav() {
  const { artist, cart, setCartOpen } = useWorld();
  const [active, setActive] = useState<string | null>(null);
  const [pastHero, setPastHero] = useState(false);
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
    const ho = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), { rootMargin: "-80px 0px 0px 0px" });
    if (hero) ho.observe(hero);
    return () => {
      io.disconnect();
      ho.disconnect();
    };
  }, []);

  return (
    <nav aria-label={`${artist.name} sections`} className="sticky top-0 z-40 border-b border-(--a-ink)/10 bg-(--a-bg)/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-5 md:px-10">
        <a
          href="#top"
          className={`hidden font-display text-[22px] font-extrabold uppercase tracking-tight transition-opacity md:block duration-300 ${pastHero ? "opacity-100" : "pointer-events-none opacity-0"}`}
          tabIndex={pastHero ? 0 : -1}
        >
          {artist.name}
        </a>
        <ul className="-mx-2 flex flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none] md:justify-center">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={`block whitespace-nowrap rounded-full px-3 py-1.5 text-[15px] transition-colors ${
                  active === l.id ? "bg-(--a-ink) text-(--a-bg)" : "text-(--a-muted) hover:text-(--a-ink)"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="relative flex shrink-0 items-center gap-2 rounded-full border border-(--a-ink)/20 px-3.5 py-2 text-[15px] hover:border-(--a-ink)"
          aria-label={`Open bag, ${count} item${count === 1 ? "" : "s"}`}
        >
          <ShoppingBag size={18} />
          <span className="hidden sm:inline">Bag</span>
          {count > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-(--a-accent) px-1 text-[12px] font-bold text-(--a-bg)">
              {count}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

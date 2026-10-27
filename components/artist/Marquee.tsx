"use client";

import { Fragment } from "react";
import { useWorld } from "./state";
import { Cross } from "./Goth";

// The separators are neon crosses, cycling through the three accents.
const CROSSES = ["text-(--a-accent)", "text-(--a-accent2)", "text-(--a-accent3)"];

/** The album's tracklist as one slow, giant typographic strip. Decorative. */
export default function Marquee() {
  const { artist } = useWorld();
  const titles = artist.album.tracks.map((t) => t.title.replace(/ \((Intro|Interlude)\)/, ""));
  const run = (
    <div className="flex items-center">
      {titles.map((t, i) => (
        <Fragment key={t}>
          <span
            className={`whitespace-nowrap px-[2.5vw] font-display text-[clamp(3rem,8vw,7.5rem)] uppercase leading-none tracking-[-0.03em] ${
              i % 2 ? "font-extralight" : "font-black"
            }`}
          >
            {t}
          </span>
          <Cross size={40} className={`h-7 w-7 shrink-0 drop-shadow-[0_0_10px_currentColor] md:h-10 md:w-10 ${CROSSES[i % 3]}`} />
        </Fragment>
      ))}
    </div>
  );
  return (
    <div aria-hidden className="overflow-hidden border-y border-(--a-ink)/10 py-6 md:py-8">
      <div className="marquee-x">
        {run}
        {run}
      </div>
    </div>
  );
}

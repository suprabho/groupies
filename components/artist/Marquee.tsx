"use client";

import { Fragment } from "react";
import { useWorld } from "./state";

/** The album's tracklist as one slow, giant typographic strip. Decorative. */
export default function Marquee() {
  const { artist } = useWorld();
  const titles = artist.album.tracks.map((t) => t.title.replace(/ \((Intro|Interlude)\)/, ""));
  const run = (
    <div className="flex items-center">
      {titles.map((t, i) => (
        <Fragment key={t}>
          <span className={`whitespace-nowrap px-[2vw] font-stencil text-[clamp(4rem,11vw,10rem)] font-black uppercase leading-none ${i % 2 ? "text-outline-ink" : ""}`}>
            {t}
          </span>
          <span lang="pa" className="font-pa text-[clamp(1.5rem,3vw,2.75rem)] font-bold text-(--a-accent)">
            {artist.album.titleLocal}
          </span>
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

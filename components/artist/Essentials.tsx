"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { useWorld } from "./state";

/** The real, already-released catalogue, linked out to where it lives today. */
export default function Essentials() {
  const { artist } = useWorld();
  return (
    <div className="mt-24">
      <h3 className="font-stencil text-[clamp(2.5rem,4.5vw,3.5rem)] font-extrabold leading-none">Already out everywhere</h3>
      <p className="mt-3 max-w-[56ch] text-[16px] leading-relaxed text-(--a-muted)">
        The songs that got everyone here. These stay on every streaming service; Groupies is where the new work and the
        people around it live.
      </p>
      <iframe
        title={`${artist.name} on Spotify`}
        src={`https://open.spotify.com/embed/track/${artist.spotifyFeaturedTrack}?utm_source=generator&theme=0`}
        className="mt-8 h-[152px] w-full rounded-xl border-0"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
      <ul className="mt-8 grid gap-x-10 sm:grid-cols-2">
        {artist.essentials.map((s) => (
          <li key={s.title} className="border-b border-(--a-ink)/10">
            <a href={s.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 py-3.5">
              <span className="min-w-0">
                <span className="font-display text-[28px] font-bold leading-none group-hover:text-(--a-accent)">{s.title}</span>
                {s.credit ? <span className="mt-1 block truncate text-[14px] text-(--a-muted)">{s.credit}</span> : null}
              </span>
              <ArrowUpRight size={18} className="shrink-0 text-(--a-muted) group-hover:text-(--a-accent)" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-[14px] text-(--a-muted)">
        Each link opens a Spotify search for the song.
      </p>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useWorld } from "./state";

export default function ArtistFooter() {
  const { artist } = useWorld();
  return (
    <footer className="border-t border-(--a-ink)/10">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-display text-[clamp(3rem,8vw,6rem)] font-black uppercase leading-[0.85]">{artist.name}</p>
            {artist.nameLocal ? (
              <p lang="pa" className="mt-2 font-pa text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-none text-(--a-accent)">
                {artist.nameLocal}
              </p>
            ) : null}
            <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-(--a-muted)">
              This is a concept page built for the Groupies pilot. It isn&apos;t affiliated with or endorsed by {artist.name}. Biography and
              catalogue come from public sources; the album, prices, dates, posts and fan notes are sample content.
            </p>
          </div>
          <div className="md:col-span-3">
            <h3 className="mb-3 text-[15px] text-(--a-muted)">Elsewhere</h3>
            <ul className="space-y-2">
              {artist.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noreferrer" className="text-[16px] hover:text-(--a-accent)">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <h3 className="mb-3 text-[15px] text-(--a-muted)">On Groupies</h3>
            <ul className="space-y-2 text-[16px]">
              <li>
                <Link href="/" className="hover:text-(--a-accent)">
                  How Groupies works
                </Link>
              </li>
              <li>
                <Link href="/#join" className="hover:text-(--a-accent)">
                  Bring your own world here
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

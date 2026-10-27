"use client";

import Link from "next/link";
import { useWorld } from "./state";
import { Thorns } from "./Goth";
import Socials from "./Socials";

export default function ArtistFooter() {
  const { artist } = useWorld();
  return (
    <footer>
      <div className="mx-auto max-w-[1400px] px-5 pb-16 md:px-10">
        <Thorns className="mb-14" />
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="grunge font-display text-[clamp(2.2rem,6vw,4.75rem)] font-black uppercase leading-[0.9] tracking-[-0.03em]">{artist.name}</p>
            {artist.nameLocal ? (
              <p lang="pa" className="mt-5 font-pa text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-none text-(--a-ink)/25">
                {artist.nameLocal}
              </p>
            ) : null}
            <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-(--a-muted)">
              This is a concept page built for the Groupies pilot. It isn&apos;t affiliated with or endorsed by {artist.name}. Biography and
              catalogue come from public sources; the album, prices, dates, posts and fan notes are sample content.
            </p>
          </div>
          <div className="md:col-span-3">
            <h3 className="mb-4 font-hand text-[17px] text-(--a-muted)">Elsewhere</h3>
            <Socials variant="list" />
          </div>
          <div className="md:col-span-3">
            <h3 className="mb-4 font-hand text-[17px] text-(--a-muted)">On Groupies</h3>
            <ul className="space-y-2 text-[16px]">
              <li>
                <Link href="/" className="hover:text-(--a-accent2)">
                  How Groupies works
                </Link>
              </li>
              <li>
                <Link href="/#join" className="hover:text-(--a-accent2)">
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

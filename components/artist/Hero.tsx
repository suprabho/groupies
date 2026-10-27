"use client";

import Image from "next/image";
import { Pause, Play, Check, Plus } from "@phosphor-icons/react";
import PaintedName from "./PaintedName";
import Cover from "./Cover";
import { btn } from "./ui";
import { usePlayer, useWorld } from "./state";

export default function Hero() {
  const { artist, following, setFollowing, showToast } = useWorld();
  const player = usePlayer();
  const teaser = artist.album.tracks[1];
  const teaserId = `track-${teaser.n}`;
  const isPlaying = player.current === teaserId;
  const members = artist.members + (following ? 1 : 0);
  const heroImage = artist.images.portrait ?? artist.images.faceArt;

  return (
    <section id="top" className="relative overflow-hidden">
      {/* The name in Gurmukhi, as a ghosted graphic behind everything */}
      {artist.nameLocal ? (
        <span
          aria-hidden
          lang="pa"
          className="pointer-events-none absolute -left-[3vw] top-[2%] select-none whitespace-nowrap font-pa text-[30vw] font-extrabold leading-none text-(--a-accent) opacity-[0.07]"
        >
          {artist.nameLocal}
        </span>
      ) : null}

      <div className="relative mx-auto max-w-[1400px] px-5 pb-14 pt-10 md:px-10 md:pb-20 md:pt-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="relative z-10 lg:col-span-7 lg:pb-[10vw]">
            <p className="font-hand text-[clamp(1.5rem,2.4vw,2rem)] text-(--a-accent) [transform:rotate(-2deg)]">the paint stays on.</p>
            <p className="mt-3 max-w-[14ch] font-serif text-[clamp(3.25rem,7vw,7rem)] italic leading-[0.92]">{artist.tagline}</p>
            <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-(--a-muted)">
              From {artist.origin}, living in the {artist.base}. {artist.sound}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                aria-pressed={following}
                onClick={() => {
                  setFollowing(!following);
                  if (!following) showToast(`You're following ${artist.name}`);
                }}
                className={following ? btn.secondary : btn.primary}
              >
                {following ? <Check size={18} weight="bold" /> : <Plus size={18} weight="bold" />}
                {following ? "Following" : "Follow"}
              </button>
              <a href="#membership" className={btn.secondary}>
                See memberships
              </a>
              <span className="font-hand text-[22px] text-(--a-muted) [transform:rotate(-1.5deg)]">
                {members.toLocaleString("en-IN")} misfits and counting
              </span>
            </div>
          </div>

          <figure className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] shadow-2xl shadow-black/60 [transform:rotate(1.2deg)]">
              <Image
                src={heroImage}
                alt={artist.images.portrait ? artist.name : "A skull face-paint study in bone-white paint on black paper"}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-(--a-bg) via-(--a-bg)/60 to-transparent" aria-hidden />
              {!artist.images.portrait && (
                <figcaption className="absolute right-4 top-3 font-hand text-[19px] text-(--a-ink)/75 [transform:rotate(2deg)]">face paint study, Halloween tour</figcaption>
              )}
            </div>
          </figure>
        </div>

        {/* The name crosses the artwork like a gig poster */}
        <h1 className="relative z-20 -mt-6 lg:-mt-[13vw]">
          <PaintedName name={artist.name} />
        </h1>

        {/* The exclusive, front and centre */}
        <div className="mt-12 flex flex-col gap-5 rounded-md bg-(--a-surface) p-4 sm:flex-row sm:items-center md:mt-16 md:p-5">
          <div className="w-20 shrink-0 overflow-hidden rounded-sm sm:w-24">
            <Cover sizes="96px" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-hand text-[22px] leading-none text-(--a-accent)">{artist.album.releaseLabel}</p>
            <p className="mt-1 font-display text-[clamp(1.6rem,3vw,2.25rem)] font-bold leading-none">
              {artist.album.title}, the new album
            </p>
            <div className="mt-3 h-[3px] w-full max-w-md overflow-hidden rounded-full bg-(--a-ink)/10" aria-hidden>
              <div className="h-full bg-(--a-accent)" style={{ width: `${isPlaying ? player.progress * 100 : 0}%` }} />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className={`${btn.primary} whitespace-nowrap`}
              onClick={() => (isPlaying ? player.stop() : player.play(teaserId, teaser.root, teaser.mode, teaser.bpm))}
            >
              {isPlaying ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" />}
              {isPlaying ? "Pause preview" : "Play the title track"}
            </button>
            <span className="hidden lg:block">
              <a href="#music" className={`${btn.secondary} whitespace-nowrap`}>
                Full tracklist
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

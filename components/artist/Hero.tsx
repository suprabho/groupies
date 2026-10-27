"use client";

import { Pause, Play, Check, Plus } from "@phosphor-icons/react";
import PaintedName from "./PaintedName";
import Socials from "./Socials";
import Cover from "./Cover";
import { Duotone, btn } from "./ui";
import { Corners, RoseWindow } from "./Goth";
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
    <section id="top" className="relative">
      {/* Full-bleed black and white, like a gig photo */}
      <div className="relative flex min-h-[min(92svh,900px)] flex-col justify-end overflow-hidden">
        <Duotone
          src={heroImage}
          alt={artist.images.portrait ? artist.name : "A skull face-paint study in white paint on black paper"}
          sizes="100vw"
          priority
          className="absolute! inset-0"
          imgClassName={artist.images.portrait ? "object-[50%_22%] brightness-90" : "object-[50%_38%] brightness-90"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-(--a-bg) via-(--a-bg)/55 to-(--a-bg)/10" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-(--a-bg)/70 via-transparent to-transparent" aria-hidden />
        {/* A rose window ghosted over the paint, like light through a cathedral */}
        <RoseWindow className="absolute -right-[12vw] top-[6%] w-[62vw] max-w-[860px] text-(--a-ink)/[0.13] mix-blend-screen" />

        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-10 pt-40 md:px-10 md:pb-14">
          <p className="font-hand text-[clamp(1.1rem,1.6vw,1.4rem)] leading-none text-(--a-accent)">The paint stays on.</p>
          <p className="mt-4 max-w-[13ch] font-display text-[clamp(1.75rem,3.4vw,3.1rem)] font-extralight uppercase leading-[1.02] tracking-[-0.02em] lg:max-w-[11ch]">
            {artist.tagline}
          </p>

          <h1 className="mt-10 md:mt-14">
            <PaintedName name={artist.name} />
          </h1>

          <div className="mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="max-w-[44ch] text-[17px] leading-relaxed text-(--a-ink)/75">
                From {artist.origin}, living in the {artist.base}. {artist.sound}
              </p>
              <Socials className="mt-5" />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                aria-pressed={following}
                onClick={() => {
                  setFollowing(!following);
                  if (!following) showToast(`You're following ${artist.name}`);
                }}
                className={following ? btn.secondary : btn.primary}
              >
                {following ? <Check size={16} weight="bold" /> : <Plus size={16} weight="bold" />}
                {following ? "Following" : "Follow"}
              </button>
              <a href="#membership" className={btn.secondary}>
                See memberships
              </a>
              <span className="w-full font-hand text-[17px] text-(--a-muted) sm:w-auto sm:pl-2">
                {members.toLocaleString("en-IN")} misfits and counting
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* The exclusive, front and centre */}
      <div className="mx-auto max-w-[1400px] px-5 pb-14 md:px-10 md:pb-20">
        <div className="relative flex flex-col gap-5 rounded-md border border-(--a-ink)/10 bg-(--a-surface) p-4 sm:flex-row sm:items-center md:p-5 md:px-8">
          <Corners size={30} className="text-(--a-ink)/25" />
          <div className="w-20 shrink-0 overflow-hidden rounded-sm sm:w-24">
            <Cover sizes="96px" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 font-hand text-[16px] leading-none text-(--a-accent)">
              <span className="neon pulse h-2 w-2 rounded-full bg-(--a-accent)" aria-hidden />
              {artist.album.releaseLabel}
            </p>
            <p className="mt-2 font-display text-[clamp(1.3rem,2.4vw,1.9rem)] font-black uppercase leading-none tracking-[-0.02em]">
              {artist.album.title} <span className="font-extralight">the new album</span>
            </p>
            <div className="mt-3 h-[2px] w-full max-w-md overflow-hidden rounded-full bg-(--a-ink)/10" aria-hidden>
              <div className="neon h-full bg-(--a-accent2) text-(--a-accent2)" style={{ width: `${isPlaying ? player.progress * 100 : 0}%` }} />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className={`${btn.primary} whitespace-nowrap`}
              onClick={() => (isPlaying ? player.stop() : player.play(teaserId, teaser.root, teaser.mode, teaser.bpm))}
            >
              {isPlaying ? <Pause size={16} weight="fill" /> : <Play size={16} weight="fill" />}
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

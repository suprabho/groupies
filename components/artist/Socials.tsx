"use client";

import type { Icon } from "@phosphor-icons/react";
import { AppleLogo, InstagramLogo, LinkSimple, SoundcloudLogo, SpotifyLogo, XLogo, YoutubeLogo } from "@phosphor-icons/react";
import { useWorld } from "./state";

const ICONS: Record<string, Icon> = {
  Instagram: InstagramLogo,
  YouTube: YoutubeLogo,
  Spotify: SpotifyLogo,
  "Apple Music": AppleLogo,
  SoundCloud: SoundcloudLogo,
  X: XLogo,
};

/** The artist's own channels. "icons" is a compact row of round buttons; "list" adds the names. */
export default function Socials({ variant = "icons", className = "" }: { variant?: "icons" | "list"; className?: string }) {
  const { artist } = useWorld();

  if (variant === "list") {
    return (
      <ul className={`space-y-2.5 ${className}`}>
        {artist.socials.map((s) => {
          const Glyph = ICONS[s.label] ?? LinkSimple;
          return (
            <li key={s.label}>
              <a href={s.url} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 text-[16px] hover:text-(--a-accent2)">
                <Glyph size={20} weight="fill" className="text-(--a-ink)/60 group-hover:text-(--a-accent2)" aria-hidden />
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {artist.socials.map((s) => {
        const Glyph = ICONS[s.label] ?? LinkSimple;
        return (
          <li key={s.label}>
            <a
              href={s.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${artist.name} on ${s.label}`}
              title={s.label}
              className="grid h-10 w-10 place-items-center rounded-full border border-(--a-ink)/20 text-(--a-ink)/80 transition-colors hover:border-(--a-ink) hover:bg-(--a-ink) hover:text-(--a-bg)"
            >
              <Glyph size={18} weight="fill" aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

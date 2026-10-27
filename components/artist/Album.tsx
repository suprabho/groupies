"use client";

import { Pause, Play, ShoppingBag, Check } from "@phosphor-icons/react";
import Cover from "./Cover";
import Essentials from "./Essentials";
import { Section, btn } from "./ui";
import { usePlayer, useWorld } from "./state";

function Bars() {
  return (
    <span className="eq flex h-4 items-end gap-[3px]" aria-hidden>
      <span />
      <span />
      <span />
    </span>
  );
}

export default function Album() {
  const { artist, addToCart, cart, money, openCheckout } = useWorld();
  const player = usePlayer();
  const { album } = artist;

  return (
    <Section id="music">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Cover + ownership */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <Cover priority className="rounded-sm shadow-2xl shadow-black/50" />
            <div className="mt-8">
              <h2 className="flex flex-wrap items-baseline gap-x-4">
                <span className="sr-only">{album.title}, </span>
                <span lang="pa" aria-hidden className="grunge font-pa text-[clamp(4rem,8vw,6rem)] font-extrabold leading-[0.9] text-(--a-accent)">
                  {album.titleLocal ?? album.title}
                </span>
                <span className="font-hand text-[20px] leading-none text-(--a-ink)/80">means shadows.</span>
              </h2>
              <p className="mt-6 max-w-[26ch] font-display text-[24px] font-extralight leading-[1.2] tracking-[-0.01em]">{album.subtitle}</p>
              <p className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-(--a-muted)">{album.description}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className={btn.primary}
                  onClick={() =>
                    openCheckout({
                      title: `Buy ${album.title}`,
                      lines: [{ label: `${album.title}, ${album.tracks.length} tracks, lossless download`, price: album.priceAlbum }],
                      success: `${album.title} is yours. It unlocks in your library at midnight on 31 October.`,
                    })
                  }
                >
                  Buy the album for {money(album.priceAlbum)}
                </button>
                <a href="#membership" className={btn.quiet}>
                  Or stream it as a member
                </a>
              </div>
              <p className="mt-5 max-w-[52ch] text-[14px] leading-relaxed text-(--a-muted)">
                Artists with more than 100,000 monthly listeners pay no Groupies commission, so the whole price goes to{" "}
                {artist.name}.
              </p>
            </div>
          </div>
        </div>

        {/* Tracklist */}
        <div className="lg:col-span-7">
          <div className="mb-4 flex items-baseline justify-between gap-4 text-[14px] text-(--a-muted)">
            <span className="font-hand text-[16px] text-(--a-accent)">{album.releaseLabel}</span>
            <span>30-second previews for everyone</span>
          </div>
          <ol className="border-t border-(--a-ink)/10">
            {album.tracks.map((t) => {
              const id = `track-${t.n}`;
              const playing = player.current === id;
              const owned = cart.some((l) => l.id === id);
              return (
                <li key={t.n} className={`relative border-b border-(--a-ink)/10 ${playing ? "bg-(--a-surface)" : ""}`}>
                  <div className="grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 px-2 py-4 sm:grid-cols-[2.5rem_1fr_auto_auto] sm:gap-5 sm:px-3">
                    <span className="font-display text-[26px] font-extralight leading-none tabular-nums text-(--a-muted)">
                      {playing ? <Bars /> : t.n}
                    </span>
                    <button
                      type="button"
                      onClick={() => (playing ? player.stop() : player.play(id, t.root, t.mode, t.bpm))}
                      className="group min-w-0 text-left"
                      aria-label={`${playing ? "Pause" : "Play"} preview of ${t.title}`}
                    >
                      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className={`font-display text-[17px] font-extrabold uppercase leading-tight tracking-[-0.01em] sm:text-[20px] ${playing ? "neon-text text-(--a-accent2)" : "group-hover:text-(--a-accent2)"}`}>
                          {t.title}
                        </span>
                        {t.scribble ? (
                          <span className="hidden shrink-0 font-hand text-[15px] leading-none text-(--a-accent) md:inline">
                            {t.scribble}
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-1 block truncate text-[15px] text-(--a-muted)">{t.note}</span>
                    </button>
                    <span className="hidden text-[15px] tabular-nums text-(--a-muted) sm:block">{t.duration}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => (playing ? player.stop() : player.play(id, t.root, t.mode, t.bpm))}
                        className={`grid h-10 w-10 place-items-center rounded-full border transition-colors ${playing ? "border-(--a-accent2) text-(--a-accent2)" : "border-(--a-ink)/20 hover:border-(--a-ink)"}`}
                        aria-label={`${playing ? "Pause" : "Play"} preview of ${t.title}`}
                      >
                        {playing ? <Pause size={16} weight="fill" /> : <Play size={16} weight="fill" />}
                      </button>
                      <button
                        type="button"
                        disabled={owned}
                        onClick={() => addToCart({ id, name: `${t.title} (track)`, price: album.priceTrack, kind: "track" })}
                        className="hidden h-10 items-center gap-1.5 rounded-full px-3 text-[14px] text-(--a-muted) hover:text-(--a-ink) disabled:text-(--a-accent2) sm:flex"
                        aria-label={owned ? `${t.title} is in your bag` : `Add ${t.title} to bag for ${money(album.priceTrack)}`}
                      >
                        {owned ? <Check size={16} weight="bold" /> : <ShoppingBag size={16} />}
                        {owned ? "In bag" : money(album.priceTrack)}
                      </button>
                    </div>
                  </div>
                  {playing && (
                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-(--a-ink)/10" aria-hidden>
                      <div className="neon h-full bg-(--a-accent2) text-(--a-accent2)" style={{ width: `${player.progress * 100}%` }} />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
          <p className="mt-4 text-[13px] text-(--a-muted)">
            Previews are placeholder audio generated in your browser until the real masters are uploaded.
          </p>

          <Essentials />
        </div>
      </div>
    </Section>
  );
}

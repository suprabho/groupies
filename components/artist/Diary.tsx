"use client";

import { useState } from "react";
import Image from "next/image";
import { LockSimple, Pause, Play } from "@phosphor-icons/react";
import { Duotone, Section, SectionHeading, btn } from "./ui";
import { usePlayer, useWorld } from "./state";

const TABS = ["Writing", "Video", "Radio"] as const;
type Tab = (typeof TABS)[number];

function MembersTag() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-(--a-accent3)/70 px-2.5 py-0.5 text-[13px] text-(--a-accent3)">
      <LockSimple size={12} weight="bold" aria-hidden />
      Inner Circle
    </span>
  );
}

export default function Diary() {
  const { artist, showToast } = useWorld();
  const player = usePlayer();
  const [tab, setTab] = useState<Tab>("Writing");
  const [open, setOpen] = useState<string | null>(null);
  const [lead, ...rest] = artist.posts;

  return (
    <Section id="diary">
      <SectionHeading title="Behind the paint" note="Written, filmed, recorded">
        Studio notes, backstage video and a radio show, made with Vismay and published here first. Sample posts for this
        demo.
      </SectionHeading>

      <div role="tablist" aria-label="Diary formats" className="mb-10 flex gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            id={`tab-${t}`}
            aria-selected={tab === t}
            aria-controls={`panel-${t}`}
            onClick={() => setTab(t)}
            className={`rounded-full px-5 py-2.5 font-display text-[12px] font-extrabold uppercase tracking-[0.06em] transition-colors ${
              tab === t ? "bg-(--a-ink) text-(--a-bg)" : "border border-(--a-ink)/20 text-(--a-muted) hover:text-(--a-ink)"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Writing" && (
        <div id="panel-Writing" role="tabpanel" aria-labelledby="tab-Writing" className="grid gap-12 lg:grid-cols-12">
          <article className="lg:col-span-7">
            <Duotone
              src={artist.images.dressingRoom}
              alt="An empty dressing room: mirror bulbs, face paint tins and brushes on the counter"
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="mb-8 aspect-[16/9] rounded-sm"
            />
            <p className="text-[14px] text-(--a-muted)">
              {lead.date}, {lead.readMins} min read
            </p>
            <h3 className="grunge mt-3 font-display text-[clamp(1.9rem,3.6vw,3.2rem)] font-black uppercase leading-[0.95] tracking-[-0.025em]">{lead.title}</h3>
            <p className="mt-5 max-w-[44ch] font-display text-[21px] font-extralight leading-[1.4]">{lead.excerpt}</p>
            {open === lead.slug && lead.body ? (
              <div className="mt-6 max-w-[62ch] space-y-4 text-[18px] leading-[1.7] text-(--a-ink)/85">
                {lead.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : null}
            <button type="button" className={`${btn.secondary} mt-7`} onClick={() => setOpen(open === lead.slug ? null : lead.slug)}>
              {open === lead.slug ? "Show less" : "Keep reading"}
            </button>
          </article>

          <ul className="space-y-0 border-t border-(--a-ink)/10 lg:col-span-5">
            {rest.map((p) => (
              <li key={p.slug} className="border-b border-(--a-ink)/10 py-6">
                <div className="flex flex-wrap items-center gap-3 text-[14px] text-(--a-muted)">
                  <span>{p.date}</span>
                  {p.membersOnly ? <MembersTag /> : null}
                </div>
                <h4 className="mt-3 font-display text-[19px] font-extrabold uppercase leading-[1.1] tracking-[-0.01em]">{p.title}</h4>
                <p className="mt-2 text-[16px] leading-relaxed text-(--a-muted)">{p.excerpt}</p>
                {open === p.slug && p.body ? (
                  <div className="mt-3 space-y-3 text-[16px] leading-relaxed">
                    {p.body.map((b, i) => (
                      <p key={i}>{b}</p>
                    ))}
                  </div>
                ) : null}
                {p.membersOnly ? (
                  <a href="#membership" className={`${btn.quiet} mt-3`}>
                    Join Inner Circle to read
                  </a>
                ) : p.body ? (
                  <button type="button" className={`${btn.quiet} mt-3`} onClick={() => setOpen(open === p.slug ? null : p.slug)}>
                    {open === p.slug ? "Show less" : "Read the post"}
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === "Video" && (
        <div id="panel-Video" role="tabpanel" aria-labelledby="tab-Video" className="grid gap-6 sm:grid-cols-2">
          {artist.vlogs.map((v) => (
            <button
              key={v.title}
              type="button"
              onClick={() =>
                v.membersOnly ? document.getElementById("membership")?.scrollIntoView({ behavior: "smooth" }) : showToast("Vlogs play here once they're uploaded")
              }
              className="group text-left"
            >
              <div className="relative aspect-video overflow-hidden rounded-sm bg-(--a-surface)">
                <Image src={v.image} alt="" fill sizes="(min-width: 640px) 50vw, 100vw" className={`object-cover grayscale contrast-125 transition-transform duration-500 group-hover:scale-[1.03] ${v.membersOnly ? "brightness-[0.4]" : "brightness-[0.75]"}`} />
                <span className="grunge absolute bottom-4 left-4 font-display text-[clamp(1.8rem,4.2vw,3.5rem)] font-black uppercase leading-none tracking-[-0.03em] text-(--a-ink)/90">
                  {v.place}
                </span>
                <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-(--a-ink) text-(--a-bg) transition-transform group-hover:scale-105">
                  {v.membersOnly ? <LockSimple size={20} weight="bold" /> : <Play size={20} weight="fill" />}
                </span>
                <span className="absolute right-3 top-3 rounded-full bg-black/70 px-2.5 py-0.5 text-[13px] tabular-nums">{v.duration}</span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <h4 className="font-display text-[16px] font-extrabold uppercase tracking-[-0.01em] group-hover:text-(--a-accent2)">{v.title}</h4>
                {v.membersOnly ? <MembersTag /> : null}
              </div>
              <p className="text-[14px] text-(--a-muted)">
                {v.place}, {v.date}
              </p>
            </button>
          ))}
        </div>
      )}

      {tab === "Radio" && (
        <div id="panel-Radio" role="tabpanel" aria-labelledby="tab-Radio" className="max-w-3xl">
          <p className="mb-6 text-[17px] text-(--a-muted)">
            <span className="font-display font-black uppercase text-(--a-ink)">Misfit Radio.</span> A short show about how the songs get made.
          </p>
          <ol className="border-t border-(--a-ink)/10">
            {artist.episodes.map((e) => {
              const id = `ep-${e.n}`;
              const playing = player.current === id;
              return (
                <li key={e.n} className="grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-(--a-ink)/10 py-5">
                  <button
                    type="button"
                    onClick={() => (playing ? player.stop() : player.play(id, 38 + e.n, "minor", 66))}
                    className={`grid h-12 w-12 place-items-center rounded-full ${playing ? "bg-(--a-accent2) text-black" : "bg-(--a-ink) text-(--a-bg)"}`}
                    aria-label={`${playing ? "Pause" : "Play"} episode ${e.n}, ${e.title}`}
                  >
                    {playing ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" />}
                  </button>
                  <div className="min-w-0">
                    <p className="text-[14px] text-(--a-muted)">Episode {e.n}</p>
                    <h4 className="mt-1 font-display text-[20px] font-extrabold uppercase leading-tight tracking-[-0.01em]">{e.title}</h4>
                    <p className="mt-1 text-[16px] text-(--a-muted)">{e.summary}</p>
                    {playing && (
                      <div className="mt-2 h-[2px] bg-(--a-ink)/10" aria-hidden>
                        <div className="neon h-full bg-(--a-accent2) text-(--a-accent2)" style={{ width: `${player.progress * 100}%` }} />
                      </div>
                    )}
                  </div>
                  <span className="text-[14px] tabular-nums text-(--a-muted)">{e.duration}</span>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </Section>
  );
}

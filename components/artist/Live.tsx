"use client";

import { useState, type FormEvent } from "react";
import { Broadcast, Check, Microphone, VideoCamera } from "@phosphor-icons/react";
import { Duotone, btn, field } from "./ui";
import { Corners, TornEdge } from "./Goth";
import { useWorld } from "./state";

// Sample tour dates are written "31 Oct"; they all fall in this year.
const YEAR = 2026;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function splitDate(date: string) {
  const [day, month] = date.split(" ");
  const weekday = DAYS[new Date(YEAR, MONTHS.indexOf(month), Number(day)).getDay()];
  return { day, month, weekday };
}

export default function Live() {
  const { artist, showToast } = useWorld();
  const [taken, setTaken] = useState<Record<string, number>>(() => Object.fromEntries(artist.sessions.map((s) => [s.id, s.taken])));
  const [reserving, setReserving] = useState<string | null>(null);
  const [reserved, setReserved] = useState<string[]>([]);
  const [email, setEmail] = useState("");

  const reserve = (e: FormEvent, id: string) => {
    e.preventDefault();
    setReserved((r) => [...r, id]);
    setTaken((t) => ({ ...t, [id]: t[id] + 1 }));
    setReserving(null);
    showToast("Spot reserved. The link arrives by email an hour before.");
  };

  return (
    <section id="live" className="scroll-mt-20">
      <div className="relative flex h-[64vh] min-h-[440px] flex-col justify-end overflow-hidden">
        <Duotone src={artist.images.crowd} alt="A crowd's raised hands and phone lights against the stage light" sizes="100vw" wash="accent2" className="absolute! inset-0" imgClassName="brightness-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-(--a-bg) via-(--a-bg)/35 to-transparent" aria-hidden />
        <TornEdge flip />
        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-8 md:px-10 md:pb-12">
          <p className="mb-4 font-hand text-[clamp(1.1rem,1.8vw,1.5rem)] leading-none text-(--a-accent2)">Bring the face paint</p>
          <h2 className="grunge font-display text-[clamp(2.8rem,9vw,8.5rem)] font-black uppercase leading-[0.86] tracking-[-0.035em]">Catch him live</h2>
          <p className="mt-5 max-w-[52ch] text-[17px] text-(--a-ink)/80">Shows on the road, and sessions that only happen here. Sample dates for this demo.</p>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <h3 className="grunge mb-8 font-display text-[clamp(1.5rem,3vw,2.4rem)] font-black uppercase leading-none tracking-[-0.02em] text-(--a-muted)">Upcoming shows {YEAR}</h3>
        <ul>
          {artist.shows.map((s) => {
            const { day, month, weekday } = splitDate(s.date);
            return (
              <li
                key={s.date + s.city}
                className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-x-4 gap-y-1 border-b border-(--a-ink)/10 py-5 sm:grid-cols-[5rem_7.5rem_1fr_12rem] md:grid-cols-[6rem_9rem_1fr_14rem_12rem] md:gap-x-6 md:py-6"
              >
                <span className="grunge row-span-2 font-display text-[clamp(2rem,4vw,3.25rem)] font-black leading-none tabular-nums tracking-[-0.03em] sm:row-span-1">{day}</span>
                <span className="order-3 col-start-2 font-display text-[13px] font-extralight uppercase tracking-[0.04em] text-(--a-muted) sm:order-none sm:col-start-auto sm:text-[clamp(1rem,1.6vw,1.4rem)]">
                  {month} <span className="pl-2 sm:pl-4">{weekday}</span>
                </span>
                <span className="grunge min-w-0 font-display text-[clamp(1.15rem,2.6vw,2.1rem)] font-black uppercase leading-none tracking-[-0.02em]">{s.city}</span>
                <span className="hidden truncate text-[15px] text-(--a-muted) md:block">{s.venue}</span>
                <span className="row-span-2 flex flex-col items-end gap-2 sm:row-span-1">
                  {s.status === "Sold out" ? (
                    <span className="grunge -rotate-6 rounded-[3px] border-2 border-double border-(--a-accent) px-3 py-1.5 font-display text-[13px] font-black uppercase tracking-[0.12em] text-(--a-accent)">
                      Sold out
                    </span>
                  ) : s.status === "Member presale" ? (
                    <a
                      href="#membership"
                      className="distress whitespace-nowrap rounded-full border border-(--a-accent3) px-5 py-2.5 font-display text-[12px] font-extrabold uppercase tracking-[0.04em] text-(--a-accent3) hover:bg-(--a-accent3) hover:text-black"
                    >
                      Member presale
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => showToast("Tickets open with the promoter in the full build")}
                      className="distress rounded-full bg-(--a-ink) px-6 py-2.5 font-display text-[12px] font-extrabold uppercase tracking-[0.04em] text-(--a-bg) hover:bg-(--a-accent)"
                    >
                      Tickets
                    </button>
                  )}
                  {s.status === "Few left" ? (
                    <span className="flex items-center gap-1.5 font-hand text-[14px] leading-none text-(--a-accent)">
                      <span className="neon pulse h-1.5 w-1.5 rounded-full bg-(--a-accent)" aria-hidden />
                      Few left
                    </span>
                  ) : null}
                </span>
              </li>
            );
          })}
        </ul>

      <div className="mt-20 md:mt-28">
          <h3 className="grunge mb-8 flex items-center gap-3 font-display text-[clamp(1.5rem,3vw,2.4rem)] font-black uppercase leading-none tracking-[-0.02em] text-(--a-muted)">
            <Broadcast size={28} className="text-(--a-accent2)" aria-hidden /> Only on Groupies
          </h3>
          <ul className="grid gap-4 md:grid-cols-3">
            {artist.sessions.map((s) => {
              const n = taken[s.id];
              const left = s.capacity - n;
              const isReserved = reserved.includes(s.id);
              return (
                <li key={s.id} className="relative flex flex-col rounded-md border border-(--a-ink)/10 bg-(--a-surface) p-6 md:p-8">
                  <Corners size={28} className={s.membersOnly ? "text-(--a-accent3)/40" : "text-(--a-ink)/20"} />
                  <div className={`flex items-center gap-2 text-[14px] ${s.membersOnly ? "text-(--a-accent3)" : "text-(--a-muted)"}`}>
                    {s.format === "Video" ? <VideoCamera size={16} aria-hidden /> : <Microphone size={16} aria-hidden />}
                    {s.format} session{s.membersOnly ? ", members only" : ""}
                  </div>
                  <h4 className="mt-3 font-display text-[19px] font-extrabold uppercase leading-[1.1] tracking-[-0.01em]">{s.title}</h4>
                  <p className="mt-2 text-[16px] text-(--a-ink)/85">{s.when}</p>
                  <div className="mt-auto pt-5" aria-hidden>
                    <div className="h-[3px] rounded-full bg-(--a-ink)/10">
                    <div className="neon h-full rounded-full bg-(--a-accent2) text-(--a-accent2)" style={{ width: `${(n / s.capacity) * 100}%` }} />
                    </div>
                  </div>
                  <p className="mt-2 text-[14px] text-(--a-muted)">
                    {left.toLocaleString("en-IN")} of {s.capacity.toLocaleString("en-IN")} spots left
                  </p>
                  <div className="mt-5">
                    {isReserved ? (
                      <p className="flex items-center gap-2 font-hand text-[17px] text-(--a-accent2)">
                        <Check size={16} weight="bold" /> You&apos;re in
                      </p>
                    ) : s.membersOnly ? (
                      <a href="#membership" className={btn.secondary}>
                        Join Inner Circle to reserve
                      </a>
                    ) : reserving === s.id ? (
                      <form onSubmit={(e) => reserve(e, s.id)} className="flex flex-col gap-3">
                        <label htmlFor={`rsv-${s.id}`} className="sr-only">
                          Email
                        </label>
                        <input
                          id={`rsv-${s.id}`}
                          type="email"
                          required
                          autoFocus
                          placeholder="you@example.com"
                          className={field}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type="submit" className={`${btn.primary} shrink-0`}>
                          Reserve my spot
                        </button>
                      </form>
                    ) : (
                      <button type="button" className={btn.primary} onClick={() => setReserving(s.id)}>
                        Reserve my spot
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

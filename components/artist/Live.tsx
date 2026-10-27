"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Broadcast, Check, Microphone, VideoCamera } from "@phosphor-icons/react";
import { btn, field } from "./ui";
import { useWorld } from "./state";

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
    <section id="live" className="scroll-mt-20 border-t border-(--a-ink)/10">
      <div className="relative h-[62vh] min-h-[420px] overflow-hidden">
        <Image src={artist.images.crowd} alt="A crowd's raised hands and phone lights against gold stage light" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-(--a-bg) via-(--a-bg)/30 to-transparent" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-5 pb-8 md:px-10 md:pb-12">
          <p className="mb-3 font-hand text-[clamp(1.5rem,2.5vw,2.25rem)] text-(--a-accent) [transform:rotate(-2deg)]">bring the face paint</p>
          <h2 className="font-stencil text-[clamp(4rem,13vw,12rem)] font-black uppercase leading-[0.82]">Catch him live</h2>
          <p className="mt-4 max-w-[52ch] text-[17px] text-(--a-ink)/80">Shows on the road, and sessions that only happen here. Sample dates for this demo.</p>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">

      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h3 className="mb-4 text-[15px] text-(--a-muted)">On the road, 2026</h3>
          <ul className="border-t border-(--a-ink)/10">
            {artist.shows.map((s) => (
              <li key={s.date + s.city} className="grid grid-cols-[6rem_1fr_auto] items-center gap-4 border-b border-(--a-ink)/10 py-4">
                <span className="font-stencil text-[34px] font-black leading-none tabular-nums text-(--a-accent)">{s.date}</span>
                <span className="min-w-0">
                  <span className="block font-stencil text-[34px] font-extrabold uppercase leading-none">{s.city}</span>
                  <span className="block truncate text-[14px] text-(--a-muted)">{s.venue}</span>
                </span>
                {s.status === "Sold out" ? (
                  <span className="text-[14px] text-(--a-muted)">Sold out</span>
                ) : s.status === "Member presale" ? (
                  <a href="#membership" className="rounded-full border border-(--a-accent)/60 px-3.5 py-2 text-[14px] font-semibold text-(--a-accent) hover:border-(--a-accent)">
                    Member presale
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => showToast("Tickets open with the promoter in the full build")}
                    className="rounded-full bg-(--a-ink) px-3.5 py-2 text-[14px] font-semibold text-(--a-bg) hover:bg-(--a-accent)"
                  >
                    {s.status === "Few left" ? "Few left" : "Tickets"}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6">
          <h3 className="mb-4 flex items-center gap-2 text-[15px] text-(--a-muted)">
            <Broadcast size={16} aria-hidden /> Only on Groupies
          </h3>
          <ul className="space-y-4">
            {artist.sessions.map((s) => {
              const n = taken[s.id];
              const left = s.capacity - n;
              const isReserved = reserved.includes(s.id);
              return (
                <li key={s.id} className="rounded-md bg-(--a-surface) p-5 md:p-6">
                  <div className="flex items-center gap-2 text-[14px] text-(--a-muted)">
                    {s.format === "Video" ? <VideoCamera size={16} aria-hidden /> : <Microphone size={16} aria-hidden />}
                    {s.format} session{s.membersOnly ? ", members only" : ""}
                  </div>
                  <h4 className="mt-2 font-display text-[28px] font-bold leading-[1.02]">{s.title}</h4>
                  <p className="mt-1 text-[16px]">{s.when}</p>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-(--a-ink)/10" aria-hidden>
                    <div className="h-full rounded-full bg-(--a-accent)" style={{ width: `${(n / s.capacity) * 100}%` }} />
                  </div>
                  <p className="mt-2 text-[14px] text-(--a-muted)">
                    {left.toLocaleString("en-IN")} of {s.capacity.toLocaleString("en-IN")} spots left
                  </p>
                  <div className="mt-5">
                    {isReserved ? (
                      <p className="flex items-center gap-2 text-[15px] font-semibold text-(--a-accent)">
                        <Check size={16} weight="bold" /> You&apos;re in
                      </p>
                    ) : s.membersOnly ? (
                      <a href="#membership" className={btn.secondary}>
                        Join Inner Circle to reserve
                      </a>
                    ) : reserving === s.id ? (
                      <form onSubmit={(e) => reserve(e, s.id)} className="flex flex-col gap-3 sm:flex-row">
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
      </div>
    </section>
  );
}

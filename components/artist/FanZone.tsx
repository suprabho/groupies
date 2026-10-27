"use client";

import { useState, type FormEvent } from "react";
import { Check } from "@phosphor-icons/react";
import { Section, SectionHeading, btn, field, label } from "./ui";
import { useWorld } from "./state";
import { RoseWindow } from "./Goth";
import type { FanNote } from "@/content/artists/types";

const REQUESTS = [
  { id: "dedication", name: "Song dedication", detail: "He dedicates a song to someone at a show or live session.", price: 499 },
  { id: "voice", name: "Voice note", detail: "A personal voice note, up to one minute.", price: 999 },
  { id: "shoutout", name: "Video shoutout", detail: "A short video for a birthday, a wedding or a bad week.", price: 1999 },
  { id: "question", name: "Question for the radio show", detail: "Picked questions get answered on Misfit Radio.", price: 0 },
];

const LIMIT = 280;

export default function FanZone() {
  const { artist, money, openCheckout } = useWorld();
  const [mode, setMode] = useState<"message" | "request">("message");
  const [wall, setWall] = useState<FanNote[]>(artist.fanNotes);

  // message form
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  // request form
  const [type, setType] = useState(REQUESTS[0].id);
  const [gift, setGift] = useState(false);
  const [forWho, setForWho] = useState("");
  const [details, setDetails] = useState("");
  const [asked, setAsked] = useState(false);
  const req = REQUESTS.find((r) => r.id === type)!;

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    setWall((w) => [{ name: name.trim() || "A misfit", city: city.trim() || "Somewhere", text: msg.trim() }, ...w]);
    setSent(true);
    setMsg("");
  };

  const sendRequest = (e: FormEvent) => {
    e.preventDefault();
    if (req.price === 0) {
      setAsked(true);
      return;
    }
    openCheckout({
      title: `Request a ${req.name.toLowerCase()}`,
      lines: [{ label: `${req.name}${gift && forWho ? ` for ${forWho}` : ""}`, price: req.price }],
      success: `Request sent. You'll get an email when ${artist.name}'s team schedules it, usually within two weeks.`,
      onDone: () => {
        setDetails("");
        setForWho("");
      },
    });
  };

  return (
    <Section id="fan-zone">
      <SectionHeading title="Say something" note="He reads these" noteTone="accent2">
        Every message goes to {artist.name} and his team, not a comment section. Requests are paid and limited each month.
      </SectionHeading>

      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div role="radiogroup" aria-label="What do you want to send?" className="mb-8 inline-flex rounded-full border border-(--a-ink)/20 p-1">
            {(["message", "request"] as const).map((m) => (
              <button
                key={m}
                role="radio"
                aria-checked={mode === m}
                type="button"
                onClick={() => setMode(m)}
                className={`rounded-full px-5 py-2.5 font-display text-[12px] font-extrabold uppercase tracking-[0.06em] ${mode === m ? "bg-(--a-ink) text-(--a-bg)" : "text-(--a-muted) hover:text-(--a-ink)"}`}
              >
                {m === "message" ? "Send a message" : "Make a request"}
              </button>
            ))}
          </div>

          {mode === "message" ? (
            <form onSubmit={sendMessage} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="fz-name" className={label}>
                    Your name
                  </label>
                  <input id="fz-name" className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" />
                </div>
                <div>
                  <label htmlFor="fz-city" className={label}>
                    City
                  </label>
                  <input id="fz-city" className={field} value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
              </div>
              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor="fz-msg" className={label}>
                    Message
                  </label>
                  <span className={`text-[13px] tabular-nums ${msg.length > LIMIT - 20 ? "text-(--a-accent)" : "text-(--a-muted)"}`}>
                    {LIMIT - msg.length} left
                  </span>
                </div>
                <textarea
                  id="fz-msg"
                  required
                  rows={5}
                  maxLength={LIMIT}
                  className={`${field} resize-none`}
                  value={msg}
                  onChange={(e) => {
                    setMsg(e.target.value);
                    setSent(false);
                  }}
                  placeholder="Which song found you first?"
                />
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <button type="submit" className={btn.primary} disabled={!msg.trim()}>
                  Send message
                </button>
                {sent && (
                  <p role="status" className="flex items-center gap-2 text-[15px] text-(--a-accent2)">
                    <Check size={16} weight="bold" /> Message sent. It&apos;s on the wall too.
                  </p>
                )}
              </div>
            </form>
          ) : (
            <form onSubmit={sendRequest} className="space-y-6">
              <fieldset>
                <legend className={label}>What would you like?</legend>
                <div className="mt-1 grid gap-3 sm:grid-cols-2">
                  {REQUESTS.map((r) => (
                    <label
                      key={r.id}
                      className={`cursor-pointer rounded-md border p-4 transition-colors ${
                        type === r.id ? "border-(--a-accent2) bg-(--a-surface)" : "border-(--a-ink)/15 hover:border-(--a-ink)/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="req-type"
                        value={r.id}
                        checked={type === r.id}
                        onChange={() => {
                          setType(r.id);
                          setAsked(false);
                        }}
                        className="sr-only"
                      />
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-[14px] font-extrabold uppercase tracking-[-0.005em]">{r.name}</span>
                        <span className="text-[15px] tabular-nums">{money(r.price)}</span>
                      </span>
                      <span className="mt-1 block text-[14px] leading-snug text-(--a-muted)">{r.detail}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {req.price > 0 && (
                <div>
                  <label className="flex cursor-pointer items-center gap-3 text-[16px]">
                    <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} className="peer sr-only" />
                    <span className="relative h-6 w-11 rounded-full bg-(--a-ink)/20 transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-(--a-ink) after:transition-transform peer-checked:bg-(--a-accent2) peer-checked:after:translate-x-5 peer-focus-visible:outline-2 peer-focus-visible:outline-(--a-accent3)" />
                    It&apos;s a gift for someone
                  </label>
                  {gift && (
                    <div className="mt-4">
                      <label htmlFor="fz-for" className={label}>
                        Who is it for?
                      </label>
                      <input id="fz-for" className={field} value={forWho} onChange={(e) => setForWho(e.target.value)} required />
                    </div>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="fz-details" className={label}>
                  {req.price === 0 ? "Your question" : "Tell him what it's for"}
                </label>
                <textarea
                  id="fz-details"
                  rows={4}
                  required
                  className={`${field} resize-none`}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder={req.price === 0 ? "What's the oldest song still in the demo folder?" : "My sister's wedding is on 12 December and Khayaal is their song."}
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button type="submit" className={btn.primary} disabled={!details.trim()}>
                  {req.price === 0 ? "Send question" : `Request for ${money(req.price)}`}
                </button>
                {asked && (
                  <p role="status" className="flex items-center gap-2 text-[15px] text-(--a-accent2)">
                    <Check size={16} weight="bold" /> Question sent. Listen out on the next episode.
                  </p>
                )}
              </div>
            </form>
          )}
        </div>

        <div className="relative lg:col-span-5 lg:col-start-8">
          <RoseWindow className="absolute -right-24 -top-20 w-[520px] max-w-none text-(--a-ink)/[0.06]" />
          <h3 className="mb-5 font-hand text-[18px] text-(--a-muted)">From the fan wall</h3>
          <ul className="relative space-y-6" aria-live="polite">
            {wall.slice(0, 6).map((n, i) => (
              <li
                key={`${n.name}-${i}`}
                className="distress distress-under relative rounded-sm border border-(--a-ink)/10 bg-(--a-surface) p-5 pt-6"
                style={{ transform: `rotate(${[-0.8, 0.6, -0.4, 0.9, -0.6, 0.3][i % 6]}deg)` }}
              >
                <span className="tape" aria-hidden />
                <p className="font-display text-[18px] font-extralight leading-[1.4]">{n.text}</p>
                <p className="mt-3 font-hand text-[16px] text-(--a-accent2)">
                  {n.name}, {n.city}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { Check } from "@phosphor-icons/react";
import { Duotone, btn } from "./ui";
import { ArchFrame, Corners, RoseWindow } from "./Goth";
import { useWorld } from "./state";

export default function Membership() {
  const { artist, money, following, setFollowing, showToast, openCheckout } = useWorld();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    showToast("You're on the list. First letter lands before the album does.");
  };

  return (
    <section id="membership" className="scroll-mt-20 overflow-x-clip border-t border-(--a-ink)/10">
      {/* Mailing list, with the poster lit red beside it */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex min-w-0 flex-col justify-center px-5 py-20 md:px-10 md:py-28 lg:pl-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))]">
          <h2 className="grunge font-display text-[clamp(2.2rem,4.6vw,4.25rem)] font-black uppercase leading-[0.95] tracking-[-0.03em]">
            Join the
            <br />
            family of misfits
          </h2>
          <p className="mt-6 max-w-[44ch] text-[17px] leading-relaxed text-(--a-muted)">
            One letter a month from {artist.name}: new songs, show dates and presale codes before anyone else. Free.
          </p>
          <form onSubmit={subscribe} className="mt-10 max-w-lg">
            <label htmlFor="ml-email" className="mb-2 block pl-6 text-[14px] text-(--a-ink)/85">
              Enter your email address
            </label>
            <div className="flex items-center gap-2 rounded-full bg-(--a-ink)/12 p-2 pl-6 focus-within:ring-2 focus-within:ring-(--a-accent3)">
              <input
                id="ml-email"
                type="email"
                required
                autoComplete="email"
                placeholder="e.g. name@example.com"
                className="min-w-0 flex-1 bg-transparent py-2 text-[16px] text-(--a-ink) placeholder:text-(--a-ink)/45 focus:outline-none"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSubscribed(false);
                }}
              />
              <button type="submit" className="shrink-0 rounded-full bg-(--a-ink) px-5 py-2.5 font-display text-[12px] font-extrabold uppercase tracking-[0.04em] text-(--a-bg) hover:bg-(--a-accent)">
                Subscribe
              </button>
            </div>
            {subscribed ? (
              <p role="status" className="mt-3 flex items-center gap-2 pl-6 text-[15px] text-(--a-accent2)">
                <Check size={16} weight="bold" /> You&apos;re on the list.
              </p>
            ) : null}
          </form>
        </div>
        {/* A close-up through a pointed arch, like a chapel window lit red */}
        <div className="px-5 pb-16 md:px-10 md:py-16">
          <div className="relative mx-auto aspect-[3/4] max-w-[520px] text-(--a-accent)">
            <Duotone
              src={artist.images.closeUp ?? artist.images.faceArt}
              alt={artist.images.closeUp ? `${artist.name} in skull face paint, close up` : "A skull face-paint study in white paint on black paper"}
              sizes="(min-width: 768px) 40vw, 100vw"
              wash="accent"
              className="h-full [clip-path:url(#arch)]"
            />
            <ArchFrame className="drop-shadow-[0_0_8px_currentColor]" />
            <ArchFrame className="scale-[1.04] opacity-40" />
          </div>
        </div>
      </div>

      {/* Paid tiers */}
      <div className="relative mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <RoseWindow className="absolute left-1/2 top-1/2 w-[900px] max-w-none -translate-x-1/2 -translate-y-1/2 text-(--a-ink)/[0.05]" />
        <div className="relative mb-12 grid gap-4 md:grid-cols-12 md:items-end">
          <h3 className="grunge font-display text-[clamp(1.8rem,3.4vw,3rem)] font-black uppercase leading-[0.95] tracking-[-0.025em] md:col-span-7">Or get closer</h3>
          <p className="max-w-[46ch] text-[17px] leading-relaxed text-(--a-muted) md:col-span-5 md:justify-self-end">
            Pay {artist.name} directly, every month. Cancel whenever you like. Prices are samples for this demo.
          </p>
        </div>
        <ul className="relative grid gap-6 md:grid-cols-3">
          {artist.tiers.map((t) => (
            <li
              key={t.name}
              className={`relative flex flex-col rounded-md border bg-(--a-surface) p-7 md:p-10 ${
                t.highlight ? "border-(--a-accent3) shadow-[0_0_48px_-12px_var(--a-accent3)]" : "border-(--a-ink)/10"
              }`}
            >
              <Corners className={t.highlight ? "text-(--a-accent3)/70" : "text-(--a-ink)/25"} />
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="grunge font-display text-[clamp(1.4rem,2.2vw,1.85rem)] font-black uppercase leading-none tracking-[-0.02em]">{t.name}</h4>
                {t.limit ? <span className="shrink-0 font-hand text-[15px] text-(--a-accent)">{t.limit}</span> : null}
              </div>
              <p className="mt-3 font-display text-[18px] font-extralight text-(--a-ink)/80">{t.blurb}</p>
              {t.highlight ? <p className="mt-2 font-hand text-[16px] leading-none text-(--a-accent3)">Most misfits pick this one</p> : null}
              <p className="mt-8 font-display text-[44px] font-black leading-none tabular-nums tracking-[-0.03em]">
                {money(t.price)}
                {t.price > 0 ? <span className="ml-2 font-sans text-[15px] font-normal tracking-normal text-(--a-muted)">a month</span> : null}
              </p>
              <ul className="mt-7 flex-1 space-y-3 border-t border-(--a-ink)/10 pt-6">
                {t.perks.map((p) => (
                  <li key={p} className="flex gap-3 text-[16px] leading-snug">
                    <Check size={18} weight="bold" className={`mt-0.5 shrink-0 ${t.highlight ? "text-(--a-accent3)" : "text-(--a-ink)/50"}`} aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
              {t.price === 0 ? (
                <button
                  type="button"
                  className={`${btn.secondary} mt-8`}
                  onClick={() => {
                    setFollowing(true);
                    showToast(`You're following ${artist.name}`);
                  }}
                  disabled={following}
                >
                  {following ? "Following" : "Follow for free"}
                </button>
              ) : (
                <button
                  type="button"
                  className={`${t.highlight ? btn.primary : btn.secondary} mt-8`}
                  onClick={() =>
                    openCheckout({
                      title: `Join ${t.name}`,
                      lines: [{ label: `${t.name} membership, billed monthly`, price: t.price }],
                      recurring: true,
                      success: `Welcome to ${t.name}. Members-only posts, sessions and presales are unlocked.`,
                    })
                  }
                >
                  Join {t.name}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

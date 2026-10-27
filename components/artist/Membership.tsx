"use client";

import { Check } from "@phosphor-icons/react";
import { Section, SectionHeading, btn } from "./ui";
import { useWorld } from "./state";

export default function Membership() {
  const { artist, money, following, setFollowing, showToast, openCheckout } = useWorld();

  return (
    <Section id="membership">
      <SectionHeading title="Join the misfits">
        Pay {artist.name} directly, every month. Cancel whenever you like. Prices are samples for this demo.
      </SectionHeading>
      <ul className="grid gap-6 md:grid-cols-3">
        {artist.tiers.map((t) => (
          <li
            key={t.name}
            className={`flex flex-col rounded-md p-6 md:p-8 ${t.highlight ? "bg-(--a-ink) text-(--a-bg)" : "bg-(--a-surface)"}`}
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-stencil text-[44px] font-extrabold leading-none">{t.name}</h3>
              {t.limit ? <span className={`text-[14px] ${t.highlight ? "" : "text-(--a-accent)"}`}>{t.limit}</span> : null}
            </div>
            <p className={`mt-2 font-serif text-[22px] italic ${t.highlight ? "opacity-75" : "text-(--a-muted)"}`}>{t.blurb}</p>
            {t.highlight ? <p className="mt-1 font-hand text-[22px] leading-none text-(--a-accent2) [transform:rotate(-2deg)]">most misfits pick this one</p> : null}
            <p className="mt-6 font-display text-[48px] font-bold leading-none tabular-nums">
              {money(t.price)}
              {t.price > 0 ? <span className="ml-1 font-sans text-[16px] font-medium opacity-70">a month</span> : null}
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {t.perks.map((p) => (
                <li key={p} className="flex gap-3 text-[16px] leading-snug">
                  <Check size={18} weight="bold" className={`mt-0.5 shrink-0 ${t.highlight ? "text-(--a-accent2)" : "text-(--a-accent)"}`} aria-hidden />
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
                className={`mt-8 ${t.highlight ? "inline-flex items-center justify-center rounded-full bg-(--a-bg) px-5 py-3 text-[15px] font-semibold text-(--a-ink) hover:bg-(--a-accent2)" : btn.primary}`}
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
    </Section>
  );
}

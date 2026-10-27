"use client";

import { useState } from "react";
import Image from "next/image";
import { Section, SectionHeading, btn } from "./ui";
import { useWorld } from "./state";
import type { MerchItem } from "@/content/artists/types";

const FILTERS = ["Everything", "Music", "Lifestyle"] as const;

function Item({ item }: { item: MerchItem }) {
  const { money, addToCart } = useWorld();
  const [variant, setVariant] = useState<string | undefined>(item.variants?.[1]);
  const big = item.featured;

  return (
    <li className={`group flex flex-col ${big ? "sm:col-span-2 lg:row-span-2" : ""}`}>
      <div className={`relative overflow-hidden rounded-sm bg-(--a-surface) ${big ? "aspect-[4/3] lg:aspect-auto lg:flex-1" : "aspect-[4/3]"}`}>
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes={big ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className={`font-semibold leading-tight ${big ? "font-display text-[34px] font-extrabold" : "text-[17px]"}`}>{item.name}</h3>
          <p className={`mt-1 text-(--a-muted) ${big ? "max-w-[46ch] text-[16px]" : "text-[14px] leading-snug"}`}>{item.detail}</p>
        </div>
        <span className={`shrink-0 tabular-nums ${big ? "text-[22px] font-semibold" : "text-[16px]"}`}>{money(item.price)}</span>
      </div>
      {item.variants ? (
        <fieldset className="mt-3">
          <legend className="sr-only">Size</legend>
          <div className="flex gap-1.5">
            {item.variants.map((v) => (
              <label
                key={v}
                className={`grid h-9 min-w-9 cursor-pointer place-items-center rounded-full border px-2 text-[14px] ${
                  variant === v ? "border-(--a-ink) bg-(--a-ink) text-(--a-bg)" : "border-(--a-ink)/20 text-(--a-muted) hover:border-(--a-ink)/60"
                }`}
              >
                <input type="radio" name={`size-${item.id}`} value={v} checked={variant === v} onChange={() => setVariant(v)} className="sr-only" />
                {v}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}
      <button
        type="button"
        className={`${big ? btn.primary : btn.secondary} mt-4 self-start`}
        onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, variant, kind: "merch" })}
      >
        Add to bag
      </button>
    </li>
  );
}

export default function Merch() {
  const { artist } = useWorld();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Everything");
  const items = artist.merch.filter((m) => filter === "Everything" || m.category === filter);

  return (
    <Section id="merch">
      <SectionHeading title="Merch" note="signed, numbered, shipped from Mumbai">
        Records, clothes and a face paint kit for the Halloween shows. Ships worldwide.
      </SectionHeading>
      <div role="radiogroup" aria-label="Filter merch" className="mb-10 flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="radio"
            aria-checked={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-[15px] font-semibold ${
              filter === f ? "bg-(--a-ink) text-(--a-bg)" : "border border-(--a-ink)/20 text-(--a-muted) hover:text-(--a-ink)"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((m) => (
          <Item key={m.id} item={m} />
        ))}
      </ul>
    </Section>
  );
}

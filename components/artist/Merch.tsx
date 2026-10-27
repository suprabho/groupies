"use client";

import { useState } from "react";
import Image from "next/image";
import { Duotone, btn } from "./ui";
import { Cross, TornEdge } from "./Goth";
import { useWorld } from "./state";
import type { MerchItem } from "@/content/artists/types";

const FILTERS = ["Everything", "Music", "Lifestyle"] as const;

function Item({ item }: { item: MerchItem }) {
  const { money, addToCart } = useWorld();
  const [variant, setVariant] = useState<string | undefined>(item.variants?.[1]);
  const big = item.featured;

  return (
    <li className={`group flex flex-col ${big ? "sm:col-span-2 lg:row-span-2" : ""}`}>
      <div className={`distress relative overflow-hidden rounded-sm bg-(--a-surface) ${big ? "aspect-[4/3] lg:aspect-auto lg:flex-1" : "aspect-[4/3]"}`}>
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes={big ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
          className="object-cover transition duration-500 group-hover:scale-[1.03] [@media(hover:hover)]:grayscale [@media(hover:hover)]:contrast-125 [@media(hover:hover)]:group-hover:grayscale-0 [@media(hover:hover)]:group-hover:contrast-100"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className={`font-display uppercase leading-[1.05] tracking-[-0.01em] ${big ? "text-[clamp(1.5rem,2.6vw,2.2rem)] font-black" : "text-[15px] font-extrabold"}`}>{item.name}</h3>
          <p className={`mt-1 text-(--a-muted) ${big ? "max-w-[46ch] text-[16px]" : "text-[14px] leading-snug"}`}>{item.detail}</p>
        </div>
        <span className={`shrink-0 font-display tabular-nums ${big ? "text-[22px] font-extrabold" : "text-[15px] font-bold"}`}>{money(item.price)}</span>
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
  const banner = artist.images.stage ?? artist.images.crowd;
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Everything");
  const items = artist.merch.filter((m) => filter === "Everything" || m.category === filter);

  return (
    <section id="merch" className="scroll-mt-20">
      {/* Shop-window banner, lit blue */}
      <div className="relative grid min-h-[440px] place-items-center overflow-hidden px-5 py-20 text-center md:min-h-[520px]">
        <Duotone src={banner} alt="" sizes="100vw" wash="accent3" className="absolute! inset-0" imgClassName="object-[50%_40%]" />
        <div className="absolute inset-0 bg-(--a-bg)/30" aria-hidden />
        <TornEdge flip />
        <TornEdge />
        <div className="relative">
          <p className="mb-5 flex items-center justify-center gap-3 font-hand text-[clamp(1.05rem,1.6vw,1.35rem)] leading-none text-(--a-ink)/85">
            <Cross size={14} />
            Signed, numbered, shipped from Mumbai
            <Cross size={14} />
          </p>
          <h2 className="grunge font-display text-[clamp(2.4rem,6.5vw,5.75rem)] font-black uppercase leading-[0.95] tracking-[-0.03em]">
            Official
            <br />
            merchandise
          </h2>
          <a href="#merch-shop" className={`${btn.primary} mt-8 min-w-56`}>
            Shop now
          </a>
        </div>
      </div>

      <div id="merch-shop" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 py-20 md:px-10 md:py-24">
        <p className="mb-8 max-w-[52ch] text-[17px] leading-relaxed text-(--a-muted)">
          Records, clothes and a face paint kit for the Halloween shows. Ships worldwide.
        </p>
      <div role="radiogroup" aria-label="Filter merch" className="mb-10 flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="radio"
            aria-checked={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-5 py-2.5 font-display text-[12px] font-extrabold uppercase tracking-[0.06em] ${
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
      </div>
    </section>
  );
}

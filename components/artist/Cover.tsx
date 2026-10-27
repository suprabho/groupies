"use client";

import Image from "next/image";
import { useWorld } from "./state";

/**
 * Album cover: a photographed base (phulkari cloth + a swipe of face paint)
 * with the typography set live on top, so it stays sharp at any size.
 */
export default function Cover({ sizes = "(min-width: 1024px) 40vw, 100vw", priority = false, className = "" }: { sizes?: string; priority?: boolean; className?: string }) {
  const { artist } = useWorld();
  const { album, images } = artist;
  return (
    <div className={`@container relative aspect-square overflow-hidden bg-[#0f0c0a] ${className}`}>
      <Image src={images.cover} alt={`${album.title} album artwork`} fill sizes={sizes} priority={priority} className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/40" aria-hidden />
      <span className="absolute left-[6%] top-[5%] font-stencil text-[7cqw] font-bold uppercase leading-none tracking-[0.08em] text-(--a-ink)/90">
        {artist.name}
      </span>
      {album.titleLocal ? (
        <span lang="pa" className="absolute right-[6%] top-[3%] font-pa text-[9cqw] font-extrabold leading-none text-(--a-accent)">
          {album.titleLocal}
        </span>
      ) : null}
      <span className="absolute bottom-[1%] left-[4%] font-display text-[30cqw] font-black uppercase leading-[0.78] tracking-[-0.02em] text-(--a-ink)">
        {album.title}
      </span>
    </div>
  );
}

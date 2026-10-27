"use client";

import Image from "next/image";
import { useWorld } from "./state";

/**
 * Album cover: a photographed base (phulkari cloth + a swipe of face paint), pushed to
 * black and white, with the typography set live on top so it stays sharp at any size.
 */
export default function Cover({ sizes = "(min-width: 1024px) 40vw, 100vw", priority = false, className = "" }: { sizes?: string; priority?: boolean; className?: string }) {
  const { artist } = useWorld();
  const { album, images } = artist;
  return (
    <div className={`@container relative aspect-square overflow-hidden bg-black ${className}`}>
      <Image src={images.cover} alt={`${album.title} album artwork`} fill sizes={sizes} priority={priority} className="object-cover grayscale contrast-125 brightness-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/50" aria-hidden />
      <span className="absolute left-[6%] top-[6%] font-display text-[5cqw] font-black uppercase leading-none tracking-[0.02em] text-(--a-ink)/90">
        {artist.name}
      </span>
      {album.titleLocal ? (
        <span lang="pa" className="absolute right-[6%] top-[3%] font-pa text-[9cqw] font-extrabold leading-none text-(--a-accent)">
          {album.titleLocal}
        </span>
      ) : null}
      <span className="absolute bottom-[4%] left-[5%] font-display text-[19cqw] font-black uppercase leading-[0.8] tracking-[-0.04em] text-(--a-ink)">
        {album.title}
      </span>
    </div>
  );
}

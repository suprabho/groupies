"use client";

import type { CSSProperties } from "react";
import type { Artist } from "@/content/artists/types";
import { WorldProvider } from "./state";
import TopBar from "./TopBar";
import Hero from "./Hero";
import SectionNav from "./SectionNav";
import Marquee from "./Marquee";
import Album from "./Album";
import Diary from "./Diary";
import FanZone from "./FanZone";
import Live from "./Live";
import Merch from "./Merch";
import Membership from "./Membership";
import ArtistFooter from "./ArtistFooter";
import CartDrawer from "./CartDrawer";
import Checkout from "./Checkout";
import Toast from "./Toast";

export default function ArtistWorld({ artist, fontClass }: { artist: Artist; fontClass: string }) {
  const t = artist.theme;
  const vars = {
    "--a-bg": t.bg,
    "--a-surface": t.surface,
    "--a-ink": t.ink,
    "--a-muted": t.muted,
    "--a-accent": t.accent,
    "--a-accent2": t.accent2,
  } as CSSProperties;

  return (
    <WorldProvider artist={artist}>
      <div style={vars} className={`artist-world ${fontClass} min-h-screen w-full bg-(--a-bg) text-(--a-ink)`}>
        <TopBar />
        <Hero />
        <Marquee />
        <SectionNav />
        <main>
          <Album />
          <Diary />
          <FanZone />
          <Live />
          <Merch />
          <Membership />
        </main>
        <ArtistFooter />
        <CartDrawer />
        <Checkout />
        <Toast />
      </div>
    </WorldProvider>
  );
}

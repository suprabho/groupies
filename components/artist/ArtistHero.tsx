"use client";

import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Users,
  ShareNetwork,
  Heart,
  MusicNote,
  Camera,
  ChatCircle,
  ShoppingBag,
} from "@phosphor-icons/react";

interface ArtistHeroProps {
  artist: {
    name: string;
    genre: string[];
    bio: string;
    followers: number;
    location: string;
    avatar: string;
    banner: string;
  };
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatFollowers(count: number): string {
  return count.toLocaleString("en-US");
}

const navItems = [
  { label: "Music", href: "#music", icon: MusicNote },
  { label: "Behind the Scenes", href: "#behind-the-scenes", icon: Camera },
  { label: "Fan Zone", href: "#fan-zone", icon: ChatCircle },
  { label: "Merch", href: "#merch", icon: ShoppingBag },
];

export default function ArtistHero({ artist }: ArtistHeroProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px" }
    );

    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full">
      {/* Hero Banner */}
      <div className="relative w-full min-h-[520px] overflow-hidden">
        {/* Gradient placeholder for banner image */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #111111 0%, #1e1e1e 30%, #0a0a0a 60%, #161616 80%, #111111 100%)",
          }}
        />
        {/* Accent color streaks */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, #e8ff47 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, #ff4d4d 0%, transparent 40%)",
          }}
        />
        {/* Bottom gradient fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.8) 30%, transparent 60%)",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-end h-full min-h-[520px] px-6 pb-10 max-w-6xl mx-auto">
          <div className="flex items-end gap-6 mb-6">
            {/* Avatar placeholder */}
            <div className="w-28 h-28 rounded-full bg-[#e8ff47] flex items-center justify-center shrink-0 border-4 border-[#0a0a0a]">
              <span className="text-[#0a0a0a] text-3xl font-black tracking-tight">
                {getInitials(artist.name)}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {/* Artist Name */}
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-[#f5f5f0] leading-none">
                {artist.name}
              </h1>

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2 mt-1">
                {artist.genre.map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#2a2a2a] text-[#999999] border border-[#2a2a2a]"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-[#999999] text-base md:text-lg max-w-2xl leading-relaxed mb-4">
            {artist.bio}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-[#666666]">
            <span className="flex items-center gap-1.5">
              <Users size={16} weight="bold" className="text-[#999999]" />
              <span className="text-[#f5f5f0] font-semibold">
                {formatFollowers(artist.followers)}
              </span>{" "}
              followers
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={16} weight="bold" className="text-[#999999]" />
              {artist.location}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                isFollowing
                  ? "bg-[#c8de30] text-[#0a0a0a]"
                  : "bg-[#e8ff47] text-[#0a0a0a] hover:bg-[#c8de30]"
              }`}
            >
              <Heart
                size={18}
                weight={isFollowing ? "fill" : "bold"}
              />
              {isFollowing ? "Following" : "Follow"}
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider border border-[#2a2a2a] text-[#f5f5f0] hover:border-[#999999] transition-all duration-200 cursor-pointer">
              <ShareNetwork size={18} weight="bold" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Sentinel for sticky detection */}
      <div ref={navRef} className="h-0 w-full" />

      {/* Sticky Navigation Bar */}
      <nav
        className={`w-full bg-[#111111] border-t border-b border-[#2a2a2a] z-50 transition-shadow duration-200 ${
          isSticky ? "fixed top-0 left-0 shadow-lg shadow-black/50" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {navItems.map(({ label, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-2 px-4 py-4 text-sm font-semibold uppercase tracking-wider text-[#666666] hover:text-[#e8ff47] whitespace-nowrap transition-colors duration-200 border-b-2 border-transparent hover:border-[#e8ff47]"
              >
                <Icon size={18} weight="bold" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Spacer when nav is fixed to prevent layout shift */}
      {isSticky && <div className="h-[57px]" />}
    </section>
  );
}

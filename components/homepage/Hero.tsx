"use client";

import Link from "next/link";
import { ArrowRight, MusicNote } from "@phosphor-icons/react";

const MARQUEE_WORDS = [
  "MUSIC", "•", "ARTISTS", "•", "FANS", "•", "CURATORS", "•",
  "CULTURE", "•", "COMMUNITY", "•", "MUSIC", "•", "ARTISTS", "•",
  "FANS", "•", "CURATORS", "•", "CULTURE", "•", "COMMUNITY", "•",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#0a0a0a]">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f5f5f0 1px, transparent 1px),
            linear-gradient(to bottom, #f5f5f0 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Acid glow blob */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #e8ff47 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Coral glow blob */}
      <div
        className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-8 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #ff4d4d 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Spacer for navbar */}
      <div className="h-16" />

      {/* Main hero content */}
      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 w-full">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2 px-3 py-1.5 border border-[#e8ff47]/30 bg-[#e8ff47]/5">
            <MusicNote size={14} weight="fill" className="text-[#e8ff47]" />
            <span className="text-xs font-black uppercase tracking-widest text-[#e8ff47]">
              Pilot Launch — 10 Artist Spots Available
            </span>
          </div>
        </div>

        {/* Display headline */}
        <h1 className="font-black uppercase tracking-tight leading-none mb-6"
          style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", lineHeight: "0.93", letterSpacing: "-0.03em" }}
        >
          <span className="block text-[#f5f5f0]">Your</span>
          <span className="block text-[#f5f5f0]">
            Music.{" "}
            <span
              className="text-[#0a0a0a]"
              style={{
                WebkitTextStroke: "2px #e8ff47",
              }}
            >
              Your
            </span>
          </span>
          <span className="block text-[#e8ff47]">Fans.</span>
          <span className="block text-[#f5f5f0]">Your Rules.</span>
        </h1>

        {/* Sub + CTAs side by side on desktop */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16 mt-4">
          <p className="max-w-lg text-[#999999] font-medium leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
          >
            Groupies is the music platform that puts humans first — artists sell
            directly to fans, curators earn from their taste, and algorithms
            stay out of it.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 lg:mb-0">
            <Link
              href="#join"
              className="group inline-flex items-center gap-2 px-6 py-4 bg-[#e8ff47] text-[#0a0a0a] font-black text-sm uppercase tracking-wider hover:bg-[#f5f5f0] transition-colors duration-200"
            >
              Join as Artist
              <ArrowRight
                size={16}
                weight="bold"
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
            <Link
              href="/artist/demo"
              className="inline-flex items-center gap-2 px-6 py-4 border border-[#2a2a2a] text-[#f5f5f0] font-bold text-sm uppercase tracking-wider hover:border-[#f5f5f0] transition-colors duration-200"
            >
              See Demo Page
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap items-center gap-8 lg:gap-12 mt-16 pt-12 border-t border-[#1e1e1e]">
          {[
            { value: "0%", label: "Commission for established artists" },
            { value: "100%", label: "Of content stays on your terms" },
            { value: "10", label: "Founding artist spots" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span
                className="font-black text-[#e8ff47] leading-none"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}
              >
                {stat.value}
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#666666]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling marquee strip */}
      <div className="border-t border-b border-[#2a2a2a] py-3 overflow-hidden bg-[#111111]">
        <div className="marquee-track">
          {MARQUEE_WORDS.map((word, i) => (
            <span
              key={i}
              className={`inline-block px-4 text-sm font-black uppercase tracking-widest ${
                word === "•" ? "text-[#e8ff47]" : "text-[#444444]"
              }`}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

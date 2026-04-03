"use client";

import { useState } from "react";
import {
  Microphone,
  PlayCircle,
  Storefront,
  MagnifyingGlass,
  Playlist,
  CurrencyDollar,
  HeartStraight,
  Lock,
  ChatCircle,
} from "@phosphor-icons/react";

const tabs = [
  {
    id: "artist",
    label: "Artist",
    emoji: "🎤",
    headline: "Release music. Build community. Get paid.",
    steps: [
      {
        icon: Microphone,
        title: "Release exclusive music",
        desc: "Upload your album or individual tracks. Set your own price. Your music stays exclusive to Groupies — fans can't get it anywhere else.",
      },
      {
        icon: PlayCircle,
        title: "Publish your world",
        desc: "Behind-the-scenes blogs, vlogs, podcasts, and live sessions. Give fans a reason to stay and come back. Build a community, not just a following.",
      },
      {
        icon: Storefront,
        title: "Run your merch store",
        desc: "Sell vinyls, CDs, tees, and anything else directly. No middleman. Your fans, your revenue.",
      },
    ],
  },
  {
    id: "curator",
    label: "Curator",
    emoji: "🎧",
    headline: "Your taste is worth something. Finally.",
    steps: [
      {
        icon: MagnifyingGlass,
        title: "Discover and champion artists",
        desc: "Build curated playlists with editorial context. Write the liner notes that algorithms never could. Your voice matters here.",
      },
      {
        icon: Playlist,
        title: "Build your audience",
        desc: "Fans who trust your ear subscribe to your curation. Grow a loyal following of music lovers who value what you recommend.",
      },
      {
        icon: CurrencyDollar,
        title: "Earn from your curation",
        desc: "Monetise your playlists directly. The critics and tastemakers who built music culture finally get paid for their work.",
      },
    ],
  },
  {
    id: "fan",
    label: "Fan",
    emoji: "🎶",
    headline: "Get closer to the music you love.",
    steps: [
      {
        icon: Lock,
        title: "Access exclusive content",
        desc: "Music that's only available here. The full album, the demos, the session recordings — everything the artist chooses to share.",
      },
      {
        icon: HeartStraight,
        title: "Follow the artist's world",
        desc: "Read their blog. Watch their vlogs. Listen to their podcast. Go behind the scenes of the music you love.",
      },
      {
        icon: ChatCircle,
        title: "Connect directly",
        desc: "Send messages, make requests, sign up for live sessions, and buy merch directly from the artist. Real connection, not an algorithm.",
      },
    ],
  },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState("artist");
  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <section id="how-it-works" className="bg-[#111111] py-24 lg:py-36 border-t border-b border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-[#e8ff47] mb-4 block">
            How It Works
          </span>
          <h2
            className="font-black uppercase tracking-tight text-[#f5f5f0] leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", letterSpacing: "-0.03em" }}
          >
            Built for
            <br />
            <span style={{ WebkitTextStroke: "2px #f5f5f0", color: "transparent" }}>
              every human
            </span>
            <br />
            in music.
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-12 border border-[#2a2a2a] w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-black uppercase tracking-wider transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-[#e8ff47] text-[#0a0a0a]"
                  : "bg-transparent text-[#666666] hover:text-[#f5f5f0] hover:bg-[#1e1e1e]"
              }`}
            >
              <span className="mr-2">{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Headline column */}
          <div className="lg:col-span-1 pr-0 lg:pr-12 mb-10 lg:mb-0 flex flex-col justify-between">
            <h3
              className="font-black uppercase tracking-tight text-[#f5f5f0] leading-tight"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", letterSpacing: "-0.02em" }}
            >
              {current.headline}
            </h3>
          </div>

          {/* Steps */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#2a2a2a]">
            {current.steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className={`p-8 flex flex-col gap-5 ${
                    i < 2 ? "border-b md:border-b-0 md:border-r border-[#2a2a2a]" : ""
                  }`}
                >
                  <div className="w-10 h-10 border border-[#e8ff47]/30 flex items-center justify-center">
                    <Icon size={20} weight="bold" className="text-[#e8ff47]" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-wide text-[#f5f5f0] mb-2">
                      {step.title}
                    </h4>
                    <p className="text-[#666666] text-sm leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-[#1e1e1e]">
                    <span className="text-xs font-black text-[#2a2a2a]">0{i + 1}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Microphone, Play, Pause, User } from "@phosphor-icons/react";

interface Podcast {
  id: string;
  title: string;
  guest: string | null;
  duration: string;
  date: string;
  description: string;
}

interface PodcastSectionProps {
  podcasts: Podcast[];
}

export default function PodcastSection({ podcasts }: PodcastSectionProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section className="py-12">
      {/* Section heading */}
      <div className="flex items-center gap-3 mb-8">
        <Microphone size={24} weight="fill" className="text-[#e8ff47]" />
        <h2 className="text-2xl font-bold text-[#f5f5f0]">Podcast</h2>
      </div>

      {/* Episode list */}
      <div className="flex flex-col gap-4">
        {podcasts.map((podcast, index) => {
          const isPlaying = playingId === podcast.id;
          const episodeNumber = index + 1;

          return (
            <div
              key={podcast.id}
              className={`rounded-xl border bg-[#161616] p-5 transition-all duration-300 ${
                isPlaying
                  ? "border-[#e8ff47]/40"
                  : "border-[#2a2a2a] hover:border-[#2a2a2a]/80"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Play button */}
                <button
                  onClick={() =>
                    setPlayingId(isPlaying ? null : podcast.id)
                  }
                  className={`mt-0.5 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isPlaying
                      ? "bg-[#e8ff47] text-[#0a0a0a] animate-pulse"
                      : "bg-[#1e1e1e] text-[#f5f5f0] hover:bg-[#e8ff47]/20 hover:text-[#e8ff47]"
                  }`}
                >
                  {isPlaying ? (
                    <Pause size={18} weight="fill" />
                  ) : (
                    <Play size={18} weight="fill" className="ml-0.5" />
                  )}
                </button>

                {/* Episode info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-mono text-[#666666]">
                      EP {String(episodeNumber).padStart(2, "0")}
                    </span>

                    {podcast.guest && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1e1e1e] border border-[#2a2a2a] text-xs text-[#999999]">
                        <User size={10} weight="fill" />
                        {podcast.guest}
                      </span>
                    )}
                  </div>

                  <h3
                    className={`text-base font-semibold mb-1.5 transition-colors ${
                      isPlaying ? "text-[#e8ff47]" : "text-[#f5f5f0]"
                    }`}
                  >
                    {podcast.title}
                  </h3>

                  <p className="text-sm text-[#666666] leading-relaxed mb-3">
                    {podcast.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-[#666666]">
                    <span>{podcast.duration}</span>
                    <span className="w-1 h-1 rounded-full bg-[#666666]" />
                    <span>{podcast.date}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

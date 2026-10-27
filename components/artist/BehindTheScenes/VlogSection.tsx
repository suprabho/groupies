"use client";

import { VideoCamera, Play } from "@phosphor-icons/react";

interface Vlog {
  id: string;
  title: string;
  duration: string;
  date: string;
  thumbnail: string;
  videoUrl: string;
}

interface VlogSectionProps {
  vlogs: Vlog[];
}

export default function VlogSection({ vlogs }: VlogSectionProps) {
  return (
    <section className="py-12">
      {/* Section heading */}
      <div className="flex items-center gap-3 mb-8">
        <VideoCamera size={24} weight="fill" className="text-[#e8ff47]" />
        <h2 className="text-2xl font-bold text-[#f5f5f0]">Vlogs</h2>
      </div>

      {/* Vlog grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vlogs.map((vlog) => (
          <a
            key={vlog.id}
            href={vlog.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-[#2a2a2a] bg-[#161616] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#e8ff47]/30"
          >
            {/* Thumbnail placeholder */}
            <div className="relative aspect-video overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #111111 0%, #1e1e1e 40%, #2a2a2a 70%, #111111 100%)",
                }}
              />

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#e8ff47]/10 border-2 border-[#e8ff47]/40 flex items-center justify-center transition-all duration-300 group-hover:bg-[#e8ff47]/20 group-hover:border-[#e8ff47]/70 group-hover:scale-110">
                  <Play
                    size={28}
                    weight="fill"
                    className="text-[#e8ff47] ml-1"
                  />
                </div>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-[#0a0a0a]/80 text-xs font-medium text-[#f5f5f0]">
                {vlog.duration}
              </div>
            </div>

            {/* Card body */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-[#f5f5f0] mb-2 group-hover:text-[#e8ff47] transition-colors">
                {vlog.title}
              </h3>
              <span className="text-xs text-[#666666]">{vlog.date}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

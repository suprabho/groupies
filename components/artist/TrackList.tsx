"use client";

import { Play, Pause, Lock, MusicNote } from "@phosphor-icons/react";

interface Track {
  id: number;
  title: string;
  duration: string;
  preview: boolean;
}

interface TrackListProps {
  tracks: Track[];
  currentTrack: number | null;
  onPlayTrack: (id: number) => void;
}

export default function TrackList({
  tracks,
  currentTrack,
  onPlayTrack,
}: TrackListProps) {
  return (
    <div className="w-full">
      {/* Header row */}
      <div className="flex items-center px-4 py-2 text-xs uppercase tracking-widest text-[#666666] border-b border-[#2a2a2a]">
        <span className="w-10 text-center">#</span>
        <span className="flex-1">Title</span>
        <span className="w-20 text-right">Duration</span>
        <span className="w-12" />
      </div>

      {/* Track rows */}
      {tracks.map((track, index) => {
        const isPlaying = currentTrack === track.id;
        const isPreview = track.preview;

        return (
          <div
            key={track.id}
            className={`group flex items-center px-4 py-3 transition-colors cursor-pointer ${
              isPlaying
                ? "bg-[#e8ff47]/10"
                : "hover:bg-[#1e1e1e]"
            }`}
            onClick={() => isPreview && onPlayTrack(track.id)}
          >
            {/* Track number / playing indicator */}
            <div className="w-10 text-center">
              {isPlaying ? (
                <div className="flex items-center justify-center gap-[2px] h-4">
                  <span
                    className="inline-block w-[3px] bg-[#e8ff47] rounded-full"
                    style={{
                      animation: "waveBar 0.8s ease-in-out infinite",
                      height: "60%",
                    }}
                  />
                  <span
                    className="inline-block w-[3px] bg-[#e8ff47] rounded-full"
                    style={{
                      animation: "waveBar 0.8s ease-in-out 0.2s infinite",
                      height: "100%",
                    }}
                  />
                  <span
                    className="inline-block w-[3px] bg-[#e8ff47] rounded-full"
                    style={{
                      animation: "waveBar 0.8s ease-in-out 0.4s infinite",
                      height: "40%",
                    }}
                  />
                </div>
              ) : (
                <span className="text-sm text-[#666666] group-hover:hidden">
                  {index + 1}
                </span>
              )}
              {!isPlaying && isPreview && (
                <span className="hidden group-hover:inline text-[#f5f5f0]">
                  <Play size={14} weight="fill" />
                </span>
              )}
            </div>

            {/* Title */}
            <div className="flex-1 flex items-center gap-2">
              {isPlaying && (
                <MusicNote
                  size={14}
                  weight="fill"
                  className="text-[#e8ff47] shrink-0"
                />
              )}
              <span
                className={`text-sm ${
                  isPlaying ? "text-[#e8ff47] font-medium" : "text-[#f5f5f0]"
                }`}
              >
                {track.title}
              </span>
              {!isPreview && (
                <Lock size={12} weight="fill" className="text-[#666666] shrink-0" />
              )}
            </div>

            {/* Duration */}
            <span className="w-20 text-right text-sm text-[#666666]">
              {track.duration}
            </span>

            {/* Play / Lock button */}
            <div className="w-12 flex justify-end">
              {isPreview ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayTrack(track.id);
                  }}
                  className="p-1 rounded-full text-[#f5f5f0] hover:text-[#e8ff47] transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause size={18} weight="fill" />
                  ) : (
                    <Play size={18} weight="fill" />
                  )}
                </button>
              ) : (
                <Lock size={16} className="text-[#666666]" />
              )}
            </div>
          </div>
        );
      })}

      {/* Waveform animation keyframes */}
      <style>{`
        @keyframes waveBar {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
      `}</style>
    </div>
  );
}

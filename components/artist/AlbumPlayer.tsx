"use client";

import { useState } from "react";
import { Sparkle, ShoppingCart, MusicNote } from "@phosphor-icons/react";
import TrackList from "./TrackList";
import PurchaseModal from "./PurchaseModal";

interface Track {
  id: number;
  title: string;
  duration: string;
  preview: boolean;
}

interface Album {
  title: string;
  coverArt: string;
  releaseDate: string;
  description: string;
  price: number;
  trackPrice: number;
  currency: string;
  tracks: Track[];
}

interface AlbumPlayerProps {
  album: Album;
}

export default function AlbumPlayer({ album }: AlbumPlayerProps) {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [purchaseType, setPurchaseType] = useState<"album" | "track">("album");

  const handlePlayTrack = (id: number) => {
    setCurrentTrack((prev) => (prev === id ? null : id));
  };

  const openAlbumPurchase = () => {
    setPurchaseType("album");
    setModalOpen(true);
  };

  const openTrackPurchase = () => {
    setPurchaseType("track");
    setModalOpen(true);
  };

  const purchaseItemName =
    purchaseType === "album"
      ? album.title
      : currentTrack
        ? album.tracks.find((t) => t.id === currentTrack)?.title ?? album.title
        : album.title;

  const purchasePrice =
    purchaseType === "album" ? album.price : album.trackPrice;

  return (
    <section className="w-full bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Album header */}
        <div className="flex flex-col sm:flex-row gap-8 mb-10">
          {/* Cover art placeholder */}
          <div className="shrink-0 w-full sm:w-64 aspect-square rounded-2xl overflow-hidden relative">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #2d1b69 0%, #1a1a4e 40%, #0d2847 100%)",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <MusicNote
                size={40}
                weight="fill"
                className="text-[#f5f5f0]/20 mb-3"
              />
              <p className="text-[#f5f5f0]/60 text-lg font-bold leading-tight">
                {album.title}
              </p>
            </div>
          </div>

          {/* Album info */}
          <div className="flex flex-col justify-center">
            {/* Exclusive badge */}
            <div className="flex items-center gap-1.5 mb-3">
              <Sparkle size={14} weight="fill" className="text-[#e8ff47]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#e8ff47]">
                Exclusive to Groupies
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#f5f5f0] mb-2">
              {album.title}
            </h2>

            <div className="flex items-center gap-3 text-sm text-[#999999] mb-4">
              <span>{album.releaseDate}</span>
              <span className="w-1 h-1 rounded-full bg-[#666666]" />
              <span>{album.tracks.length} tracks</span>
            </div>

            <p className="text-sm text-[#999999] leading-relaxed mb-6 max-w-md">
              {album.description}
            </p>

            {/* Purchase buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={openAlbumPurchase}
                className="flex items-center gap-2 px-6 py-3 bg-[#e8ff47] text-[#0a0a0a] rounded-full text-sm font-bold hover:brightness-110 transition-all"
              >
                <ShoppingCart size={18} weight="bold" />
                Buy Full Album — {album.currency}
                {album.price}
              </button>
              <button
                onClick={openTrackPurchase}
                className="flex items-center gap-2 px-6 py-3 bg-[#1e1e1e] border border-[#2a2a2a] text-[#f5f5f0] rounded-full text-sm font-medium hover:bg-[#2a2a2a] transition-colors"
              >
                Buy Track — {album.currency}
                {album.trackPrice} each
              </button>
            </div>
          </div>
        </div>

        {/* Track list */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl overflow-hidden">
          <TrackList
            tracks={album.tracks}
            currentTrack={currentTrack}
            onPlayTrack={handlePlayTrack}
          />
        </div>
      </div>

      {/* Purchase modal */}
      <PurchaseModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={purchaseType}
        itemName={purchaseItemName}
        price={purchasePrice}
        currency={album.currency}
      />
    </section>
  );
}

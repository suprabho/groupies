import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArtistHero from "@/components/artist/ArtistHero";
import AlbumPlayer from "@/components/artist/AlbumPlayer";
import BlogSection from "@/components/artist/BehindTheScenes/BlogSection";
import VlogSection from "@/components/artist/BehindTheScenes/VlogSection";
import PodcastSection from "@/components/artist/BehindTheScenes/PodcastSection";
import MessageForm from "@/components/artist/FanInteraction/MessageForm";
import RequestForm from "@/components/artist/FanInteraction/RequestForm";
import LiveSessionSignup from "@/components/artist/FanInteraction/LiveSessionSignup";
import MerchGrid from "@/components/artist/MerchStore/MerchGrid";
import {
  demoArtist,
  demoAlbum,
  demoBlogPosts,
  demoVlogs,
  demoPodcasts,
  demoLiveSessions,
  demoMerch,
} from "@/data/demo-artist";

export const metadata: Metadata = {
  title: `${demoArtist.name} — Groupies`,
  description: demoArtist.bio,
};

export default async function ArtistPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col bg-[#0a0a0a]">
        {/* Hero */}
        <ArtistHero artist={demoArtist} />

        {/* Music Section */}
        <section id="music" className="scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <AlbumPlayer album={demoAlbum} />
          </div>
        </section>

        {/* Behind the Scenes */}
        <section
          id="behind-the-scenes"
          className="scroll-mt-24 border-t border-[#1e1e1e]"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="mb-6">
              <span className="text-xs font-black uppercase tracking-widest text-[#e8ff47]">
                Behind the Scenes
              </span>
            </div>

            <div className="space-y-20">
              <BlogSection posts={demoBlogPosts} />
              <VlogSection vlogs={demoVlogs} />
              <PodcastSection podcasts={demoPodcasts} />
            </div>
          </div>
        </section>

        {/* Fan Zone */}
        <section
          id="fan-zone"
          className="scroll-mt-24 border-t border-[#1e1e1e]"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#e8ff47]">
                Fan Zone
              </span>
              <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#f5f5f0] mt-3">
                Connect with {demoArtist.name}
              </h2>
              <p className="text-[#666666] mt-3 max-w-xl">
                Send a message, make a request, or reserve your spot at an
                upcoming live session.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-12">
                <MessageForm artistName={demoArtist.name} />
                <RequestForm artistName={demoArtist.name} />
              </div>
              <div>
                <LiveSessionSignup sessions={demoLiveSessions} />
              </div>
            </div>
          </div>
        </section>

        {/* Merch Store */}
        <section
          id="merch"
          className="scroll-mt-24 border-t border-[#1e1e1e]"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#e8ff47]">
                Merch Store
              </span>
              <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#f5f5f0] mt-3">
                Official Merchandise
              </h2>
              <p className="text-[#666666] mt-3 max-w-xl">
                Limited edition vinyl, apparel, and collectibles — direct from{" "}
                {demoArtist.name}.
              </p>
            </div>

            <MerchGrid items={demoMerch} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Big_Shoulders, Big_Shoulders_Stencil, Caveat_Brush, Instrument_Sans, Instrument_Serif, Mukta_Mahee } from "next/font/google";
import { artists, getArtist, DEMO_ARTIST_SLUG } from "@/content/artists";
import ArtistWorld from "@/components/artist/ArtistWorld";

const display = Big_Shoulders({ subsets: ["latin"], variable: "--font-display", display: "swap", adjustFontFallback: false });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const stencil = Big_Shoulders_Stencil({ subsets: ["latin"], variable: "--font-stencil", display: "swap", adjustFontFallback: false });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const hand = Caveat_Brush({ subsets: ["latin"], weight: "400", variable: "--font-hand", display: "swap" });
const gurmukhi = Mukta_Mahee({ subsets: ["gurmukhi"], weight: ["400", "700", "800"], variable: "--font-pa", display: "swap" });

export function generateStaticParams() {
  return [...Object.keys(artists), "demo"].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtist(slug === "demo" ? DEMO_ARTIST_SLUG : slug);
  if (!artist) return {};
  const title = `${artist.name} on Groupies`;
  const description = `${artist.tagline} New album ${artist.album.title}, studio diaries, live sessions and merch, direct from ${artist.name}.`;
  return { title, description, openGraph: { title, description, type: "profile" } };
}

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "demo") redirect(`/artist/${DEMO_ARTIST_SLUG}`);
  const artist = getArtist(slug);
  if (!artist) notFound();
  return <ArtistWorld artist={artist} fontClass={[display, body, gurmukhi, stencil, serif, hand].map((f) => f.variable).join(" ")} />;
}

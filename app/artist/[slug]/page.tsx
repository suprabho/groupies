import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Didact_Gothic, Mukta_Mahee, Shadows_Into_Light, Zalando_Sans_Expanded } from "next/font/google";
import { artists, getArtist, DEMO_ARTIST_SLUG } from "@/content/artists";
import ArtistWorld from "@/components/artist/ArtistWorld";

// Variable, 200–900: hairline 200 for secondary display text, 900 for names and headlines.
const display = Zalando_Sans_Expanded({ subsets: ["latin"], variable: "--font-display", display: "swap", adjustFontFallback: false });
const body = Didact_Gothic({ subsets: ["latin"], weight: "400", variable: "--font-body", display: "swap" });
const hand = Shadows_Into_Light({ subsets: ["latin"], weight: "400", variable: "--font-hand", display: "swap" });
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
  return <ArtistWorld artist={artist} fontClass={[display, body, gurmukhi, hand].map((f) => f.variable).join(" ")} />;
}

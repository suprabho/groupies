import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { artists, getArtist, DEMO_ARTIST_SLUG } from "@/content/artists";

export const alt = "Artist world on Groupies";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return Object.keys(artists).map((slug) => ({ slug }));
}

const font = (file: string) => readFile(join(process.cwd(), "assets/fonts", file));

/** Inline a /public image as a data URL so Satori can draw it. */
async function publicImage(path: string) {
  const data = await readFile(join(process.cwd(), "public", path), "base64");
  const ext = path.split(".").pop() === "jpg" ? "jpeg" : path.split(".").pop();
  return `data:image/${ext};base64,${data}`;
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = getArtist(slug === "demo" ? DEMO_ARTIST_SLUG : slug);
  if (!artist) return new Response("Not found", { status: 404 });

  const { theme, album, images } = artist;
  const [display, stencil, serif, sans, hero, cover] = await Promise.all([
    font("BigShoulders-Black.ttf"),
    font("BigShouldersStencil-Bold.ttf"),
    font("InstrumentSerif-Italic.ttf"),
    font("InstrumentSans-Medium.ttf"),
    publicImage(images.portrait ?? images.share.art),
    publicImage(images.share.cover),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", position: "relative", background: theme.bg, color: theme.ink, fontFamily: "Instrument Sans" }}>
        {/* Artwork on the right, fading into the page colour */}
        <img src={hero} alt="" width={540} height={630} style={{ position: "absolute", right: 0, top: 0, width: 540, height: 630, objectFit: "cover" }} />
        <div style={{ position: "absolute", right: 0, top: 0, width: 540, height: 630, display: "flex", backgroundImage: `linear-gradient(90deg, ${theme.bg} 0%, ${theme.bg}cc 22%, ${theme.bg}00 60%)` }} />
        <div style={{ position: "absolute", right: 0, bottom: 0, width: 540, height: 260, display: "flex", backgroundImage: `linear-gradient(0deg, ${theme.bg} 0%, ${theme.bg}00 100%)` }} />

        {/* No ghosted Gurmukhi name here: Satori doesn't shape Indic scripts, so vowel signs land in the wrong place. */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "56px 64px" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: theme.muted }}>
            <span style={{ color: theme.ink }}>Groupies</span>
            <span style={{ margin: "0 14px", color: theme.accent }}>/</span>
            <span>artist world</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontFamily: "Instrument Serif", fontStyle: "italic", fontSize: 60, lineHeight: 1, color: theme.ink, maxWidth: 640, textWrap: "balance" }}>{artist.tagline}</div>
            <div style={{ display: "flex", marginTop: 14, fontFamily: "Big Shoulders", fontWeight: 900, fontSize: 184, lineHeight: 0.86, letterSpacing: -2, textTransform: "uppercase" }}>{artist.name}</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", alignSelf: "flex-start", padding: 12, paddingRight: 28, borderRadius: 6, background: theme.surface }}>
            <img src={cover} alt="" width={76} height={76} style={{ borderRadius: 3 }} />
            <div style={{ display: "flex", flexDirection: "column", marginLeft: 18 }}>
              <div style={{ display: "flex", fontFamily: "Big Shoulders Stencil", fontWeight: 700, fontSize: 24, color: theme.accent }}>{album.releaseLabel}</div>
              <div style={{ display: "flex", marginTop: 6, fontFamily: "Big Shoulders", fontWeight: 900, fontSize: 36, lineHeight: 1 }}>{album.title}, the new album</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Big Shoulders", data: display, weight: 900, style: "normal" },
        { name: "Big Shoulders Stencil", data: stencil, weight: 700, style: "normal" },
        { name: "Instrument Serif", data: serif, weight: 400, style: "italic" },
        { name: "Instrument Sans", data: sans, weight: 500, style: "normal" },      ],
    },
  );
}

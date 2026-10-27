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
  // Satori can't read variable fonts, so these are static instances of the page's fonts.
  const [black, hairline, body, hand, hero, cover] = await Promise.all([
    font("ZalandoSansExpanded-Black.ttf"),
    font("ZalandoSansExpanded-ExtraLight.ttf"),
    font("DidactGothic-Regular.ttf"),
    font("ShadowsIntoLight-Regular.ttf"),
    publicImage(images.portrait ?? images.share.art),
    publicImage(images.share.cover),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", position: "relative", background: theme.bg, color: theme.ink, fontFamily: "Didact Gothic" }}>
        {/* Black and white photo on the right, fading into the page colour */}
        <img src={hero} alt="" width={640} height={630} style={{ position: "absolute", right: 0, top: 0, width: 640, height: 630, objectFit: "cover", filter: "grayscale(1) contrast(1.2)" }} />
        <div style={{ position: "absolute", right: 0, top: 0, width: 640, height: 630, display: "flex", backgroundImage: `linear-gradient(90deg, ${theme.bg} 0%, ${theme.bg}cc 25%, ${theme.bg}00 65%)` }} />
        <div style={{ position: "absolute", right: 0, bottom: 0, width: 640, height: 280, display: "flex", backgroundImage: `linear-gradient(0deg, ${theme.bg} 0%, ${theme.bg}00 100%)` }} />

        {/* No ghosted Gurmukhi name here: Satori doesn't shape Indic scripts, so vowel signs land in the wrong place. */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "56px 64px" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: theme.muted }}>
            <span style={{ color: theme.ink }}>Groupies</span>
            <span style={{ margin: "0 14px", color: theme.accent }}>/</span>
            <span>artist world</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontFamily: "Shadows Into Light", fontSize: 30, letterSpacing: 2, color: theme.accent }}>THE PAINT STAYS ON.</div>
            <div style={{ display: "flex", marginTop: 10, fontFamily: "Zalando Sans Expanded", fontWeight: 200, fontSize: 46, lineHeight: 1.05, textTransform: "uppercase", maxWidth: 720 }}>{artist.tagline}</div>
            {/* The page's RGB-split name: three offset copies that add up to white */}
            <div style={{ display: "flex", position: "relative", marginTop: 22, height: 118 }}>
              {[
                [theme.accent, -4],
                [theme.accent3, 4],
                [theme.ink, 0],
              ].map(([color, dx]) => (
                <div
                  key={String(color)}
                  style={{ position: "absolute", left: Number(dx), top: 0, display: "flex", fontFamily: "Zalando Sans Expanded", fontWeight: 900, fontSize: 118, lineHeight: 1, letterSpacing: -3, textTransform: "uppercase", color: String(color) }}
                >
                  {artist.name}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", alignSelf: "flex-start", padding: 12, paddingRight: 28, borderRadius: 6, background: theme.surface, border: `1px solid ${theme.ink}22` }}>
            <img src={cover} alt="" width={76} height={76} style={{ borderRadius: 3, filter: "grayscale(1)" }} />
            <div style={{ display: "flex", flexDirection: "column", marginLeft: 18 }}>
              <div style={{ display: "flex", fontFamily: "Shadows Into Light", fontSize: 22, letterSpacing: 1.5, color: theme.accent, textTransform: "uppercase" }}>{album.releaseLabel}</div>
              <div style={{ display: "flex", marginTop: 6, fontFamily: "Zalando Sans Expanded", fontWeight: 900, fontSize: 30, lineHeight: 1, textTransform: "uppercase" }}>{album.title}, the new album</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Zalando Sans Expanded", data: black, weight: 900, style: "normal" },
        { name: "Zalando Sans Expanded", data: hairline, weight: 200, style: "normal" },
        { name: "Didact Gothic", data: body, weight: 400, style: "normal" },
        { name: "Shadows Into Light", data: hand, weight: 400, style: "normal" },
      ],
    },
  );
}

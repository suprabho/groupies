# Handoff: Talwiinder artist page (Groupies pilot)

Concept artist world for the Groupies pitch, at `/artist/talwiinder` (`/artist/demo` redirects there).
Built Oct 2026. Builds clean with `npm run build`. Nothing is committed yet.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000/artist/talwiinder
```

**Read `AGENTS.md` first.** This is Next.js 16: check `node_modules/next/dist/docs/` before using an API from memory. Route `params` is a Promise (`await params`).

## Where things live

| Path | What it is |
|---|---|
| `app/artist/[slug]/page.tsx` | Route, metadata, `generateStaticParams`, all fonts (`next/font/google`) |
| `content/artists/types.ts` | The `Artist` shape. Every artist page renders from one of these |
| `content/artists/talwiinder.ts` | All content and theme colours. Header comment says what's real vs sample |
| `content/artists/index.ts` | Registry + `DEMO_ARTIST_SLUG` |
| `components/artist/ArtistWorld.tsx` | Page composition, sets theme CSS variables |
| `components/artist/state.tsx` | Cart, checkout, toast, follow state (`useWorld`) and the preview player (`usePlayer`) |
| `components/artist/*` | One file per section: Hero, Marquee, SectionNav, Album, Essentials, Diary, FanZone, Live, Merch, Membership, ArtistFooter, CartDrawer, Checkout, Toast |
| `components/artist/Goth.tsx` | Goth motifs and grunge: `GrungeDefs` (page-wide SVG filter + arch clip path), `Thorns`, `Cross`, `Corners`, `RoseWindow`, `TornEdge`, `ArchFrame` |
| `components/artist/Socials.tsx` | Icon row (hero) and labelled list (footer) built from `artist.socials` |
| `components/artist/ui.tsx` | Buttons, `Section` (starts with a thorn divider), `SectionHeading`, `Duotone` (B&W photo + optional neon wash + film grime) |
| `app/globals.css` | Bottom "Artist worlds" block: font utility classes, grain, tracery background, grunge/distress/grime/tape, neon, RGB name + drips, marquee, reduced-motion rules |
| `public/talwiinder/*.webp` | 16 AI-rendered images (ElevenLabs, seedream-5-pro). No people in any of them |
| `public/talwiinder/press/*.jpg` | Three photos of the artist supplied by the Groupies team: `portrait` (hero + share card), `stage` (merch banner), `close-up` (mailing-list arch) |
| `app/artist/[slug]/opengraph-image.tsx` | 1200×630 share card, prerendered per artist. Fonts are static TTF instances in `assets/fonts/` (Satori can't read variable fonts); art comes from `images.share` (JPEG, because the renderer can't read WebP) |

Homepage links (`components/homepage/Hero.tsx`, `components/layout/Navbar.tsx`) point to `/artist/talwiinder`.

## Design system (keep it)

Black and white, lit by three neons. Reference: the artist's own site (centred wordmark nav, wide caps, white pill buttons, B&W photography).

- **Colours** come from `artist.theme` as CSS vars: `--a-bg` black `#000000`, `--a-surface` `#0E0E0E`, `--a-ink` white `#FFFFFF`, `--a-muted` smoke `#9A9A9A`, and three accents with fixed jobs:
  - `--a-accent` neon red `#FF2D46`: urgency and the release (release label, "few left", sold-out stamp, primary-button hover).
  - `--a-accent2` neon green `#2BFF88`: live, playing, available, done (progress bars, EQ, success messages, fan zone).
  - `--a-accent3` neon blue `#3D7BFF`: members and anything behind the paywall (Inner Circle tags, member presale, highlighted tier, focus ring).
  Use Tailwind v4 var syntax: `bg-(--a-bg)`, `text-(--a-ink)/60`. Never hard-code artist colours in components. Use `tone` from `ui.tsx` when an accent is chosen at runtime.
- **Neon is a light source, not a fill.** `.neon` (box glow) on dots, bars and thin rules only; the big accent moments are the three full-bleed photo washes: green crowd (Live), blue stage (Merch), red close-up in the arch (Membership).
- **Photos** are always black and white (`Duotone`), optionally multiplied by one accent. Merch shots are B&W at rest and show true colour on hover (always colour on touch screens).
- **Type**
  - `.font-display` Zalando Sans Expanded, variable 200–900. Black (900) uppercase for names, headings, cities, buttons; ExtraLight (200) for taglines, secondary lines, months/weekdays.
  - `.font-hand` Shadows Into Light: nav and short margin notes only. Always all caps (the class sets `text-transform`).
  - Body and small text: Didact Gothic (400 only, so don't use `font-semibold` on body text).
  - `.font-pa` Mukta Mahee for Gurmukhi.
- **Goth and grunge**
  - Background: quatrefoil tracery gathered at the screen edges (`.artist-world::after`), rose windows ghosted behind the hero, fan wall and tiers.
  - Motifs: thorn-vine dividers with a gothic cross at the top of every `Section`, neon crosses in the marquee, filigree `Corners` on cards, a pointed `#arch` window around the mailing-list photo.
  - Grunge: `.grunge` (SVG erosion filter from `GrungeDefs`) on display headings, never on hairline weights or body text; `.distress` speckle on pills and cards (`.distress-under` keeps it behind text); `.grime` scratches + `.burn` on photos; `TornEdge` on full-bleed bands; tape on fan notes; rubber-stamp "sold out".
- **One bold moment**: the hero name. It's brushed on, set three times in red, green and blue with screen blending so it adds up to white with a misregistered fringe, worn with the grunge filter, and paint drips run off a few stems. Don't add entrance animations elsewhere. Respect `prefers-reduced-motion`.
- Body copy is sentence case; display type and buttons are uppercase. No arrows on buttons.

## Real vs sample

- **Real (public sources):** name, Tarn Taran → Bay Area story, genres, socials, Spotify links, the "Already out everywhere" songs, the two paraphrased diary posts.
- **Supplied photos:** the three images in `public/talwiinder/press/` came from the Groupies team. Confirm they're licensed press photos before the page is shown publicly.
- **Sample:** the *Saaye* album and tracklist, all prices, member counts, show dates, sessions, posts, vlogs, podcast, fan notes, merch, tiers.
- The footer disclaimer ("concept page, not affiliated") must stay until there's a real agreement with the artist.

## Things that are mocked

- **Audio**: `useSynth()` in `state.tsx` generates a 30s Web Audio preview per track from `root/mode/bpm`. Replace with real preview files when available (add `previewUrl` to `Track`).
- **Checkout**: `Checkout.tsx` fakes a 1.1s payment. No Stripe yet.
- **Forms**: fan messages, requests, session reservations and follows are client state only. Nothing is persisted.
- **Vlogs**: thumbnails only; clicking shows a toast.

## Gotchas

- The player lives in its own context on purpose: progress ticks ~60fps. Merging it back into `useWorld` re-renders the whole page and resets the checkout form.
- SVG filters on brush strokes use `filterUnits="userSpaceOnUse"`. With the default bbox units the stroke gets clipped flat.
- Zalando Sans Expanded has no fallback metrics in `next/font`, so it's loaded with `adjustFontFallback: false`.
- `.distress` and `.grime` are background textures on pseudo-elements, not CSS masks: Chrome ignored the SVG-filter masks, and a mask would also clip focus rings.
- Decorative rose windows overflow their sections on purpose; `Section` and Membership use `overflow-x-clip` so mobile doesn't scroll sideways (clip, not hidden, keeps the sticky album column working).
- In this cloud sandbox `next dev` sometimes keeps serving stale `globals.css`. Restart it with `.next` removed if CSS changes don't show.
- The cassette render had a typo on its case ("SAASYE"), so `cassette.webp` is cropped to the tape. Regenerate if you need the case.
- **Don't add photos of the artist scraped from the web.** Use licensed press photos only. `images.portrait`, `images.stage` and `images.closeUp` are optional; without them the hero, merch banner and arch fall back to the AI artwork.

## Suggested next tasks

1. Commit a checkpoint on a branch (`talwiinder-artist-page`).
2. Run `npm run lint` and fix anything it flags (not run yet).
3. Real audio previews with Howler.js (already in the pilot plan), replacing the synth.
4. Stripe test-mode checkout for album, tracks, merch and memberships.
5. Persist fan messages, requests and reservations (API routes + Supabase or Resend).
6. Diary post pages at `/artist/[slug]/diary/[post]`.
7. Single-track purchase on mobile (the button is hidden below `sm`).
8. Add a second artist to prove the `Artist` shape generalises.

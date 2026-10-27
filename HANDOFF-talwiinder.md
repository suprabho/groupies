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
| `app/globals.css` | Bottom "Artist worlds" block: font utility classes, grain, brush-stroke reveal, marquee, reduced-motion rules |
| `public/talwiinder/*.webp` | 16 AI-rendered images (ElevenLabs, seedream-5-pro). No people in any of them |

Homepage links (`components/homepage/Hero.tsx`, `components/layout/Navbar.tsx`) point to `/artist/talwiinder`.

## Design system (keep it)

- **Colours** come from `artist.theme` as CSS vars: `--a-bg` kohl `#17130F`, `--a-surface` khaddar `#241E18`, `--a-ink` bone `#EDE5D3`, `--a-muted` ash `#948B7C`, `--a-accent` phulkari gold `#E2A23A`, `--a-accent2` phulkari rose `#B8346B`. Use Tailwind v4 var syntax: `bg-(--a-bg)`, `text-(--a-ink)/60`. Never hard-code artist colours in components.
- **Type**: `.font-display` Big Shoulders (names, numbers), `.font-stencil` Big Shoulders Stencil (section titles, cities, dates), `.font-serif` Instrument Serif italic (his voice: tagline, notes, diary, fan messages), `.font-hand` Caveat Brush (short margin scribbles only), `.font-pa` Mukta Mahee (Gurmukhi), body is Instrument Sans.
- **One bold moment**: the painted-name brush reveal (`PaintedName.tsx`). Don't add entrance animations elsewhere. Respect `prefers-reduced-motion`.
- Sentence case, no all-caps eyebrow labels, no arrows on buttons.

## Real vs sample

- **Real (public sources):** name, Tarn Taran → Bay Area story, genres, socials, Spotify links, the "Already out everywhere" songs, the two paraphrased diary posts.
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
- Build warns "Failed to find font override values for Big Shoulders". Harmless.
- The cassette render had a typo on its case ("SAASYE"), so `cassette.webp` is cropped to the tape. Regenerate if you need the case.
- **Don't add photos of the artist scraped from the web.** Use licensed press photos only: put one at `public/talwiinder/press/portrait.jpg` and uncomment `images.portrait` in `talwiinder.ts`. The hero swaps it in automatically.

## Suggested next tasks

1. Commit a checkpoint on a branch (`talwiinder-artist-page`).
2. Run `npm run lint` and fix anything it flags (not run yet).
3. Real audio previews with Howler.js (already in the pilot plan), replacing the synth.
4. Stripe test-mode checkout for album, tracks, merch and memberships.
5. Persist fan messages, requests and reservations (API routes + Supabase or Resend).
6. Diary post pages at `/artist/[slug]/diary/[post]`.
7. Single-track purchase on mobile (the button is hidden below `sm`).
8. Add a second artist to prove the `Artist` shape generalises.

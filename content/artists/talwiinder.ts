import type { Artist } from "./types";

/**
 * Talwiinder — demo artist world for the Groupies pilot.
 *
 * REAL (public, from talwiinder.com / Wikipedia / Apple Music / Rolling Stone India):
 *   name, origin, base, genres, bio facts, socials, Spotify links, the "Essentials" catalogue.
 * SAMPLE (invented for this pitch — replace before showing as real):
 *   the SAAYE album + tracklist, prices, member counts, diary posts, vlogs, podcast,
 *   fan notes, show dates, live sessions, merch and membership tiers.
 */

const SPOTIFY_ARTIST = "https://open.spotify.com/artist/6QoCrBHsojKnOrsGNfRcTN";
const search = (q: string) => `https://open.spotify.com/search/${encodeURIComponent(`Talwiinder ${q}`)}`;

export const talwiinder: Artist = {
  slug: "talwiinder",
  name: "Talwiinder",
  nameLocal: "ਤਲਵਿੰਦਰ",
  currency: "₹",
  images: {
    // portrait: "/talwiinder/press/portrait.jpg", // drop a licensed press photo here
    faceArt: "/talwiinder/face-paint-art.webp",
    cover: "/talwiinder/cover.webp",
    dressingRoom: "/talwiinder/dressing-room.webp",
    crowd: "/talwiinder/crowd.webp",
  },
  theme: {
    bg: "#17130F", // kohl
    surface: "#241E18", // khaddar cloth
    ink: "#EDE5D3", // bone paint
    muted: "#948B7C", // ash
    accent: "#E2A23A", // phulkari gold silk
    accent2: "#B8346B", // phulkari rose
  },
  tagline: "Love songs from behind the paint.",
  origin: "Tarn Taran, Punjab",
  base: "San Francisco Bay Area",
  genres: ["Punjabi R&B", "Synth-pop", "Trap", "Lo-fi"],
  sound: "Sings in Punjabi over R&B, synth-pop, trap and lo-fi.",
  bio: [
    "Born Talwinder Singh Sidhu in Tarn Taran, Punjab, he moved to the Bay Area at fourteen and started putting songs on SoundCloud in 2018.",
    "His sound folds Punjabi melody into R&B, synth-pop, trap and lo-fi, built mostly with his long-time producer NDS. He grew up studying Nusrat Fateh Ali Khan and Gurdas Maan, and it shows in the croon.",
    "The skull face paint isn't a costume. It keeps the music in front and his private life his own. His debut album, MISFIT, came out in October 2024.",
  ],
  members: 18420,
  socials: [
    { label: "Spotify", url: SPOTIFY_ARTIST },
    { label: "Apple Music", url: "https://music.apple.com/us/artist/talwiinder/1422472152" },
    { label: "YouTube", url: "https://www.youtube.com/@Talwiinder" },
    { label: "Instagram", url: "https://www.instagram.com/talwiinder" },
    { label: "SoundCloud", url: "https://soundcloud.com/talwiinder" },
    { label: "X", url: "https://x.com/talwiinder" },
  ],
  spotifyArtist: SPOTIFY_ARTIST,
  spotifyFeaturedTrack: "2iqiSNXdFH6vOLi0ZypPVX",

  album: {
    title: "Saaye",
    titleLocal: "ਸਾਏ",
    subtitle: "Ten songs about the people who stay after the lights go out.",
    releaseLabel: "Out 31 October, only on Groupies",
    description:
      "Written between Tarn Taran and the Bay over three winters. Previews are open to everyone. Members hear the full record at midnight on Halloween, a week before anyone else.",
    priceAlbum: 399,
    priceTrack: 39,
    tracks: [
      { n: 1, title: "Paint Dries (Intro)", duration: "1:24", note: "A mirror, a brush, and the room going quiet.", root: 50, mode: "minor", bpm: 70 },
      { n: 2, title: "Saaye", duration: "3:31", note: "The title track. Shadows that keep you company.", root: 45, mode: "minor", bpm: 84, scribble: "title track" },
      { n: 3, title: "Raat Jaagdi", duration: "3:08", note: "The night stays awake so you don't have to.", root: 52, mode: "minor", bpm: 92 },
      { n: 4, title: "3AM, Bay Bridge", duration: "2:56", note: "Fog on the windshield, a voice note on loop.", root: 48, mode: "major", bpm: 78, scribble: "first single" },
      { n: 5, title: "Kaali Syahi", duration: "3:17", note: "Black ink, letters never sent.", root: 43, mode: "minor", bpm: 96 },
      { n: 6, title: "Mitti", duration: "3:44", note: "For the soil that raised him.", root: 47, mode: "major", bpm: 74, scribble: "for home" },
      { n: 7, title: "Misfits Only (Interlude)", duration: "1:02", note: "Recorded with the crowd in Ludhiana.", root: 49, mode: "minor", bpm: 88, scribble: "that's you singing" },
      { n: 8, title: "Neend Na Aave", duration: "3:29", note: "Sleep won't come, so the song does.", root: 46, mode: "minor", bpm: 82 },
      { n: 9, title: "Rang Utarde", duration: "3:52", note: "When the paint comes off.", root: 51, mode: "major", bpm: 76 },
      { n: 10, title: "Bone White", duration: "2:41", note: "The last song of the night.", root: 45, mode: "major", bpm: 68 },
    ],
  },

  essentials: [
    { title: "Khayaal", credit: "with NDS", url: search("Khayaal") },
    { title: "Haseen", url: search("Haseen") },
    { title: "Wishes", credit: "Hasan Raheem ft. Talwiinder", url: search("Wishes Hasan Raheem") },
    { title: "Nasha", url: search("Nasha") },
    { title: "Gallan 4", url: search("Gallan 4") },
    { title: "Tu", url: search("Tu") },
    { title: "Dhundhala", credit: "Yashraj ft. Talwiinder", url: search("Dhundhala Yashraj") },
    { title: "Funk Song", url: search("Funk Song") },
    { title: "Nakhre", url: search("Nakhre") },
    { title: "Pal Pal", credit: "with Afusic & Ali Soomro", url: search("Pal Pal") },
  ],

  posts: [
    {
      slug: "why-saaye-waited",
      title: "Why these songs waited three winters",
      excerpt:
        "Some of Saaye was first hummed into a phone in 2023. The rule in the studio is simple: a song isn't done until it still sounds right in a different season.",
      date: "20 Oct 2026",
      readMins: 6,
      body: [
        "He has said in interviews that he likes to live with a song for a long time, playing it at different hours and in different seasons before deciding it's finished. Saaye was made the same way.",
        "The title track started as a melody over a single chord. It went through a sped-up version, a stripped acoustic one and a version with a full drill beat before landing somewhere in between.",
        "This post walks through four of those versions, with the voice memos attached for members, and what changed each time.",
      ],
    },
    {
      slug: "forty-minutes",
      title: "Paint, mirror, forty minutes",
      excerpt: "What happens backstage before a Halloween show, from the first line of white to the last check in the mirror.",
      date: "12 Oct 2026",
      readMins: 4,
      membersOnly: true,
    },
    {
      slug: "records-that-raised-him",
      title: "The records that raised him",
      excerpt: "Nusrat on the car stereo in Tarn Taran, Bohemia and 808s & Heartbreak in a Bay Area bedroom. A listening list with notes.",
      date: "29 Sep 2026",
      readMins: 8,
      body: [
        "Nusrat Fateh Ali Khan and Gurdas Maan are the two names he comes back to most when he talks about growing up in Tarn Taran.",
        "In the Bay Area the list widened: Bohemia's The Punjabi Rapstar, G-Eazy's These Things Happen and Kanye West's 808s & Heartbreak are the three albums he has picked as his all-time favourites.",
        "Below is a playlist of all five, with a short note on what each one taught him about melody, rap cadence and heartbreak.",
      ],
    },
    {
      slug: "notes-on-mitti",
      title: "Notes on Mitti",
      excerpt: "The one song on the album that started as a voice memo from home. Lyrics, translation and the first demo.",
      date: "16 Sep 2026",
      readMins: 5,
      membersOnly: true,
    },
  ],
  vlogs: [
    { title: "Studio night: Saaye vocal takes", image: "/talwiinder/studio.webp", duration: "12:40", date: "Oct 2026", place: "Mumbai" },
    { title: "Soundcheck in Ludhiana", image: "/talwiinder/soundcheck.webp", duration: "8:12", date: "Oct 2026", place: "Ludhiana", membersOnly: true },
    { title: "The paint room", image: "/talwiinder/paint-macro.webp", duration: "5:55", date: "Sep 2026", place: "Delhi" },
    { title: "Fan pit cam", image: "/talwiinder/crowd.webp", duration: "9:03", date: "Sep 2026", place: "Dubai", membersOnly: true },
  ],
  episodes: [
    { n: 1, title: "The demo folder", summary: "Playing unreleased voice memos and deciding which ones live.", duration: "24 min" },
    { n: 2, title: "You pick the setlist", summary: "Reading the fan votes for the Halloween show, live.", duration: "31 min" },
    { n: 3, title: "Why love songs", summary: "On writing tender songs in a genre that loves to flex.", duration: "27 min" },
  ],
  fanNotes: [
    { name: "Simran", city: "Ludhiana", text: "Wishes got me through my final exams. Can't wait to hear Mitti properly." },
    { name: "Arjun", city: "Fremont", text: "Saw you at the Halloween show with my whole hostel. Painted my face badly, no regrets." },
    { name: "Hira", city: "Lahore", text: "Love from across the border. Khayaal is my 2am song." },
    { name: "Meher", city: "Toronto", text: "Please bring the tour to Brampton. We'll fill it." },
    { name: "Kabir", city: "Bengaluru", text: "The 3AM, Bay Bridge preview is already on repeat." },
  ],
  shows: [
    { date: "31 Oct", city: "Mumbai", venue: "Halloween Night", status: "Few left" },
    { date: "8 Nov", city: "Bengaluru", venue: "Venue announced soon", status: "Member presale" },
    { date: "15 Nov", city: "New Delhi", venue: "Venue announced soon", status: "On sale" },
    { date: "22 Nov", city: "Dubai", venue: "Venue announced soon", status: "On sale" },
    { date: "6 Dec", city: "London", venue: "Venue announced soon", status: "Member presale" },
    { date: "13 Dec", city: "Toronto", venue: "Venue announced soon", status: "Sold out" },
  ],
  sessions: [
    { id: "paint-live", title: "Getting ready, live from the paint room", when: "Thu 30 Oct, 9:00 pm IST", format: "Video", capacity: 500, taken: 412, membersOnly: true },
    { id: "listening-party", title: "Saaye listening party at midnight", when: "Fri 31 Oct, 11:30 pm IST", format: "Audio", capacity: 2000, taken: 1640 },
    { id: "ask-punjabi", title: "Ask me anything, in Punjabi", when: "Sun 9 Nov, 8:00 pm IST", format: "Video", capacity: 300, taken: 96, membersOnly: true },
  ],
  merch: [
    { id: "lp", name: "Saaye on vinyl", detail: "Bone-white 180g LP, gatefold with lyric sheet in Gurmukhi and English.", price: 2999, category: "Music", image: "/talwiinder/vinyl.webp", featured: true },
    { id: "cassette", name: "Saaye cassette", detail: "Gold shell, numbered J-card.", price: 899, category: "Music", image: "/talwiinder/cassette.webp" },
    { id: "cd", name: "Saaye CD and booklet", detail: "24-page booklet of studio notes.", price: 699, category: "Music", image: "/talwiinder/cd.webp" },
    { id: "poster", name: "Signed tour poster", detail: "A2 riso print, signed in gold.", price: 1299, category: "Music", image: "/talwiinder/poster.webp" },
    { id: "tee", name: "Bone paint tee", detail: "Heavyweight black cotton, hand-pulled print.", price: 1499, category: "Lifestyle", image: "/talwiinder/tee.webp", variants: ["S", "M", "L", "XL"] },
    { id: "hoodie", name: "Misfit hoodie", detail: "Phulkari embroidery on the cuff.", price: 2799, category: "Lifestyle", image: "/talwiinder/hoodie.webp", variants: ["S", "M", "L", "XL"] },
    { id: "bandana", name: "Phulkari bandana", detail: "The one from the stage, in silk-finish cotton.", price: 599, category: "Lifestyle", image: "/talwiinder/bandana.webp" },
    { id: "paint", name: "Halloween face paint kit", detail: "Bone, black, two brushes and a stencil guide.", price: 799, category: "Lifestyle", image: "/talwiinder/paint-kit.webp" },
    { id: "keychain", name: "Skull keychain", detail: "Enamel, glows faintly.", price: 349, category: "Lifestyle", image: "/talwiinder/keychain.webp" },
  ],
  tiers: [
    {
      name: "Misfit",
      price: 0,
      blurb: "Follow along for free.",
      perks: ["30-second previews of every exclusive", "Public diary posts and vlogs", "Post on the fan wall"],
    },
    {
      name: "Inner Circle",
      price: 149,
      blurb: "Hear everything first.",
      perks: ["Full Saaye stream and download at midnight on Halloween", "Members-only diary, vlogs and live sessions", "Presale codes for every show"],
      highlight: true,
    },
    {
      name: "Bone Club",
      price: 999,
      blurb: "Closest to the paint room.",
      perks: ["Everything in Inner Circle", "One custom request every quarter", "A signed item each year", "Front row at listening parties"],
      limit: "300 spots",
    },
  ],
};

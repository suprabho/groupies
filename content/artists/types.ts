// Shape of an artist world on Groupies. Every artist page renders from one of these.

export type ArtistTheme = {
  bg: string; // page base
  surface: string; // raised surfaces
  ink: string; // primary text / paint
  muted: string; // secondary text
  accent: string; // primary accent: urgency, the release, hover on primary actions
  accent2: string; // second accent: live, playing, available, done
  accent3: string; // third accent: members and anything behind the paywall
};

export type Track = {
  n: number;
  title: string;
  duration: string;
  note: string;
  /** Placeholder synth: MIDI root + mode, used until real stems are uploaded. */
  root: number;
  mode: "minor" | "major";
  bpm: number;
  /** A handwritten margin note, shown in brush script next to the track. */
  scribble?: string;
};

export type Album = {
  title: string;
  titleLocal?: string;
  subtitle: string;
  releaseLabel: string;
  description: string;
  priceAlbum: number;
  priceTrack: number;
  tracks: Track[];
};

export type Essential = {
  title: string;
  credit?: string;
  url: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMins: number;
  membersOnly?: boolean;
  body?: string[];
};

export type Vlog = { title: string; duration: string; date: string; place: string; image: string; membersOnly?: boolean };
export type Episode = { n: number; title: string; summary: string; duration: string };
export type FanNote = { name: string; city: string; text: string };
export type Show = { date: string; city: string; venue: string; status: "On sale" | "Few left" | "Member presale" | "Sold out" };
export type Session = {
  id: string;
  title: string;
  when: string;
  format: "Video" | "Audio";
  capacity: number;
  taken: number;
  membersOnly?: boolean;
};
export type MerchItem = {
  id: string;
  name: string;
  detail: string;
  price: number;
  category: "Music" | "Lifestyle";
  variants?: string[];
  image: string;
  featured?: boolean;
};
export type Tier = {
  name: string;
  price: number; // per month, 0 = free
  blurb: string;
  perks: string[];
  limit?: string;
  highlight?: boolean;
};

export type Artist = {
  slug: string;
  name: string;
  /** Name in the artist's own script, used as a typographic graphic. */
  nameLocal?: string;
  currency: string;
  images: {
    /** A licensed press photo. When set, it replaces the face-paint artwork in the hero. */
    portrait?: string;
    faceArt: string;
    /** A live shot for the merch banner. Falls back to the crowd shot. */
    stage?: string;
    /** A tight close-up for the mailing-list window. Falls back to the face-paint artwork. */
    closeUp?: string;
    cover: string;
    dressingRoom: string;
    crowd: string;
    /** JPEG/PNG copies for the social share card. Its renderer can't read WebP. */
    share: { art: string; cover: string };
  };
  theme: ArtistTheme;
  tagline: string;
  origin: string;
  base: string;
  genres: string[];
  sound: string;
  bio: string[];
  members: number; // mock
  socials: { label: string; url: string }[];
  spotifyArtist: string;
  spotifyFeaturedTrack: string;
  album: Album;
  essentials: Essential[];
  posts: Post[];
  vlogs: Vlog[];
  episodes: Episode[];
  fanNotes: FanNote[];
  shows: Show[];
  sessions: Session[];
  merch: MerchItem[];
  tiers: Tier[];
};

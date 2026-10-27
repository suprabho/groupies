export const demoArtist = {
  name: "Kael Drifter",
  slug: "demo",
  genre: ["Indie Electronic", "Dream Pop", "Synthwave"],
  bio: "Kael Drifter blends shimmering synths with raw, confessional vocals to create music that feels like driving through a neon-lit city at 3 AM. Based in East London, Kael has spent the last two years crafting a sound that sits somewhere between Tame Impala and Grimes — lush, textured, and deeply personal.",
  followers: 4_823,
  monthlyListeners: 8_200,
  location: "East London, UK",
  avatar: "/demo-artist/avatar.jpg",
  banner: "/demo-artist/banner.jpg",
};

export const demoAlbum = {
  title: "Neon Therapy",
  coverArt: "/demo-artist/cover.jpg",
  releaseDate: "2026-03-15",
  description:
    "A 9-track journey through late-night introspection, digital loneliness, and the search for something real in a hyper-connected world.",
  price: 8,
  trackPrice: 1.5,
  currency: "GBP",
  tracks: [
    { id: 1, title: "Signal Lost", duration: "3:42", preview: true },
    { id: 2, title: "Midnight Protocol", duration: "4:18", preview: true },
    { id: 3, title: "Glass Feelings", duration: "3:56", preview: true },
    { id: 4, title: "Neon Therapy", duration: "5:01", preview: false },
    { id: 5, title: "Digital Skin", duration: "3:33", preview: false },
    { id: 6, title: "Phantom Touch", duration: "4:27", preview: false },
    { id: 7, title: "Wireframe Heart", duration: "3:48", preview: false },
    { id: 8, title: "Soft Reboot", duration: "4:12", preview: false },
    { id: 9, title: "Last Frequency", duration: "6:03", preview: false },
  ],
};

export const demoBlogPosts = [
  {
    id: "writing-neon-therapy",
    title: "Writing Neon Therapy: A Late-Night Confession",
    excerpt:
      "The album started as a voice memo at 4 AM. I'd just come home from a show that changed how I think about sound...",
    date: "2026-03-10",
    readTime: "6 min",
    coverImage: "/demo-artist/blog-1.jpg",
    content: `The album started as a voice memo at 4 AM. I'd just come home from a show that changed how I think about sound — a tiny basement gig in Dalston where the reverb from the room became part of the music itself.

I went home and hummed the first melody that would become "Signal Lost" into my phone. That recording — grainy, half-asleep, brutally honest — ended up in the final mix. You can hear it if you listen carefully at the 2:14 mark.

Neon Therapy was never planned as an album. It was a collection of moments I couldn't let go of. Late nights staring at a DAW, trying to make a synth patch feel like the ache of a conversation you wish you'd had differently. Every track is a room I've been in, a feeling I couldn't name until I turned it into sound.

The title came last. "Neon Therapy" is what my flatmate called my habit of walking through Shoreditch at night when I couldn't sleep, letting the lights and noise wash over me until my head went quiet. That's what this album is — a walk through noise until you find silence.`,
  },
  {
    id: "sounds-of-east-london",
    title: "The Sounds of East London That Shaped This Record",
    excerpt:
      "Every track on this album has a field recording from somewhere within a mile of my flat. Here's the map...",
    date: "2026-02-28",
    readTime: "4 min",
    coverImage: "/demo-artist/blog-2.jpg",
    content: `I've always believed that the best music sounds like a place. Not just any place — a specific corner, a specific hour, a specific weather.

Every track on Neon Therapy contains at least one field recording captured within a mile of my flat in Hackney Wick. The hum of the canal boats on "Glass Feelings." The distant bass from a warehouse party on "Phantom Touch." The 3 AM silence of Mare Street on "Last Frequency" — which isn't really silence at all, but a low electric buzz that London never quite lets go of.

I carried a portable recorder everywhere for six months. Most of what I captured was unusable — too noisy, too random, too nothing. But the gems are woven through the album like a second voice.

If you ever walk through East London with headphones on, playing this album — that's the experience I made it for.`,
  },
  {
    id: "collaborating-with-machines",
    title: "Collaborating With Machines (And Why I Still Trust Humans More)",
    excerpt:
      "I used AI tools during production. Here's what worked, what didn't, and why the human touch still matters...",
    date: "2026-02-15",
    readTime: "5 min",
    coverImage: "/demo-artist/blog-3.jpg",
    content: `Let's get this out of the way: I used AI tools while making this album. Generative synth patches, AI-assisted mixing suggestions, even a melody generator that I bounced ideas off like a strange, tireless collaborator.

But here's what I learned: AI is brilliant at "good enough." It can generate a chord progression that sounds pleasant, a mix that sounds clean, a melody that sounds... fine. What it cannot do — and what I don't think it will do in my lifetime — is make something that hurts. That catches you off guard. That makes you text your ex at 2 AM.

The best moments on this album happened when I threw away the AI's suggestion and did something stupid instead. The off-key vocal on "Wireframe Heart." The drum pattern on "Midnight Protocol" that technically shouldn't work. The six-minute closer that any algorithm would have trimmed to four.

Music needs error. It needs stubbornness. It needs a human saying "I know this is wrong, but it feels right."

That's why I believe in platforms like Groupies — because the best music will always come from humans being gloriously, defiantly imperfect.`,
  },
];

export const demoVlogs = [
  {
    id: "studio-session-1",
    title: "Studio Session: Recording 'Signal Lost'",
    duration: "12:34",
    date: "2026-03-08",
    thumbnail: "/demo-artist/vlog-1.jpg",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "live-at-fabric",
    title: "Live at Fabric: Behind the Scenes",
    duration: "18:22",
    date: "2026-02-20",
    thumbnail: "/demo-artist/vlog-2.jpg",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "gear-tour",
    title: "My Gear Tour — What I Used to Make Neon Therapy",
    duration: "9:47",
    date: "2026-02-05",
    thumbnail: "/demo-artist/vlog-3.jpg",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

export const demoPodcasts = [
  {
    id: "ep-1",
    title: "Ep. 1 — Why I Left Streaming Behind",
    guest: null,
    duration: "24:15",
    date: "2026-03-12",
    description:
      "In the first episode, Kael talks about the economics of streaming, the emotional toll of algorithmic discovery, and why going direct-to-fan felt like the only honest choice.",
  },
  {
    id: "ep-2",
    title: "Ep. 2 — The Making of 'Neon Therapy' (with producer Zara Kline)",
    guest: "Zara Kline",
    duration: "31:40",
    date: "2026-03-05",
    description:
      "Kael sits down with producer Zara Kline to break down the production of the album — from the first demo to the final master.",
  },
  {
    id: "ep-3",
    title: "Ep. 3 — Fan Questions, Honest Answers",
    guest: null,
    duration: "19:58",
    date: "2026-02-22",
    description:
      "Kael answers questions submitted by fans — covering songwriting process, gear, influences, and the future of the project.",
  },
];

export const demoLiveSessions = [
  {
    id: "intimate-set",
    title: "Intimate Set — Full Album Playthrough",
    date: "2026-04-20",
    time: "20:00 BST",
    format: "Video" as const,
    capacity: 50,
    spotsLeft: 12,
    description:
      "A one-time live video session where Kael performs the full Neon Therapy album from start to finish, with commentary between tracks.",
  },
  {
    id: "production-masterclass",
    title: "Production Masterclass — Inside the DAW",
    date: "2026-05-02",
    time: "19:00 BST",
    format: "Video" as const,
    capacity: 30,
    spotsLeft: 8,
    description:
      "A deep dive into the production techniques behind Neon Therapy. Kael opens up the project files and walks through the sound design.",
  },
  {
    id: "fan-qa",
    title: "Fan Q&A — Ask Me Anything",
    date: "2026-05-15",
    time: "18:00 BST",
    format: "Audio" as const,
    capacity: 100,
    spotsLeft: 64,
    description:
      "An open audio session where fans can ask Kael anything — music, life, gear, the future. No script, no filter.",
  },
];

export const demoMerch = [
  {
    id: "vinyl-neon-therapy",
    name: "Neon Therapy — Limited Edition Vinyl",
    price: 28,
    category: "Music" as const,
    image: "/demo-artist/merch-vinyl.jpg",
    description: "180g vinyl with gatefold sleeve, printed inner sleeves, and download code.",
    variants: [{ type: "Edition", options: ["Black Vinyl", "Clear Neon Green (Ltd 200)"] }],
  },
  {
    id: "cd-neon-therapy",
    name: "Neon Therapy — CD",
    price: 12,
    category: "Music" as const,
    image: "/demo-artist/merch-cd.jpg",
    description: "Digipak CD with 16-page booklet and exclusive liner notes.",
    variants: [],
  },
  {
    id: "signed-poster",
    name: "Signed Album Poster",
    price: 18,
    category: "Music" as const,
    image: "/demo-artist/merch-poster.jpg",
    description: "A2 poster featuring the Neon Therapy cover art, hand-signed by Kael.",
    variants: [],
  },
  {
    id: "tee-signal",
    name: "'Signal Lost' Tee",
    price: 30,
    category: "Lifestyle" as const,
    image: "/demo-artist/merch-tee.jpg",
    description: "Heavyweight organic cotton tee with 'Signal Lost' graphic on front.",
    variants: [{ type: "Size", options: ["S", "M", "L", "XL", "XXL"] }],
  },
  {
    id: "hoodie-neon",
    name: "Neon Therapy Hoodie",
    price: 55,
    category: "Lifestyle" as const,
    image: "/demo-artist/merch-hoodie.jpg",
    description: "Oversized hoodie with embroidered Neon Therapy logo on chest.",
    variants: [{ type: "Size", options: ["S", "M", "L", "XL"] }],
  },
  {
    id: "tote-bag",
    name: "Groupies Tote Bag",
    price: 15,
    category: "Lifestyle" as const,
    image: "/demo-artist/merch-tote.jpg",
    description: "Organic canvas tote with Kael Drifter artwork print.",
    variants: [],
  },
  {
    id: "pin-set",
    name: "Neon Therapy Enamel Pin Set",
    price: 10,
    category: "Lifestyle" as const,
    image: "/demo-artist/merch-pins.jpg",
    description: "Set of 3 enamel pins — waveform, neon sign, and Groupies logo.",
    variants: [],
  },
  {
    id: "keychain",
    name: "Waveform Keychain",
    price: 8,
    category: "Lifestyle" as const,
    image: "/demo-artist/merch-keychain.jpg",
    description: "Metal keychain featuring the 'Signal Lost' waveform design.",
    variants: [],
  },
];

import {
  MusicNote,
  FilmSlate,
  Users,
  ShoppingBag,
  Video,
  Microphone,
  BookOpen,
  ChatCircleDots,
  CalendarBlank,
  VinylRecord,
} from "@phosphor-icons/react/dist/ssr";

const features = [
  {
    icon: MusicNote,
    title: "Exclusive Album Releases",
    desc: "Drop music that fans can only get here. Full albums, individual tracks, early access — you set the terms.",
    tag: "Music",
    accent: "#e8ff47",
  },
  {
    icon: FilmSlate,
    title: "Behind the Scenes",
    desc: "Blogs, vlogs, and podcasts that give fans a window into your creative world. Build a story around your music.",
    tag: "Content",
    accent: "#e8ff47",
  },
  {
    icon: Users,
    title: "Fan Community",
    desc: "Your fans in one place. Build a community that grows with every release and stays between albums.",
    tag: "Community",
    accent: "#e8ff47",
  },
  {
    icon: ShoppingBag,
    title: "Merch Store",
    desc: "Vinyls, CDs, signed prints, tees, hoodies — sell everything from music merchandise to lifestyle products.",
    tag: "Monetise",
    accent: "#e8ff47",
  },
  {
    icon: Video,
    title: "Live Sessions",
    desc: "Host intimate live sessions for paying fans. Acoustic sets, listening parties, Q&As — anything goes.",
    tag: "Live",
    accent: "#e8ff47",
  },
  {
    icon: ChatCircleDots,
    title: "Direct Fan Interaction",
    desc: "Fans can message you, make requests, and send in questions. Real engagement, no algorithm filter.",
    tag: "Interaction",
    accent: "#e8ff47",
  },
];

const secondaryFeatures = [
  { icon: Microphone, label: "Podcast hosting" },
  { icon: BookOpen, label: "Blog platform" },
  { icon: CalendarBlank, label: "Event scheduling" },
  { icon: VinylRecord, label: "Physical merch" },
];

export default function ArtistFeatures() {
  return (
    <section className="bg-[#0a0a0a] py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#e8ff47] mb-4 block">
              Everything You Need
            </span>
            <h2
              className="font-black uppercase tracking-tight text-[#f5f5f0] leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", letterSpacing: "-0.03em" }}
            >
              One platform.
              <br />
              <span style={{ WebkitTextStroke: "2px #f5f5f0", color: "transparent" }}>
                Your world.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-[#666666] text-base leading-relaxed lg:mb-2">
            Everything an artist needs to release music, build community, and
            get paid — without a label, a manager, or an algorithm.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2a2a2a]">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-[#0a0a0a] p-8 flex flex-col gap-5 group hover:bg-[#0f0f0f] transition-colors duration-300 cursor-default"
              >
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 border border-[#2a2a2a] group-hover:border-[#e8ff47]/40 flex items-center justify-center transition-colors duration-300">
                    <Icon size={22} weight="bold" className="text-[#e8ff47]" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#444444] border border-[#1e1e1e] px-2.5 py-1">
                    {feature.tag}
                  </span>
                </div>
                <div>
                  <h3 className="font-black text-base uppercase tracking-tight text-[#f5f5f0] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#666666] text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary features pill row */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <span className="text-xs font-black uppercase tracking-widest text-[#444444] mr-2">
            Also includes:
          </span>
          {secondaryFeatures.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.label}
                className="flex items-center gap-2 px-4 py-2 border border-[#2a2a2a] bg-[#111111]"
              >
                <Icon size={14} weight="bold" className="text-[#666666]" />
                <span className="text-xs font-semibold text-[#666666]">{f.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

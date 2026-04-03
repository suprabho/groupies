export default function Manifesto() {
  const problems = [
    {
      number: "01",
      who: "Artists",
      problem: "Earn $0.003 per stream",
      truth:
        "A million streams barely pays rent. Labels and platforms take everything. Artists have become content creators for someone else's algorithm.",
      fix: "On Groupies, fans pay you directly. Your music. Your price. Your fans.",
    },
    {
      number: "02",
      who: "Curators",
      problem: "Were replaced by an algorithm",
      truth:
        "The critics, bloggers, and tastemakers who built music culture were made redundant the day Spotify Discover Weekly launched. Great taste has no value on streaming platforms.",
      fix: "On Groupies, curators build their own audience and earn from the playlists they craft.",
    },
    {
      number: "03",
      who: "Fans",
      problem: "Lost the intimacy",
      truth:
        "Infinite content. Zero connection. Streaming platforms turned the artist-fan relationship into a transactional, algorithmic feed. You follow an artist and never hear from them again.",
      fix: "On Groupies, fans get exclusive music, behind-the-scenes content, live sessions, and a direct line to the artist.",
    },
  ];

  return (
    <section id="artists" className="bg-[#0a0a0a] py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-24">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#e8ff47] mb-4 block">
              The Problem
            </span>
            <h2
              className="font-black uppercase tracking-tight text-[#f5f5f0] leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", letterSpacing: "-0.03em" }}
            >
              Streaming
              <br />
              <span
                style={{ WebkitTextStroke: "2px #f5f5f0", color: "transparent" }}
              >
                Broke
              </span>{" "}
              Music.
            </h2>
          </div>
          <p className="max-w-md text-[#666666] text-base leading-relaxed lg:mb-2">
            Not the technology — the model. Algorithms optimised for attention,
            not artistry. Platforms built for scale, not relationships. It&apos;s
            time to rebuild.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#2a2a2a]">
          {problems.map((item) => (
            <div
              key={item.number}
              className="bg-[#0a0a0a] p-8 lg:p-10 flex flex-col gap-6 group hover:bg-[#111111] transition-colors duration-300"
            >
              {/* Number + who */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-[#2a2a2a] group-hover:text-[#e8ff47] transition-colors duration-300">
                  {item.number}
                </span>
                <span className="text-xs font-black uppercase tracking-widest text-[#666666] border border-[#2a2a2a] px-3 py-1">
                  {item.who}
                </span>
              </div>

              {/* Problem headline */}
              <h3 className="text-2xl font-black uppercase tracking-tight text-[#f5f5f0] leading-tight">
                {item.problem}
              </h3>

              {/* Truth */}
              <p className="text-[#666666] text-sm leading-relaxed flex-1">
                {item.truth}
              </p>

              {/* Divider */}
              <div className="h-px bg-[#1e1e1e]" />

              {/* Fix */}
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#e8ff47] mt-1.5 flex-shrink-0" />
                <p className="text-[#f5f5f0] text-sm font-semibold leading-relaxed">
                  {item.fix}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <div className="mt-16 lg:mt-24 bg-[#e8ff47] p-10 lg:p-16 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 text-[#c8de30] font-black leading-none select-none"
            style={{ fontSize: "20rem", lineHeight: "0.8", opacity: 0.3 }}
            aria-hidden
          >
            "
          </div>
          <blockquote className="relative z-10 max-w-3xl">
            <p
              className="font-black uppercase tracking-tight text-[#0a0a0a] leading-none"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3.5rem)", letterSpacing: "-0.02em" }}
            >
              Our hypothesis: fans will directly pay the artist or curator they
              love, rather than pay a flat subscription to a faceless streaming
              service.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

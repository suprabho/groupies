const phases = [
  {
    phase: "Phase I",
    status: "Now",
    statusColor: "#e8ff47",
    title: "The Pilot",
    subtitle: "10 founding artists",
    description:
      "Onboard up to 10 curated artists who release exclusive albums on the platform. Each artist builds their world — vlogs, blogs, live sessions, fan interactions, and a merch store. Artists drive traffic from Spotify, Instagram, and YouTube. We validate the hypothesis.",
    milestones: [
      "Platform launch",
      "10 exclusive album releases",
      "Fan monetisation live",
      "Merch stores open",
    ],
  },
  {
    phase: "Phase II",
    status: "2025",
    statusColor: "#666666",
    title: "Labels & Managers",
    subtitle: "100 artists target",
    description:
      "Use monetisation data from the pilot to approach music managers and independent labels. The data story becomes the pitch — here is what direct fan monetisation looks like at scale. Expand to 100 artists.",
    milestones: [
      "Pilot data report published",
      "Label outreach programme",
      "Manager partnerships",
      "100 artist milestone",
    ],
  },
  {
    phase: "Phase III",
    status: "2026",
    statusColor: "#666666",
    title: "The Platform",
    subtitle: "Full streaming partner",
    description:
      "Become a full music streaming platform. Partner with music distribution platforms to expand the catalogue while preserving the human-first curation layer that makes Groupies distinct.",
    milestones: [
      "Distribution partnerships",
      "Curator marketplace launch",
      "Mobile apps (iOS + Android)",
      "Full streaming catalogue",
    ],
  },
];

export default function Roadmap() {
  return (
    <section className="bg-[#0a0a0a] py-24 lg:py-36 border-t border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-[#e8ff47] mb-4 block">
            Roadmap
          </span>
          <h2
            className="font-black uppercase tracking-tight text-[#f5f5f0] leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", letterSpacing: "-0.03em" }}
          >
            The ground
            <br />
            <span style={{ WebkitTextStroke: "2px #f5f5f0", color: "transparent" }}>
              floor is open.
            </span>
          </h2>
        </div>

        {/* Phase cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-[#2a2a2a]">
          {phases.map((phase, i) => (
            <div
              key={i}
              className={`relative p-8 lg:p-10 flex flex-col gap-6 ${
                i < 2 ? "border-b lg:border-b-0 lg:border-r border-[#2a2a2a]" : ""
              } ${i === 0 ? "bg-[#0f0f0f]" : "bg-transparent opacity-60"}`}
            >
              {/* Active phase accent */}
              {i === 0 && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#e8ff47]" />
              )}

              {/* Phase + Status */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-[#444444]">
                  {phase.phase}
                </span>
                <span
                  className="text-xs font-black uppercase tracking-widest px-3 py-1 border"
                  style={{
                    color: phase.statusColor,
                    borderColor: phase.statusColor + "40",
                    backgroundColor: phase.statusColor + "10",
                  }}
                >
                  {phase.status}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3
                  className="font-black uppercase tracking-tight text-[#f5f5f0] leading-none mb-1"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", letterSpacing: "-0.02em" }}
                >
                  {phase.title}
                </h3>
                <p className="text-xs font-black uppercase tracking-widest text-[#666666]">
                  {phase.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-[#666666] text-sm leading-relaxed">{phase.description}</p>

              {/* Milestones */}
              <ul className="flex flex-col gap-2 mt-auto pt-6 border-t border-[#1e1e1e]">
                {phase.milestones.map((m) => (
                  <li key={m} className="flex items-center gap-2.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: i === 0 ? "#e8ff47" : "#2a2a2a" }}
                    />
                    <span className="text-xs font-semibold text-[#999999]">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

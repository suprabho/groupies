import { CheckCircle, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const tiers = [
  {
    range: "Under 2,500",
    unit: "monthly Spotify listeners",
    commission: "10%",
    commissionLabel: "platform commission",
    description:
      "Just starting out. We take a small cut to keep the lights on as you build your audience. No upfront costs, no monthly fees.",
    highlight: false,
    cta: "Apply as Artist",
    perks: [
      "Full platform access",
      "Unlimited uploads",
      "Merch store included",
      "Fan interaction tools",
      "Analytics dashboard",
    ],
  },
  {
    range: "2,500 – 10,000",
    unit: "monthly Spotify listeners",
    commission: "5%",
    commissionLabel: "platform commission",
    description:
      "You're growing. As your audience scales, our take drops. We built this to reward artists who bring fans to the platform.",
    highlight: true,
    cta: "Apply as Artist",
    perks: [
      "Full platform access",
      "Unlimited uploads",
      "Merch store included",
      "Fan interaction tools",
      "Analytics dashboard",
      "Priority onboarding support",
    ],
  },
  {
    range: "100,000+",
    unit: "monthly Spotify listeners",
    commission: "0%",
    commissionLabel: "platform commission",
    description:
      "Established artists pay nothing. We grow by growing with you. Bring your fans here and we'll build the best home for them.",
    highlight: false,
    cta: "Let's talk",
    perks: [
      "Full platform access",
      "Unlimited uploads",
      "Merch store included",
      "Fan interaction tools",
      "Analytics dashboard",
      "Dedicated account support",
      "Custom artist page design",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-[#111111] py-24 lg:py-36 border-t border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-[#e8ff47] mb-4 block">
            Pricing
          </span>
          <h2
            className="font-black uppercase tracking-tight text-[#f5f5f0] leading-none mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", letterSpacing: "-0.03em" }}
          >
            We grow
            <br />
            <span style={{ WebkitTextStroke: "2px #f5f5f0", color: "transparent" }}>
              when you grow.
            </span>
          </h2>
          <p className="max-w-xl text-[#666666] text-base leading-relaxed">
            No subscription fees. No upfront costs. We only take a cut when you
            earn — and that cut shrinks the bigger your audience gets.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-[#2a2a2a]">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`relative flex flex-col p-8 lg:p-10 ${
                i < 2 ? "border-b lg:border-b-0 lg:border-r border-[#2a2a2a]" : ""
              } ${tier.highlight ? "bg-[#161616]" : "bg-transparent"}`}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#e8ff47]" />
              )}
              {tier.highlight && (
                <span className="inline-block mb-4 text-[10px] font-black uppercase tracking-widest text-[#0a0a0a] bg-[#e8ff47] px-3 py-1 w-fit">
                  Most Common
                </span>
              )}

              {/* Listener range */}
              <div className="mb-6">
                <p className="text-xs font-black uppercase tracking-widest text-[#666666] mb-1">
                  {tier.unit}
                </p>
                <p
                  className="font-black text-[#f5f5f0] leading-tight"
                  style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)", letterSpacing: "-0.02em" }}
                >
                  {tier.range}
                </p>
              </div>

              {/* Commission */}
              <div className="mb-6">
                <span
                  className="font-black text-[#e8ff47] leading-none"
                  style={{ fontSize: "clamp(3rem, 5vw, 5rem)", letterSpacing: "-0.03em" }}
                >
                  {tier.commission}
                </span>
                <p className="text-sm text-[#666666] font-semibold mt-1 uppercase tracking-wider">
                  {tier.commissionLabel}
                </p>
              </div>

              <p className="text-[#666666] text-sm leading-relaxed mb-8">
                {tier.description}
              </p>

              {/* Perks */}
              <ul className="flex flex-col gap-2.5 mb-10 flex-1">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2.5">
                    <CheckCircle size={16} weight="fill" className="text-[#e8ff47] flex-shrink-0" />
                    <span className="text-sm text-[#999999]">{perk}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="#join"
                className={`group inline-flex items-center justify-center gap-2 px-5 py-3 font-black text-sm uppercase tracking-wider transition-colors duration-200 ${
                  tier.highlight
                    ? "bg-[#e8ff47] text-[#0a0a0a] hover:bg-[#f5f5f0]"
                    : "border border-[#2a2a2a] text-[#f5f5f0] hover:border-[#f5f5f0]"
                }`}
              >
                {tier.cta}
                <ArrowRight
                  size={14}
                  weight="bold"
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Small print */}
        <p className="mt-6 text-xs text-[#444444] text-center">
          Commission applies to revenue generated on Groupies only. No lock-in. Cancel anytime.
          Payment processing fees (Stripe ~1.4% + 20p) applied separately.
        </p>
      </div>
    </section>
  );
}

import Link from "next/link";
import { InstagramLogo, TwitterLogo, SpotifyLogo } from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#2a2a2a] mt-auto">
      {/* Top strip */}
      <div className="bg-[#e8ff47] py-3 overflow-hidden">
        <div className="marquee-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 px-6 text-[#0a0a0a] font-black text-sm uppercase tracking-widest"
            >
              GROUPIES
              <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a] inline-block" />
              YOUR MUSIC. YOUR FANS. YOUR RULES.
              <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a] inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-black uppercase tracking-tighter text-[#f5f5f0]">
            Groupies
          </span>
          <p className="text-[#666666] text-sm leading-relaxed max-w-xs">
            A human-first music platform. No algorithms. Direct fan support.
            Artists keep control.
          </p>
          <div className="flex items-center gap-4 mt-2">
            {[InstagramLogo, TwitterLogo, SpotifyLogo].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-[#666666] hover:text-[#e8ff47] transition-colors duration-200"
              >
                <Icon size={20} weight="bold" />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#666666] mb-1">
              Platform
            </span>
            {["For Artists", "For Curators", "For Fans", "Pricing"].map((l) => (
              <Link
                key={l}
                href="#"
                className="text-sm text-[#999999] hover:text-[#f5f5f0] transition-colors duration-200"
              >
                {l}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#666666] mb-1">
              Company
            </span>
            {["About", "Blog", "Press", "Contact"].map((l) => (
              <Link
                key={l}
                href="#"
                className="text-sm text-[#999999] hover:text-[#f5f5f0] transition-colors duration-200"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-black uppercase tracking-widest text-[#666666]">
            Be the first
          </span>
          <p className="text-sm text-[#999999] leading-relaxed">
            We&apos;re onboarding our founding 10 artists now. Apply before spots are gone.
          </p>
          <Link
            href="#join"
            className="inline-block px-5 py-3 bg-[#e8ff47] text-[#0a0a0a] text-sm font-black uppercase tracking-wider hover:bg-[#f5f5f0] transition-colors duration-200 text-center"
          >
            Apply Now
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1e1e1e] max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-[#444444]">
          © {new Date().getFullYear()} Groupies. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {["Privacy", "Terms", "Cookies"].map((l) => (
            <Link
              key={l}
              href="#"
              className="text-xs text-[#444444] hover:text-[#999999] transition-colors duration-200"
            >
              {l}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

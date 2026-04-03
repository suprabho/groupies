"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#2a2a2a]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-black tracking-tighter uppercase text-[#f5f5f0] group-hover:text-[#e8ff47] transition-colors duration-200">
            Groupies
          </span>
          <span className="hidden sm:block w-2 h-2 rounded-full bg-[#e8ff47]" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "For Artists", href: "#artists" },
            { label: "How It Works", href: "#how-it-works" },
            { label: "Pricing", href: "#pricing" },
            { label: "Demo", href: "/artist/demo" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-wider text-[#999999] hover:text-[#f5f5f0] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#join"
            className="px-5 py-2.5 bg-[#e8ff47] text-[#0a0a0a] text-sm font-black uppercase tracking-wider hover:bg-[#f5f5f0] transition-colors duration-200"
          >
            Join as Artist
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#f5f5f0]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#111111] border-t border-[#2a2a2a] px-6 py-6 flex flex-col gap-4">
          {[
            { label: "For Artists", href: "#artists" },
            { label: "How It Works", href: "#how-it-works" },
            { label: "Pricing", href: "#pricing" },
            { label: "Demo Artist Page", href: "/artist/demo" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-base font-bold uppercase tracking-wider text-[#f5f5f0]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#join"
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-5 py-3 bg-[#e8ff47] text-[#0a0a0a] text-sm font-black uppercase tracking-wider text-center"
          >
            Join as Artist
          </Link>
        </div>
      )}
    </header>
  );
}

"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, WarningCircle } from "@phosphor-icons/react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ArtistCTA() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    social: "",
    listeners: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    // Simulate submission — replace with actual API call
    await new Promise((r) => setTimeout(r, 1200));
    setFormState("success");
  };

  return (
    <section
      id="join"
      className="bg-[#e8ff47] py-24 lg:py-36 relative overflow-hidden"
    >
      {/* Background texture number */}
      <div
        className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-black text-[#c8de30] leading-none"
          style={{ fontSize: "clamp(12rem, 30vw, 28rem)", letterSpacing: "-0.05em" }}
        >
          10
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left — copy */}
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#666666] mb-4 block">
              Apply Now
            </span>
            <h2
              className="font-black uppercase tracking-tight text-[#0a0a0a] leading-none mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", letterSpacing: "-0.03em" }}
            >
              Be one of
              <br />
              the first
              <br />
              10 artists.
            </h2>
            <p className="text-[#333333] text-base leading-relaxed max-w-sm mb-8">
              We&apos;re hand-picking the founding cohort of artists on Groupies.
              Share your details and we&apos;ll be in touch within 48 hours.
            </p>

            {/* What you get */}
            <ul className="flex flex-col gap-2.5">
              {[
                "Exclusive founding artist status",
                "Platform fee locked at pilot rates — forever",
                "Co-build the product with us",
                "First look at all new features",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <CheckCircle size={16} weight="fill" className="text-[#0a0a0a] flex-shrink-0" />
                  <span className="text-sm font-semibold text-[#333333]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div className="bg-[#0a0a0a] p-8 lg:p-10">
            {formState === "success" ? (
              <div className="flex flex-col items-center gap-4 text-center py-8">
                <CheckCircle size={48} weight="fill" className="text-[#e8ff47]" />
                <h3 className="font-black text-xl uppercase tracking-tight text-[#f5f5f0]">
                  You&apos;re on the list.
                </h3>
                <p className="text-[#666666] text-sm leading-relaxed max-w-xs">
                  We&apos;ll review your application and get back to you within 48 hours. Keep making great music.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[#666666] mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Artist or band name"
                    className="w-full bg-[#161616] border border-[#2a2a2a] px-4 py-3 text-sm text-[#f5f5f0] placeholder-[#444444] focus:outline-none focus:border-[#e8ff47] transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[#666666] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full bg-[#161616] border border-[#2a2a2a] px-4 py-3 text-sm text-[#f5f5f0] placeholder-[#444444] focus:outline-none focus:border-[#e8ff47] transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[#666666] mb-2">
                    Spotify / Social Link
                  </label>
                  <input
                    type="url"
                    value={form.social}
                    onChange={(e) => setForm({ ...form, social: e.target.value })}
                    placeholder="https://open.spotify.com/artist/..."
                    className="w-full bg-[#161616] border border-[#2a2a2a] px-4 py-3 text-sm text-[#f5f5f0] placeholder-[#444444] focus:outline-none focus:border-[#e8ff47] transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[#666666] mb-2">
                    Monthly Spotify Listeners
                  </label>
                  <select
                    value={form.listeners}
                    onChange={(e) => setForm({ ...form, listeners: e.target.value })}
                    className="w-full bg-[#161616] border border-[#2a2a2a] px-4 py-3 text-sm text-[#f5f5f0] focus:outline-none focus:border-[#e8ff47] transition-colors duration-200 appearance-none"
                  >
                    <option value="" className="text-[#444444]">Select range</option>
                    <option value="under-2500">Under 2,500</option>
                    <option value="2500-10000">2,500 – 10,000</option>
                    <option value="10000-100000">10,000 – 100,000</option>
                    <option value="100000+">100,000+</option>
                    <option value="not-on-spotify">Not on Spotify yet</option>
                  </select>
                </div>

                {formState === "error" && (
                  <div className="flex items-center gap-2 text-[#ff4d4d] text-sm">
                    <WarningCircle size={16} weight="fill" />
                    <span>Something went wrong. Please try again.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="group mt-2 inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#e8ff47] text-[#0a0a0a] font-black text-sm uppercase tracking-wider hover:bg-[#f5f5f0] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formState === "submitting" ? "Sending..." : "Apply for Founding Spot"}
                  {formState !== "submitting" && (
                    <ArrowRight
                      size={16}
                      weight="bold"
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    />
                  )}
                </button>

                <p className="text-[#444444] text-xs text-center">
                  No spam. No subscriptions. Just a reply from a human.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import {
  CalendarBlank,
  VideoCamera,
  Microphone,
  Users,
  CheckCircle,
} from "@phosphor-icons/react";

interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  format: "Video" | "Audio";
  capacity: number;
  spotsLeft: number;
  description: string;
}

interface LiveSessionSignupProps {
  sessions: Session[];
}

function SessionCard({ session }: { session: Session }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const isSoldOut = session.spotsLeft === 0;
  const FormatIcon = session.format === "Video" ? VideoCamera : Microphone;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim() === "" || email.trim() === "") return;
    setConfirmed(true);
  }

  const inputClasses =
    "w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-3 text-[#f5f5f0] text-sm placeholder:text-[#666666] outline-none transition-colors duration-200 focus:border-[#e8ff47]";

  return (
    <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-[#f5f5f0] text-base font-bold leading-snug">
          {session.title}
        </h4>
        <span
          className={`shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
            session.format === "Video"
              ? "bg-[#e8ff47]/10 text-[#e8ff47]"
              : "bg-[#ff4d4d]/10 text-[#ff4d4d]"
          }`}
        >
          <FormatIcon size={14} weight="bold" />
          {session.format}
        </span>
      </div>

      {/* Date / Time */}
      <div className="flex items-center gap-2 text-sm text-[#999999]">
        <CalendarBlank size={16} weight="bold" />
        <span>
          {session.date} at {session.time}
        </span>
      </div>

      {/* Capacity */}
      <div className="flex items-center gap-2 text-sm text-[#666666]">
        <Users size={16} weight="bold" className="text-[#999999]" />
        {isSoldOut ? (
          <span className="text-[#ff4d4d] font-semibold">Sold Out</span>
        ) : (
          <span>
            <span className="text-[#f5f5f0] font-semibold">{session.spotsLeft}</span> of{" "}
            {session.capacity} spots left
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-[#999999] text-sm leading-relaxed">
        {session.description}
      </p>

      {/* Action area */}
      {isSoldOut ? (
        <div className="flex items-center justify-center py-3 rounded-full bg-[#2a2a2a] text-[#666666] text-sm font-bold uppercase tracking-wider">
          Sold Out
        </div>
      ) : confirmed ? (
        <div className="flex flex-col items-center gap-2 py-4 text-center">
          <CheckCircle size={32} weight="fill" className="text-green-500" />
          <p className="text-[#f5f5f0] text-sm font-semibold">You&apos;re in!</p>
          <p className="text-[#999999] text-xs">
            Check your email for details.
          </p>
        </div>
      ) : showForm ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={inputClasses}
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputClasses}
          />
          <button
            type="submit"
            disabled={name.trim() === "" || email.trim() === ""}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#e8ff47] text-[#0a0a0a] text-sm font-bold uppercase tracking-wider hover:bg-[#c8de30] transition-colors duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <CheckCircle size={18} weight="bold" />
            Confirm Reservation
          </button>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#e8ff47] text-[#0a0a0a] text-sm font-bold uppercase tracking-wider hover:bg-[#c8de30] transition-colors duration-200 cursor-pointer"
        >
          Reserve My Spot
        </button>
      )}
    </div>
  );
}

export default function LiveSessionSignup({ sessions }: LiveSessionSignupProps) {
  return (
    <div className="flex flex-col gap-4">
      {sessions.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
    </div>
  );
}

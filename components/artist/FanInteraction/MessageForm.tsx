"use client";

import { useState } from "react";
import {
  PaperPlaneTilt,
  CheckCircle,
  Envelope,
} from "@phosphor-icons/react";

interface MessageFormProps {
  artistName: string;
}

export default function MessageForm({ artistName }: MessageFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const maxChars = 500;
  const charsLeft = maxChars - message.length;
  const isValid = name.trim() !== "" && email.trim() !== "" && message.trim() !== "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-center">
        <CheckCircle size={48} weight="fill" className="text-green-500" />
        <p className="text-[#f5f5f0] text-lg font-semibold">Message sent!</p>
        <p className="text-[#999999] text-sm">
          {artistName} will see your message.
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-3 text-[#f5f5f0] text-sm placeholder:text-[#666666] outline-none transition-colors duration-200 focus:border-[#e8ff47]";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-6 md:p-8 flex flex-col gap-5"
    >
      <div className="flex items-center gap-2 mb-1">
        <Envelope size={20} weight="bold" className="text-[#e8ff47]" />
        <h3 className="text-[#f5f5f0] text-lg font-bold">
          Send a Message to {artistName}
        </h3>
      </div>

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="fan-name" className="text-[#999999] text-xs font-semibold uppercase tracking-wider">
          Your Name
        </label>
        <input
          id="fan-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className={inputClasses}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="fan-email" className="text-[#999999] text-xs font-semibold uppercase tracking-wider">
          Email
        </label>
        <input
          id="fan-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputClasses}
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="fan-message" className="text-[#999999] text-xs font-semibold uppercase tracking-wider">
          Message
        </label>
        <textarea
          id="fan-message"
          required
          rows={5}
          maxLength={maxChars}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message..."
          className={`${inputClasses} resize-none`}
        />
        <span
          className={`text-xs self-end font-medium ${
            charsLeft < 50 ? "text-[#ff4d4d]" : "text-[#666666]"
          }`}
        >
          {charsLeft} / {maxChars}
        </span>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#e8ff47] text-[#0a0a0a] text-sm font-bold uppercase tracking-wider hover:bg-[#c8de30] transition-colors duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <PaperPlaneTilt size={18} weight="bold" />
        Send Message
      </button>
    </form>
  );
}

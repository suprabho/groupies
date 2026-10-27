"use client";

import { useState } from "react";
import {
  Gift,
  PaperPlaneTilt,
  CheckCircle,
} from "@phosphor-icons/react";

interface RequestFormProps {
  artistName: string;
}

const requestTypes = ["Song Dedication", "Q&A", "Shoutout", "Other"];

export default function RequestForm({ artistName }: RequestFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [requestType, setRequestType] = useState("");
  const [details, setDetails] = useState("");
  const [isGift, setIsGift] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    requestType !== "" &&
    details.trim() !== "" &&
    (!isGift || recipientName.trim() !== "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-center">
        <CheckCircle size={48} weight="fill" className="text-green-500" />
        <p className="text-[#f5f5f0] text-lg font-semibold">Request submitted!</p>
        <p className="text-[#999999] text-sm">
          {artistName} will review your request soon.
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
        <Gift size={20} weight="bold" className="text-[#e8ff47]" />
        <h3 className="text-[#f5f5f0] text-lg font-bold">
          Submit a Request to {artistName}
        </h3>
      </div>

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="req-name" className="text-[#999999] text-xs font-semibold uppercase tracking-wider">
          Your Name
        </label>
        <input
          id="req-name"
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
        <label htmlFor="req-email" className="text-[#999999] text-xs font-semibold uppercase tracking-wider">
          Email
        </label>
        <input
          id="req-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputClasses}
        />
      </div>

      {/* Request Type */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="req-type" className="text-[#999999] text-xs font-semibold uppercase tracking-wider">
          Request Type
        </label>
        <select
          id="req-type"
          required
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
          className={`${inputClasses} appearance-none cursor-pointer`}
        >
          <option value="" disabled>
            Select a request type
          </option>
          {requestTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="req-details" className="text-[#999999] text-xs font-semibold uppercase tracking-wider">
          Details
        </label>
        <textarea
          id="req-details"
          required
          rows={4}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Tell us more about your request..."
          className={`${inputClasses} resize-none`}
        />
      </div>

      {/* Gift Toggle */}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setIsGift(!isGift)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
              isGift ? "bg-[#e8ff47]" : "bg-[#2a2a2a]"
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-[#f5f5f0] transition-transform duration-200 ${
                isGift ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </div>
          <span className="text-[#999999] text-sm font-medium group-hover:text-[#f5f5f0] transition-colors duration-200">
            Make it a gift for someone?
          </span>
        </button>

        {isGift && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="req-recipient" className="text-[#999999] text-xs font-semibold uppercase tracking-wider">
              Recipient Name
            </label>
            <input
              id="req-recipient"
              type="text"
              required={isGift}
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Who is this for?"
              className={inputClasses}
            />
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#e8ff47] text-[#0a0a0a] text-sm font-bold uppercase tracking-wider hover:bg-[#c8de30] transition-colors duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <PaperPlaneTilt size={18} weight="bold" />
        Submit Request
      </button>
    </form>
  );
}

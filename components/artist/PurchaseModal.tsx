"use client";

import { useState } from "react";
import { X, CreditCard, CheckCircle } from "@phosphor-icons/react";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "album" | "track";
  itemName: string;
  price: number;
  currency: string;
}

export default function PurchaseModal({
  isOpen,
  onClose,
  type,
  itemName,
  price,
  currency,
}: PurchaseModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-[#161616] border border-[#2a2a2a] rounded-2xl p-6 shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 text-[#666666] hover:text-[#f5f5f0] transition-colors"
          aria-label="Close"
        >
          <X size={20} weight="bold" />
        </button>

        {submitted ? (
          /* Success state */
          <div className="flex flex-col items-center py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#e8ff47]/10 flex items-center justify-center mb-4">
              <CheckCircle size={40} weight="fill" className="text-[#e8ff47]" />
            </div>
            <h3 className="text-xl font-bold text-[#f5f5f0] mb-2">
              Purchase Complete!
            </h3>
            <p className="text-sm text-[#999999] mb-1">
              You now have access to
            </p>
            <p className="text-[#e8ff47] font-medium">{itemName}</p>
            <p className="text-xs text-[#666666] mt-4">
              This is a demo — no real charge was made.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 px-6 py-2.5 bg-[#1e1e1e] border border-[#2a2a2a] text-[#f5f5f0] rounded-full text-sm font-medium hover:bg-[#2a2a2a] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          /* Purchase form */
          <>
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest text-[#666666] mb-1">
                {type === "album" ? "Buy Album" : "Buy Track"}
              </p>
              <h3 className="text-lg font-bold text-[#f5f5f0]">{itemName}</h3>
              <p className="text-2xl font-bold text-[#e8ff47] mt-2">
                {currency}
                {price.toFixed(2)}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="purchase-name"
                  className="block text-xs uppercase tracking-widest text-[#666666] mb-1.5"
                >
                  Name
                </label>
                <input
                  id="purchase-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg text-sm text-[#f5f5f0] placeholder-[#666666] outline-none focus:border-[#e8ff47]/50 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="purchase-email"
                  className="block text-xs uppercase tracking-widest text-[#666666] mb-1.5"
                >
                  Email
                </label>
                <input
                  id="purchase-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg text-sm text-[#f5f5f0] placeholder-[#666666] outline-none focus:border-[#e8ff47]/50 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#e8ff47] text-[#0a0a0a] rounded-full text-sm font-bold hover:brightness-110 transition-all mt-2"
              >
                <CreditCard size={18} weight="bold" />
                Pay with Stripe
              </button>

              <p className="text-xs text-center text-[#666666]">
                Demo mode — no real payment will be processed.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

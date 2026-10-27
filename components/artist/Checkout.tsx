"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle, X } from "@phosphor-icons/react";
import { btn, field, label } from "./ui";
import { useWorld, type CheckoutRequest } from "./state";

export default function Checkout() {
  const { checkout } = useWorld();
  // The dialog unmounts on close, so stage and method start fresh on every open.
  if (!checkout) return null;
  return <CheckoutDialog checkout={checkout} />;
}

function CheckoutDialog({ checkout }: { checkout: CheckoutRequest }) {
  const { closeCheckout, money } = useWorld();
  const [stage, setStage] = useState<"form" | "paying" | "done">("form");
  const [method, setMethod] = useState<"UPI" | "Card">("UPI");
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = window.setTimeout(() => firstField.current?.focus(), 30);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCheckout();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [closeCheckout]);

  const total = checkout.lines.reduce((n, l) => n + l.price, 0);

  const pay = (e: FormEvent) => {
    e.preventDefault();
    setStage("paying");
    window.setTimeout(() => {
      setStage("done");
      checkout.onDone?.();
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={closeCheckout}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        onMouseDown={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-xl bg-(--a-surface) p-6 shadow-2xl sm:rounded-xl md:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="checkout-title" className="font-display text-[36px] font-extrabold leading-none">
            {stage === "done" ? "Done" : checkout.title}
          </h2>
          <button type="button" onClick={closeCheckout} aria-label="Close" className="-mr-2 -mt-1 rounded-full p-2 text-(--a-muted) hover:text-(--a-ink)">
            <X size={22} />
          </button>
        </div>

        {stage === "done" ? (
          <div className="py-6">
            <CheckCircle size={48} weight="fill" className="text-(--a-accent)" aria-hidden />
            <p role="status" className="mt-4 text-[18px] leading-snug">
              {checkout.success}
            </p>
            <button type="button" className={`${btn.primary} mt-8`} onClick={closeCheckout}>
              Back to the page
            </button>
          </div>
        ) : (
          <form onSubmit={pay} className="mt-6 space-y-6">
            <ul className="space-y-2 border-y border-(--a-ink)/10 py-4">
              {checkout.lines.map((l, i) => (
                <li key={i} className="flex justify-between gap-4 text-[16px]">
                  <span>{l.label}</span>
                  <span className="tabular-nums">{money(l.price)}</span>
                </li>
              ))}
              <li className="flex justify-between gap-4 pt-2 text-[18px] font-semibold">
                <span>Total</span>
                <span className="tabular-nums">
                  {money(total)}
                  {checkout.recurring ? " a month" : ""}
                </span>
              </li>
            </ul>
            <div>
              <label htmlFor="co-email" className={label}>
                Email for your receipt
              </label>
              <input ref={firstField} id="co-email" type="email" required className={field} placeholder="you@example.com" autoComplete="email" />
            </div>
            <fieldset>
              <legend className={label}>Pay with</legend>
              <div className="grid grid-cols-2 gap-3">
                {(["UPI", "Card"] as const).map((m) => (
                  <label
                    key={m}
                    className={`cursor-pointer rounded-md border px-4 py-3 text-center text-[16px] font-semibold ${
                      method === m ? "border-(--a-accent) text-(--a-ink)" : "border-(--a-ink)/15 text-(--a-muted)"
                    }`}
                  >
                    <input type="radio" name="method" value={m} checked={method === m} onChange={() => setMethod(m)} className="sr-only" />
                    {m}
                  </label>
                ))}
              </div>
            </fieldset>
            {method === "UPI" ? (
              <div>
                <label htmlFor="co-upi" className={label}>
                  UPI ID
                </label>
                <input id="co-upi" className={field} placeholder="name@bank" required />
              </div>
            ) : (
              <div>
                <label htmlFor="co-card" className={label}>
                  Card number
                </label>
                <input id="co-card" inputMode="numeric" className={field} placeholder="4242 4242 4242 4242" required />
              </div>
            )}
            <button type="submit" className={`${btn.primary} w-full`} disabled={stage === "paying"}>
              {stage === "paying" ? "Paying…" : checkout.recurring ? `Start membership for ${money(total)} a month` : `Pay ${money(total)}`}
            </button>
            <p className="text-center text-[13px] text-(--a-muted)">Demo checkout. No payment is taken.</p>
          </form>
        )}
      </div>
    </div>
  );
}

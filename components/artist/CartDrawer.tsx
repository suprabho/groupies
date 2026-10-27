"use client";

import { useEffect } from "react";
import { Minus, Plus, X } from "@phosphor-icons/react";
import { btn } from "./ui";
import { useWorld } from "./state";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQty, money, openCheckout, clearCart } = useWorld();
  const subtotal = cart.reduce((n, l) => n + l.price * l.qty, 0);
  const hasMerch = cart.some((l) => l.kind === "merch");

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, setCartOpen]);

  return (
    <div className={`fixed inset-0 z-50 ${cartOpen ? "" : "pointer-events-none"}`} aria-hidden={!cartOpen}>
      <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${cartOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setCartOpen(false)} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-(--a-ink)/10 bg-(--a-surface) shadow-2xl transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-(--a-ink)/10 px-6 py-5">
          <h2 className="font-display text-[26px] font-black uppercase leading-none tracking-[-0.02em]">Your bag</h2>
          <button type="button" onClick={() => setCartOpen(false)} aria-label="Close bag" className="rounded-full p-2 text-(--a-muted) hover:text-(--a-ink)" tabIndex={cartOpen ? 0 : -1}>
            <X size={22} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-4 px-6">
            <p className="text-[18px]">Nothing in here yet.</p>
            <p className="text-[15px] text-(--a-muted)">Add a record, a tee or a single track and it will wait here.</p>
            <a href="#merch" onClick={() => setCartOpen(false)} className={btn.secondary} tabIndex={cartOpen ? 0 : -1}>
              Browse merch
            </a>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-(--a-ink)/10 overflow-y-auto px-6">
              {cart.map((l) => (
                <li key={l.key} className="flex items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <p className="truncate font-display text-[14px] font-extrabold uppercase">{l.name}</p>
                    <p className="text-[14px] text-(--a-muted)">
                      {l.variant ? `Size ${l.variant}, ` : ""}
                      {money(l.price)}
                    </p>
                  </div>
                  {l.kind === "merch" ? (
                    <div className="flex items-center gap-1 rounded-full border border-(--a-ink)/20">
                      <button type="button" onClick={() => setQty(l.key, l.qty - 1)} className="p-2" aria-label={`One less ${l.name}`} tabIndex={cartOpen ? 0 : -1}>
                        <Minus size={14} />
                      </button>
                      <span className="w-5 text-center text-[15px] tabular-nums">{l.qty}</span>
                      <button type="button" onClick={() => setQty(l.key, l.qty + 1)} className="p-2" aria-label={`One more ${l.name}`} tabIndex={cartOpen ? 0 : -1}>
                        <Plus size={14} />
                      </button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => setQty(l.key, 0)} className="text-[14px] text-(--a-muted) underline hover:text-(--a-ink)" tabIndex={cartOpen ? 0 : -1}>
                      Remove
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <div className="border-t border-(--a-ink)/10 px-6 py-5">
              <div className="flex justify-between font-display text-[17px] font-extrabold uppercase">
                <span>Subtotal</span>
                <span className="tabular-nums">{money(subtotal)}</span>
              </div>
              <p className="mt-1 text-[14px] text-(--a-muted)">{hasMerch ? "Shipping is worked out at checkout." : "Downloads unlock straight after you pay."}</p>
              <button
                type="button"
                className={`${btn.primary} mt-5 w-full`}
                tabIndex={cartOpen ? 0 : -1}
                onClick={() =>
                  openCheckout({
                    title: "Check out",
                    lines: cart.map((l) => ({ label: `${l.name}${l.variant ? ` (${l.variant})` : ""}${l.qty > 1 ? ` x${l.qty}` : ""}`, price: l.price * l.qty })),
                    success: hasMerch ? "Order placed. We'll email you when it ships." : "Paid. Your tracks are in your library.",
                    onDone: clearCart,
                  })
                }
              >
                Check out
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

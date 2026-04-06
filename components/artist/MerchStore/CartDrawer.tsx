"use client";

import { useState } from "react";
import { X, Minus, Plus, Trash, ShoppingBag, CreditCard } from "@phosphor-icons/react";

interface CartItem {
  item: { id: string; name: string; price: number };
  selectedVariants: Record<string, string>;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const [checkoutMessage, setCheckoutMessage] = useState(false);

  const subtotal = items.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0
  );

  function handleCheckout() {
    setCheckoutMessage(true);
    setTimeout(() => setCheckoutMessage(false), 3000);
  }

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-[400px] flex-col bg-[#111111] border-l border-[#2a2a2a] shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2a2a2a] px-5 py-4">
          <h2 className="text-lg font-semibold text-[#f5f5f0]">Your Cart</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-lg p-1.5 text-[#999999] transition-colors hover:bg-[#1e1e1e] hover:text-[#f5f5f0] cursor-pointer"
          >
            <X size={22} weight="bold" />
          </button>
        </div>

        {/* Cart content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center gap-3 px-5 py-16 text-center">
              <ShoppingBag size={48} weight="thin" className="text-[#666666]" />
              <p className="text-base font-medium text-[#666666]">
                Your cart is empty
              </p>
              <p className="text-sm text-[#666666]/60">
                Browse merch and add items to get started.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-[#2a2a2a]">
              {items.map((entry, index) => (
                <li key={index} className="flex gap-4 px-5 py-4">
                  <div className="flex flex-1 flex-col gap-1.5">
                    {/* Item name */}
                    <span className="text-sm font-semibold text-[#f5f5f0]">
                      {entry.item.name}
                    </span>

                    {/* Selected variants */}
                    {Object.keys(entry.selectedVariants).length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {Object.entries(entry.selectedVariants).map(
                          ([type, value]) => (
                            <span
                              key={type}
                              className="rounded bg-[#1e1e1e] px-2 py-0.5 text-[11px] text-[#999999]"
                            >
                              {type}: {value}
                            </span>
                          )
                        )}
                      </div>
                    )}

                    {/* Price */}
                    <span className="text-sm text-[#999999]">
                      £{entry.item.price.toFixed(2)}
                    </span>

                    {/* Quantity controls */}
                    <div className="mt-1 flex items-center gap-2">
                      <button
                        onClick={() =>
                          onUpdateQuantity(index, Math.max(1, entry.quantity - 1))
                        }
                        className="flex items-center justify-center rounded-md border border-[#2a2a2a] bg-[#161616] p-1 text-[#999999] transition-colors hover:border-[#e8ff47]/30 hover:text-[#f5f5f0] cursor-pointer"
                      >
                        <Minus size={14} weight="bold" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium text-[#f5f5f0]">
                        {entry.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(index, entry.quantity + 1)}
                        className="flex items-center justify-center rounded-md border border-[#2a2a2a] bg-[#161616] p-1 text-[#999999] transition-colors hover:border-[#e8ff47]/30 hover:text-[#f5f5f0] cursor-pointer"
                      >
                        <Plus size={14} weight="bold" />
                      </button>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="self-start rounded-md p-1.5 text-[#666666] transition-colors hover:bg-[#ff4d4d]/10 hover:text-[#ff4d4d] cursor-pointer"
                  >
                    <Trash size={16} weight="bold" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#2a2a2a] px-5 py-4">
            {/* Subtotal */}
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-[#999999]">Subtotal</span>
              <span className="text-lg font-semibold text-[#f5f5f0]">
                £{subtotal.toFixed(2)}
              </span>
            </div>

            {/* Checkout message */}
            {checkoutMessage && (
              <div className="mb-3 rounded-lg bg-[#e8ff47]/10 px-3 py-2 text-center text-sm font-medium text-[#e8ff47]">
                Demo — checkout coming soon!
              </div>
            )}

            {/* Checkout button */}
            <button
              onClick={handleCheckout}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#e8ff47] px-4 py-3 text-sm font-semibold text-[#0a0a0a] transition-all duration-200 hover:brightness-110 active:scale-[0.98] cursor-pointer"
            >
              <CreditCard size={18} weight="bold" />
              Checkout with Stripe
            </button>
          </div>
        )}
      </div>
    </>
  );
}

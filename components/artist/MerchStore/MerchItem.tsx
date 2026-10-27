"use client";

import { useState } from "react";
import { ShoppingCartSimple, Tag } from "@phosphor-icons/react";

interface MerchItemVariant {
  type: string;
  options: string[];
}

interface MerchItemData {
  id: string;
  name: string;
  price: number;
  category: "Music" | "Lifestyle";
  image: string;
  description: string;
  variants: MerchItemVariant[];
}

interface MerchItemProps {
  item: MerchItemData;
  onAddToCart: (item: MerchItemData, selectedVariants: Record<string, string>) => void;
}

export default function MerchItem({ item, onAddToCart }: MerchItemProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    item.variants.forEach((v) => {
      if (v.options.length > 0) {
        defaults[v.type] = v.options[0];
      }
    });
    return defaults;
  });

  const gradientClass =
    item.category === "Music"
      ? "bg-gradient-to-br from-purple-900 via-purple-700 to-violet-500"
      : "bg-gradient-to-br from-teal-900 via-teal-700 to-cyan-500";

  function handleVariantChange(type: string, value: string) {
    setSelectedVariants((prev) => ({ ...prev, [type]: value }));
  }

  function handleAddToCart() {
    onAddToCart(item, { ...selectedVariants });
  }

  return (
    <div className="group relative flex flex-col rounded-xl border border-[#2a2a2a] bg-[#161616] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-[#e8ff47]/30 hover:shadow-[0_0_20px_rgba(232,255,71,0.08)]">
      {/* Product image placeholder */}
      <div className={`relative aspect-square w-full ${gradientClass}`}>
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <Tag size={64} weight="thin" className="text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Category badge + price row */}
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-[#1e1e1e] px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-[#999999]">
            {item.category}
          </span>
          <span className="text-lg font-semibold text-[#f5f5f0]">
            £{item.price.toFixed(2)}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-base font-semibold text-[#f5f5f0] leading-tight">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#666666] line-clamp-2">{item.description}</p>

        {/* Variant selectors */}
        {item.variants.length > 0 && (
          <div className="flex flex-col gap-2">
            {item.variants.map((variant) => (
              <div key={variant.type} className="flex flex-col gap-1">
                <label className="text-xs font-medium uppercase tracking-wider text-[#666666]">
                  {variant.type}
                </label>
                <select
                  value={selectedVariants[variant.type] || ""}
                  onChange={(e) => handleVariantChange(variant.type, e.target.value)}
                  className="w-full appearance-none rounded-lg border border-[#2a2a2a] bg-[#1e1e1e] px-3 py-2 text-sm text-[#f5f5f0] outline-none transition-colors focus:border-[#e8ff47]/50"
                >
                  {variant.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          className="mt-auto flex items-center justify-center gap-2 rounded-lg bg-[#e8ff47] px-4 py-2.5 text-sm font-semibold text-[#0a0a0a] transition-all duration-200 hover:brightness-110 active:scale-[0.97] cursor-pointer"
        >
          <ShoppingCartSimple size={18} weight="bold" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

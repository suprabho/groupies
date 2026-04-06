"use client";

import { useState } from "react";
import { ShoppingCartSimple } from "@phosphor-icons/react";
import MerchItem from "./MerchItem";
import CartDrawer from "./CartDrawer";

interface MerchVariant {
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
  variants: MerchVariant[];
}

interface CartEntry {
  item: { id: string; name: string; price: number };
  selectedVariants: Record<string, string>;
  quantity: number;
}

interface MerchGridProps {
  items: MerchItemData[];
}

type FilterTab = "All" | "Music" | "Lifestyle";

const TABS: FilterTab[] = ["All", "Music", "Lifestyle"];

export default function MerchGrid({ items }: MerchGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filteredItems =
    activeFilter === "All"
      ? items
      : items.filter((item) => item.category === activeFilter);

  const cartCount = cart.reduce((sum, entry) => sum + entry.quantity, 0);

  function handleAddToCart(
    item: MerchItemData,
    selectedVariants: Record<string, string>
  ) {
    setCart((prev) => {
      // Check if the same item with the same variants already exists
      const existingIndex = prev.findIndex(
        (entry) =>
          entry.item.id === item.id &&
          JSON.stringify(entry.selectedVariants) ===
            JSON.stringify(selectedVariants)
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }

      return [
        ...prev,
        {
          item: { id: item.id, name: item.name, price: item.price },
          selectedVariants,
          quantity: 1,
        },
      ];
    });
  }

  function handleUpdateQuantity(index: number, quantity: number) {
    setCart((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], quantity };
      return updated;
    });
  }

  function handleRemoveItem(index: number) {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="w-full">
      {/* Filter tabs */}
      <div className="mb-6 flex gap-6 border-b border-[#2a2a2a]">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`relative pb-3 text-sm font-medium transition-colors cursor-pointer ${
              activeFilter === tab
                ? "text-[#f5f5f0]"
                : "text-[#666666] hover:text-[#999999]"
            }`}
          >
            {tab}
            {activeFilter === tab && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#e8ff47] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {filteredItems.map((item) => (
          <MerchItem key={item.id} item={item} onAddToCart={handleAddToCart} />
        ))}
      </div>

      {/* Empty state */}
      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-sm text-[#666666]">
            No items found in this category.
          </p>
        </div>
      )}

      {/* Floating cart button */}
      {cartCount > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-[#e8ff47] px-5 py-3 text-sm font-semibold text-[#0a0a0a] shadow-lg shadow-[#e8ff47]/20 transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-[0.97] cursor-pointer"
        >
          <ShoppingCartSimple size={20} weight="bold" />
          Cart ({cartCount})
        </button>
      )}

      {/* Cart drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

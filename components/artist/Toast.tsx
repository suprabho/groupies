"use client";

import { useWorld } from "./state";

export default function Toast() {
  const { toast } = useWorld();
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4">
      {toast ? (
        <p className="toast-in rounded-full bg-(--a-ink) px-5 py-3 text-[15px] text-(--a-bg) shadow-[0_0_32px_-6px_var(--a-accent2)]">{toast}</p>
      ) : null}
    </div>
  );
}

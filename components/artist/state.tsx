"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Artist } from "@/content/artists/types";

/* ---------- types ---------- */

export type CartLine = {
  key: string;
  id: string;
  name: string;
  price: number;
  qty: number;
  variant?: string;
  kind: "merch" | "track";
};

export type CheckoutRequest = {
  title: string;
  lines: { label: string; price: number }[];
  recurring?: boolean;
  success: string;
  onDone?: () => void;
};

type PlayerState = {
  current: string | null;
  progress: number; // 0..1 of the 30s preview
  play: (id: string, root: number, mode: "minor" | "major", bpm: number) => void;
  stop: () => void;
};

type WorldCtx = {
  artist: Artist;
  money: (n: number) => string;
  cart: CartLine[];
  addToCart: (line: Omit<CartLine, "qty" | "key">) => void;
  setQty: (key: string, qty: number) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  checkout: CheckoutRequest | null;
  openCheckout: (req: CheckoutRequest) => void;
  closeCheckout: () => void;
  toast: string | null;
  showToast: (msg: string) => void;
  following: boolean;
  setFollowing: (f: boolean) => void;
};

const Ctx = createContext<WorldCtx | null>(null);
// The player ticks ~60 times a second while previewing, so it lives in its own
// context: only the components that show playback re-render.
const PlayerCtx = createContext<PlayerState | null>(null);

export function useWorld() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useWorld must be used inside <WorldProvider>");
  return c;
}

export function usePlayer() {
  const c = useContext(PlayerCtx);
  if (!c) throw new Error("usePlayer must be used inside <WorldProvider>");
  return c;
}

/* ---------- placeholder audio ----------
   Until real stems are uploaded, each track plays a 30-second generated
   preview: pad chords, a soft bass, an arpeggio and a quiet kick, keyed per track. */

export const PREVIEW_SECONDS = 30;

function useSynth(): PlayerState {
  const ctxRef = useRef<AudioContext | null>(null);
  const busRef = useRef<GainNode | null>(null);
  const rafRef = useRef(0);
  const [current, setCurrent] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const ctx = ctxRef.current;
    const bus = busRef.current;
    if (ctx && bus) {
      bus.gain.cancelScheduledValues(ctx.currentTime);
      bus.gain.setTargetAtTime(0, ctx.currentTime, 0.06);
      window.setTimeout(() => bus.disconnect(), 500);
    }
    busRef.current = null;
    setCurrent(null);
    setProgress(0);
  }, []);

  const play = useCallback(
    (id: string, root: number, mode: "minor" | "major", bpm: number) => {
      stop();
      const AC: typeof AudioContext =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = ctxRef.current ?? new AC();
      ctxRef.current = ctx;
      void ctx.resume();

      const bus = ctx.createGain();
      bus.gain.value = 0;
      bus.connect(ctx.destination);
      busRef.current = bus;

      const tone = ctx.createBiquadFilter();
      tone.type = "lowpass";
      tone.frequency.value = 1500;
      const delay = ctx.createDelay(2);
      delay.delayTime.value = (60 / bpm) * 0.75;
      const feedback = ctx.createGain();
      feedback.gain.value = 0.3;
      const wet = ctx.createGain();
      wet.gain.value = 0.28;
      tone.connect(bus);
      tone.connect(delay);
      delay.connect(feedback);
      feedback.connect(delay);
      delay.connect(wet);
      wet.connect(bus);

      const t0 = ctx.currentTime + 0.05;
      const end = t0 + PREVIEW_SECONDS;
      bus.gain.setValueAtTime(0, t0);
      bus.gain.linearRampToValueAtTime(0.5, t0 + 1.5);
      bus.gain.setValueAtTime(0.5, end - 2.5);
      bus.gain.linearRampToValueAtTime(0, end);

      const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12);
      const note = (dest: AudioNode, freq: number, start: number, dur: number, gain: number, type: OscillatorType, attack: number, release: number) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = type;
        o.frequency.value = freq;
        g.gain.setValueAtTime(0, start);
        g.gain.linearRampToValueAtTime(gain, start + attack);
        g.gain.setValueAtTime(gain, Math.max(start + attack, start + dur - release));
        g.gain.linearRampToValueAtTime(0, start + dur);
        o.connect(g);
        g.connect(dest);
        o.start(start);
        o.stop(start + dur + 0.05);
      };

      const beat = 60 / bpm;
      const bar = beat * 4;
      const prog: [number, number][] =
        mode === "minor" ? [[0, 3], [8, 4], [3, 4], [10, 4]] : [[0, 4], [7, 4], [9, 3], [5, 4]];

      let i = 0;
      for (let t = 0; t < PREVIEW_SECONDS; t += bar, i++) {
        const [deg, third] = prog[i % 4];
        const base = root + deg + 12;
        const start = t0 + t;
        const dur = Math.min(bar, PREVIEW_SECONDS - t);
        [0, third, 7, 12].forEach((iv) => note(tone, mtof(base + iv), start, dur + 0.3, 0.035, "triangle", 0.4, 0.6));
        note(tone, mtof(base + 7) * 1.003, start, dur + 0.3, 0.012, "sawtooth", 0.6, 0.6);
        note(tone, mtof(root + deg), start, dur, 0.09, "sine", 0.05, 0.3);
        const arp = [0, third, 7, 12, 7, third, 0, 12];
        for (let s = 0; s < 8 && t + s * (beat / 2) < PREVIEW_SECONDS; s++) {
          if (i < 2 && s % 2) continue; // let the intro breathe
          note(tone, mtof(base + 12 + arp[s]), start + s * (beat / 2), beat * 0.45, 0.03, "triangle", 0.005, 0.25);
        }
        if (i >= 1) {
          for (let b = 0; b < 4; b++) {
            const kt = start + b * beat;
            if (kt > end - 0.5) break;
            const o = ctx.createOscillator();
            const g = ctx.createGain();
            o.frequency.setValueAtTime(120, kt);
            o.frequency.exponentialRampToValueAtTime(42, kt + 0.25);
            g.gain.setValueAtTime(b % 2 ? 0.12 : 0.22, kt);
            g.gain.exponentialRampToValueAtTime(0.001, kt + 0.35);
            o.connect(g);
            g.connect(bus);
            o.start(kt);
            o.stop(kt + 0.4);
          }
        }
      }

      setCurrent(id);
      const tick = () => {
        const p = (ctx.currentTime - t0) / PREVIEW_SECONDS;
        if (p >= 1) {
          stop();
          return;
        }
        setProgress(Math.max(0, p));
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [stop],
  );

  useEffect(() => () => stop(), [stop]);

  return { current, progress, play, stop };
}

/* ---------- provider ---------- */

export function WorldProvider({ artist, children }: { artist: Artist; children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState<CheckoutRequest | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [following, setFollowing] = useState(false);
  const toastTimer = useRef<number | undefined>(undefined);
  const player = useSynth();

  const money = useCallback(
    (n: number) => (n === 0 ? "Free" : `${artist.currency}${n.toLocaleString("en-IN")}`),
    [artist.currency],
  );

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const addToCart = useCallback(
    (line: Omit<CartLine, "qty" | "key">) => {
      const key = `${line.id}${line.variant ? `-${line.variant}` : ""}`;
      setCart((c) => {
        const found = c.find((l) => l.key === key);
        if (found) {
          if (line.kind === "track") return c; // one copy of a track is enough
          return c.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l));
        }
        return [...c, { ...line, key, qty: 1 }];
      });
      showToast(`${line.name}${line.variant ? ` (${line.variant})` : ""} is in your bag`);
    },
    [showToast],
  );

  const setQty = useCallback((key: string, qty: number) => {
    setCart((c) => (qty <= 0 ? c.filter((l) => l.key !== key) : c.map((l) => (l.key === key ? { ...l, qty } : l))));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);
  const openCheckout = useCallback((req: CheckoutRequest) => {
    setCartOpen(false);
    setCheckout(req);
  }, []);
  const closeCheckout = useCallback(() => setCheckout(null), []);

  const value = useMemo<WorldCtx>(
    () => ({
      artist, money, cart, addToCart, setQty, clearCart, cartOpen, setCartOpen,
      checkout, openCheckout, closeCheckout, toast, showToast, following, setFollowing,
    }),
    [artist, money, cart, addToCart, setQty, clearCart, cartOpen, checkout, openCheckout, closeCheckout, toast, showToast, following],
  );

  return (
    <Ctx.Provider value={value}>
      <PlayerCtx.Provider value={player}>{children}</PlayerCtx.Provider>
    </Ctx.Provider>
  );
}

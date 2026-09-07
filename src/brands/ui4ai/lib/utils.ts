import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_QUINT = [0.22, 1, 0.36, 1] as const;

export function clamp(v: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function rgbStr(rgb: readonly [number, number, number]) {
  return `${rgb[0]} ${rgb[1]} ${rgb[2]}`;
}

/** Deterministic pseudo-random so canvas fields are stable across renders. */
export function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

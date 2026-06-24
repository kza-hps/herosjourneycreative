import valences from "./valences.json";
import { CONFIG_HASH } from "./generated-hash";

export type Valence = -2 | -1 | 0 | 1 | 2;
export interface CardValence { upright: Valence; reversed: Valence; }

export const TAROT: Record<string, CardValence> = valences.tarot as Record<string, CardValence>;
export const SUIT_VALENCE: Record<string, number> = valences.suit;

export const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"] as const;
export const SUITS = ["♥", "♦", "♣", "♠"] as const;
export type Suit = (typeof SUITS)[number];

export function dirHit(cardVal: number, stateVal: number): boolean | null {
  if (stateVal === 0 || cardVal === 0) return null;
  return (cardVal > 0) === (stateVal > 0);
}

export function tarotValence(card: string, reversed: boolean): Valence {
  const c = TAROT[card];
  if (!c) throw new Error(`Unknown tarot card: "${card}"`);
  return reversed ? c.reversed : c.upright;
}

export function parseYoutubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.slice(1).split("?")[0];
      return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
    }
    if (
      u.hostname.includes("youtube.com") ||
      u.hostname.includes("youtube-nocookie.com")
    ) {
      const v = u.searchParams.get("v");
      if (v && /^[A-Za-z0-9_-]{11}$/.test(v)) return v;
      const parts = u.pathname.split("/").filter(Boolean);
      const idx =
        parts.indexOf("embed") !== -1
          ? parts.indexOf("embed") + 1
          : parts.indexOf("shorts") !== -1
            ? parts.indexOf("shorts") + 1
            : -1;
      if (idx !== -1 && parts[idx] && /^[A-Za-z0-9_-]{11}$/.test(parts[idx]))
        return parts[idx];
    }
    return null;
  } catch {
    return null;
  }
}

export const PREREG = {
  committedNPerArm: 60,
  scoringRule:
    "Directional hit = card valence and logged state share a sign. Metric = (∑Mi↑ hit-rate) − (∑Mi↓ hit-rate).",
  orientationRule:
    "A tarot card's upright/reversed state is defined relative to the fixed observer camera (mounted on the monitor opposite the experimenter, pointed down at the table). The experimenter's seated viewpoint is irrelevant to scoring. Camera frame is canonical for every draw.",
  registeredOn: "2026-06-24",
  configHash: CONFIG_HASH,
} as const;

export type TamSession = {
  id: string;
  created_at: string;
  condition: "up" | "down";
  state_valence: number;
  tarot_card: string;
  tarot_reversed: boolean;
  tarot_valence: number;
  tarot_dir_hit: boolean | null;
  playing_card: string;
  playing_valence: number;
  playing_dir_hit: boolean | null;
  youtube_url: string | null;
  youtube_id: string | null;
  note: string | null;
};

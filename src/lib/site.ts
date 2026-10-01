// Single place for product constants and feature flags.

export const SITE = {
  name: "Sanji",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sanji.in",
  shortHost: "sanji.in",
  tagline: "Where the work speaks first.",
  description:
    "Sanji is one home for every kind of artist, with no algorithm deciding who gets seen. Preregister, get your number, and move up the line by bringing friends.",
  company: "Aaydha Tech",
  companyUrl: "https://aaydhatech.in",
  companyHost: "aaydhatech.in",
  city: "Chennai",
  betaLabel: "late 2026",
};

/** Spots you move up for each confirmed friend. Also the head start an invitee gets. */
export const SPOTS_PER_INVITE = 500;

/** People already in line before this browser's first signup (mock backend only). */
export const MOCK_LINE_OFFSET = 2783;

export const PASSES = [
  {
    id: "first-wave",
    no: "PASS 01",
    requirement: "1 invite",
    need: 1,
    title: "First Wave",
    body: "Walk in with the very first group the day the beta opens. No waiting for public launch.",
    tone: "lime",
  },
  {
    id: "handle",
    no: "PASS 02",
    requirement: "5 invites",
    need: 5,
    title: "@yourname",
    body: "Reserve sanji.in/@yourname before anyone else can claim it. Your handle, held for you.",
    tone: "pink-sky",
  },
  {
    id: "founding",
    no: "PASS 03",
    requirement: "Top 100",
    need: null,
    title: "Founding Artist",
    body: "A permanent Founding badge on your profile, and a seat in the room where we decide what gets built.",
    tone: "coral",
  },
] as const;

/**
 * Founding Badges: honorary, earned only during preregistration, set by final
 * leaderboard rank, closed forever when the beta opens. Ordered rarest first.
 */
export const BADGES = [
  {
    id: "founding-ten",
    mark: "10",
    name: "Founding Ten",
    maxRank: 10,
    req: "Ranks 10 → 1",
    minted: "10 ever",
    body: "The ten who built the line. Holographic, numbered, forever.",
    accent: "lime",
    rim: "conic-gradient(from 200deg, #C8FF2E, #6FD3FF, #FF9EE6, #FFD35C, #C8FF2E)",
  },
  {
    id: "founding-artist",
    mark: "100",
    name: "Founding Artist",
    maxRank: 100,
    req: "Ranks 100 → 11",
    minted: "100 ever",
    body: "Comes with the Founding Artist pass and a seat at the table.",
    accent: "coral",
    rim: "linear-gradient(135deg, #FF5B3A, #FFB36B, #FF5B3A)",
  },
  {
    id: "first-thousand",
    mark: "1K",
    name: "First Thousand",
    maxRank: 1000,
    req: "Ranks 1,000 → 101",
    minted: "1,000 ever",
    body: "The first thousand names on the board, frozen at launch.",
    accent: "pink",
    rim: "linear-gradient(135deg, #FF9EE6, #6FD3FF, #FF9EE6)",
  },
  {
    id: "day-one",
    mark: "D1",
    name: "Day One",
    maxRank: Infinity,
    req: "Everyone who preregisters",
    minted: "Unlimited · until launch",
    body: "Proof you were here before the doors opened.",
    accent: "sky",
    rim: "linear-gradient(135deg, #6FD3FF, #7C5CFF, #6FD3FF)",
  },
] as const;

export type Badge = (typeof BADGES)[number];

/** Badge a given position currently qualifies for. */
export function badgeFor(position: number): Badge {
  return BADGES.find((b) => position <= b.maxRank) ?? BADGES[BADGES.length - 1];
}

export const CRAFTS = [
  "Painting",
  "Dance",
  "Photography",
  "Music",
  "Film",
  "Poetry",
  "Sculpture",
  "Design",
  "Writing",
  "Other",
] as const;

export const ROLES = [
  { value: "make", label: "I make art" },
  { value: "love", label: "I love art" },
  { value: "hire", label: "I hire art" },
] as const;

export type Role = (typeof ROLES)[number]["value"];

/**
 * Feature flags for sections whose content needs real data or a business
 * decision before going live. Flip on when ready.
 */
export const FEATURES = {
  /** Set NEXT_PUBLIC_BETA_DATE (ISO) to show the countdown band. */
  countdown: Boolean(process.env.NEXT_PUBLIC_BETA_DATE),
  firstWorksWall: true,
  /** Promises like "Chennai opens early" need sign-off first. */
  lineGoals: false,
  cityChapters: false,
  /** Shows demo controls on /you so the flow can be clicked through without a backend. */
  demoControls: process.env.NEXT_PUBLIC_DEMO !== "false",
};

export const BETA_DATE = process.env.NEXT_PUBLIC_BETA_DATE ?? null;

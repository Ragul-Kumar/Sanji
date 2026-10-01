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

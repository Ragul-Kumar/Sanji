"use client";

/**
 * Waitlist client API.
 *
 * MOCK IMPLEMENTATION — everything lives in localStorage so the whole flow can
 * be clicked through without a backend. Each exported function maps 1:1 to a
 * future server call (Supabase / route handler). Keep the signatures and swap
 * the bodies.
 */

import { MOCK_LINE_OFFSET, SPOTS_PER_INVITE, type Role } from "./site";
import { checkEmail, normaliseEmail } from "./validate";

export type Entrant = {
  email: string;
  role: Role;
  craft: string;
  city?: string;
  code: string;
  invitedBy?: string;
  /** Order of signup across the whole line. */
  joinedOrder: number;
  confirmed: boolean;
  /** Confirmed friends who joined with this person's link. */
  invites: number;
  /** Friends who signed up but haven't confirmed yet. */
  pendingInvites: number;
  createdAt: string;
};

export type Me = Entrant & {
  position: number;
  /** Position before any invites (for "moved up" displays). */
  startPosition: number;
};

type Store = { entrants: Entrant[]; session: string | null };

const KEY = "sanji:store:v1";
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function read(): Store {
  if (typeof window === "undefined") return { entrants: [], session: null };
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Store) : { entrants: [], session: null };
  } catch {
    return { entrants: [], session: null };
  }
}

function write(store: Store) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(store));
    window.dispatchEvent(new Event("sanji:store"));
  } catch {
    /* storage blocked: flow still works for this page view */
  }
}

function makeCode(email: string, taken: Set<string>) {
  const base =
    email
      .split("@")[0]
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 10) || "artist";
  let code = base;
  let i = 2;
  while (taken.has(code)) code = `${base}${i++}`;
  return code;
}

export function positionOf(e: Entrant) {
  const head = e.invitedBy ? SPOTS_PER_INVITE : 0;
  return Math.max(1, e.joinedOrder - head - e.invites * SPOTS_PER_INVITE);
}

function toMe(e: Entrant): Me {
  const head = e.invitedBy ? SPOTS_PER_INVITE : 0;
  return { ...e, position: positionOf(e), startPosition: Math.max(1, e.joinedOrder - head) };
}

export class AlreadyInLineError extends Error {
  constructor(public me: Me) {
    super("already-in-line");
  }
}
export class InvalidEmailError extends Error {
  constructor(public reason: "empty" | "invalid" | "disposable") {
    super(reason);
  }
}

export async function signup(input: { email: string; role: Role; craft: string; ref?: string | null }): Promise<Me> {
  await wait(900);
  const check = checkEmail(input.email);
  if (check !== "ok") throw new InvalidEmailError(check);
  const email = normaliseEmail(input.email);
  const store = read();
  const existing = store.entrants.find((e) => e.email === email);
  if (existing) {
    store.session = email;
    write(store);
    throw new AlreadyInLineError(toMe(existing));
  }
  const taken = new Set(store.entrants.map((e) => e.code));
  const inviter = input.ref ? store.entrants.find((e) => e.code === input.ref) : undefined;
  if (inviter) inviter.pendingInvites += 1;
  const entrant: Entrant = {
    email,
    role: input.role,
    craft: input.craft,
    code: makeCode(email, taken),
    invitedBy: input.ref ?? undefined,
    joinedOrder: MOCK_LINE_OFFSET + store.entrants.length + 1,
    confirmed: false,
    invites: 0,
    pendingInvites: 0,
    createdAt: new Date().toISOString(),
  };
  store.entrants.push(entrant);
  store.session = email;
  write(store);
  return toMe(entrant);
}

/** Raw store string — a stable snapshot for useSyncExternalStore. */
export function readSnapshot(): string {
  try {
    return window.localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}

export function getMe(): Me | null {
  const store = read();
  const e = store.entrants.find((x) => x.email === store.session);
  return e ? toMe(e) : null;
}

export function subscribe(cb: () => void) {
  window.addEventListener("sanji:store", cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener("sanji:store", cb);
    window.removeEventListener("storage", cb);
  };
}

export async function confirmEmail(): Promise<Me | null> {
  await wait(500);
  const store = read();
  const e = store.entrants.find((x) => x.email === store.session);
  if (!e) return null;
  if (!e.confirmed) {
    e.confirmed = true;
    const inviter = e.invitedBy ? store.entrants.find((x) => x.code === e.invitedBy) : undefined;
    if (inviter && inviter.pendingInvites > 0) {
      inviter.pendingInvites -= 1;
      inviter.invites += 1;
    }
  }
  write(store);
  return toMe(e);
}

/** Sends a magic link. Mock: remembers the email so /spot/verify can sign in. */
export async function requestMagicLink(email: string): Promise<{ known: boolean }> {
  await wait(800);
  const store = read();
  const known = store.entrants.some((e) => e.email === normaliseEmail(email));
  try {
    window.sessionStorage.setItem("sanji:pending-login", normaliseEmail(email));
  } catch {}
  return { known };
}

export async function verifyMagicLink(): Promise<Me | null> {
  await wait(400);
  let email: string | null = null;
  try {
    email = window.sessionStorage.getItem("sanji:pending-login");
  } catch {}
  const store = read();
  const e = store.entrants.find((x) => x.email === email);
  if (!e) return null;
  store.session = e.email;
  write(store);
  return toMe(e);
}

export function signOut() {
  const store = read();
  store.session = null;
  write(store);
}

// ---- Demo-only helpers (used by the demo panel on /you) ----

export function demoFriendJoins(): Me | null {
  const store = read();
  const e = store.entrants.find((x) => x.email === store.session);
  if (!e) return null;
  e.invites += 1;
  write(store);
  return toMe(e);
}

export function demoReset() {
  write({ entrants: [], session: null });
}

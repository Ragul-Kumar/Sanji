// Client + server safe email checks.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Small starter list. In production use the `disposable-email-domains` package server-side.
const DISPOSABLE = new Set([
  "mailinator.com",
  "tempmail.com",
  "tempmail.dev",
  "10minutemail.com",
  "guerrillamail.com",
  "yopmail.com",
  "trashmail.com",
  "getnada.com",
  "dispostable.com",
  "sharklasers.com",
  "temp-mail.org",
  "throwawaymail.com",
  "maildrop.cc",
  "fakeinbox.com",
]);

export type EmailCheck = "empty" | "invalid" | "disposable" | "ok";

export function checkEmail(raw: string): EmailCheck {
  const email = raw.trim().toLowerCase();
  if (!email) return "empty";
  if (!EMAIL_RE.test(email)) return "invalid";
  const domain = email.split("@")[1];
  if (DISPOSABLE.has(domain)) return "disposable";
  return "ok";
}

export function normaliseEmail(raw: string) {
  return raw.trim().toLowerCase();
}

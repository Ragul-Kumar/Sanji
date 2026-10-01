# Sanji — waitlist frontend

Preregistration site for **Sanji**, the art platform with no algorithm (Aaydha Tech, Chennai — aaydhatech.in).
Robinhood-style referral line: sign up, get a number, every confirmed friend moves you 500 spots up.

Built with Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · React Email · `next/og`.
Design source: Figma file `UNrVNTCnVoffuxkVDuRomb`, section "Sanji" → "Sanji v3" frames.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```


## The backend is mocked

`src/lib/api.ts` stores everything in `localStorage`, so the whole flow works with no server:

1. Sign up on `/` → lands on `/you` with your number.
2. Use the **demo panel** (bottom right on `/you`) to simulate friends joining → watch the number drop and the pass-unlocked pop-up.
3. Sign out → `/spot` → "Demo: open the magic link" signs you back in.


To go live, replace the bodies in `src/lib/api.ts` (signatures stay the same) with calls to Supabase / route handlers.
Every place that needs real data is marked `TODO(backend)`:

| Where | What to wire |
| --- | --- |
| `lib/api.ts` | signup, confirmEmail, requestMagicLink, verifyMagicLink, getMe |
| `SignupForm.tsx` | Cloudflare Turnstile token before signup |
| `app/r/[code]/page.tsx`, `opengraph-image.tsx`, `story/[code]/route.tsx` | look up inviter by referral code |
| `app/confirm`, `app/spot/verify` | verify tokens server-side |
| `lib/sample-data.ts` | leaderboard, neighbours, cities, line stats (all shown with an "Illustrative" note) |

Position formula: `position = signup_order − 500 × confirmed_invites − (500 if invited)`.

## Config

| Env var | Effect |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Absolute URL for links, OG images, sitemap (default `https://sanji.in`) |
| `NEXT_PUBLIC_BETA_DATE` | ISO date. When set, shows the countdown band on the landing page |
| `NEXT_PUBLIC_DEMO=false` | Hides the demo panel on `/you` (do this in production) |

Feature flags for sections that need a business decision live in `src/lib/site.ts` → `FEATURES`
(`lineGoals` and `cityChapters` are off until their promises are approved).

## Routes

| Route | Page |
| --- | --- |
| `/` | Landing |
| `/r/[code]` | Invited-friend landing (+ personal OG image) |
| `/you` | After signup: number, share kit, passes, climb, neighbours |
| `/confirm` | Email confirmed |
| `/spot`, `/spot/verify` | Check my spot (magic link) |
| `/leaderboard` | Public board with tabs, craft filter, search |
| `/privacy`, `/terms` | Draft legal pages — need legal review |
| `/story/[code]?n=2784` | 1080×1920 Instagram story PNG |

## Structure

```
src/
  app/            routes, OG images, icon, robots, sitemap
  components/
    landing/      hero, tapes, manifesto, how, rewards, board preview, doors, FAQ, CTA, add-ons
    you/          dashboard, share kit, pass ladder, pass-unlocked modal
    leaderboard/  board + podium
    ui/           logo, buttons, ticket, pass, art tiles, rows, bits
  emails/         React Email templates
  lib/            api (mock), site config, sample data, share links, validation, og helpers
```

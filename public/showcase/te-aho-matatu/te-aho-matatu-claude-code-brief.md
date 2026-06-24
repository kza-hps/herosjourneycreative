# Implementation Brief — Te Aho Matatū σ-Test Showcase

**For:** Claude Code · **Target:** `herosjourneycreative.co.nz/showcase/te-aho-matatu`
**Reference implementation:** `te-aho-matatu-dashboard.html` (drop this file in the repo; it is the behavioural + visual source of truth — match its logic and design language, then productionise per below).

---

## 1. Objective

Build a public showcase page with a working, persistent session logger for a live empirical experiment. Visitors browse the results, the running "thread-gap" visualisation, and a record of every session with its YouTube clip. The operator (one person, gated) runs and logs sessions. Results are real, ongoing, and may come out null — the page is honest about that.

**One-line statement of the experiment** (do not reinterpret this — the whole build depends on it):
> σ is the gap between two arms. We measure whether a drawn card's pre-assigned valence matches the operator's logged state **more in coherent sessions (∑Mi↑) than in scattered ones (∑Mi↓)**. The metric is the *difference between arms*, never an absolute hit-rate vs. chance. A plain playing-card deck runs in parallel as a structure-only control.

---

## 2. Honest framing (copy guardrail)

This is an AI-engineering case study, not a proof. The page presents process and an open, falsifiable test — results pending. **Do not** rewrite headings or body copy into hype ("proven", "breakthrough", "consciousness confirmed"). Keep the registered tone: a test run in the open, scored by rule, reported either way. The hero line and lede in the reference file are approved; you may refine for the site's voice but not inflate.

---

## 3. Stack & repo assumptions

- Next.js 15 (App Router) + React 19 + TypeScript, matching the existing site. Confirm the actual versions and conventions from the repo before scaffolding; follow existing patterns (styling, layout shell, fonts) where they exist.
- Persistence: **Supabase** (Postgres) is the chosen default. If the repo already has a persistence layer, use that instead and ignore the Supabase specifics — keep the data model identical.
- Do not introduce a client-side store for the source of truth. No `localStorage` for session data.

---

## 4. Architecture decisions (made — implement, don't relitigate)

1. **Reads are public; writes are operator-only.** Anyone can view sessions and the dashboard. Only the authenticated operator can create one.
2. **Scoring is server-authoritative and deterministic.** The directional-hit for each deck is computed from the frozen valence table + logged state on the server at insert time and stored. Never trust a client-supplied hit value.
3. **Auth = single operator, minimal.** A server-side `OPERATOR_TOKEN` env var. Operator enters it once on the page; store as an httpOnly, secure cookie; writes go through a Route Handler / Server Action that checks it. No user accounts, no signup. If the repo already has auth, reuse it and gate the write route behind it.
4. **Supabase RLS:** `select` public; `insert`/`delete` denied to anon — all writes go through the server route using the service role key (server-only env). Never expose the service key to the client.
5. **Frozen config is a single source of truth in code** (`lib/tam/frozen.ts`): the 78-card tarot valence table, the playing-card rule (red = +1, black = −1), the directional-hit function, and the pre-registration metadata. The page displays a SHA-256 hash of this config so the "frozen" claim is verifiable.

---

## 5. Data model

Table `tam_sessions`:

| column | type | notes |
|---|---|---|
| id | text PK | format `TAM-XXXXXX` (server-generated) |
| created_at | timestamptz | default now() |
| condition | text | `'up'` \| `'down'` \| `'sham'` |
| state_valence | int2 | −5..+5 |
| tarot_card | text | card name (key into frozen table) |
| tarot_valence | int2 | from frozen table (server-set) |
| tarot_dir_hit | bool null | null when state=0 or valence=0 |
| playing_card | text | e.g. `"5 ♠"` |
| playing_valence | int2 | +1 / −1 (server-set) |
| playing_dir_hit | bool null | |
| youtube_url | text null | raw pasted URL |
| youtube_id | text null | parsed 11-char id (server-set) |
| note | text null | |

Plus a static (in-code) `PREREG` object: committed N per arm, scoring rule text, frozen-config hash, registration date.

---

## 6. Frozen scoring module (`lib/tam/frozen.ts`)

Port these verbatim from the reference file. **Caveat to surface in the UI:** this tarot table is a Rider–Waite–Smith starter set; it is the pre-registered reference *for this run* and must not change once data collection begins. Expose it read-only on the page (an expandable "frozen codebook" panel) and display its hash.

```ts
export const TAROT_VALENCE: Record<string, number> = { /* 78 entries, exactly as in te-aho-matatu-dashboard.html */ };
export const SUIT_VALENCE = { "♥": 1, "♦": 1, "♣": -1, "♠": -1 } as const;

// directional hit: same sign; null if either side has no direction
export function dirHit(cardVal: number, stateVal: number): boolean | null {
  if (stateVal === 0 || cardVal === 0) return null;
  return (cardVal > 0) === (stateVal > 0);
}

export const PREREG = {
  committedNPerArm: 60,            // operator confirms before run; display prominently
  scoringRule: "Directional hit = card valence and logged state share a sign. Metric = (∑Mi↑ hit-rate) − (∑Mi↓ hit-rate).",
  registeredOn: "<set on freeze>",
  configHash: "<sha256 of TAROT_VALENCE+SUIT_VALENCE computed at build>",
};
```

Provide a small build/script step (or runtime memo) that computes the SHA-256 of the stringified frozen tables and surfaces it as `configHash`.

---

## 7. Page spec (public route)

Single page, top to bottom:

1. **Hero** — eyebrow (studio + "human-centred AI experiments"), title, the formula `Ψ → ∑Mi(↑/↓) ⇄ σ(ϕ) → ϕ`, the honest lede. Approved copy in the reference file.
2. **Thread-gap dashboard (the signature)** — for each deck (Tarot, then Playing cards), two horizontal threads: gold = ∑Mi↑, slate = ∑Mi↓, width = hit-rate, with the **gap** annotated and an n-count per arm. Below: the verdict line that (a) stays "preliminary" under a minimum N, (b) never over-reads, (c) compares the tarot gap to the plain-deck gap and states whether symbols or only structure are doing the work, (d) reminds that a flat result is honoured. Logic is in the reference file — port it, including the small-N guard and the one-sided two-proportion z (indicative only).
3. **Pre-registration panel** — committed N per arm, scoring rule, frozen-codebook (expandable, read-only) with its SHA-256 hash and registration date. This is what makes the showcase credible; treat it as first-class, not a footnote.
4. **Session record** — table of all sessions (newest first), incl. misses: id, when, ∑Mi tag, state, tarot + valence + hit dot, playing + valence + hit dot, and the **clip**. CSV export button. Public.
5. **Downloads / links** — the paper, the σ-protocol (`Te_Aho_Matatu_Sigma_Protocol_v1.md` rendered or linked), and a short "how this was built" note.

---

## 8. Operator flow (gated)

A collapsed "Operator" affordance (not prominent) that, once the operator token is accepted, reveals the session runner — port the reference flow exactly:

1. Coin-flip assigns `up`/`down` (animated; respects reduced-motion). Operator does not choose.
2. State slider −5..+5, logged before the draw.
3. Operator physically draws, then records the tarot card (searchable select of the 78) and the playing card (rank + suit).
4. Live mechanical score preview (client preview only; server recomputes on save).
5. Paste the **YouTube URL** of the recorded session + optional note.
6. Save → POST to the write route → server parses YouTube id, looks up valences, computes `dir_hit`, generates id, inserts, returns the row → dashboard + table update.

The runner must be invisible/inert to non-operators (no write capability reaches the client without the cookie).

---

## 9. YouTube handling

- Accept any standard URL form (`watch?v=`, `youtu.be/`, `shorts/`). Parse the 11-char id server-side; reject if unparseable with a clear inline error ("That doesn't look like a YouTube link — paste the video URL.").
- In the session record, render a **lazy facade**, not a live iframe per row: a `youtube-nocookie` thumbnail (`https://i.ytimg.com/vi/<id>/hqdefault.jpg`) with a play button; clicking swaps in the embed for that row only. This keeps the page fast even with many sessions. Keyboard-activatable, labelled.

---

## 10. Design tokens & signature

Port the reference palette and type. Keep the **thread-gap** as the one signature element; everything else stays quiet.

- Colours: field `#13141c`, surface `#1b1d28` / `#232634`, line `#2f3342`, ink `#ece7dd`, muted `#8a8c9c`, thread (∑Mi↑) `#e0a55e`, scatter (∑Mi↓) `#6f8794`, pounamu (match) `#5fb8a6`, warn `#d98d6a`.
- Type: Spectral (display), Inter (body), Space Mono (data / the formula / ids).
- If the existing site has a design system that conflicts, reconcile to the site shell but preserve the thread-gap visual and the formula motif.

---

## 11. Quality floor

Responsive to mobile (the threadwrap and table must hold up; table scrolls horizontally). Visible keyboard focus. `prefers-reduced-motion` respected (coin flip + thread transitions). Empty states are directional, not decorative ("No sessions yet — flip the coin and run your first one."). Errors say what happened and how to fix it. No layout shift on load; render dashboard progressively as data arrives.

---

## 12. Build sequence (executable tomorrow)

1. Confirm repo state, versions, existing layout/auth/styling conventions. Add the reference HTML and the protocol `.md` to the repo for reference.
2. Scaffold the route `app/showcase/te-aho-matatu/page.tsx` + supporting `components/tam/*`.
3. `lib/tam/frozen.ts` (tables, `dirHit`, `PREREG`, hash). Unit-test `dirHit` and YouTube-id parsing.
4. Data layer: Supabase table + RLS, server write route (token check, valence lookup, scoring, id + YouTube parse, insert), public read.
5. Public dashboard + thread-gap + verdict (port logic). Pre-registration panel + codebook + hash.
6. Session record table + lazy YouTube facade + CSV export.
7. Operator runner (gated) wired to the write route.
8. Downloads/links section. Responsive + a11y + reduced-motion pass.
9. Verify (section 14). Self-review against acceptance criteria.

---

## 13. Acceptance criteria

- A non-operator can view the page, the live thread-gap, every session, and play any clip; cannot create or delete a session by any means.
- The operator, after entering the token, can run and save a session; on save it appears with its computed valences, dir-hits, and clip.
- Dir-hit and valences are computed server-side from the frozen table; a tampered client payload cannot set them.
- The dashboard metric is the ∑Mi↑ − ∑Mi↓ gap per deck, with the tarot-vs-plain-deck comparison; it refuses to over-read below the minimum N.
- The pre-registration panel shows committed N, scoring rule, the frozen codebook, and a SHA-256 that matches the actual frozen tables.
- CSV export downloads all sessions. YouTube facades load lazily.
- Honest framing intact; no hype; no AI "interpretation" of cards anywhere.

---

## 14. Verification

Run and pass before handing back: `npm run lint`, `npx tsc --noEmit`, `npm run build`. Confirm the page renders with seeded sample sessions and with zero sessions. Manually verify the write route rejects requests without the operator cookie.

---

## 15. Non-goals / do not do

- Do not change the experiment, the σ metric, the scoring rule, or the frozen valence table.
- Do not add card interpretation, AI readings, or "meaning" generation — scoring is a table lookup, full stop.
- Do not soften or hype the framing.
- Do not build user accounts or a CMS.
- Do not host video yourself — YouTube is the store; we keep only the link.
- Do not invent files or assume repo contents — read the actual tree first and follow existing conventions.

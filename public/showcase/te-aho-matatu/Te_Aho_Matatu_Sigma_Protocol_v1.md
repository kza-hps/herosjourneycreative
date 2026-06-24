# Te Aho Matatū — The σ-Correspondence Protocol (v1.0)

**A single-participant, falsifiable test of internal-to-external correspondence (σ)**

*Status: Draft for pre-registration. Nothing in this document is run until the codebook (Appendix A) is frozen and the whole document is timestamped (Section 9).*

---

## 0. What this protocol does and does not claim to test

This protocol tests **one** thing, defined exactly in the framework's own terms:

> **σ** — whether, for a single participant in the field, the external symbolic readout (**ϕ**) corresponds to the participant's internal coherent state (**∑Mi**) at a rate that depends on that internal state.

It is built directly from the operational framework **Ψ → ∑Mi(↑/↓) ⇄ σ(ϕ) → ϕ**. The directional operator **∑Mi(↑/↓)** — coherence vs. incoherence, already present in your notation — is the experimental control. The test was always inside the framework; this document only makes it runnable.

It does **not** test:
- A mechanism (precognition vs. influence vs. common-cause). Those remain a separate question with a separate, later evidence bar.
- The W = NL·O(S∞) worldview as a whole.
- Any claim involving a second consciousness, an RNG, or transmission. There is one participant and one field.

A positive result here would establish *that* σ exists, not *why*. Keep those two ledgers separate.

---

## 1. The core logic (read this before anything else)

The naïve version of this test — "I drew a meaningful card, therefore the field mirrored me" — cannot fail, because any card can be read as meaningful. That version measures interpretation, not σ.

This protocol fixes that with a single move: **σ is a correspondence, and a correspondence is a *difference*.** If the readout genuinely mirrors your internal state, it must mirror it **more when you are coherent (∑Mi↑) than when you are incoherent (∑Mi↓).** If the readout corresponds to your state equally whether you are deeply attuned or deliberately scattered, then there is no σ — there is only meaning-making, which your own framework distinguishes from genuine field-feedback.

So the measured quantity is **not** an absolute hit-rate against chance. It is the **gap between the ∑Mi↑ arm and the ∑Mi↓ arm.**

This design choice has a powerful side effect: **it makes the exact chance baseline irrelevant.** Whatever the base rate of a "hit" is (and base rates for tarot are genuinely hard to pin down), it is *the same in both arms*, because both arms use the identical deck, codebook, and scoring rule. The base rate cancels. The only thing that can produce a gap is your internal state — which is exactly σ. This is the same reasoning that lets a controlled trial work without knowing the absolute rate of an outcome: the control arm absorbs everything except the variable under test.

---

## 2. Variables

### 2.1 Independent variable — ∑Mi state (you set this; it is logged before each draw)

Each session is run in **one** of three conditions, fixed by a pre-randomised sequence (Section 4):

| Condition | Label | ∑Mi | Description |
|---|---|---|---|
| **A** | Coherent / state-matched | ∑Mi↑ | Full attunement (your Part 0 practice). Settled, coherent, holding your genuine present state. |
| **B** | Incoherent | ∑Mi↓ | Deliberately scattered: no attunement, rushed, running mental arithmetic or distraction during the draw. The framework's own ↓. |
| **C** *(optional, specificity check)* | Coherent / state-sham | ∑Mi↑ | Attuned, but holding a *randomly assigned, inauthentic* target state rather than your true one. |

Condition B is the heart of the test. Condition C, if you include it, separates "coherence matters" from "*my specific true state* matters" — a stronger result.

### 2.2 Internal state content (the thing ϕ is supposed to mirror; logged before each draw)

Before each draw, record your present state on a fixed, simple scale, **decided in advance and never changed**:

- **Valence:** an integer from −5 (deep hardship / despair) to +5 (flourishing / joy).
- *(Optional second dimension)* **Arousal/activation:** −5 (flat, depleted) to +5 (charged, activated).

Log it on camera *before* the draw. In Condition C, log the *assigned sham* valence (drawn from a sealed slip) instead of your true one.

### 2.3 Objective coherence check (strongly recommended)

To stop ∑Mi↑/↓ from being pure self-report, log an independent coherence number each session:
- HRV coherence score from a consumer chest-strap/app, or a 60-second breath-paced HRV reading.
- Pre-register a threshold: e.g. ∑Mi↑ sessions must exceed coherence score *X*; ∑Mi↓ must fall below *Y*. Sessions that don't meet their condition's threshold are logged but flagged and analysed separately.

This converts ∑Mi from a feeling into a measured quantity, which is what the framework's "coherence of your signal" deserves.

### 2.4 Dependent variable — correspondence between ϕ and state (scored mechanically)

This is the only part that must **not** pass through your in-the-moment judgment. Two pre-frozen metrics:

**Primary metric — Valence correspondence (fully mechanical).**
Every one of the 78 cards is assigned a fixed valence score in **Appendix A**, taken from a *published standard reference*, frozen before any data is collected. After each draw, look up the drawn card's frozen valence. The session's correspondence score is whether drawn-card valence falls on the same side of zero as your logged state valence (a "directional hit"), or — for a finer test — the signed product of the two valences (positive = corresponds, negative = anti-corresponds). No interpretation: it's a table lookup.

**Secondary metric — Target-set hit (pre-frozen codebook).**
Appendix A also defines, for each logged valence band, a fixed **target set of exactly k cards** (suggested k = 8). A "hit" = the drawn card is in the target set for the logged band. Set size is identical across all bands, so the base rate is constant.

Both metrics are decided entirely by frozen tables. A stranger watching your film reaches the identical verdict.

---

## 3. One draw per session (keep it clean)

Draw **one** card per session, not a spread. One card keeps the base rate simple and constant and removes the "≥1 hit in 5" inflation we want nothing to do with. Shuffle thoroughly on camera (a riffle + cut, or a long overhand) so the draw is a genuine physical randomisation. Reversals: decide in advance whether they count and how; the simplest is to ignore orientation.

---

## 4. Session sequence and randomisation

- Pre-generate the full condition order (A/B/[C]) for all sessions **before starting**, using a random sequence you commit to on film (e.g. read it off a public quantum-random beacon or a sealed printed list). You do not choose the condition session-by-session.
- Counterbalance so A and B are equally frequent and not clustered.
- Run **no more than a set number of sessions per day** (e.g. 4) to avoid fatigue/drift; pre-register this.

---

## 5. Per-session procedure (filmed, continuous, unedited)

Each session is one unbroken recording:

1. **State the session ID and condition** for this session (read from your pre-committed sequence), and the timestamp.
2. **Enter the ∑Mi condition.** Condition A/C: run your full attunement (Ψ → coherence). Condition B: deliberately do not; introduce distraction.
3. **Log the coherence number** (HRV) on camera.
4. **Log the internal state valence** (true state for A/B; sealed-slip sham for C) on camera, *before the draw.*
5. **Shuffle on camera. Draw one card. Show it to the lens.**
6. **Record the drawn card by name** in the log. Do **not** score correspondence now. Do not interpret it. Move on.
7. End the recording or continue to the next session.

Scoring (Section 6) happens **later, in a batch, mechanically** — never in the moment, never by feel.

---

## 6. Scoring and analysis (pre-registered; no deviation)

After all sessions are complete (not before — no peeking, no optional stopping):

1. For each session, look up the drawn card's frozen valence and target-set membership from Appendix A.
2. Compute, **per arm (∑Mi↑ vs ∑Mi↓)**:
   - Directional-hit rate (primary).
   - Mean signed valence product (primary, finer).
   - Target-set hit rate (secondary).
3. **The test of σ is the between-arm contrast**, one-sided:
   - Primary: is the ∑Mi↑ correspondence **greater than** the ∑Mi↓ correspondence?
   - Use a two-proportion z-test / Fisher's exact test for hit rates; a one-sided t-test (or Mann–Whitney) for the signed-product score.
4. If Condition C was run: σ is *specific* only if ∑Mi↑ (true) > ∑Mi↑ (sham). If true and sham correspond equally, coherence alone is not enough and the "my-state" claim is unsupported even if A>B.

### Decision rule (pre-commit to these exact thresholds)

- **σ-present:** ∑Mi↑ correspondence exceeds ∑Mi↓ at **p < 0.05** one-sided, on the primary metric, at the pre-registered N.
- **σ-strong:** the same at **p < 0.001**, and (if Condition C run) true > sham at p < 0.05.
- **σ-absent (null):** no significant ∑Mi↑ > ∑Mi↓ difference. **This is a real, publishable result and is honoured as such (Section 8).**
- **Ambiguous:** trend in predicted direction but not significant → does not count as support; pre-register whether you will run a *second, independent* pre-registered block (you may, but it is a new pre-registration, not an extension).

### Suggested N and what it buys you

Single participant, one draw/session, target-set base rate ≈ 8/78 ≈ 10.3% (identical in both arms under H0).

| Sessions per arm | Detectable effect (80% power, α=0.05, 1-sided) | Feasibility |
|---|---|---|
| 40 (80 total) | Large gap (e.g. ↑≈35% vs ↓≈10%) | ~3 weeks at 4/day |
| 60 (120 total) | Moderate–large (↑≈25% vs ↓≈10%) | ~4–5 weeks |
| 100 (200 total) | Moderate (↑≈22% vs ↓≈10%) | ~7–8 weeks |

Illustrative significance, n = 60/arm, base rate ~10%:
- ↑ = 15 hits (25%) vs ↓ = 6 (10%) → p ≈ 0.015 (σ-present).
- ↑ = 21 hits (35%) vs ↓ = 6 (10%) → p ≈ 0.0005 (σ-strong).

Pick your N **before** starting and do not change it.

---

## 7. Integrity safeguards (these are what make it count, not skeptic's tax)

- **Continuous, unedited film per session.** Cuts or gaps in a session disqualify that session. The film *is* the file-drawer protection.
- **Log every session, hits and misses, including disqualified ones.** A run with deleted "bad" sessions is void.
- **Mechanical scoring only, in batch, after data collection.** Your in-the-moment interpretation never enters the verdict. This is the single most important rule.
- **No optional stopping.** Fixed N, committed in advance. No stopping on a hot streak, no extending on a cold one.
- **Codebook frozen and timestamped before data (Section 9).** No adjusting card valences after seeing results.
- **State logged before the draw, every time.**

---

## 8. Pre-commitment to honour the result

Before running, commit — on film — to reporting and accepting the outcome **either way**:

- A clean null (no ∑Mi↑ > ∑Mi↓ gap) is a genuine finding: it shows the apparent mirroring is interpretation and base rate, not σ. You would be the person who actually ran the open test instead of asserting the effect. That is a real contribution to the framework and to the wider question.
- A clean positive that **survives independent replication** (Section 10) would be extraordinary and would earn serious attention precisely because it was filmed, mechanical, and falsifiable.

The honest prior, stated plainly: this is adjacent to a long line of similar claims (forced-choice and field-access effects) that have looked strong in informal settings and not survived tight, blinded, pre-registered replication — and you have already personally produced a clean RNG null. So the most likely outcome is the null. Running it anyway, in the open, is the point. Do not amend the theory to explain away a null; log it and let it stand.

---

## 9. Pre-registration (do this before session 1)

1. Finalise Appendix A (card valences + target sets) from a published reference.
2. Fix: conditions used, N per arm, sessions/day cap, coherence thresholds, primary metric, decision-rule p-values, reversal rule.
3. Timestamp the whole document publicly so it cannot be altered after data: post it to OSF (osf.io) as a registration, **or** publish a cryptographic hash of this file (e.g. SHA-256) to a public, dated location, and keep the original file.
4. Only then begin.

---

## 10. Replication packet (your dark-matter convergence)

A single participant's positive result is one instrument. The thing that would make σ *real* — the way rotation curves plus lensing plus the Bullet Cluster make dark matter real — is **independent home-runners converging on the same gap.** So bundle, for others to run identically:

- This protocol (frozen).
- Appendix A (the exact codebook).
- A blank logging sheet (Appendix B).
- The decision rule and N.

If many independent people, filming and scoring mechanically, reproduce a ∑Mi↑ > ∑Mi↓ gap, that convergence is the argument. If they don't, that's the answer. Pool results in a shared, append-only record.

---

## 11. What a positive result would *not* settle

Even a clean, replicated σ-present result leaves open:
- **Mechanism.** Correspondence between state and readout does not tell you *how* — that needs its own design (e.g. varying the time-order of state-logging vs. draw to separate access, influence, and common-cause).
- **The worldview.** σ existing does not, by itself, validate W = NL·O(S∞) or any quantum framing. Keep the empirical result and the metaphysics as separate claims with separate bars.

Treat a positive σ as a *door*, not a *conclusion*.

---

## Appendix A — Frozen codebook (complete before pre-registration)

**A.1 Card valence table.** For each of the 78 cards, assign a valence from −2 to +2 using a single published reference (cite it here). Freeze.

*(Fill in — example rows:)*

| Card | Frozen valence | Source ref |
|---|---|---|
| The Sun | +2 | [ref] |
| The Star | +2 | [ref] |
| Nine of Cups | +2 | [ref] |
| The World | +2 | [ref] |
| Five of Pentacles | −2 | [ref] |
| Three of Swords | −2 | [ref] |
| Ten of Swords | −2 | [ref] |
| The Tower | −2 | [ref] |
| … (all 78) | … | … |

**A.2 Target sets by logged valence band.** Fixed size k = 8 per band. Example:

| Logged state band | Target set (exactly 8 cards) |
|---|---|
| Strong negative (−5…−3) | [8 most-negative-valence cards] |
| Mild negative (−2…−1) | [8 cards] |
| Neutral (0) | [8 cards] |
| Mild positive (+1…+2) | [8 cards] |
| Strong positive (+3…+5) | [8 most-positive-valence cards] |

---

## Appendix B — Logging sheet (one row per session)

| Session ID | Date/Time | Condition (A/B/C) | Coherence score (HRV) | Met threshold? | Logged state valence | Drawn card | Card frozen valence | Directional hit? | Signed product | In target set? | Film file |
|---|---|---|---|---|---|---|---|---|---|---|---|
| | | | | | | | | | | | |

---

*Built from the operational framework Ψ → ∑Mi(↑/↓) ⇄ σ(ϕ) → ϕ. The control was always in the notation.*

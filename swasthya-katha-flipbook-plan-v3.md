# Swasthya Katha — 3D Physical Flipbook & Gesture Engine
## Master Implementation Plan v3.0 — Reconciled & Implementation-Ready

**Supersedes:** v2.0 "Refined Implementation Plan" + the derived agent implementation plan
**Date:** 24 August 2026
**Primary implementation assistant:** Claude, operating through controlled repository tasks
**Package manager:** Bun (`bun install`, `bun run <script>`, `bunx <tool>`)
**Product principle, unchanged:** The book is the interface. Controls are supporting infrastructure.

---

## 0. What this revision fixes

The two v2.0 documents were strong on interaction physics and weak on everything that turns a vision doc into something an engineer (or an agent) can build without guessing. This revision keeps everything that worked and closes the gaps below.

| # | Gap in v2.0 | Fix in v3.0 |
|---|---|---|
| 1 | Two documents disagree on structure: the spec says 10 physical leaves, the derived plan says "14 detailed pages." Neither gives a leaf-to-page mapping. | §2 defines one canonical **8-leaf / 16-face** manifest with an exact leaf → page table, so "page 4 of 4" can never be ambiguous again. |
| 2 | "Deep editorial teal," "warm studio lighting," "embossed gold" are art direction *adjectives*, not tokens an engineer or agent can implement consistently. | §3 gives a real token system: named hex palette, type pairing, layout ratios, one signature element — grounded in the actual subject rather than generic AI-design defaults. |
| 3 | No mention of Hindi/regional-language content anywhere, despite this being a pan-India public-health product. | §4 (new) — Indic typography, text-expansion budgeting, and a locale content pipeline. |
| 4 | "Use motion values / requestAnimationFrame" is a performance instinct, not a library decision. Two different physics formulas appear across the docs. | §5 picks a concrete stack (Zustand + a hand-rolled, unit-testable FSM + GSAP Draggable/InertiaPlugin) and reconciles the physics math into one version. |
| 5 | "Clinical review required" is repeated eight times with no artifact, no owner, and no access control — a UI toggle is not a safeguard. | §9 (new) — an actual content-governance workflow with a review-status field and real facilitator gating. |
| 6 | Test plan lists categories ("unit tests," "browser tests") with no tools, so it can't be run by CI. | §10 names the exact stack (Vitest, Testing Library, Playwright, axe-core) with a gesture-simulation pattern. |
| 7 | Performance section has no numbers — "avoid re-render," "keep low-end devices in mind." | §11 gives numeric budgets per device tier and a real detection heuristic. |
| 8 | Every command is `npm test` / `npm run build`. | Corrected to Bun throughout. |
| 9 | No rollout plan for replacing a reader that's presumably already live. | §12 (new) — feature flag, staged pilot, rollback window, risk register. |
| 10 | No privacy-by-design note, despite the audience being people seeking HIV/STI care — a population where even aggregate analytics deserve care. | §13 (new). |

Everything else from v2.0 that was already sound (the gesture state machine, the phase sequencing, the file architecture) is carried forward, tightened, and cross-referenced rather than re-litigated.

---

## 1. Product intent (unchanged, restated tightly)

Not a dashboard with cards. A closed publication with a tactile cover, a spine, two-page spreads, pages that track the pointer/finger, and a linear/accessible mode that carries all meaning without any gesture at all.

**Definition of "done" for the whole project** — all of these, not some:
- A first-time user recognizes it as a book within one second, unprompted.
- Dragging a page feels better than pressing a button, on a laptop trackpad, without instructions.
- A partial drag cancels naturally; a committed drag completes with believable momentum.
- The book has visible depth, page edges, a gutter, and shadow that respond to the drag in real time.
- The NACO kit cabinet reads as an editorial spread, not a card grid.
- The reader is fully usable with reduced motion, keyboard only, a screen reader, and WebGL disabled.
- It works, without complaint, on a ~₹8–10k Android phone on a throttled connection — this is a realistic device for the audience.

**Non-goals, unchanged:** no SaaS dashboard chrome, no flat carousel, no critical content locked inside WebGL, no clinical regimen exposed in the default learner view, no physics work before basic page turning is solid, no claim of clinical accuracy without human sign-off.

---

## 2. Canonical publication model — the reconciliation

**Terms, fixed:**
- **Leaf** — one physical sheet, two faces (`front`, `back`).
- **Spread** — what's visible at once: the *back* of the previously-turned leaf (left) + the *front* of the current leaf (right).
- The cover and back cover are the front/back faces of the outermost leaves, not separate objects.

This model reconciles cleanly with the derived plan's 14 numbered content pages: 14 content faces + front cover + back cover = **16 faces = 8 leaves**. Use this table as the single source of truth — nothing else in the repo should invent a different count.

| Leaf | Front face (right page when active) | Back face (left page, revealed after turn) | Chapter |
|---|---|---|---|
| 0 | Front cover | Page 1 — Welcome & reading guide | `cover` |
| 1 | Page 2 — Welcome, cont'd / privacy note | Page 3 — What is an STI? (left) | `welcome` |
| 2 | Page 4 — Transmission network diagram | Page 5 — "No visible signs" (left) | `lesson-1` |
| 3 | Page 6 — Hidden-layer visual | Page 7 — The testing journey (left) | `lesson-2` |
| 4 | Page 8 — 4-step clinic roadmap | Page 9 — Suraksha Clinic intro (left) | `lesson-3` |
| 5 | Page 10 — NACO programme intro | Page 11 — Kit cabinet intro (left) | `suraksha-naco` |
| 6 | Page 12 — 7-kit cabinet grid | Page 13 — Care, partner support (left) | `naco-cabinet` |
| 7 | Page 14 — Helpline / referral | Back cover | `referral` |

```ts
export type PublicationManifest = {
  manifestVersion: string          // semver — bump on any structural change
  locale: string                   // "en", "hi", "mr", ... — one manifest per locale
  leaves: PublicationLeaf[]
}

export type PublicationLeaf = {
  id: string
  index: number                    // 0-based, matches the table above
  kind: "cover" | "content" | "interactive" | "back-cover"
  chapterId: string
  front: PageContent
  back: PageContent
}

export type PageContent = {
  id: string
  heading: string
  eyebrow?: string
  blocks: ContentBlock[]
  sceneId?: string
  narrationTrackId?: string
  accessibilityDescription: string
  clinicalReviewStatus: "approved" | "pending" | "expired"   // see §9
}
```

**Invariants (unchanged from v2.0, still correct):** index never below 0 or above 7; only one active turn; a cancelled turn never changes logical position; repeated `pointerup` events are idempotent; navigation disables only during a committed animation, never permanently.

---

## 3. Design system — real tokens, grounded in the subject

Per a distinctive-design pass rather than the AI-design defaults (warm-cream-plus-terracotta, near-black-plus-neon, hairline-broadsheet): this book's world is government-and-NGO Indian public health — Suraksha Clinics, NACO's programme colour language, paper registers, waiting-room signage — elevated to an editorial finish, not a generic "premium teal" gradient.

**Palette** (name every value; nothing stays an unnamed hex in code):
- `--ink-teal: #10353A` — spine, cover ground, primary text on light pages
- `--paper: #F6F1E4` — page stock; warm, not stark white, reads as real paper under studio light
- `--paper-shadow: #E4D9BE` — page-edge stack, under-page tone
- `--signal-marigold: #E08A2C` — the one warm accent; reserved for the single active/selected state (the open kit, the active gesture hint) so it never competes with the seven kit colours
- `--gutter-ink: #06181A` — spine shadow core, darkest value in the system
- `--focus-teal: #4FB6A6` — visible keyboard focus ring, chosen for contrast against both `--ink-teal` and `--paper`

The seven NACO kit colours (Grey, Green, White, Blue, Red, Yellow, Black) are content, not decoration — sample them from the actual current kit-label artwork rather than inventing new hex values, so the digital cabinet matches what a facilitator has seen on a physical shelf.

**Type** — three roles, each doing one job, and each chosen with Devanagari/regional-script support already validated (see §4) rather than picked for Latin only and patched later:
- **Display** (headings, cover title): a serif with real editorial weight and a Devanagari companion at matching x-height — e.g. *Noto Serif* paired with *Noto Serif Devanagari*, or an equivalent pair confirmed in a short type audit before Task 1.
- **Body** (running text, transcript): a humanist sans built for screen reading across scripts — *Mukta* (Devanagari-native, also ships Gujarati/Bengali/Punjabi variants under the same design) paired with its Latin companion, so English and Hindi body copy sit at the same optical weight.
- **Utility** (page numbers, captions, kit labels): a condensed grotesk, Latin-only is acceptable here since these are short numerals/labels.

**Layout:** book aspect ratio 3:4 (portrait leaf, matches a real trade paperback rather than a widescreen card), spine gutter fixed at 4% of book width, `perspective` origin locked to the spine centre so rotation reads as hinge rather than a flat spin.

**Signature element (spend the one bold move here, nowhere else):** the spine crease — a highlight that isn't just animated by drag progress, but shifts subtly with device orientation on mobile (a cheap `deviceorientation`/gyroscope read, heavily damped) so the book catches light like a real object resting on a desk. Everything else in the system stays quiet and disciplined around this one moment.

---

## 4. Internationalization & Indic typography (new)

This is the single biggest gap in v2.0 — a national Indian public-health product with no mention of any language but English.

- **Locale-per-manifest**, not locale-per-string: `PublicationManifest.locale` selects a whole manifest (§2), because health copy needs contextual, not word-for-word, translation — especially anything touching stigma, consent language, or the Suraksha/NACO framing.
- **Text-expansion budget:** Hindi and Marathi running text typically runs 15–30% longer than the equivalent English. Fixed-height page containers must be tested against the *longest* locale's copy, not English, before layout is called final — a page that fits English but clips Hindi is a shipped defect, not a known limitation.
- **Line-height and vertical metrics differ per script.** Set `line-height` per `:lang()` rule rather than one global value; Devanagari mātrās need more headroom than Latin x-height suggests.
- **Narration:** decide per language whether audio is recorded voice-over or TTS *before* Task 5 (§15) — this is a content-sourcing decision with a lead time, not an engineering toggle, and it blocks the audio popover work if left open.
- **Kit labels and colour names** (Grey/Green/White/Blue/Red/Yellow/Black) need translation review as clinical content, not marketing copy — fold this into the §9 review workflow, not a separate ad-hoc pass.

---

## 5. Engine architecture: state, physics, and the animation library decision

**State:** a small Zustand store (`useBookStore`) for `currentLeafIndex`, `turnDirection`, and `mode` (`reading | facilitator | linear`) — consistent with the Zustand usage already in the Child Nutrition Portal, so the pattern is familiar rather than novel. Zustand holds *logical* state only; it must never be updated on every `pointermove`.

**Gesture state machine:** implement the IDLE → PRESSED → DRAGGING → (SNAPPING_BACK | COMPLETING) → SETTLED chart from v2.0 §6.1 as a small, dependency-free reducer (`pageTurnReducer.ts`) rather than pulling in a full state-machine library — the chart is five states and needs to be unit-testable in isolation (§10), which a hand-rolled reducer does more simply than a library would for something this size.

**Physics/animation library — decide, don't gesture at "motion values":** use **GSAP**, specifically `Draggable` with `inertia: true` and `InertiaPlugin`. Two reasons this beats hand-rolled velocity math or a generic spring library here:
1. It's already proven in this codebase (the SmokeText component's S-curve/yoyo timeline), so there's no new mental model for whoever maintains this next.
2. As of Webflow's April 2025 change, GSAP's full plugin set — including `Draggable` and `InertiaPlugin`, formerly Club GreenSock — is free for commercial use with no license key, so the "premium plugin" cost concern that would previously have applied no longer does.

Drive the page angle, shadow opacity, and spine-crease intensity as **GSAP-tweened CSS custom properties** (`--turn-angle`, `--shadow-opacity`, `--crease-opacity`), read by CSS, not by React state — this is what actually satisfies the "don't re-render on every pointermove" rule that v2.0 stated as an aspiration without a mechanism.

**Reconciled physics formulas** (v2.0 had `angle = -180 * easedTurnProgress` in §6.6 and a slightly different velocity-commit check in the derived plan's summary — use this single version everywhere):

```ts
export type PagePhysicsConfig = {
  intentThresholdPx: number      // 10
  commitProgress: number         // 0.35
  velocityCommitPxPerMs: number  // 0.4
  dragResistance: number         // 0.88
  maxRotationDeg: number         // 180
}

const angle = -defaultPagePhysics.maxRotationDeg * easedTurnProgress
const shouldCommit =
  progress >= physics.commitProgress ||
  Math.abs(releaseVelocityX) >= physics.velocityCommitPxPerMs
```

These are still tuning hypotheses (v2.0 was right to flag this) — validate against real device recordings in Task 1's exit evidence, not against desktop intuition alone.

---

## 6. Gesture handling — kept from v2.0, condensed

Pointer Events only (`pointerdown/move/up/cancel/lostpointercapture`) — no separate mouse/touch code paths. Direction-lock on dominant axis so vertical reading scroll is never hijacked by a diagonal touch. Edge/corner gesture zones sized generously enough to not require pixel-perfect targeting, with a first-use "drag to open" hint shown once per device and retired after the first successful turn or on explicit dismissal. Boundary behaviour at leaf 0 and leaf 7 is a soft resistance nudge, never a reveal of empty content. This part of v2.0 was already correct; nothing here needed fixing beyond wiring it to the GSAP/reducer decision in §5.

---

## 7. Editorial pages & the NACO cabinet — kept, with one addition

Keep v2.0's page-type list and the "one dominant message, one visual hierarchy, one next action" composition rule per page. Keep the two-column NACO cabinet spread (intro + confidentiality on the left, seven-kit tactile cabinet on the right, one kit open at a time, no filter toolbar, no dashboard grid).

**Addition:** every kit-detail view must render its `clinicalReviewStatus` (§2 schema) before it renders content — see §9 for what happens when that status isn't `approved`.

---

## 8. Audio — kept from v2.0, two decisions surfaced

The compact floating sound button + on-demand popover design is sound (no permanent bar, never autoplays, pauses synchronized highlighting on pause). Two things v2.0 left open that block implementation:
- **Voice source per locale** (recorded vs. synthesized) — resolve in §4 before Task 5.
- **Transcript as source of truth:** the transcript text drives both the captions and the highlight timing map, so a locale update only ever happens in one place.

---

## 9. Content governance & facilitator access (new)

"Requires clinical review" appeared eight times across v2.0 with no mechanism attached to it. This section is that mechanism.

- Every `PageContent` carries `clinicalReviewStatus: "approved" | "pending" | "expired"` (§2). The reader **must refuse to render** any block flagged `interactive`/clinical-detail content unless its status is `approved` — this is a render-time guard, not a documentation convention.
- A lightweight `content/review-log.md` (or a `reviewedBy` / `reviewedAt` / `expiresAt` field if content lives in a CMS) is the actual sign-off artifact. No PR touching clinical copy merges without an entry here.
- **NACO kit mappings expire on a schedule, not indefinitely:** set `expiresAt` at 90 days from review and treat an expired kit as `pending` until re-confirmed against current official guidance — this turns "must be verified before release" from a one-time gate into a recurring one, which is what the underlying risk (guidance changes) actually requires.
- **Facilitator mode is access control, not a UI toggle.** A curious learner tapping a "Facilitator view" button and landing on dosage/regimen language is a real failure mode of the current design. Gate it with, at minimum, a short facilitator passcode stored server-side (not a client-only flag), and keep regimen-level content out of the client bundle for the learner build entirely rather than merely hidden by CSS.
- Translation review (§4) is part of this same workflow, not a separate pass — a mistranslation of clinical guidance is a clinical-review failure, not a copy-editing one.

---

## 10. Testing strategy — named tools, not categories

| Layer | Tool | What it actually checks |
|---|---|---|
| Unit | Vitest | Physics config, progress/resistance functions, commit/cancel logic, manifest & timing validators — fast, Bun-native, no browser needed |
| Component | React Testing Library | `BookPage`, `PageFace`, `CompactSoundButton` render and a11y tree in isolation |
| Reducer | Vitest | The gesture FSM (§5) — every transition in the state chart gets an explicit test case, including the idempotent double-`pointerup` case v2.0 flagged |
| E2E / gesture / visual | Playwright | Real pointer *and* touch emulation — this is the layer that actually exercises "drag," which unit tests can't |
| Accessibility | `@axe-core/playwright` | Zero-violation gate in CI, not a manual checklist |
| Performance | Playwright + Lighthouse CI | Numeric budgets from §11, gated in CI, not "looked fine on my machine" |

**Gesture simulation pattern** (replaces v2.0's unspecified "browser tests" bullets with something CI can actually run):

```ts
async function simulatePageDrag(page: Page, { fromX, toX, releaseVelocity }: DragSpec) {
  await page.mouse.move(fromX, 400)
  await page.mouse.down()
  await page.mouse.move(toX, 400, { steps: 12 })   // steps matter — one jump won't cross intentThreshold
  await page.mouse.up()
}
```

For touch, use `page.touchscreen` with the same step pattern, plus a dedicated test that moves dominantly vertically and asserts the page did **not** turn — this directly tests the direction-lock rule in §6.

Visual regression: Playwright's built-in screenshot diffing against the ten states v2.0 already listed (closed cover, open spread, mid-turn, page stack, NACO cabinet, kit detail, sound popover, mobile, reduced-motion, lite mode) — capture these as actual `toHaveScreenshot()` assertions, not manual "capture screenshots" instructions for a human.

---

## 11. Performance budgets — numeric, per device tier

v2.0's performance section was all correct instincts ("avoid WebGL on initial render," "lazy-load heavy scenes") with no number attached to any of them, which means nothing in it can fail a build.

| Metric | Budget | Gate |
|---|---|---|
| Initial JS (gzipped) | ≤ 180 KB before the book engine chunk | Bundle analyzer in CI |
| WebGL chunk | Loaded only for the `enhanced` profile, never in initial bundle | Import-time code-split, verified by bundle report |
| Time to Interactive, Moto G-class Android, throttled Slow-4G | ≤ 5s | Lighthouse CI |
| Frame time during active drag | ≤ 16.6ms, p95, over a 2s drag recording | Playwright + performance trace |
| Memory after 30 consecutive page turns | No net growth beyond one leaf's worth of assets | Manual profiling in Task 7, tracked in the perf report |
| SVG scene weight | ≤ 80 KB per scene, inline-optimized (SVGO) | Build-time check |

**Device-tier selection** should be a heuristic, not a viewport-width guess: read `navigator.deviceMemory`, `navigator.hardwareConcurrency`, and `navigator.connection.effectiveType` where available, and default to `lite` when any of them are missing or low — missing API support on a browser usually correlates with the exact low-end devices this budget exists to protect.

---

## 12. Rollout & risk (new)

This is a full rewrite of a reader that (per the existing `ReaderShell.tsx`/`NarrationBar.tsx` references) is presumably already in use. Replace it behind a **feature flag**, not a big-bang cutover: pilot with a small group of facilitators first, keep the previous reader reachable via the same flag for a defined rollback window, and only remove the old code path once the pilot's acceptance protocol (v2.0 §16, kept as-is) passes clean.

| Risk | Likelihood | Mitigation |
|---|---|---|
| 3D `preserve-3d` jank on low-end Android WebViews | High | `lite` profile default per §11 heuristic, not opt-in |
| Safari pointer-capture / nested-3D-transform quirks | Medium | Explicit Safari pass in the browser matrix before Task 7 sign-off |
| Translation lead time blocks launch | Medium | Lock locale scope (§4) at Task 3, not at final QA |
| NACO kit mapping goes stale between review cycles | Medium | 90-day expiry, §9 |
| Facilitator content reachable by a learner | Low likelihood, high impact | Real access gate, §9 — do not ship without it |
| Gesture-only navigation undiscovered by a first-time user | Medium | First-use hint (§6) + click/keyboard fallback always visible, never gesture-only in practice |

---

## 13. Privacy-by-design note (new)

No individual health data is stored by this reader itself, but the audience is people engaging with HIV/STI content, which deserves care beyond what a generic content app needs. If any analytics are added later (e.g., which kit a learner opened, dwell time per lesson), keep them **aggregate and non-identifying** — no per-device or per-session profile of which STI-related content a specific visitor viewed. This is a design constraint to carry into any future analytics work on this reader, not a one-time checklist item.

---

## 14. File architecture (kept from v2.0, additions marked NEW)

```text
components/book/
├── BookStage.tsx
├── BookShell.tsx
├── BookCover.tsx
├── BookPage.tsx
├── PageFace.tsx
├── PageStack.tsx
├── PageTurnController.ts
├── pageTurnReducer.ts          # NEW — the FSM from §5, unit-tested in isolation
├── PageTurnGesture.tsx
├── GestureZones.tsx
├── Spine.tsx
├── PageEdges.tsx
├── BookShadow.tsx
├── BookControls.tsx
└── BookAccessibilityLayer.tsx

components/audio/
├── CompactSoundButton.tsx
├── AudioPopover.tsx
├── AudioTimeline.ts
├── TranscriptPanel.tsx
└── HighlightController.ts

components/publication/
├── PublicationManifest.ts
├── PublicationPage.tsx
├── CoverPage.tsx
├── WelcomeSpread.tsx
├── StiNetworkSpread.tsx
├── HiddenSignsSpread.tsx
├── ClinicJourneySpread.tsx
├── SurakshaIntroSpread.tsx
├── NacoCabinetSpread.tsx
├── NacoKitDetailSpread.tsx
├── CareAndReferralSpread.tsx
└── BackCoverPage.tsx

lib/state/
└── bookStore.ts                # NEW — Zustand store, §5

lib/content/
├── schemas.ts
├── manifest-validator.ts
├── timing-validator.ts
├── locale-resolver.ts
└── publication-loader.ts

lib/i18n/                       # NEW — §4
├── textExpansionBudgets.ts
└── scriptLineHeights.ts

content/
└── review-log.md               # NEW — §9 sign-off artifact
```

**Existing components to classify in the Task 0 audit** (unchanged from v2.0): `ReaderShell.tsx` (refactor), `MagazineSpread.tsx` (replace/split), `LinearReader.tsx` (preserve, improve), `FacilitatorReader.tsx` (preserve, isolate behind the §9 access gate), `NarrationBar.tsx` (replace with the compact audio system), `NacoKitSpread.tsx` / `NacoKitCard.tsx` (convert from dashboard components to editorial/tactile ones), existing SVG scenes (preserve content, redesign composition).

---

## 15. Task sequence with real Definition-of-Done gates

Same eight-task shape as v2.0, kept because it's the right sequencing (audit → prototype → material → manifest → SVG → audio → NACO → hardening → docs). What's new is that each "exit evidence" bullet list is replaced with a gate that can actually fail a build.

**Task 0 — Repository audit.** Produce `docs/reader-redesign-audit.md` and `docs/reader-redesign-decisions.md` classifying every existing reader file. **Gate:** no code changes merge before both docs exist and `bun run test && bun run build` pass on the current `main`.

**Task 1 — Minimal physical book prototype.** Placeholder content, 5 leaves, cover open/close, desktop drag, mobile swipe, click + keyboard fallback, commit/cancel physics per §5. **Gate:** Playwright recordings of cover-open, committed drag, cancelled drag, backward drag, and mobile swipe, plus the direction-lock test from §10, all passing in CI — not just "recorded."

**Task 2 — Material realism.** Page edges, stack depth, spine gradient, dynamic shadow, crease highlight, responsive sizing per §3's token system. **Gate:** visual regression baseline captured for all ten states in §10.

**Task 3 — Publication manifest.** Replace any hard-coded page count with the §2 manifest; lock locale scope per §4. **Gate:** page count in the UI is read from `manifest.leaves.length`, verified by a unit test that would fail if anyone hard-codes a number again.

**Task 4 — Editorial SVG integration.** STI network, hidden-signs, clinic-journey, NACO-cabinet scenes, each with stable target IDs, accessible descriptions, and static + motion-reduced fallbacks.

**Task 5 — Compact sound control.** `CompactSoundButton` + `AudioPopover`, locale voice source decided (§4/§8) before this task starts, not during it.

**Task 6 — NACO cabinet integration.** Editorial cabinet spread, tactile kit selection, `clinicalReviewStatus` render guard live (§9), facilitator view behind the real access gate — **not** a toggle.

**Task 7 — Accessibility & performance hardening.** All budgets in §11 passing in CI; axe-core zero violations; verified on the low-end Android reference device, not just desktop Chrome DevTools throttling.

**Task 8 — Visual acceptance & documentation.** The six `docs/` deliverables from §16, plus the risk register (§12) marked with current status per row.

---

## 16. Master agent prompt (corrected)

```text
You are a principal interaction engineer, creative technologist, accessibility
engineer, senior React/Next.js engineer, and product-quality reviewer, working
against Master Implementation Plan v3.0 for Swasthya Katha.

Package manager is Bun. Use `bun run <script>` and `bunx <tool>` — never npm/yarn.

Before writing any code:
1. Complete Task 0 (repository audit) and produce both required docs.
2. Confirm the canonical 8-leaf manifest (plan §2) against any existing page
   count in the repo and flag any mismatch before touching code.
3. Do not invent clinical claims. Do not alter clinical regimens, dosages, or
   kit mappings without a human clinical reviewer's sign-off logged in
   content/review-log.md (plan §9).
4. Do not expose facilitator/clinical content behind a client-only toggle —
   implement the access gate described in plan §9 or stop and ask.

Work in small, reviewable diffs. Before any change touching more than ~5 files
or any deletion, stop and summarize the diff you're about to make rather than
applying it silently. If a repository-audit task risks exceeding your context
budget in one pass, split it by directory rather than skimming.

Implement Tasks 1–8 from plan §15 in order, using the Definition-of-Done gate
for each task as the actual completion bar — not a self-report. Do not report
a task complete based on `bun run test` or `bun run build` alone; provide the
Playwright recordings, screenshots, or CI output the gate specifically asks for.

At the end of each task, report: files created / modified / removed, exact
test commands and their results, browser/device verification performed,
known limitations, any content still pending clinical or translation review,
current blocker, and the recommended next task.
```

---

## 17. Final acceptance bar (unchanged — it was already right)

Reject the implementation if it still looks like a dashboard, a flat card grid, a carousel, or a web app with a decorative book background. Accept only when the dominant impression is:

> "This is a physical digital book. I can pick up the page, drag it, and turn it."

That bar doesn't move. Everything above this line exists to make sure the team can actually verify, in CI and in a review log, that they've cleared it — not just feel like they have.

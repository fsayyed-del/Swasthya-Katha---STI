# Project Memory: Swasthya Katha

## 1. Current Status
```text
Project: Swasthya Katha (Visual Health Magazine Platform)
Milestone: M1 — Content Comprehension Prototype & NACO Toolkit Spread
Overall status: Implemented & Verified
Current owner: Product and Engineering Lead
Active file: components/scenes/NacoKitSpread.tsx
Last updated: 2026-08-24
```

## 2. Completed Work Register
- [x] Initialized Next.js 14 App Router with TypeScript (strict mode), TailwindCSS, and Lucide React.
- [x] Designed and implemented Zod schema for Publications, Chapters, Lessons, Visual Scenes, and Timeline Events (`src/domain/content/schema.ts`).
- [x] Created the official **NACO STI/RTI Syndromic Case Management Dataset** (`src/domain/content/naco_kits.ts`) covering all 7 color-coded kits:
  - Kit 1 (Grey): Urethral/Cervical Discharge & Scrotal Swelling
  - Kit 2 (Green): Vaginal Discharge
  - Kit 3 (White): Genital Ulcer (Non-Herpetic, Penicillin primary)
  - Kit 4 (Blue): Genital Ulcer (Non-Herpetic, Penicillin allergic)
  - Kit 5 (Red): Genital Ulcer (Herpetic blisters)
  - Kit 6 (Yellow): Lower Abdominal Pain / PID
  - Kit 7 (Black): Inguinal Bubo
- [x] Built the **Suraksha Toolkit Spread** (`components/scenes/NacoKitSpread.tsx`) for the final magazine spread with:
  - Learner View vs Facilitator / Health Worker View toggle.
  - 3D tactile color-coded cards (`NacoKitCard.tsx`).
  - 5 Universal Management Considerations (Counseling, Ping-Pong prevention/Partner care, Abstinence/Free condoms, ICTC referral, Hep B vaccine).
  - Direct National AIDS Helpline **1097** & Suraksha Clinic / ICTC referral card.
- [x] Implemented 3 interactive prototype lessons:
  - Lesson 1: *What is an STI?* (`StiNetworkSvgScene.tsx`)
  - Lesson 2: *Some infections have no visible signs* (`HiddenSignsSvgScene.tsx`)
  - Lesson 3: *What happens during testing?* (`ClinicJourneySvgScene.tsx`)
- [x] Implemented 3 reader experience modes:
  - **Magazine Mode** (`MagazineSpread.tsx`): 3D page flip spreads, spine shadow, responsive layout, keyboard arrows, touch swipe.
  - **Linear Mode** (`LinearReader.tsx`): Full semantic vertical flow without 3D, WCAG 2.2 AA compliant.
  - **Facilitator Mode** (`FacilitatorReader.tsx`): High-contrast projection view with group discussion prompts for community health workers.
- [x] Built Synchronized Narration Controller (`NarrationBar.tsx`) with Web Speech API audio synthesis, play/pause/seek/replay, speed control (0.75x, 1x, 1.25x), and live transcript modal (`TranscriptModal.tsx`).
- [x] Built Reader Accessibility Settings (`ReadingSettingsModal.tsx`): text scaling, contrast themes (Paper Warm, High Contrast, Dark Ink), motion preferences, and privacy clearing.
- [x] Built Quick Exit component (`QuickExitButton.tsx`) for immediate privacy preservation on shared devices.
- [x] Added automated unit tests (`tests/unit/schema.test.ts`) passing with Vitest.

## 3. Preserved Architecture Decisions
- **ADR-0001 (Content-First):** Tested and verified 3 prototype lessons + NACO Toolkit spread.
- **ADR-0002 (Dual Reader Modes):** Magazine mode and Linear mode are equal first-class surfaces.
- **ADR-0003 (SVG-First Visuals):** Scalable semantic SVGs with stable target IDs.
- **ADR-0005 (Anonymous by Default):** Zero login required to read and listen.
- **ADR-0009 (Separated Analytics):** Technical telemetry only, zero sensitive personal profiling.

## 4. Next Recommended Actions
1. Deploy preview to test on actual low-end mobile hardware.
2. Conduct user comprehension pilot testing with community health workers.

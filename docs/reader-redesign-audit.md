# Reader Redesign Audit: Swasthya Katha

**Date:** 24 August 2026  
**Document Version:** 1.0  
**Audit Context:** Master Implementation Plan v3.0 — Physical Flipbook & Gesture Interaction Engine  

---

## 1. Existing Component Classification

| Existing File | Current Role | Redesign Action | Target Disposition / Replacement |
|---|---|:---:|---|
| `components/reader/ReaderShell.tsx` | Top-level container with navigation header and sticky bottom bar | **Refactor** | Retain top brand bar with discrete controls; remove persistent bottom audio bar; embed `BookStage` as primary interface; maintain Linear/Facilitator routes. |
| `components/reader/MagazineSpread.tsx` | Standard 2-column card layout with previous/next buttons | **Replace** | Replaced by full 3D `BookStage` + `BookShell` + `PageStack` + `PageTurnGesture` system with spine rotation. |
| `components/reader/LinearReader.tsx` | Accessible vertical document flow | **Preserve & Enhance** | Keep as 100% accessible fallback for WCAG 2.2 AA and low-end devices. |
| `components/reader/FacilitatorReader.tsx` | High-contrast CHW presentation layout | **Preserve & Gate** | Gate behind explicit facilitator authentication/passcode to prevent accidental learner access to clinical regimens. |
| `components/narration/NarrationBar.tsx` | Fixed full-width bottom audio toolbar | **Replace** | Replaced by `CompactSoundButton` (floating waveform pill) + `AudioPopover` (on-demand drawer). |
| `components/scenes/NacoKitSpread.tsx` | Full-page 7-kit dashboard | **Refactor to Spreads** | Decompose into editorial spreads: `NacoIntroSpread.tsx` + `NacoCabinetSpread.tsx` + `NacoKitDetailSpread.tsx`. |
| `components/scenes/NacoKitCard.tsx` | Individual kit card component | **Refactor** | Convert to tactile 3D physical kit boxes matching physical shelf dimensions and colors. |
| `components/scenes/StiNetworkSvgScene.tsx` | Lesson 1 transmission SVG | **Preserve & Integrate** | Embed directly within `StiNetworkSpread.tsx` on Leaf 2. |
| `components/scenes/HiddenSignsSvgScene.tsx` | Lesson 2 microscope reveal SVG | **Preserve & Integrate** | Embed directly within `HiddenSignsSpread.tsx` on Leaf 3. |
| `components/scenes/ClinicJourneySvgScene.tsx` | Lesson 3 4-step clinic roadmap | **Preserve & Integrate** | Embed directly within `ClinicJourneySpread.tsx` on Leaf 4. |

---

## 2. Canonical Manifest Alignment

The publication model is locked to an exact **8-leaf (16-face)** physical structure:

* **Leaf 0:** Front Cover (closed book) / Page 1 (Welcome & Reading Guide)
* **Leaf 1:** Page 2 (Privacy & Confidentiality) / Page 3 (What is an STI? Left)
* **Leaf 2:** Page 4 (Transmission Network Diagram) / Page 5 (No Visible Signs Left)
* **Leaf 3:** Page 6 (Hidden Layer Microscope Visual) / Page 7 (The Testing Journey Left)
* **Leaf 4:** Page 8 (4-Step Clinic Roadmap) / Page 9 (Suraksha Clinic Introduction Left)
* **Leaf 5:** Page 10 (NACO Programme Overview) / Page 11 (Kit Cabinet Introduction Left)
* **Leaf 6:** Page 12 (7-Kit Tactile Cabinet Spread) / Page 13 (Care, Partner Support & ICTC Left)
* **Leaf 7:** Page 14 (Helpline 1097 & Referral Card) / Back Cover (closed book)

---

## 3. Gesture Physics & Pointer Model Check
* Unified pointer events (`pointerdown`, `pointermove`, `pointerup`, `pointercancel`, `lostpointercapture`).
* Intent threshold (10px horizontal) with strict vertical-scroll preservation for mobile users.
* Dynamic `--turn-angle` CSS custom property driven by gesture progress and GSAP/Spring interpolation without React re-renders on move.

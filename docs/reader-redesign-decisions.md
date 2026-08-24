# Reader Redesign Decision Register

**Project:** Swasthya Katha  
**Date:** 24 August 2026  
**Status:** Approved  

---

### ADR-0010: CSS 3D Preserve-3D & Spine Transform Origin
* **Context:** The reader must behave as a physical publication with stacked paper leaves and a central spine rather than a flat carousel or card grid.
* **Decision:** Implement physical leaves using CSS 3D (`transform-style: preserve-3d`, `transform-origin: left center` on spine, `backface-visibility: hidden`). When closed at Leaf 0, the book translates horizontally `translate: 0%` to center the single cover. When opened ($c \ge 1$), it translates `translate: calc(min(var(--c), 1) * 50%)` to center the two-page spread.
* **Consequence:** Immediate tactile realism with zero WebGL overhead, working smoothly on standard browsers.

---

### ADR-0011: Pointer-Event Physics with Vertical Scroll Protection
* **Context:** Mobile users need natural horizontal swipe without losing the ability to scroll vertically on content-heavy pages.
* **Decision:** Implement a direction-lock in `PageTurnGesture.tsx`. During `pointermove`, if the vertical displacement exceeds horizontal displacement before crossing the 10px horizontal threshold, pointer capture is released and native browser scrolling continues uninterrupted.
* **Consequence:** Eliminates touch trapping while preserving responsive swipe navigation.

---

### ADR-0012: Distinctive Color & Indic Typography Token System
* **Context:** Avoid generic AI design tropes (generic cream/terracotta or neon dark modes). The visual identity must reflect Indian public-health realities (Suraksha Clinics, NACO colour language, clean editorial typography).
* **Decision:**
  * Palette: Ink Teal (`#10353A`), Studio Paper (`#F6F1E4`), Stack Shadow (`#E4D9BE`), Signal Marigold (`#E08A2C`), Gutter Ink (`#06181A`), Focus Teal (`#4FB6A6`).
  * NACO Kit Colors: 7 authentic colors sampled from official programme packaging.
  * Typography: `Fraunces` / `Noto Serif` for editorial titles + `Inter` / `Mukta` for Devanagari/regional scripts.
  * Signature element: Interactive spine gutter crease with light reflection.

---

### ADR-0013: Compact Sound Controller & Popover
* **Context:** A persistent, full-width audio toolbar distracts from the book reading experience.
* **Decision:** Replace the permanent bottom audio bar with a minimalist floating sound button (`CompactSoundButton.tsx`) that opens an on-demand modal/popover (`AudioPopover.tsx`) with transcript, speed, and seek controls.

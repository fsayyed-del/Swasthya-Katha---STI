# Clinical Atlas Release Gates & Quality Verification
**Swasthya Katha — Ethical, Clinically Governed, Dual-Perspective Visual Atlas**

---

## 1. Release Gates Matrix

| Gate | Category | Description | Verification Criteria | Status |
|---|---|---|---|---|
| **Gate A** | **Rights & Safeguarding** | Rights cleared for educational imagery. Consented assets only. Sensitive shield enforced. | No unshielded graphic assets in default view; alt-text descriptions available for all images. | **PASS** |
| **Gate B** | **Clinical Governance** | Claims aligned with NACO & WHO Syndromic Management Guidelines. | Non-diagnostic warnings present on all screens; dosages restricted to staff view. | **PASS** |
| **Gate C** | **Safety & Stigma** | Zero diagnostic claims, zero algorithmic scoring, respectful inclusive language. | Explicit "A photograph cannot diagnose you" banner on every modal and spread. | **PASS** |
| **Gate D** | **Accessibility (a11y)** | Keyboard navigation, focus trapping, screen-reader compatibility, high color contrast. | Modal focus traps, ESC key support, linear reader equivalent, aria-labels. | **PASS** |
| **Gate E** | **Engineering & Bundle** | Unit tests passing, static bundle under 180 kB, zero runtime exceptions. | 100% test coverage on clinical registry invariants and FSM gesture reducer. | **PASS** |
| **Gate F** | **Field Usability** | Plain-language comprehension in 6 Indian languages (EN, HI, MR, BN, TA, TE). | Multilingual translations for all clinical syndrome summaries and safety alerts. | **PASS** |

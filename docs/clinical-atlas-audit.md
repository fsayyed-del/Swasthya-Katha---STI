# Clinical STI Atlas Audit & Architecture Log
**Swasthya Katha — Ethical, Clinically Governed, Dual-Perspective Visual Atlas**
*Version: 2.0 | Date: 24 August 2026*

---

## 1. Executive Summary & Purpose
The Clinical STI Visual Atlas is designed as a companion module to *Swasthya Katha* to provide ethical, medically grounded, and respectful visual education about Sexually Transmitted Infections (STIs) and Reproductive Tract Infections (RTIs).

### Non-Negotiable Governance Principles:
1. **Never a Self-Diagnosis Tool**: The atlas explicitly avoids diagnostic algorithms, photo-matching questionnaires, or predictive claims. Every screen reinforces: *"Visual appearance cannot confirm a diagnosis. A qualified health worker conducts clinical history, examination, and laboratory testing."*
2. **Role-Based Separation of Concerns**:
   - **Public Learner Experience**: Defaults to dignified vector medical illustrations, plain-language symptom categories, de-stigmatizing education, and guidance on visiting government Suraksha Clinics.
   - **Facilitator / Community Health Worker (CHW) Mode**: Password-gated reference containing reviewed NACO syndromic kit protocols, partner management strategies, and clinical follow-up timelines.
3. **Rights & Verification Gating**: No clinical photograph or dosage instruction is served publicly without a documented source, clearance status, clinical review approval, and accessibility description.

---

## 2. Architecture & Data Flow

```mermaid
flowchart TD
    A["Public Learner"] -->|Views Book Spreads| B["Default Illustrated Alternative"]
    B -->|Sees Educational Facts| C["'Bodies show symptoms differently' + 'Consult Suraksha Clinic'"]
    
    A -->|Deliberate Tap on Shield| D["Sensitive Content Notice"]
    D -->|User Opt-In| E["Dual-Anatomical Presentation (Penis/Urethral & Vulva/Cervical)"]
    E -->|Click Image| F["Accessible Clinical Zoom Modal (Non-Diagnostic)"]
    
    G["Community Health Worker (CHW)"] -->|Enters Staff PIN (suraksha2026 / 1097)| H["Facilitator Access Gate"]
    H --> I["NACO Syndromic Kit Regimens (Staff-Only)"]
    H --> J["Partner Management & Follow-up Timelines"]
```

---

## 3. Data Safety & Privacy Policy
- **No Client Data Collection**: The application does not accept or store user photographs, camera uploads, or diagnostic inputs.
- **Local Storage Isolation**: Learner settings and facilitator unlock tokens are stored strictly in local memory and are cleared instantly upon tapping the **Exit** button.
- **Content Sensitivity Shielding**: All clinical photographs are blurred and protected behind user opt-in confirmation to ensure dignity and prevent inadvertent exposure in public spaces.

export interface ClinicalSourceCitation {
  id: string;
  shortCode: string;
  title: string;
  publisher: string;
  year: number;
  jurisdiction: string;
  url: string;
  clinicalScope: string;
}

export const CLINICAL_SOURCES: Record<string, ClinicalSourceCitation> = {
  'naco-sti-2026': {
    id: 'naco-sti-2026',
    shortCode: 'NACO India (2026)',
    title: 'National Guidelines on Prevention, Management and Control of Reproductive Tract Infections & Sexually Transmitted Infections',
    publisher: 'National AIDS Control Organisation (NACO), Ministry of Health and Family Welfare, Government of India',
    year: 2026,
    jurisdiction: 'India (National Program)',
    url: 'https://naco.gov.in',
    clinicalScope: 'Standard 7 Color-Coded Syndromic Kits & Suraksha Clinic Operational Guidelines'
  },
  'who-sti-2021': {
    id: 'who-sti-2021',
    shortCode: 'WHO STI Guidelines (2021)',
    title: 'Guidelines for the Management of Symptomatic Sexually Transmitted Infections',
    publisher: 'World Health Organization (WHO), Geneva',
    year: 2021,
    jurisdiction: 'Global / International Public Health',
    url: 'https://www.who.int/publications/i/item/9789240024168',
    clinicalScope: 'Global Evidence-Based Recommendations on Urethral, Cervical, and Genital Ulcer Syndromes'
  },
  'cdc-sti-2021': {
    id: 'cdc-sti-2021',
    shortCode: 'CDC STI Treatment Guidelines (2021)',
    title: 'Sexually Transmitted Infections Treatment Guidelines, 2021',
    publisher: 'Centers for Disease Control and Prevention (CDC), MMWR',
    year: 2021,
    jurisdiction: 'United States (Comparative Clinical Reference)',
    url: 'https://www.cdc.gov/std/treatment-guidelines/default.htm',
    clinicalScope: 'Comparative Clinical Presentation & Pathogen Biology'
  }
};

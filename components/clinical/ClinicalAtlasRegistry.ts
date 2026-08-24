import { ClinicalAtlasEntry, ClinicalAtlasEntrySchema } from '@/lib/clinical/clinical-schemas';
import approvedEntriesJson from '@/content/clinical/registry.approved.json';
import { Locale } from '@/src/domain/content/schema';

// Parse and validate all approved entries at module load
const parsedApprovedEntries: ClinicalAtlasEntry[] = approvedEntriesJson.map((item) =>
  ClinicalAtlasEntrySchema.parse(item)
);

export class ClinicalAtlasRegistry {
  /**
   * Retrieves all verified, clinically approved atlas entries.
   */
  public static getAllApproved(): ClinicalAtlasEntry[] {
    return parsedApprovedEntries.filter((entry) => entry.overallStatus === 'clinical_approved');
  }

  /**
   * Finds an entry by its unique disease ID.
   */
  public static getById(id: string): ClinicalAtlasEntry | undefined {
    return parsedApprovedEntries.find((entry) => entry.id === id);
  }

  /**
   * Finds the clinical atlas entry corresponding to a specific NACO kit number (1-7).
   */
  public static getByNacoKitNumber(kitNumber: number): ClinicalAtlasEntry | undefined {
    return parsedApprovedEntries.find((entry) => entry.nacoKitNumber === kitNumber);
  }

  /**
   * Filters and formats an entry's title according to the active locale.
   */
  public static getLocalizedTitle(entry: ClinicalAtlasEntry, locale: Locale): string {
    return entry.diseaseName[locale] || entry.diseaseName.en || entry.diseaseName.hi || '';
  }

  /**
   * Formats the localized learner-safe summary.
   */
  public static getLocalizedSummary(entry: ClinicalAtlasEntry, locale: Locale): string {
    return entry.learnerSummary[locale] || entry.learnerSummary.en || entry.learnerSummary.hi || '';
  }
}

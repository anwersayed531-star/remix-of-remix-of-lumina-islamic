// Hadith API Service - fawazahmed0/hadith-api (free, no key, CDN-hosted)
const BASE_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1';

// Available hadith collections
export interface HadithBook {
  id: string;
  nameAr: string;
  nameEn: string;
  totalHadiths: number;
}

export const HADITH_BOOKS: HadithBook[] = [
  { id: 'bukhari', nameAr: 'صحيح البخاري', nameEn: 'Sahih al-Bukhari', totalHadiths: 7589 },
  { id: 'muslim', nameAr: 'صحيح مسلم', nameEn: 'Sahih Muslim', totalHadiths: 7470 },
  { id: 'abudawud', nameAr: 'سنن أبي داود', nameEn: 'Sunan Abu Dawud', totalHadiths: 5274 },
  { id: 'tirmidhi', nameAr: 'جامع الترمذي', nameEn: 'Jami at-Tirmidhi', totalHadiths: 3956 },
  { id: 'nasai', nameAr: 'سنن النسائي', nameEn: 'Sunan an-Nasai', totalHadiths: 5758 },
  { id: 'ibnmajah', nameAr: 'سنن ابن ماجه', nameEn: 'Sunan Ibn Majah', totalHadiths: 4341 },
  { id: 'malik', nameAr: 'موطأ مالك', nameEn: 'Muwatta Malik', totalHadiths: 1858 },
  { id: 'nawawi', nameAr: 'الأربعون النووية', nameEn: 'Forty Hadith of an-Nawawi', totalHadiths: 42 },
  { id: 'qudsi', nameAr: 'الأحاديث القدسية', nameEn: 'Forty Hadith Qudsi', totalHadiths: 40 },
];

// Map app language codes to API language codes
// API supports: ara, eng, fra, ben, ind, rus, tam, tur, urd
const APP_TO_API_LANG: Record<string, string> = {
  ar: 'ara',
  en: 'eng',
  fr: 'fra',
  bn: 'ben',
  id: 'ind',
  ru: 'rus',
  ta: 'tam',
  tr: 'tur',
  ur: 'urd',
};

// Get the API language code for a given app language (falls back to 'eng')
export function getApiLangCode(appLang: string): string {
  return APP_TO_API_LANG[appLang] || 'eng';
}

// Check if translation is available for this language
export function hasTranslation(appLang: string): boolean {
  return appLang !== 'ar' && appLang in APP_TO_API_LANG;
}

export interface HadithSection {
  number: number;
  name: string;
  hadithFirst: number;
  hadithLast: number;
  hadithCount: number;
}

export interface HadithSectionInfo {
  bookId: string;
  sections: HadithSection[];
}

export interface HadithText {
  hadithnumber: number;
  arabicnumber: number;
  text: string;
  grades: any[];
  reference: { book: number; hadith: number };
}

export interface HadithWithTranslation {
  hadithnumber: number;
  arabicnumber: number;
  arabicText: string;
  translation?: string;
  grades: any[];
  reference: { book: number; hadith: number };
  sectionName?: string;
}

// Cache for book info
const bookInfoCache: Record<string, HadithSectionInfo> = {};

// Fetch book section info from info.json
export async function fetchBookInfo(bookId: string): Promise<HadithSectionInfo> {
  if (bookInfoCache[bookId]) return bookInfoCache[bookId];

  const response = await fetch(`${BASE_URL}/info.json`);
  if (!response.ok) throw new Error('Failed to fetch hadith info');
  const data = await response.json();

  const bookData = data[bookId];
  if (!bookData) throw new Error(`Book ${bookId} not found`);

  const meta = bookData.metadata || {};
  const sectionsRaw = meta.sections || {};
  const sectionDetails = meta.section_details || {};

  const sections: HadithSection[] = [];
  for (const key of Object.keys(sectionsRaw)) {
    const num = parseInt(key);
    if (num === 0) continue; // skip section 0 (empty/intro)
    const name = sectionsRaw[key] || `Section ${num}`;
    const detail = sectionDetails[key] || {};
    const first = detail.hadithnumber_first || 0;
    const last = detail.hadithnumber_last || 0;
    const count = last - first + 1;
    if (count > 0) {
      sections.push({ number: num, name, hadithFirst: first, hadithLast: last, hadithCount: count });
    }
  }

  const info: HadithSectionInfo = { bookId, sections };
  bookInfoCache[bookId] = info;
  return info;
}

// Fetch hadiths for a specific section in a specific edition
async function fetchEditionSection(bookId: string, apiLang: string, sectionNo: number): Promise<HadithText[]> {
  const editionName = `${apiLang}-${bookId}`;
  const response = await fetch(`${BASE_URL}/editions/${editionName}/sections/${sectionNo}.min.json`);
  if (!response.ok) throw new Error(`Failed to fetch ${editionName} section ${sectionNo}`);
  const data = await response.json();
  return data.hadiths || [];
}

// Fetch hadiths for a section with Arabic + translation
export async function fetchSectionHadiths(
  bookId: string,
  sectionNo: number,
  appLang: string
): Promise<HadithWithTranslation[]> {
  const apiLang = getApiLangCode(appLang);
  const showTranslation = appLang !== 'ar';

  // Always fetch Arabic
  const arabicHadiths = await fetchEditionSection(bookId, 'ara', sectionNo);

  // Fetch translation if needed
  let translatedHadiths: HadithText[] = [];
  if (showTranslation) {
    try {
      translatedHadiths = await fetchEditionSection(bookId, apiLang, sectionNo);
    } catch {
      // If translation fails, try English fallback
      if (apiLang !== 'eng') {
        try {
          translatedHadiths = await fetchEditionSection(bookId, 'eng', sectionNo);
        } catch {
          // Continue with Arabic only
        }
      }
    }
  }

  // Build a map of hadith number → translation
  const translationMap: Record<number, string> = {};
  for (const h of translatedHadiths) {
    translationMap[h.hadithnumber] = h.text;
  }

  // Get section name from first hadith metadata
  let sectionName: string | undefined;
  try {
    const sectionResp = await fetch(`${BASE_URL}/editions/eng-${bookId}/sections/${sectionNo}.min.json`);
    if (sectionResp.ok) {
      const sectionData = await sectionResp.json();
      const sectionMeta = sectionData.metadata?.section || {};
      sectionName = sectionMeta[String(sectionNo)];
    }
  } catch {
    // ignore
  }

  // Merge Arabic + translation
  return arabicHadiths.map((h) => ({
    hadithnumber: h.hadithnumber,
    arabicnumber: h.arabicnumber,
    arabicText: h.text,
    translation: showTranslation ? translationMap[h.hadithnumber] : undefined,
    grades: h.grades,
    reference: h.reference,
    sectionName,
  }));
}

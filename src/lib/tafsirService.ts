// Tafsir service — free open CDN (spa5k/tafsir_api), no API key, no cloud storage
const TAFSIR_BASE = 'https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir';

export interface TafsirEdition {
  slug: string;
  /** Display name of the tafsir source */
  name: string;
  /** App language code this edition is written in */
  lang: string;
  /** Human-readable language label */
  langLabel: string;
}

export interface TafsirAyah {
  ayah: number;
  text: string;
}

// Certified/published tafsir editions mapped to app languages
export const TAFSIR_EDITIONS: TafsirEdition[] = [
  // Arabic
  { slug: 'ar-tafsir-muyassar', name: 'التفسير الميسر', lang: 'ar', langLabel: 'العربية' },
  { slug: 'ar-tafsir-al-mukhtasar', name: 'المختصر في التفسير', lang: 'ar', langLabel: 'العربية' },
  { slug: 'ar-tafsir-as-saadi', name: 'تفسير السعدي', lang: 'ar', langLabel: 'العربية' },
  { slug: 'ar-tafsir-ibn-kathir', name: 'تفسير ابن كثير', lang: 'ar', langLabel: 'العربية' },
  // English
  { slug: 'en-tafsir-al-mukhtasar', name: 'Al-Mukhtasar', lang: 'en', langLabel: 'English' },
  { slug: 'en-tafisr-ibn-kathir', name: 'Ibn Kathir', lang: 'en', langLabel: 'English' },
  { slug: 'en-tafsir-maarif-ul-quran', name: "Maarif-ul-Quran", lang: 'en', langLabel: 'English' },
  // Other languages (Al-Mukhtasar / As-Saadi published translations)
  { slug: 'french-mokhtasar', name: 'Al-Mukhtasar', lang: 'fr', langLabel: 'Français' },
  { slug: 'spanish-mokhtasar', name: 'Al-Mukhtasar', lang: 'es', langLabel: 'Español' },
  { slug: 'italian-mokhtasar', name: 'Al-Mukhtasar', lang: 'it', langLabel: 'Italiano' },
  { slug: 'bosnian-mokhtasar', name: 'Al-Mukhtasar', lang: 'bs', langLabel: 'Bosanski' },
  { slug: 'sq-saadi', name: 'Tefsiri i Sadit', lang: 'sq', langLabel: 'Shqip' },
  { slug: 'serbian-mokhtasar', name: 'Al-Mukhtasar', lang: 'sr', langLabel: 'Српски' },
  { slug: 'russian-mokhtasar', name: 'Al-Mukhtasar', lang: 'ru', langLabel: 'Русский' },
  { slug: 'tafsir-as-saadi-russian', name: 'As-Saadi', lang: 'ru', langLabel: 'Русский' },
  { slug: 'turkish-mokhtasar', name: 'Al-Mukhtasar', lang: 'tr', langLabel: 'Türkçe' },
  { slug: 'tr-tafsir-ibne-kathir', name: 'İbn Kesir', lang: 'tr', langLabel: 'Türkçe' },
  { slug: 'indonesian-mokhtasar', name: 'Al-Mukhtasar', lang: 'id', langLabel: 'Bahasa Indonesia' },
  { slug: 'id-tafsir-as-saadi', name: 'As-Saadi', lang: 'id', langLabel: 'Bahasa Indonesia' },
  { slug: 'bengali-mokhtasar', name: 'Al-Mukhtasar', lang: 'bn', langLabel: 'বাংলা' },
  { slug: 'bn-tafsir-abu-bakr-zakaria', name: 'Abu Bakr Zakaria', lang: 'bn', langLabel: 'বাংলা' },
  { slug: 'ur-tafsir-as-saadi-urdu', name: 'تفسیر السعدی', lang: 'ur', langLabel: 'اردو' },
  { slug: 'ur-tafseer-ibn-e-kaseer', name: 'تفسیر ابن کثیر', lang: 'ur', langLabel: 'اردو' },
  { slug: 'persian-mokhtasar', name: 'المختصر', lang: 'fa', langLabel: 'فارسی' },
  { slug: 'hindi-mokhtasar', name: 'Al-Mukhtasar', lang: 'hi', langLabel: 'हिन्दी' },
  { slug: 'tamil-mokhtasar', name: 'Al-Mukhtasar', lang: 'ta', langLabel: 'தமிழ்' },
  { slug: 'telugu-mokhtasar', name: 'Al-Mukhtasar', lang: 'te', langLabel: 'తెలుగు' },
  { slug: 'malayalam-mokhtasar', name: 'Al-Mukhtasar', lang: 'ml', langLabel: 'മലയാളം' },
  { slug: 'thai-mokhtasar', name: 'Al-Mukhtasar', lang: 'th', langLabel: 'ไทย' },
  { slug: 'khmer-mokhtasar', name: 'Al-Mukhtasar', lang: 'km', langLabel: 'ខ្មែរ' },
  { slug: 'vietnamese-mokhtasar', name: 'Al-Mukhtasar', lang: 'vi', langLabel: 'Tiếng Việt' },
  { slug: 'tagalog-mokhtasar', name: 'Al-Mukhtasar', lang: 'tl', langLabel: 'Tagalog' },
  { slug: 'chinese-mokhtasar', name: 'Al-Mukhtasar', lang: 'zh', langLabel: '中文' },
  { slug: 'japanese-mokhtasar', name: 'Al-Mukhtasar', lang: 'ja', langLabel: '日本語' },
  { slug: 'azeri-mokhtasar', name: 'Al-Mukhtasar', lang: 'az', langLabel: 'Azərbaycan' },
  { slug: 'uzbek-mokhtasar', name: 'Al-Mukhtasar', lang: 'uz', langLabel: 'Oʻzbek' },
  { slug: 'kyrgyz-mokhtasar', name: 'Al-Mukhtasar', lang: 'ky', langLabel: 'Кыргызча' },
  { slug: 'uyghur-mokhtasar', name: 'Al-Mukhtasar', lang: 'ug', langLabel: 'ئۇيغۇرچە' },
  { slug: 'pashto-mokhtasar', name: 'Al-Mukhtasar', lang: 'ps', langLabel: 'پښتو' },
  { slug: 'fulani-mokhtasar', name: 'Al-Mukhtasar', lang: 'ff', langLabel: 'Pulaar' },
  { slug: 'kurdish-mokhtasar', name: 'Al-Mukhtasar', lang: 'ku', langLabel: 'Kurdî' },
  { slug: 'assamese-mokhtasar', name: 'Al-Mukhtasar', lang: 'as', langLabel: 'অসমীয়া' },
  { slug: 'sinhalese-mokhtasar', name: 'Al-Mukhtasar', lang: 'si', langLabel: 'සිංහල' },
];

/** Editions published in the user's own language (may be empty) */
export function getTafsirOptions(appLang: string): TafsirEdition[] {
  return TAFSIR_EDITIONS.filter(e => e.lang === appLang);
}

export function getArabicEditions(): TafsirEdition[] {
  return TAFSIR_EDITIONS.filter(e => e.lang === 'ar');
}

export function getEnglishEditions(): TafsirEdition[] {
  return TAFSIR_EDITIONS.filter(e => e.lang === 'en');
}

export function getEditionBySlug(slug: string): TafsirEdition | undefined {
  return TAFSIR_EDITIONS.find(e => e.slug === slug);
}

// In-session cache: slug|surah -> ayah texts
const cache = new Map<string, TafsirAyah[]>();

export async function fetchSurahTafsir(slug: string, surahNumber: number): Promise<TafsirAyah[]> {
  const key = `${slug}|${surahNumber}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const res = await fetch(`${TAFSIR_BASE}/${slug}/${surahNumber}.json`);
  if (!res.ok) throw new Error('Failed to fetch tafsir');
  const data = await res.json();

  const list: TafsirAyah[] = Array.isArray(data)
    ? data.map((item: { ayah?: number; text?: string }, i: number) => ({
        ayah: item.ayah ?? i + 1,
        text: (item.text || '').trim(),
      }))
    : [];

  cache.set(key, list);
  return list;
}

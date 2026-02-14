// Al Quran Cloud API Service
const BASE_URL = 'https://api.alquran.cloud/v1';

export interface Reciter {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
}

export interface Ayah {
  number: number;
  audio: string;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
  hizbQuarter: number;
}

export interface SurahAudio {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
}

// Curated list of popular reciters with their API identifiers
export const POPULAR_RECITERS = [
  { identifier: 'ar.alafasy', nameAr: 'مشاري راشد العفاسي', nameEn: 'Mishary Rashid Alafasy' },
  { identifier: 'ar.abdulbasitmurattal', nameAr: 'عبد الباسط عبد الصمد', nameEn: 'Abdul Basit (Murattal)' },
  { identifier: 'ar.husary', nameAr: 'محمود خليل الحصري', nameEn: 'Mahmoud Khalil Al-Husary' },
  { identifier: 'ar.minshawi', nameAr: 'محمد صديق المنشاوي', nameEn: 'Mohamed Siddiq Al-Minshawi' },
  { identifier: 'ar.maaboraliyah', nameAr: 'ماهر المعيقلي', nameEn: 'Maher Al Muaiqly' },
  { identifier: 'ar.abdulsamad', nameAr: 'عبد الباسط (مجود)', nameEn: 'Abdul Basit (Mujawwad)' },
  { identifier: 'ar.aaboraheemalaakhdar', nameAr: 'إبراهيم الأخضر', nameEn: 'Ibrahim Al-Akhdar' },
  { identifier: 'ar.haboratheery', nameAr: 'أحمد بن علي العجمي', nameEn: 'Ahmed Al-Ajmi' },
];

export async function fetchSurahAudio(surahNumber: number, reciterIdentifier: string): Promise<SurahAudio> {
  const response = await fetch(`${BASE_URL}/surah/${surahNumber}/${reciterIdentifier}`);
  if (!response.ok) throw new Error('Failed to fetch surah audio');
  const data = await response.json();
  return data.data;
}

export async function fetchSurahText(surahNumber: number): Promise<SurahAudio> {
  const response = await fetch(`${BASE_URL}/surah/${surahNumber}`);
  if (!response.ok) throw new Error('Failed to fetch surah text');
  const data = await response.json();
  return data.data;
}

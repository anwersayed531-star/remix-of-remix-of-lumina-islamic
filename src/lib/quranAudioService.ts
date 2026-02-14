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

// Curated list of popular reciters with their API identifiers, colors, and initials
export const POPULAR_RECITERS = [
  { identifier: 'ar.alafasy', nameAr: 'مشاري راشد العفاسي', nameEn: 'Mishary Rashid Alafasy', initials: 'مع', color: '#1B5E20' },
  { identifier: 'ar.abdulbasitmurattal', nameAr: 'عبد الباسط عبد الصمد', nameEn: 'Abdul Basit (Murattal)', initials: 'عب', color: '#0D47A1' },
  { identifier: 'ar.husary', nameAr: 'محمود خليل الحصري', nameEn: 'Mahmoud Khalil Al-Husary', initials: 'مح', color: '#4A148C' },
  { identifier: 'ar.minshawi', nameAr: 'محمد صديق المنشاوي', nameEn: 'Mohamed Siddiq Al-Minshawi', initials: 'مم', color: '#BF360C' },
  { identifier: 'ar.maaboraliyah', nameAr: 'ماهر المعيقلي', nameEn: 'Maher Al Muaiqly', initials: 'مم', color: '#006064' },
  { identifier: 'ar.abdulsamad', nameAr: 'عبد الباسط (مجود)', nameEn: 'Abdul Basit (Mujawwad)', initials: 'عم', color: '#311B92' },
  { identifier: 'ar.aaboraheemalaakhdar', nameAr: 'إبراهيم الأخضر', nameEn: 'Ibrahim Al-Akhdar', initials: 'إخ', color: '#1A237E' },
  { identifier: 'ar.haboratheery', nameAr: 'أحمد بن علي العجمي', nameEn: 'Ahmed Al-Ajmi', initials: 'أع', color: '#880E4F' },
  { identifier: 'ar.shaatree', nameAr: 'أبو بكر الشاطري', nameEn: 'Abu Bakr Al-Shatri', initials: 'شط', color: '#E65100' },
  { identifier: 'ar.abdurraoofalhilgee', nameAr: 'عبد الرؤوف الحلقي', nameEn: 'Abdurraouf Al-Hilgee', initials: 'عح', color: '#33691E' },
  { identifier: 'ar.ibrahimwalkadoori', nameAr: 'إبراهيم الدوسري', nameEn: 'Ibrahim Al-Dawsari', initials: 'إد', color: '#263238' },
  { identifier: 'ar.muhammadayyoub', nameAr: 'محمد أيوب', nameEn: 'Muhammad Ayyub', initials: 'مأ', color: '#4E342E' },
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

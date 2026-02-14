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

// Curated list of popular reciters with their API identifiers, colors, initials, and images
export const POPULAR_RECITERS = [
  { identifier: 'ar.alafasy', nameAr: 'مشاري راشد العفاسي', nameEn: 'Mishary Rashid Alafasy', initials: 'مع', color: '#1B5E20', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/%D0%9C%D0%B8%D1%88%D0%B0%D1%80%D0%B8_%D0%A0%D0%B0%D1%88%D0%B8%D0%B4.jpg/346px-%D0%9C%D0%B8%D1%88%D0%B0%D1%80%D0%B8_%D0%A0%D0%B0%D1%88%D0%B8%D0%B4.jpg' },
  { identifier: 'ar.abdulbasitmurattal', nameAr: 'عبد الباسط عبد الصمد', nameEn: 'Abdul Basit (Murattal)', initials: 'عب', color: '#0D47A1', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Abdulbasit_Abdulsamad.jpg/220px-Abdulbasit_Abdulsamad.jpg' },
  { identifier: 'ar.husary', nameAr: 'محمود خليل الحصري', nameEn: 'Mahmoud Khalil Al-Husary', initials: 'مح', color: '#4A148C', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Mahmoud_Khalil_Al-Hussary.jpg' },
  { identifier: 'ar.minshawi', nameAr: 'محمد صديق المنشاوي', nameEn: 'Mohamed Siddiq Al-Minshawi', initials: 'مم', color: '#BF360C', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Mohamed_Siddiq_El-Minshawi.jpg/220px-Mohamed_Siddiq_El-Minshawi.jpg' },
  { identifier: 'ar.maaboraliyah', nameAr: 'ماهر المعيقلي', nameEn: 'Maher Al Muaiqly', initials: 'مم', color: '#006064', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Maher_Al_Mueaqly.jpg/220px-Maher_Al_Mueaqly.jpg' },
  { identifier: 'ar.abdulsamad', nameAr: 'عبد الباسط (مجود)', nameEn: 'Abdul Basit (Mujawwad)', initials: 'عم', color: '#311B92', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Abdulbasit_Abdulsamad.jpg/220px-Abdulbasit_Abdulsamad.jpg' },
  { identifier: 'ar.aaboraheemalaakhdar', nameAr: 'إبراهيم الأخضر', nameEn: 'Ibrahim Al-Akhdar', initials: 'إخ', color: '#1A237E', imageUrl: '' },
  { identifier: 'ar.haboratheery', nameAr: 'أحمد بن علي العجمي', nameEn: 'Ahmed Al-Ajmi', initials: 'أع', color: '#880E4F', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Ahmed_ibn_Ali_al-Ajmy.jpg/220px-Ahmed_ibn_Ali_al-Ajmy.jpg' },
  { identifier: 'ar.shaatree', nameAr: 'أبو بكر الشاطري', nameEn: 'Abu Bakr Al-Shatri', initials: 'شط', color: '#E65100', imageUrl: '' },
  { identifier: 'ar.abdurraoofalhilgee', nameAr: 'عبد الرؤوف الحلقي', nameEn: 'Abdurraouf Al-Hilgee', initials: 'عح', color: '#33691E', imageUrl: '' },
  { identifier: 'ar.ibrahimwalkadoori', nameAr: 'إبراهيم الدوسري', nameEn: 'Ibrahim Al-Dawsari', initials: 'إد', color: '#263238', imageUrl: '' },
  { identifier: 'ar.muhammadayyoub', nameAr: 'محمد أيوب', nameEn: 'Muhammad Ayyub', initials: 'مأ', color: '#4E342E', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Muhammad_Ayyub.jpg/220px-Muhammad_Ayyub.jpg' },
  // New reciters
  { identifier: 'ar.abduraborahmansudais', nameAr: 'عبد الرحمن السديس', nameEn: 'Abdul Rahman Al-Sudais', initials: 'سد', color: '#1565C0', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Abdul-Rahman_Al-Sudais_%28Cropped%2C_2011%29.jpg/449px-Abdul-Rahman_Al-Sudais_%28Cropped%2C_2011%29.jpg' },
  { identifier: 'ar.saboraim', nameAr: 'سعود الشريم', nameEn: 'Saud Al-Shuraim', initials: 'شر', color: '#2E7D32', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Saud_Al-Shuraim.jpg/220px-Saud_Al-Shuraim.jpg' },
  { identifier: 'ar.ghamadi', nameAr: 'سعد الغامدي', nameEn: 'Saad Al-Ghamdi', initials: 'غم', color: '#6A1B9A', imageUrl: '' },
  { identifier: 'ar.yaborassadossary', nameAr: 'ياسر الدوسري', nameEn: 'Yasser Al-Dosari', initials: 'يد', color: '#AD1457', imageUrl: '' },
  { identifier: 'ar.hanirifai', nameAr: 'هاني الرفاعي', nameEn: 'Hani Ar-Rifai', initials: 'هر', color: '#00695C', imageUrl: '' },
  { identifier: 'ar.baboralila', nameAr: 'بندر بليلة', nameEn: 'Bandar Balila', initials: 'بب', color: '#F57F17', imageUrl: '' },
  { identifier: 'ar.faborasaborbad', nameAr: 'فارس عباد', nameEn: 'Fares Abbad', initials: 'فع', color: '#4527A0', imageUrl: '' },
  { identifier: 'ar.khaboralidaljaboralil', nameAr: 'خالد الجليل', nameEn: 'Khalid Al-Jaleel', initials: 'خج', color: '#C62828', imageUrl: '' },
  { identifier: 'ar.abdullahawadaljuhany', nameAr: 'عبدالله عواد الجهني', nameEn: 'Abdullah Awad Al-Juhany', initials: 'عج', color: '#0277BD', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Abdullah_Awad_Al_Juhani.jpg/220px-Abdullah_Awad_Al_Juhani.jpg' },
  { identifier: 'ar.naborasaboralqitami', nameAr: 'ناصر القطامي', nameEn: 'Nasser Al-Qatami', initials: 'نق', color: '#558B2F', imageUrl: '' },
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

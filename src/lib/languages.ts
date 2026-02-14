// قائمة اللغات المدعومة مع تفاصيلها
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  direction: 'rtl' | 'ltr';
  region: string;
}

export const languages: Language[] = [
  // العربية - اللغة الأساسية
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl', region: 'الشرق الأوسط' },
  
  // جنوب آسيا
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', direction: 'rtl', region: 'جنوب آسيا' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', direction: 'ltr', region: 'جنوب آسيا' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', direction: 'ltr', region: 'جنوب آسيا' },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي', direction: 'rtl', region: 'جنوب آسيا' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'कॉशुर', direction: 'rtl', region: 'جنوب آسيا' },
  { code: 'ps', name: 'Pashto', nativeName: 'پښتو', direction: 'rtl', region: 'جنوب آسيا' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', direction: 'ltr', region: 'جنوب آسيا' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', direction: 'ltr', region: 'جنوب آسيا' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', direction: 'ltr', region: 'جنوب آسيا' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', direction: 'ltr', region: 'جنوب آسيا' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', direction: 'ltr', region: 'جنوب آسيا' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', direction: 'ltr', region: 'جنوب آسيا' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', direction: 'ltr', region: 'جنوب آسيا' },

  // جنوب شرق آسيا
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', direction: 'ltr', region: 'جنوب شرق آسيا' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', direction: 'ltr', region: 'جنوب شرق آسيا' },
  { code: 'jv', name: 'Javanese', nativeName: 'Basa Jawa', direction: 'ltr', region: 'جنوب شرق آسيا' },
  { code: 'su', name: 'Sundanese', nativeName: 'Basa Sunda', direction: 'ltr', region: 'جنوب شرق آسيا' },
  { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog', direction: 'ltr', region: 'جنوب شرق آسيا' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', direction: 'ltr', region: 'جنوب شرق آسيا' },
  { code: 'km', name: 'Khmer', nativeName: 'ភាសាខ្មែរ', direction: 'ltr', region: 'جنوب شرق آسيا' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', direction: 'ltr', region: 'جنوب شرق آسيا' },
  { code: 'my', name: 'Burmese', nativeName: 'မြန်မာဘာသာ', direction: 'ltr', region: 'جنوب شرق آسيا' },

  // آسيا الوسطى والقوقاز
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', direction: 'ltr', region: 'آسيا الوسطى' },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan', direction: 'ltr', region: 'آسيا الوسطى' },
  { code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbek', direction: 'ltr', region: 'آسيا الوسطى' },
  { code: 'kk', name: 'Kazakh', nativeName: 'Қазақша', direction: 'ltr', region: 'آسيا الوسطى' },
  { code: 'ky', name: 'Kyrgyz', nativeName: 'Кыргызча', direction: 'ltr', region: 'آسيا الوسطى' },
  { code: 'tk', name: 'Turkmen', nativeName: 'Türkmençe', direction: 'ltr', region: 'آسيا الوسطى' },
  { code: 'tt', name: 'Tatar', nativeName: 'Татарча', direction: 'ltr', region: 'آسيا الوسطى' },
  { code: 'ug', name: 'Uyghur', nativeName: 'ئۇيغۇرچە', direction: 'rtl', region: 'آسيا الوسطى' },
  { code: 'tg', name: 'Tajik', nativeName: 'Тоҷикӣ', direction: 'ltr', region: 'آسيا الوسطى' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', direction: 'rtl', region: 'آسيا الوسطى' },

  // أفريقيا
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', direction: 'ltr', region: 'أفريقيا' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', direction: 'ltr', region: 'أفريقيا' },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali', direction: 'ltr', region: 'أفريقيا' },
  { code: 'ff', name: 'Fulani', nativeName: 'Fulfulde', direction: 'ltr', region: 'أفريقيا' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', direction: 'ltr', region: 'أفريقيا' },
  { code: 'wo', name: 'Wolof', nativeName: 'Wolof', direction: 'ltr', region: 'أفريقيا' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', direction: 'ltr', region: 'أفريقيا' },
  { code: 'om', name: 'Oromo', nativeName: 'Afaan Oromoo', direction: 'ltr', region: 'أفريقيا' },

  // أوروبا
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip', direction: 'ltr', region: 'أوروبا' },
  { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski', direction: 'ltr', region: 'أوروبا' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', direction: 'ltr', region: 'أوروبا' },
  { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr', region: 'أوروبا' },
  { code: 'fr', name: 'French', nativeName: 'Français', direction: 'ltr', region: 'أوروبا' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', direction: 'ltr', region: 'أوروبا' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', direction: 'ltr', region: 'أوروبا' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', direction: 'ltr', region: 'أوروبا' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', direction: 'ltr', region: 'أوروبا' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', direction: 'ltr', region: 'أوروبا' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', direction: 'ltr', region: 'أوروبا' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', direction: 'ltr', region: 'أوروبا' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', direction: 'ltr', region: 'أوروبا' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', direction: 'ltr', region: 'أوروبا' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', direction: 'ltr', region: 'أوروبا' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', direction: 'ltr', region: 'أوروبا' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', direction: 'ltr', region: 'أوروبا' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', direction: 'ltr', region: 'أوروبا' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', direction: 'ltr', region: 'أوروبا' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', direction: 'ltr', region: 'أوروبا' },

  // شرق آسيا وأخرى
  { code: 'zh', name: 'Chinese', nativeName: '中文', direction: 'ltr', region: 'شرق آسيا' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', direction: 'ltr', region: 'شرق آسيا' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', direction: 'ltr', region: 'شرق آسيا' },
];

// تجميع اللغات حسب المنطقة
export const languagesByRegion = languages.reduce((acc, lang) => {
  if (!acc[lang.region]) acc[lang.region] = [];
  acc[lang.region].push(lang);
  return acc;
}, {} as Record<string, Language[]>);

// الحصول على لغة بواسطة الكود
export const getLanguageByCode = (code: string): Language | undefined => {
  return languages.find(lang => lang.code === code);
};

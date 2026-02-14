// Hijri Calendar Calculation Library

interface HijriDate {
  day: number;
  month: number;
  year: number;
  monthName: string;
  dayName: string;
}

// Hijri month names in Arabic
export const hijriMonths = [
  'محرم',
  'صفر',
  'ربيع الأول',
  'ربيع الثاني',
  'جمادى الأولى',
  'جمادى الآخرة',
  'رجب',
  'شعبان',
  'رمضان',
  'شوال',
  'ذو القعدة',
  'ذو الحجة',
];

// Arabic day names
export const arabicDays = [
  'الأحد',
  'الإثنين',
  'الثلاثاء',
  'الأربعاء',
  'الخميس',
  'الجمعة',
  'السبت',
];

// Sacred months (الأشهر الحرم)
export const sacredMonths = [1, 7, 11, 12]; // Muharram, Rajab, Dhul Qi'dah, Dhul Hijjah

// Special months info
export const specialMonthsInfo: Record<number, { name: string; description: string; isSacred: boolean }> = {
  1: { name: 'محرم', description: 'أول الأشهر الحرم، شهر الله', isSacred: true },
  7: { name: 'رجب', description: 'من الأشهر الحرم، شهر الإسراء والمعراج', isSacred: true },
  8: { name: 'شعبان', description: 'شهر ترفع فيه الأعمال إلى الله', isSacred: false },
  9: { name: 'رمضان', description: 'شهر الصيام والقرآن', isSacred: false },
  10: { name: 'شوال', description: 'شهر العيد وصيام الست', isSacred: false },
  11: { name: 'ذو القعدة', description: 'من الأشهر الحرم', isSacred: true },
  12: { name: 'ذو الحجة', description: 'شهر الحج، من الأشهر الحرم', isSacred: true },
};

// Convert Gregorian to Hijri
export const gregorianToHijri = (date: Date): HijriDate => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const dayOfWeek = date.getDay();

  // Julian Day calculation
  let jd = Math.floor((1461 * (year + 4800 + Math.floor((month - 14) / 12))) / 4) +
           Math.floor((367 * (month - 2 - 12 * Math.floor((month - 14) / 12))) / 12) -
           Math.floor((3 * Math.floor((year + 4900 + Math.floor((month - 14) / 12)) / 100)) / 4) +
           day - 32075;

  // Adjust for different epoch
  jd = jd - 1948440 + 10632;
  
  const n = Math.floor((jd - 1) / 10631);
  jd = jd - 10631 * n + 354;
  
  const j = (Math.floor((10985 - jd) / 5316)) * (Math.floor((50 * jd) / 17719)) +
            (Math.floor(jd / 5670)) * (Math.floor((43 * jd) / 15238));
  
  jd = jd - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) -
       (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;

  const hijriMonth = Math.floor((24 * jd) / 709);
  const hijriDay = jd - Math.floor((709 * hijriMonth) / 24);
  const hijriYear = 30 * n + j - 30;

  return {
    day: hijriDay,
    month: hijriMonth,
    year: hijriYear,
    monthName: hijriMonths[hijriMonth - 1] || hijriMonths[0],
    dayName: arabicDays[dayOfWeek],
  };
};

// Format Hijri date for display
export const formatHijriDate = (hijri: HijriDate): string => {
  return `${hijri.day} ${hijri.monthName} ${hijri.year} هـ`;
};

// Format full date with day name
export const formatFullHijriDate = (hijri: HijriDate): string => {
  return `${hijri.dayName}، ${hijri.day} ${hijri.monthName} ${hijri.year} هـ`;
};

// Check if current month is special
export const isSpecialMonth = (month: number): boolean => {
  return month in specialMonthsInfo;
};

// Check if current month is sacred
export const isSacredMonth = (month: number): boolean => {
  return sacredMonths.includes(month);
};

// Get current Hijri date
export const getCurrentHijriDate = (): HijriDate => {
  return gregorianToHijri(new Date());
};

// Get days in Hijri month (approximate - alternating 30/29)
export const getDaysInHijriMonth = (month: number, year: number): number => {
  // Simplified: odd months have 30 days, even months have 29
  // In a leap year, the 12th month has 30 days
  const isLeapYear = ((11 * year + 14) % 30) < 11;
  
  if (month === 12 && isLeapYear) {
    return 30;
  }
  
  return month % 2 === 1 ? 30 : 29;
};

// Get Gregorian date for display
export const formatGregorianDate = (date: Date): string => {
  return date.toLocaleDateString('ar-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

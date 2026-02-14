// Prayer Times Calculation Library
// Based on the calculation methods used by Islamic authorities

interface PrayerTimes {
  fajr: Date;
  sunrise: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

// Convert degrees to radians
const toRadians = (degrees: number): number => degrees * (Math.PI / 180);

// Convert radians to degrees
const toDegrees = (radians: number): number => radians * (180 / Math.PI);

// Calculate Julian Day
const getJulianDay = (date: Date): number => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let y = year;
  let m = month;

  if (m <= 2) {
    y -= 1;
    m += 12;
  }

  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);

  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
};

// Calculate sun position
const getSunPosition = (jd: number): { declination: number; equationOfTime: number } => {
  const d = jd - 2451545.0;
  const g = 357.529 + 0.98560028 * d;
  const q = 280.459 + 0.98564736 * d;
  const l = q + 1.915 * Math.sin(toRadians(g)) + 0.020 * Math.sin(toRadians(2 * g));
  const e = 23.439 - 0.00000036 * d;
  const ra = toDegrees(Math.atan2(Math.cos(toRadians(e)) * Math.sin(toRadians(l)), Math.cos(toRadians(l)))) / 15;
  const declination = toDegrees(Math.asin(Math.sin(toRadians(e)) * Math.sin(toRadians(l))));
  const equationOfTime = (q / 15) - ra;

  return { declination, equationOfTime };
};

// Calculate prayer time for a given angle
const calculateTime = (
  angle: number,
  declination: number,
  latitude: number,
  isRising: boolean
): number => {
  const latRad = toRadians(latitude);
  const decRad = toRadians(declination);
  const angleRad = toRadians(angle);

  const hourAngle = toDegrees(
    Math.acos(
      (-Math.sin(angleRad) - Math.sin(latRad) * Math.sin(decRad)) /
      (Math.cos(latRad) * Math.cos(decRad))
    )
  ) / 15;

  return isRising ? 12 - hourAngle : 12 + hourAngle;
};

// Calculate Asr time (Shafi'i method - shadow = 1x object height)
const calculateAsr = (
  declination: number,
  latitude: number
): number => {
  const latRad = toRadians(latitude);
  const decRad = toRadians(declination);

  const a = Math.atan(1 / (1 + Math.tan(Math.abs(latRad - decRad))));
  const hourAngle = toDegrees(
    Math.acos(
      (Math.sin(a) - Math.sin(latRad) * Math.sin(decRad)) /
      (Math.cos(latRad) * Math.cos(decRad))
    )
  ) / 15;

  return 12 + hourAngle;
};

// Main function to calculate prayer times
export const calculatePrayerTimes = (
  date: Date,
  coords: Coordinates,
  timezone: number
): PrayerTimes => {
  const jd = getJulianDay(date);
  const { declination, equationOfTime } = getSunPosition(jd);

  // Time adjustment for longitude and timezone
  const timeAdjust = timezone - coords.longitude / 15 - equationOfTime;

  // Calculate times (in hours)
  const fajrTime = calculateTime(18, declination, coords.latitude, true) + timeAdjust;
  const sunriseTime = calculateTime(0.833, declination, coords.latitude, true) + timeAdjust;
  const dhuhrTime = 12 + timeAdjust + 2 / 60; // Add 2 minutes after noon
  const asrTime = calculateAsr(declination, coords.latitude) + timeAdjust;
  const maghribTime = calculateTime(0.833, declination, coords.latitude, false) + timeAdjust;
  const ishaTime = calculateTime(17, declination, coords.latitude, false) + timeAdjust;

  // Convert hours to Date objects
  const toDate = (hours: number): Date => {
    const result = new Date(date);
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    result.setHours(h, m, 0, 0);
    return result;
  };

  return {
    fajr: toDate(fajrTime),
    sunrise: toDate(sunriseTime),
    dhuhr: toDate(dhuhrTime),
    asr: toDate(asrTime),
    maghrib: toDate(maghribTime),
    isha: toDate(ishaTime),
  };
};

// Get current prayer and next prayer
export const getCurrentPrayer = (
  times: PrayerTimes
): { current: string; next: string; nextTime: Date } => {
  const now = new Date();
  const prayers = [
    { name: 'الفجر', time: times.fajr },
    { name: 'الشروق', time: times.sunrise },
    { name: 'الظهر', time: times.dhuhr },
    { name: 'العصر', time: times.asr },
    { name: 'المغرب', time: times.maghrib },
    { name: 'العشاء', time: times.isha },
  ];

  // Find current and next prayer
  for (let i = 0; i < prayers.length; i++) {
    if (now < prayers[i].time) {
      const current = i === 0 ? 'العشاء' : prayers[i - 1].name;
      return {
        current,
        next: prayers[i].name,
        nextTime: prayers[i].time,
      };
    }
  }

  // After Isha, next is Fajr (tomorrow)
  const tomorrowFajr = new Date(times.fajr);
  tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
  
  return {
    current: 'العشاء',
    next: 'الفجر',
    nextTime: tomorrowFajr,
  };
};

// Format time remaining
export const formatTimeRemaining = (targetTime: Date): string => {
  const now = new Date();
  let diff = targetTime.getTime() - now.getTime();
  
  if (diff < 0) {
    diff += 24 * 60 * 60 * 1000; // Add 24 hours if negative
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (hours > 0) {
    return `${hours} ساعة و ${minutes} دقيقة`;
  }
  return `${minutes} دقيقة و ${seconds} ثانية`;
};

// Format time for display
export const formatPrayerTime = (date: Date): string => {
  return date.toLocaleTimeString('ar-SA', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

// Default coordinates (Mecca)
export const defaultCoordinates: Coordinates = {
  latitude: 21.4225,
  longitude: 39.8262,
};

// Get timezone offset in hours
export const getTimezoneOffset = (): number => {
  return -new Date().getTimezoneOffset() / 60;
};

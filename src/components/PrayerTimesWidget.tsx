import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { 
  calculatePrayerTimes, 
  getCurrentPrayer, 
  formatTimeRemaining, 
  formatPrayerTime,
  defaultCoordinates,
  getTimezoneOffset
} from '@/lib/prayerTimes';
import { Sun, Moon, Sunrise, Sunset, CloudSun, ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface PrayerCardProps {
  name: string;
  time: string;
  icon: React.ReactNode;
  isNext: boolean;
  isCurrent: boolean;
  prayerId?: string;
  onClick?: () => void;
}

const PrayerCard = ({ name, time, icon, isNext, isCurrent, onClick }: PrayerCardProps) => (
  <div 
    onClick={onClick}
    className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 cursor-pointer ${
      isNext 
        ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
        : isCurrent 
          ? 'bg-accent text-accent-foreground' 
          : 'bg-muted/50 hover:bg-muted'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${isNext ? 'bg-primary-foreground/20' : 'bg-background/50'}`}>
        {icon}
      </div>
      <span className="font-semibold font-cairo text-lg">{name}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="font-amiri text-xl">{time}</span>
      {onClick && <ChevronLeft className={`w-5 h-5 ${isNext ? 'text-primary-foreground' : 'text-muted-foreground'}`} />}
    </div>
  </div>
);

const PrayerTimesWidget = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [prayerTimes, setPrayerTimes] = useState<ReturnType<typeof calculatePrayerTimes> | null>(null);
  const [currentPrayer, setCurrentPrayer] = useState({ current: '', next: '', nextTime: new Date() });
  const [timeRemaining, setTimeRemaining] = useState('');
  const [coords, setCoords] = useState(defaultCoordinates);

  // Arabic prayer names (always shown)
  const prayerNamesArabic = {
    fajr: 'الفجر',
    sunrise: 'الشروق',
    dhuhr: 'الظهر',
    asr: 'العصر',
    maghrib: 'المغرب',
    isha: 'العشاء',
  };

  useEffect(() => {
    // Try to get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          // Use default coordinates if location access denied
          console.log('Using default location (Mecca)');
        }
      );
    }
  }, []);

  useEffect(() => {
    const updateTimes = () => {
      const today = new Date();
      const timezone = getTimezoneOffset();
      const times = calculatePrayerTimes(today, coords, timezone);
      setPrayerTimes(times);
      
      const current = getCurrentPrayer(times);
      setCurrentPrayer(current);
      setTimeRemaining(formatTimeRemaining(current.nextTime));
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [coords]);

  if (!prayerTimes) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded-xl" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const prayers = [
    { nameAr: prayerNamesArabic.fajr, nameTranslated: t.home.fajr, time: prayerTimes.fajr, icon: <Moon className="w-5 h-5" />, prayerId: 'fajr' },
    { nameAr: prayerNamesArabic.sunrise, nameTranslated: t.home.sunrise, time: prayerTimes.sunrise, icon: <Sunrise className="w-5 h-5" />, prayerId: null },
    { nameAr: prayerNamesArabic.dhuhr, nameTranslated: t.home.dhuhr, time: prayerTimes.dhuhr, icon: <Sun className="w-5 h-5" />, prayerId: 'dhuhr' },
    { nameAr: prayerNamesArabic.asr, nameTranslated: t.home.asr, time: prayerTimes.asr, icon: <CloudSun className="w-5 h-5" />, prayerId: 'asr' },
    { nameAr: prayerNamesArabic.maghrib, nameTranslated: t.home.maghrib, time: prayerTimes.maghrib, icon: <Sunset className="w-5 h-5" />, prayerId: 'maghrib' },
    { nameAr: prayerNamesArabic.isha, nameTranslated: t.home.isha, time: prayerTimes.isha, icon: <Moon className="w-5 h-5" />, prayerId: 'isha' },
  ];

  // Get display name based on language - Arabic always shows Arabic names
  const getDisplayName = (prayer: typeof prayers[0]) => {
    if (language === 'ar') return prayer.nameAr;
    return `${prayer.nameTranslated} (${prayer.nameAr})`;
  };

  // Find next prayer name for display
  const getNextPrayerDisplayName = () => {
    const nextPrayer = prayers.find(p => p.nameAr === currentPrayer.next);
    if (!nextPrayer) return currentPrayer.next;
    return getDisplayName(nextPrayer);
  };

  return (
    <Card className="w-full border-0 shadow-xl bg-card/80 backdrop-blur-sm">
      <CardContent className="p-6 space-y-4">
        {/* Next Prayer Highlight */}
        <div className="text-center mb-6 p-4 bg-islamic-light rounded-2xl">
          <p className="text-muted-foreground font-cairo text-sm">{t.home.nextPrayer}</p>
          <h2 className="text-3xl font-amiri font-bold text-primary mt-1">
            {getNextPrayerDisplayName()}
          </h2>
          <p className="text-lg font-cairo text-muted-foreground mt-2">
            {language === 'ar' ? 'متبقي:' : 'Remaining:'} <span className="text-primary font-semibold">{timeRemaining}</span>
          </p>
        </div>

        <div className="space-y-3">
          {prayers.map((prayer) => (
            <PrayerCard
              key={prayer.nameAr}
              name={getDisplayName(prayer)}
              time={formatPrayerTime(prayer.time)}
              icon={prayer.icon}
              isNext={currentPrayer.next === prayer.nameAr}
              isCurrent={currentPrayer.current === prayer.nameAr}
              onClick={prayer.prayerId ? () => navigate(`/prayer/${prayer.prayerId}`) : undefined}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PrayerTimesWidget;

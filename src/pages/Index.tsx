import PrayerTimesWidget from '@/components/PrayerTimesWidget';
import HijriCalendarWidget from '@/components/HijriCalendarWidget';

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Hijri Calendar */}
      <HijriCalendarWidget />

      {/* Prayer Times */}
      <PrayerTimesWidget />
    </div>
  );
};

export default Index;

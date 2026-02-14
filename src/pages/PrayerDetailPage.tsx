import { useState } from 'react';
import { ArrowRight, Check, RotateCcw, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { getPrayerById } from '@/lib/prayerDetails';
import { useLanguage } from '@/hooks/useLanguage';

const PrayerDetailPage = () => {
  const navigate = useNavigate();
  const { prayerId } = useParams<{ prayerId: string }>();
  const [fardCompleted, setFardCompleted] = useState(0);
  const [sunnahBeforeCompleted, setSunnahBeforeCompleted] = useState(0);
  const [sunnahAfterCompleted, setSunnahAfterCompleted] = useState(0);
  const { t, direction } = useLanguage();

  const prayer = prayerId ? getPrayerById(prayerId) : null;

  if (!prayer) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="font-cairo">{t.prayerDetail.prayerNotFound}</p>
        <Button onClick={() => navigate('/')} className="mt-4">{t.prayerDetail.backToHome}</Button>
      </div>
    );
  }

  const handleReset = () => {
    setFardCompleted(0);
    setSunnahBeforeCompleted(0);
    setSunnahAfterCompleted(0);
  };

  const RakaatCounter = ({ label, total, completed, onIncrement, color = 'primary' }: {
    label: string; total: number; completed: number; onIncrement: () => void; color?: 'primary' | 'secondary' | 'accent';
  }) => {
    if (total === 0) return null;
    const isComplete = completed >= total;
    const colorClasses = { primary: 'from-primary to-primary/80', secondary: 'from-emerald-500 to-emerald-600', accent: 'from-amber-500 to-amber-600' };

    return (
      <Card className={`border-0 shadow-lg overflow-hidden ${isComplete ? 'ring-2 ring-green-500' : ''}`}>
        <div className={`bg-gradient-to-br ${colorClasses[color]} p-4 text-white`}>
          <div className="flex items-center justify-between">
            <span className="font-cairo font-semibold text-lg">{label}</span>
            <span className="font-amiri text-2xl">{total} {t.prayerDetail.rakaat}</span>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground font-cairo">{t.prayerDetail.completed}</p>
              <p className="text-4xl font-amiri font-bold text-foreground">{completed}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground font-cairo">{t.prayerDetail.required}</p>
              <p className="text-4xl font-amiri font-bold text-muted-foreground">{total}</p>
            </div>
          </div>
          <div className="flex justify-center gap-2 mb-4">
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} className={`w-4 h-4 rounded-full transition-all duration-300 ${i < completed ? 'bg-green-500 scale-110' : 'bg-muted'}`} />
            ))}
          </div>
          <Button onClick={onIncrement} disabled={isComplete} className={`w-full h-14 text-lg font-cairo ${isComplete ? 'bg-green-500 hover:bg-green-500' : ''}`}>
            {isComplete ? (<><Check className="w-6 h-6 ml-2" />{t.prayerDetail.completedLabel}</>) : t.prayerDetail.addRakaat}
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          {direction === 'rtl' ? <ArrowRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
        </Button>
        <span className="font-cairo text-foreground">{t.prayerDetail.prayer} {prayer.arabicName}</span>
      </div>

      <Card className="border-0 shadow-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <CardContent className="p-6 text-center">
          <h1 className="font-amiri text-4xl font-bold mb-2">{prayer.arabicName}</h1>
          <p className="font-cairo text-sm opacity-90">{prayer.description}</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {prayer.sunnahBefore > 0 && (
          <RakaatCounter label={t.prayerDetail.sunnahBefore} total={prayer.sunnahBefore} completed={sunnahBeforeCompleted}
            onIncrement={() => setSunnahBeforeCompleted(prev => Math.min(prev + 1, prayer.sunnahBefore))} color="secondary" />
        )}
        <RakaatCounter label={t.prayerDetail.fard} total={prayer.fardRakaat} completed={fardCompleted}
          onIncrement={() => setFardCompleted(prev => Math.min(prev + 1, prayer.fardRakaat))} color="primary" />
        {prayer.sunnahAfter > 0 && (
          <RakaatCounter label={t.prayerDetail.sunnahAfter} total={prayer.sunnahAfter} completed={sunnahAfterCompleted}
            onIncrement={() => setSunnahAfterCompleted(prev => Math.min(prev + 1, prayer.sunnahAfter))} color="accent" />
        )}
      </div>

      <Button variant="outline" onClick={handleReset} className="w-full h-12">
        <RotateCcw className="w-5 h-5 ml-2" />
        <span className="font-cairo">{t.prayerDetail.resetCount}</span>
      </Button>

      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <h3 className="font-amiri text-xl font-bold text-foreground mb-4">{t.prayerDetail.virtues} {prayer.arabicName}</h3>
          <ul className="space-y-3">
            {prayer.virtues.map((virtue, index) => (
              <li key={index} className="flex gap-3 items-start">
                <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-cairo flex-shrink-0">{index + 1}</span>
                <p className="font-cairo text-muted-foreground leading-relaxed">{virtue}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrayerDetailPage;

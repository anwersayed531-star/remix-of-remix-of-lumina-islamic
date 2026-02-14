import { useState } from 'react';
import { ArrowRight, RotateCcw, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const dhikrData: Record<string, { textAr: string }> = {
  'subhanallah': { textAr: 'سبحان الله' },
  'alhamdulillah': { textAr: 'الحمد لله' },
  'allahuakbar': { textAr: 'الله أكبر' },
  'lailaha': { textAr: 'لا إله إلا الله' },
  'astaghfirullah': { textAr: 'أستغفر الله' },
  'lahawla': { textAr: 'لا حول ولا قوة إلا بالله' },
  'subhanallahwabihamdi': { textAr: 'سبحان الله وبحمده' },
  'salawat': { textAr: 'الصلاة على النبي ﷺ' },
};

const DhikrPage = () => {
  const navigate = useNavigate();
  const { dhikrId } = useParams<{ dhikrId: string }>();
  const [count, setCount] = useState(0);
  const { t, language, direction } = useLanguage();

  const currentDhikr = dhikrId ? dhikrData[dhikrId] : null;
  const dhikrTranslated = dhikrId ? (t.dhikr as any)[dhikrId] : null;

  if (!currentDhikr) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="font-cairo">{t.dhikr.dhikrNotFound}</p>
        <Button onClick={() => navigate('/dhikr-selection')} className="mt-4">
          {t.dhikr.backToSelection}
        </Button>
      </div>
    );
  }

  const handleCount = () => setCount(count + 1);
  const handleReset = () => setCount(0);

  const progressBase = Math.max(100, Math.ceil(count / 100) * 100);
  const progress = (count / progressBase) * 100;

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dhikr-selection')}>
          {direction === 'rtl' ? <ArrowRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
        </Button>
        <span className="font-cairo text-foreground">{currentDhikr.textAr}</span>
      </div>

      <Card className="border-0 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground text-center">
          <p className="font-cairo text-sm opacity-80 mb-2">{t.dhikr.currentDhikr}</p>
          <h2 className="font-amiri text-3xl font-bold">{currentDhikr.textAr}</h2>
          {language !== 'ar' && dhikrTranslated && (
            <p className="font-cairo text-sm mt-2 opacity-80">({dhikrTranslated})</p>
          )}
        </div>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="relative w-48 h-48 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="88" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                <circle cx="96" cy="96" r="88" fill="none" stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-amiri font-bold text-foreground">{count}</span>
                <span className="text-muted-foreground font-cairo text-sm">{t.dhikr.tasbeehah}</span>
              </div>
            </div>
          </div>

          <Button onClick={handleCount} className="w-full h-20 text-2xl font-amiri rounded-2xl shadow-lg">
            {t.dhikr.tapToCount}
          </Button>

          <Button variant="outline" onClick={handleReset} className="w-full mt-3 h-12">
            <RotateCcw className="w-5 h-5 ml-2" />
            <span className="font-cairo">{t.dhikr.resetCount}</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DhikrPage;

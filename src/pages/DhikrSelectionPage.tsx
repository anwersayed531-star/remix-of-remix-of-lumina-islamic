import { Circle, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const dhikrKeys = [
  'subhanallah', 'alhamdulillah', 'allahuakbar', 'lailaha',
  'astaghfirullah', 'lahawla', 'subhanallahwabihamdi', 'salawat'
] as const;

const DhikrSelectionPage = () => {
  const navigate = useNavigate();
  const { t, language, direction } = useLanguage();

  const dhikrOptions = dhikrKeys.map(key => ({
    id: key,
    textAr: t.dhikr[key],
    descAr: t.dhikr[`desc${key.charAt(0).toUpperCase() + key.slice(1)}` as keyof typeof t.dhikr],
  }));

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/counters')}>
          {direction === 'rtl' ? <ArrowRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
        </Button>
        <span className="font-cairo text-foreground">{t.counters.selectDhikr}</span>
      </div>

      <div className="space-y-3">
        {dhikrOptions.map((dhikr) => (
          <Card 
            key={dhikr.id}
            className="border-0 shadow-md cursor-pointer hover:shadow-lg transition-all active:scale-[0.98]"
            onClick={() => navigate(`/dhikr/${dhikr.id}`)}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center">
                  <Circle className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-amiri text-lg font-semibold text-foreground">{dhikr.textAr}</h4>
                  <p className="text-sm text-muted-foreground font-cairo">{dhikr.descAr}</p>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DhikrSelectionPage;

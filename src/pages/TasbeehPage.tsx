import { useState } from 'react';
import { ArrowRight, RotateCcw, Moon, Star, Heart, Sparkles, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const tasbeehPages = [
  { 
    titleKey: 'morningAdhkar' as const,
    icon: Sparkles,
    items: [
      { textAr: 'أصبحنا وأصبح الملك لله', count: 1 },
      { textAr: 'سبحان الله وبحمده', count: 100 },
      { textAr: 'لا إله إلا الله وحده لا شريك له', count: 10 },
    ]
  },
  { 
    titleKey: 'eveningAdhkar' as const,
    icon: Moon,
    items: [
      { textAr: 'أمسينا وأمسى الملك لله', count: 1 },
      { textAr: 'سبحان الله وبحمده', count: 100 },
      { textAr: 'اللهم إني أسألك العفو والعافية', count: 3 },
    ]
  },
  { 
    titleKey: 'sleepAdhkar' as const,
    icon: Star,
    items: [
      { textAr: 'باسمك اللهم أموت وأحيا', count: 1 },
      { textAr: 'سبحان الله', count: 33 },
      { textAr: 'الحمد لله', count: 33 },
      { textAr: 'الله أكبر', count: 34 },
    ]
  },
  { 
    titleKey: 'variousAdhkar' as const,
    icon: Heart,
    items: [
      { textAr: 'حسبي الله لا إله إلا هو', count: 7 },
      { textAr: 'لا حول ولا قوة إلا بالله', count: 10 },
      { textAr: 'اللهم صل على محمد', count: 10 },
    ]
  },
];

const TasbeehPage = () => {
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState<number | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const { t, language, direction } = useLanguage();

  const handleCount = (pageIndex: number, itemIndex: number) => {
    const key = `${pageIndex}-${itemIndex}`;
    const currentCount = counts[key] || 0;
    const targetCount = tasbeehPages[pageIndex].items[itemIndex].count;
    if (currentCount < targetCount) {
      setCounts({ ...counts, [key]: currentCount + 1 });
    }
  };

  const resetPage = (pageIndex: number) => {
    const newCounts = { ...counts };
    tasbeehPages[pageIndex].items.forEach((_, itemIndex) => {
      delete newCounts[`${pageIndex}-${itemIndex}`];
    });
    setCounts(newCounts);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => selectedPage !== null ? setSelectedPage(null) : navigate(-1)}>
          {direction === 'rtl' ? <ArrowRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
        </Button>
        <span className="font-cairo text-foreground">
          {selectedPage !== null ? t.tasbeeh[tasbeehPages[selectedPage].titleKey] : t.tasbeeh.title}
        </span>
      </div>

      {selectedPage === null ? (
        <div className="grid grid-cols-2 gap-4">
          {tasbeehPages.map((page, index) => (
            <Card key={index} className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all" onClick={() => setSelectedPage(index)}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center">
                  <page.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-amiri text-lg font-bold text-foreground">
                  {t.tasbeeh[page.titleKey]}
                </h3>
                <p className="text-muted-foreground font-cairo text-sm mt-1">
                  {page.items.length} {t.tasbeeh.adhkarCount}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <Button variant="outline" className="w-full" onClick={() => resetPage(selectedPage)}>
            <RotateCcw className="w-5 h-5 ml-2" />
            <span className="font-cairo">{t.tasbeeh.resetAll}</span>
          </Button>

          {tasbeehPages[selectedPage].items.map((item, itemIndex) => {
            const key = `${selectedPage}-${itemIndex}`;
            const currentCount = counts[key] || 0;
            const isDone = currentCount >= item.count;

            return (
              <Card key={itemIndex} className={`border-0 shadow-lg overflow-hidden ${isDone ? 'bg-primary/10' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-amiri text-lg font-bold text-foreground flex-1">{item.textAr}</p>
                    <span className={`font-cairo text-sm px-3 py-1 rounded-full ${isDone ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      {currentCount}/{item.count}
                    </span>
                  </div>
                  <Button className="w-full" variant={isDone ? 'secondary' : 'default'} onClick={() => handleCount(selectedPage, itemIndex)} disabled={isDone}>
                    {isDone ? t.tasbeeh.done : t.dhikr.tapToCount}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TasbeehPage;

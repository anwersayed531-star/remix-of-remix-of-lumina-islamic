import { Scale, Search, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';

const RulingsPage = () => {
  const { t } = useLanguage();

  const categories = [
    { titleAr: 'أحكام الصلاة', titleKey: t.rulings.prayerRulings },
    { titleAr: 'أحكام الصيام', titleKey: t.rulings.fastingRulings },
    { titleAr: 'أحكام الزكاة', titleKey: t.rulings.zakatRulings },
    { titleAr: 'أحكام الحج', titleKey: t.rulings.hajjRulings },
    { titleAr: 'أحكام الرضاعة', titleKey: t.rulings.breastfeedingRulings },
    { titleAr: 'أحكام الطهارة', titleKey: t.rulings.purificationRulings },
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
      <div className="relative">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder={t.rulings.searchPlaceholder}
          className="w-full pr-12 pl-4 py-4 rounded-2xl bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary font-cairo"
        />
      </div>

      <div className="space-y-3">
        {categories.map((category, index) => (
          <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-islamic-light rounded-xl flex items-center justify-center">
                  <Scale className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-cairo font-semibold text-foreground">{category.titleKey}</h3>
                  <p className="text-sm text-muted-foreground font-cairo">{t.rulings.comingSoon}</p>
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

export default RulingsPage;

import { ArrowRight, BookOpen, Baby, Box, Globe, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const PreparationsPage = () => {
  const navigate = useNavigate();
  const { t, direction } = useLanguage();

  const preparationItems = [
    { title: t.preparations.quranLearning, description: t.preparations.quranLearningDesc, icon: BookOpen, color: 'from-primary to-primary/60' },
    { title: t.preparations.breastfeedingRulings, description: t.preparations.breastfeedingDesc, icon: Baby, color: 'from-secondary to-secondary/60' },
    { title: t.preparations.threeDContent, description: t.preparations.threeDDesc, icon: Box, color: 'from-primary to-secondary' },
    { title: t.preparations.interactiveMap, description: t.preparations.interactiveMapDesc, icon: Globe, color: 'from-secondary to-primary' },
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          {direction === 'rtl' ? <ArrowRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
        </Button>
        <span className="font-cairo text-foreground">{t.preparations.title}</span>
      </div>

      <div className="space-y-4">
        {preparationItems.map((item, index) => (
          <Card key={index} className="border-0 shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all">
            <CardContent className="p-0">
              <div className="flex items-center gap-4">
                <div className={`w-24 h-24 bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                  <item.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="flex-1 p-4">
                  <h3 className="font-amiri text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground font-cairo text-sm mt-1">{item.description}</p>
                  <p className="text-primary font-cairo text-xs mt-2">{t.preparations.comingSoon}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-lg bg-islamic-light">
        <CardContent className="p-6 text-center">
          <Globe className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="font-amiri text-lg font-bold text-foreground mb-2">{t.preparations.interactiveMap}</h3>
          <p className="text-muted-foreground font-cairo text-sm">{t.preparations.mapInfo}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreparationsPage;

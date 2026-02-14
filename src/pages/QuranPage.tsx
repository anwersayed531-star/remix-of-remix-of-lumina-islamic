import { BookOpen, Search, Bookmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

const QuranPage = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
      <div className="relative">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder={t.quran.searchPlaceholder}
          className="w-full pr-12 pl-4 py-4 rounded-2xl bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary font-cairo"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
          <Bookmark className="w-6 h-6" />
          <span className="font-cairo">{t.quran.bookmarks}</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
          <BookOpen className="w-6 h-6" />
          <span className="font-cairo">{t.quran.lastRead}</span>
        </Button>
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-amiri text-xl font-bold text-foreground mb-2">
            {t.quran.comingSoon}
          </h3>
          <p className="text-muted-foreground font-cairo">
            {t.quran.contentComingSoon}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuranPage;

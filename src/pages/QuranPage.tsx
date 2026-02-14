import { useState, useMemo } from 'react';
import { Search, Play, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { SURAHS } from '@/lib/quranData';
import { useNavigate } from 'react-router-dom';

const QuranPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSurahs = useMemo(() => {
    if (!searchQuery.trim()) return SURAHS;
    const q = searchQuery.toLowerCase();
    return SURAHS.filter(s =>
      s.nameAr.includes(q) || s.nameEn.toLowerCase().includes(q) ||
      s.englishTranslation.toLowerCase().includes(q) || s.number.toString() === q
    );
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-6 space-y-4 animate-fade-in">
      {/* Search */}
      <div className="relative">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder={t.quran.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pr-12 pl-4 py-3 rounded-2xl bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary font-cairo text-sm"
        />
      </div>

      {/* Surah count */}
      <p className="text-xs text-muted-foreground font-cairo">
        {filteredSurahs.length} / 114
      </p>

      {/* Surah list */}
      <div className="space-y-2">
        {filteredSurahs.map((surah) => (
          <Card
            key={surah.number}
            className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
            onClick={() => navigate(`/surah/${surah.number}`)}
          >
            <CardContent className="p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <span className="font-cairo text-sm font-bold text-primary">{surah.number}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-cairo font-semibold text-foreground text-sm">{surah.nameAr}</h4>
                  <span className="font-amiri text-xs text-muted-foreground">{surah.nameEn}</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground font-cairo">
                    {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground font-cairo">{surah.ayahs} آية</span>
                </div>
              </div>
              <Play className="w-4 h-4 text-muted-foreground shrink-0" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuranPage;

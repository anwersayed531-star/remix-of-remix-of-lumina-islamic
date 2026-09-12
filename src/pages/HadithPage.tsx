import { useState, useEffect, useCallback } from 'react';
import { Search, ChevronRight, ArrowRight, BookOpen, Loader2, AlertCircle, MessageSquareText, Languages } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import {
  HADITH_BOOKS,
  fetchBookInfo,
  fetchSectionHadiths,
  getAvailableTranslation,
  API_LANG_LABELS,
  type HadithSection,
  type HadithWithTranslation,
} from '@/lib/hadithService';

type View = 'collections' | 'sections' | 'hadiths';

const HadithPage = () => {
  const { t, language } = useLanguage();
  const [view, setView] = useState<View>('collections');
  const [searchQuery, setSearchQuery] = useState('');

  // sections state
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [sections, setSections] = useState<HadithSection[]>([]);
  const [loadingSections, setLoadingSections] = useState(false);
  const [sectionsError, setSectionsError] = useState<string | null>(null);

  // hadiths state
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [hadiths, setHadiths] = useState<HadithWithTranslation[]>([]);
  const [loadingHadiths, setLoadingHadiths] = useState(false);
  const [hadithsError, setHadithsError] = useState<string | null>(null);

  // user opt-in to the certified English translation when their language has none
  const [useEnglish, setUseEnglish] = useState(false);

  const availability = selectedBook ? getAvailableTranslation(selectedBook, language) : null;
  const activeTranslationLang = availability?.available
    ? availability.apiLang
    : useEnglish && availability?.englishAvailable
      ? 'eng'
      : null;
  const activeTranslationLabel = activeTranslationLang ? API_LANG_LABELS[activeTranslationLang] : null;


  // ---- Collections view ----
  const filteredBooks = HADITH_BOOKS.filter(book => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return book.nameAr.includes(searchQuery) || book.nameEn.toLowerCase().includes(q);
  });

  // ---- Sections view ----
  const loadSections = useCallback(async (bookId: string) => {
    setLoadingSections(true);
    setSectionsError(null);
    try {
      const info = await fetchBookInfo(bookId);
      setSections(info.sections);
    } catch (err) {
      setSectionsError(t.hadith.errorLoading);
    } finally {
      setLoadingSections(false);
    }
  }, [t]);

  const handleSelectBook = (bookId: string) => {
    setSelectedBook(bookId);
    setView('sections');
    loadSections(bookId);
  };

  // ---- Hadiths view ----
  const loadHadiths = useCallback(async (bookId: string, sectionNo: number) => {
    setLoadingHadiths(true);
    setHadithsError(null);
    try {
      const data = await fetchSectionHadiths(bookId, sectionNo, language);
      setHadiths(data);
    } catch (err) {
      setHadithsError(t.hadith.errorLoading);
    } finally {
      setLoadingHadiths(false);
    }
  }, [language, t]);

  const handleSelectSection = (sectionNo: number) => {
    setSelectedSection(sectionNo);
    setView('hadiths');
    if (selectedBook) loadHadiths(selectedBook, sectionNo);
  };

  // ---- Navigation helpers ----
  const backToCollections = () => {
    setView('collections');
    setSelectedBook(null);
    setSections([]);
    setSearchQuery('');
  };

  const backToSections = () => {
    setView('sections');
    setSelectedSection(null);
    setHadiths([]);
  };

  const selectedBookData = HADITH_BOOKS.find(b => b.id === selectedBook);

  // ============ RENDER: Collections ============
  if (view === 'collections') {
    return (
      <div className="container mx-auto px-4 py-6 space-y-4 animate-fade-in">
        <div className="text-center mb-2">
          <h2 className="font-amiri text-2xl font-bold text-foreground">{t.hadith.title}</h2>
          <p className="text-xs text-muted-foreground font-cairo mt-1">{t.hadith.allCollections}</p>
        </div>

        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={t.hadith.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-12 pl-4 py-3 rounded-2xl bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary font-cairo text-sm"
          />
        </div>

        <div className="space-y-2">
          {filteredBooks.map((book) => (
            <Card
              key={book.id}
              className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
              onClick={() => handleSelectBook(book.id)}
            >
              <CardContent className="p-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-cairo font-semibold text-foreground text-sm">{book.nameAr}</h4>
                  <p className="font-amiri text-xs text-muted-foreground">{book.nameEn}</p>
                  <p className="text-xs text-muted-foreground font-cairo mt-0.5">
                    {book.totalHadiths} {t.hadith.totalHadiths}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0 rtl:rotate-180" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // ============ RENDER: Sections ============
  if (view === 'sections') {
    return (
      <div className="container mx-auto px-4 py-6 space-y-4 animate-fade-in">
        <Button
          variant="ghost"
          size="sm"
          onClick={backToCollections}
          className="mb-2 font-cairo flex items-center gap-1"
        >
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          {t.hadith.backToCollections}
        </Button>

        <div className="text-center mb-2">
          <h2 className="font-amiri text-xl font-bold text-foreground">
            {selectedBookData?.nameAr}
          </h2>
          <p className="text-xs text-muted-foreground font-cairo mt-1">{t.hadith.sections}</p>
        </div>

        {loadingSections && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground font-cairo">{t.hadith.loadingHadiths}</p>
          </div>
        )}

        {sectionsError && !loadingSections && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-10 h-10 mx-auto mb-3 text-destructive" />
              <p className="text-sm text-muted-foreground font-cairo">{sectionsError}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 font-cairo"
                onClick={() => selectedBook && loadSections(selectedBook)}
              >
                {t.hadith.errorLoading}
              </Button>
            </CardContent>
          </Card>
        )}

        {!loadingSections && !sectionsError && (
          <div className="space-y-2">
            {sections.map((section) => (
              <Card
                key={section.number}
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
                onClick={() => handleSelectSection(section.number)}
              >
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="font-cairo text-sm font-bold text-primary">{section.number}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-cairo font-semibold text-foreground text-sm line-clamp-1">
                      {section.name}
                    </h4>
                    <p className="text-xs text-muted-foreground font-cairo mt-0.5">
                      {section.hadithCount} {t.hadith.hadithNumber}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0 rtl:rotate-180" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ============ RENDER: Hadiths ============
  return (
    <div className="container mx-auto px-4 py-6 space-y-4 animate-fade-in">
      <Button
        variant="ghost"
        size="sm"
        onClick={backToSections}
        className="mb-2 font-cairo flex items-center gap-1"
      >
        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        {t.hadith.backToSections}
      </Button>

      <div className="text-center mb-2">
        <h2 className="font-amiri text-xl font-bold text-foreground">
          {selectedBookData?.nameAr}
        </h2>
        {hadiths[0]?.sectionName && (
          <p className="text-sm text-muted-foreground font-cairo mt-1">{hadiths[0].sectionName}</p>
        )}
        <p className="text-xs text-muted-foreground font-cairo mt-1">
          {hadiths.length} {t.hadith.hadithNumber}
        </p>
      </div>

      {loadingHadiths && (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground font-cairo">{t.hadith.loadingHadiths}</p>
        </div>
      )}

      {hadithsError && !loadingHadiths && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-10 h-10 mx-auto mb-3 text-destructive" />
            <p className="text-sm text-muted-foreground font-cairo">{hadithsError}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 font-cairo"
              onClick={() => selectedBook && selectedSection !== null && loadHadiths(selectedBook, selectedSection)}
            >
              {t.hadith.errorLoading}
            </Button>
          </CardContent>
        </Card>
      )}

      {!loadingHadiths && !hadithsError && hadiths.length === 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8 text-center">
            <MessageSquareText className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground font-cairo">{t.hadith.noHadiths}</p>
          </CardContent>
        </Card>
      )}

      {!loadingHadiths && !hadithsError && hadiths.length > 0 && (
        <div className="space-y-3">
          {hadiths.map((hadith) => (
            <Card key={hadith.hadithnumber} className="border-0 shadow-sm">
              <CardContent className="p-4 space-y-3">
                {/* Hadith number badge */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-cairo text-xs font-bold text-primary">{hadith.hadithnumber}</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-cairo">{t.hadith.hadithNumber}</span>
                </div>

                {/* Arabic text */}
                <div className="bg-muted/30 rounded-xl p-4">
                  <p className="font-amiri text-base leading-loose text-foreground text-right" dir="rtl">
                    {hadith.arabicText}
                  </p>
                </div>

                {/* Translation (for non-Arabic languages) */}
                {showTranslation && hadith.translation && (
                  <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                    <p className="text-xs text-primary font-cairo mb-2 font-semibold">{t.hadith.translation}</p>
                    <p className="font-cairo text-sm leading-relaxed text-foreground">
                      {hadith.translation}
                    </p>
                  </div>
                )}

                {/* Reference */}
                {hadith.reference && (
                  <p className="text-xs text-muted-foreground font-cairo text-center">
                    {selectedBookData?.nameEn} {hadith.reference.book}:{hadith.reference.hadith}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HadithPage;

import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, ArrowRight, BookOpen, ChevronDown, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { SURAHS } from '@/lib/quranData';
import { fetchSurahAudio, fetchSurahText, POPULAR_RECITERS, type Ayah } from '@/lib/quranAudioService';
import {
  fetchSurahTafsir,
  getTafsirOptions,
  getArabicEditions,
  getEnglishEditions,
  getEditionBySlug,
  type TafsirAyah,
} from '@/lib/tafsirService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

const SurahDetailPage = () => {
  const { surahId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const surahNumber = parseInt(surahId || '1');
  const surahInfo = SURAHS.find(s => s.number === surahNumber);

  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReciter, setSelectedReciter] = useState(POPULAR_RECITERS[0].identifier);
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [audioEl] = useState(() => new Audio());
  const [playingAll, setPlayingAll] = useState(false);

  // ---- Tafsir state ----
  const nativeEditions = getTafsirOptions(language);
  const hasNative = nativeEditions.length > 0;
  const fallbackEditions = [...getArabicEditions(), ...getEnglishEditions()];
  const editionChoices = hasNative
    ? [...nativeEditions, ...fallbackEditions.filter(e => e.lang !== language)]
    : fallbackEditions;

  const [showTafsir, setShowTafsir] = useState(false);
  const [tafsirMode, setTafsirMode] = useState<'ayah' | 'surah'>('ayah');
  const [tafsirSlug, setTafsirSlug] = useState(editionChoices[0].slug);
  const [tafsirData, setTafsirData] = useState<TafsirAyah[]>([]);
  const [tafsirLoading, setTafsirLoading] = useState(false);
  const [tafsirError, setTafsirError] = useState(false);
  const [openAyah, setOpenAyah] = useState<number | null>(null);

  const activeEdition = getEditionBySlug(tafsirSlug);

  // Load surah text
  useEffect(() => {
    setLoading(true);
    fetchSurahText(surahNumber)
      .then(data => {
        setAyahs(data.ayahs.map(a => ({ ...a, audio: '' })));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [surahNumber]);

  // Load tafsir when requested / edition or surah changes
  const loadTafsir = useCallback(async (slug: string, surah: number) => {
    setTafsirLoading(true);
    setTafsirError(false);
    try {
      const data = await fetchSurahTafsir(slug, surah);
      setTafsirData(data);
    } catch {
      setTafsirData([]);
      setTafsirError(true);
    } finally {
      setTafsirLoading(false);
    }
  }, []);

  useEffect(() => {
    if (showTafsir) loadTafsir(tafsirSlug, surahNumber);
  }, [showTafsir, tafsirSlug, surahNumber, loadTafsir]);

  // Cleanup audio
  useEffect(() => {
    return () => { audioEl.pause(); audioEl.src = ''; };
  }, [audioEl]);

  const playAyah = async (ayahIndex: number) => {
    try {
      setPlayingAyah(ayahIndex);
      const data = await fetchSurahAudio(surahNumber, selectedReciter);
      audioEl.src = data.ayahs[ayahIndex].audio;
      audioEl.onended = () => {
        if (playingAll && ayahIndex < ayahs.length - 1) {
          playAyah(ayahIndex + 1);
        } else {
          setPlayingAyah(null);
          setPlayingAll(false);
        }
      };
      await audioEl.play();
    } catch {
      setPlayingAyah(null);
    }
  };

  const stopAudio = () => {
    audioEl.pause();
    audioEl.src = '';
    setPlayingAyah(null);
    setPlayingAll(false);
  };

  const playAllFromStart = () => {
    setPlayingAll(true);
    playAyah(0);
  };

  const tafsirFor = (ayahNumber: number) =>
    tafsirData.find(x => x.ayah === ayahNumber)?.text || '';

  if (!surahInfo) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-muted-foreground font-cairo">السورة غير موجودة</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/quran')}>
          <ArrowRight className="w-4 h-4 ml-2" /> العودة للقرآن
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="icon" onClick={() => navigate('/quran')}>
          <ArrowRight className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="font-amiri text-2xl font-bold text-foreground">{surahInfo.nameAr}</h1>
          <p className="text-sm text-muted-foreground font-cairo">
            {surahInfo.nameEn} • {surahInfo.ayahs} آية • {surahInfo.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
          </p>
        </div>
      </div>

      {/* Reciter selector + Play all */}
      <div className="flex gap-2">
        <Select value={selectedReciter} onValueChange={(v) => { stopAudio(); setSelectedReciter(v); }}>
          <SelectTrigger className="flex-1 font-cairo text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {POPULAR_RECITERS.map(r => (
              <SelectItem key={r.identifier} value={r.identifier} className="font-cairo">
                {r.nameAr}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={playingAll ? stopAudio : playAllFromStart}
          className="shrink-0"
          variant={playingAll ? 'destructive' : 'default'}
        >
          {playingAll ? <Pause className="w-4 h-4 ml-1" /> : <Play className="w-4 h-4 ml-1" />}
          {playingAll ? 'إيقاف' : 'تشغيل الكل'}
        </Button>
      </div>

      {/* Tafsir controls */}
      <div className="space-y-2">
        <Button
          variant={showTafsir ? 'secondary' : 'outline'}
          className="w-full font-cairo"
          onClick={() => { setShowTafsir(v => !v); setOpenAyah(null); }}
        >
          <BookOpen className="w-4 h-4 ml-2" />
          {showTafsir ? t.quran.hideTafsir : t.quran.tafsir}
        </Button>

        {showTafsir && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3 space-y-3">
              {!hasNative && (
                <div className="flex items-start gap-2 rounded-lg bg-muted/60 p-2">
                  <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="font-cairo text-xs text-muted-foreground leading-relaxed">
                    {t.quran.noTafsirInYourLanguage}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={tafsirMode === 'ayah' ? 'default' : 'outline'}
                  className="flex-1 font-cairo text-xs"
                  onClick={() => setTafsirMode('ayah')}
                >
                  {t.quran.tafsirByAyah}
                </Button>
                <Button
                  size="sm"
                  variant={tafsirMode === 'surah' ? 'default' : 'outline'}
                  className="flex-1 font-cairo text-xs"
                  onClick={() => setTafsirMode('surah')}
                >
                  {t.quran.tafsirWholeSurah}
                </Button>
              </div>

              <div>
                <p className="font-cairo text-xs text-muted-foreground mb-1">{t.quran.tafsirSource}</p>
                <Select value={tafsirSlug} onValueChange={setTafsirSlug}>
                  <SelectTrigger className="font-cairo text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {editionChoices.map(e => (
                      <SelectItem key={e.slug} value={e.slug} className="font-cairo">
                        {e.name} — {e.langLabel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {activeEdition && (
                <p className="font-cairo text-[11px] text-muted-foreground">
                  {t.quran.tafsirLanguage}: {activeEdition.langLabel}
                </p>
              )}

              {tafsirMode === 'ayah' && (
                <p className="font-cairo text-[11px] text-muted-foreground">{t.quran.tapAyahForTafsir}</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bismillah */}
      {surahNumber !== 9 && surahNumber !== 1 && (
        <p className="text-center font-amiri text-xl text-foreground py-3">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      )}

      {/* Whole-surah tafsir */}
      {showTafsir && tafsirMode === 'surah' && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 space-y-4">
            {tafsirLoading ? (
              <div className="flex items-center gap-2 justify-center py-6">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="font-cairo text-sm text-muted-foreground">{t.quran.loadingTafsir}</span>
              </div>
            ) : tafsirError ? (
              <p className="font-cairo text-sm text-destructive text-center">{t.quran.tafsirError}</p>
            ) : (
              tafsirData.map(item => (
                <div key={item.ayah} className="space-y-1">
                  <p className="font-cairo text-xs font-bold text-primary">
                    {t.quran.ayahLabel} {item.ayah}
                  </p>
                  <p className="font-cairo text-sm leading-relaxed text-foreground whitespace-pre-line">
                    {item.text}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}

      {/* Ayahs */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {ayahs.map((ayah, index) => (
            <Card
              key={ayah.numberInSurah}
              className={`border-0 shadow-sm transition-all ${
                playingAyah === index ? 'bg-primary/10 ring-1 ring-primary' : ''
              }`}
            >
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => playingAyah === index ? stopAudio() : playAyah(index)}
                    className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 hover:bg-primary/20 transition-colors"
                  >
                    {playingAyah === index ? (
                      <Pause className="w-3.5 h-3.5 text-primary" />
                    ) : (
                      <span className="font-cairo text-xs font-bold text-primary">{ayah.numberInSurah}</span>
                    )}
                  </button>
                  <div className="flex-1">
                    <p
                      onClick={() => {
                        if (showTafsir && tafsirMode === 'ayah') {
                          setOpenAyah(openAyah === ayah.numberInSurah ? null : ayah.numberInSurah);
                        }
                      }}
                      className={`font-amiri text-lg leading-loose text-foreground text-right ${
                        showTafsir && tafsirMode === 'ayah' ? 'cursor-pointer hover:text-primary transition-colors' : ''
                      }`}
                    >
                      {ayah.text}
                      <span className="inline-block mx-1 font-cairo text-xs text-primary align-middle">
                        ﴿{ayah.numberInSurah}﴾
                      </span>
                    </p>

                    {showTafsir && tafsirMode === 'ayah' && openAyah === ayah.numberInSurah && (
                      <div className="mt-2 rounded-lg bg-muted/50 p-3">
                        {tafsirLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                            <span className="font-cairo text-xs text-muted-foreground">{t.quran.loadingTafsir}</span>
                          </div>
                        ) : tafsirError ? (
                          <p className="font-cairo text-xs text-destructive">{t.quran.tafsirError}</p>
                        ) : (
                          <>
                            {activeEdition && (
                              <p className="font-cairo text-[11px] text-muted-foreground mb-1">
                                {activeEdition.name} — {activeEdition.langLabel}
                              </p>
                            )}
                            <p className="font-cairo text-sm leading-relaxed text-foreground whitespace-pre-line">
                              {tafsirFor(ayah.numberInSurah) || t.quran.tafsirError}
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  {showTafsir && tafsirMode === 'ayah' && (
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground shrink-0 mt-2 transition-transform ${
                        openAyah === ayah.numberInSurah ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurahDetailPage;

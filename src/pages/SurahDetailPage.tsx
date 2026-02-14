import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, ArrowRight, Loader2, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { SURAHS } from '@/lib/quranData';
import { fetchSurahAudio, fetchSurahText, POPULAR_RECITERS, type Ayah } from '@/lib/quranAudioService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

const SurahDetailPage = () => {
  const { surahId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const surahNumber = parseInt(surahId || '1');
  const surahInfo = SURAHS.find(s => s.number === surahNumber);

  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReciter, setSelectedReciter] = useState(POPULAR_RECITERS[0].identifier);
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [audioEl] = useState(() => new Audio());
  const [playingAll, setPlayingAll] = useState(false);

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

      {/* Bismillah */}
      {surahNumber !== 9 && surahNumber !== 1 && (
        <p className="text-center font-amiri text-xl text-foreground py-3">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
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
                  <p className="font-amiri text-lg leading-loose text-foreground flex-1 text-right">
                    {ayah.text}
                    <span className="inline-block mx-1 font-cairo text-xs text-primary align-middle">
                      ﴿{ayah.numberInSurah}﴾
                    </span>
                  </p>
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

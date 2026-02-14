import { Volume2, Play, Pause, SkipBack, SkipForward, Loader2 } from 'lucide-react';
import logoImg from '@/assets/logo.png';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import { POPULAR_RECITERS, fetchSurahAudio, type Ayah } from '@/lib/quranAudioService';
import { SURAHS } from '@/lib/quranData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SoundPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedReciter, setSelectedReciter] = useState(0);
  const [selectedSurah, setSelectedSurah] = useState('1');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [ayahDurations, setAyahDurations] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const preloadRef = useRef<HTMLAudioElement | null>(null);
  const ayahDurationsRef = useRef<number[]>([]);
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!audioRef.current) audioRef.current = new Audio();
    if (!preloadRef.current) {
      preloadRef.current = new Audio();
      preloadRef.current.preload = 'auto';
    }
    const audio = audioRef.current;

    const onTime = () => {
      setCurrentTime(audio.currentTime);
      const idx = audio.dataset.ayahIndex ? parseInt(audio.dataset.ayahIndex) : 0;
      const elapsed = ayahDurationsRef.current.slice(0, idx).reduce((a, b) => a + b, 0);
      setTotalElapsed(elapsed + audio.currentTime);
    };

    const onDur = () => {
      setDuration(audio.duration);
      const idx = audio.dataset.ayahIndex ? parseInt(audio.dataset.ayahIndex) : 0;
      ayahDurationsRef.current[idx] = audio.duration;
      setAyahDurations([...ayahDurationsRef.current]);
      setTotalDuration(ayahDurationsRef.current.reduce((a, b) => a + b, 0));
    };

    const onEnd = () => {
      setCurrentAyahIndex(prev => {
        const next = prev + 1;
        setAyahs(currentAyahs => {
          if (next < currentAyahs.length) {
            audio.src = currentAyahs[next].audio;
            audio.dataset.ayahIndex = String(next);
            audio.play();
            // Preload next+1
            if (next + 1 < currentAyahs.length && preloadRef.current) {
              preloadRef.current.src = currentAyahs[next + 1].audio;
              preloadRef.current.load();
            }
          } else {
            setIsPlaying(false);
          }
          return currentAyahs;
        });
        return next;
      });
    };

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('durationchange', onDur);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('durationchange', onDur);
      audio.removeEventListener('ended', onEnd);
    };
  }, []);

  useEffect(() => {
    return () => { audioRef.current?.pause(); };
  }, []);

  // Auto-restart when surah or reciter changes while playing
  const isPlayingRef = useRef(false);
  const prevSurahRef = useRef(selectedSurah);
  const prevReciterRef = useRef(selectedReciter);
  
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const surahChanged = prevSurahRef.current !== selectedSurah;
    const reciterChanged = prevReciterRef.current !== selectedReciter;
    prevSurahRef.current = selectedSurah;
    prevReciterRef.current = selectedReciter;
    
    if ((surahChanged || reciterChanged) && isPlayingRef.current) {
      // Auto-restart with new selection
      playSurahFn();
    }
  }, [selectedSurah, selectedReciter]);

  const playSurahFn = async () => {
    playSurah();
  };

  const playSurah = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSurahAudio(parseInt(selectedSurah), POPULAR_RECITERS[selectedReciter].identifier);
      setAyahs(data.ayahs);
      setCurrentAyahIndex(0);
      setTotalElapsed(0);
      setTotalDuration(0);
      ayahDurationsRef.current = new Array(data.ayahs.length).fill(0);
      const audio = audioRef.current!;
      audio.src = data.ayahs[0].audio;
      audio.dataset.ayahIndex = '0';
      // Preload second ayah
      if (data.ayahs.length > 1 && preloadRef.current) {
        preloadRef.current.src = data.ayahs[1].audio;
        preloadRef.current.load();
      }
      await audio.play();
      setIsPlaying(true);
    } catch (e) {
      console.error('Error playing:', e);
    }
    setIsLoading(false);
  };

  const togglePlay = () => {
    if (!ayahs.length) { playSurah(); return; }
    const audio = audioRef.current!;
    if (isPlaying) { audio.pause(); } else { audio.play(); }
    setIsPlaying(!isPlaying);
  };

  const nextSurah = () => {
    const n = parseInt(selectedSurah);
    if (n < 114) { setSelectedSurah(String(n + 1)); }
  };

  const prevSurah = () => {
    const n = parseInt(selectedSurah);
    if (n > 1) { setSelectedSurah(String(n - 1)); }
  };

  const formatTime = (t: number) => {
    if (!t || isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progress = totalDuration > 0 
    ? (totalElapsed / totalDuration) * 100 
    : (ayahs.length > 0 ? (currentAyahIndex / ayahs.length) * 100 : 0);
  const currentSurahInfo = SURAHS.find(s => s.number === parseInt(selectedSurah));
  const currentReciterInfo = POPULAR_RECITERS[selectedReciter];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Player card */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <div
              className="w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: currentReciterInfo.color }}
            >
              <img 
                src={currentReciterInfo.imageUrl || logoImg} 
                alt={currentReciterInfo.nameAr} 
                className="w-full h-full object-cover" 
                onError={(e) => { e.currentTarget.src = logoImg; }}
              />
            </div>
            <h3 className="font-amiri text-xl font-bold">
              {currentReciterInfo.nameAr}
            </h3>
            <p className="text-primary-foreground/80 font-cairo text-sm mt-1">
              {currentSurahInfo?.nameAr || t.sound.recitations}
            </p>
            {ayahs.length > 0 && (
              <p className="text-primary-foreground/60 font-cairo text-xs mt-1">
                آية {currentAyahIndex + 1} / {ayahs.length}
              </p>
            )}
          </div>

          {/* Progress */}
          <div className="mb-1">
            <div
              className="w-full h-1.5 bg-primary-foreground/30 rounded-full cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = (e.clientX - rect.left) / rect.width;
                if (audioRef.current) audioRef.current.currentTime = pct * duration;
              }}
            >
              <div className="h-full bg-primary-foreground rounded-full transition-all" style={{ width: `${Math.min(progress, 100)}%` }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-primary-foreground/60 font-cairo">{formatTime(totalElapsed)}</span>
              <span className="text-xs text-primary-foreground/60 font-cairo">{totalDuration > 0 ? formatTime(totalDuration) : '--:--'}</span>
            </div>
          </div>

          {/* Surah selector */}
          <div className="mb-4">
            <Select value={selectedSurah} onValueChange={setSelectedSurah}>
              <SelectTrigger className="bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground font-cairo text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {SURAHS.map(s => (
                  <SelectItem key={s.number} value={String(s.number)} className="font-cairo">
                    {s.number}. {s.nameAr} - {s.nameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20" onClick={nextSurah}>
              <SkipForward className="w-6 h-6" />
            </Button>
            <Button 
              size="icon" 
              className="w-16 h-16 rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              onClick={togglePlay}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 mr-[-2px]" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20" onClick={prevSurah}>
              <SkipBack className="w-6 h-6" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reciters list */}
      <div className="space-y-3">
        <h3 className="font-amiri text-xl font-bold text-foreground">{t.sound.reciters}</h3>
        {POPULAR_RECITERS.map((reciter, index) => (
          <Card 
            key={reciter.identifier}
            className={`border-0 shadow-md cursor-pointer transition-all ${
              selectedReciter === index ? 'bg-primary text-primary-foreground' : 'hover:shadow-lg'
            }`}
            onClick={() => {
              setSelectedReciter(index);
            }}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: reciter.color }}
              >
                <img 
                  src={reciter.imageUrl || logoImg} 
                  alt={reciter.nameAr} 
                  className="w-full h-full object-cover" 
                  onError={(e) => { e.currentTarget.src = logoImg; }}
                />
              </div>
              <div className="flex-1">
                <h4 className="font-cairo font-semibold">{reciter.nameAr}</h4>
                <p className={`text-sm font-cairo ${
                  selectedReciter === index ? 'text-primary-foreground/80' : 'text-muted-foreground'
                }`}>
                  {reciter.nameEn}
                </p>
              </div>
              {selectedReciter === index && isPlaying && (
                <div className="flex gap-0.5">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-1 bg-primary-foreground/80 rounded-full animate-pulse" style={{ height: `${8 + i * 4}px`, animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SoundPage;

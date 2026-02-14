import { useState, useRef, useCallback, useEffect } from 'react';
import { Ayah, fetchSurahAudio, POPULAR_RECITERS } from '@/lib/quranAudioService';

export interface AudioPlayerState {
  isPlaying: boolean;
  currentSurahNumber: number | null;
  currentSurahName: string;
  currentReciter: string;
  currentReciterName: string;
  currentAyahIndex: number;
  ayahs: Ayah[];
  duration: number;
  currentTime: number;
  totalElapsed: number;
  totalDuration: number;
  ayahDurations: number[];
  isLoading: boolean;
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const preloadRef = useRef<HTMLAudioElement | null>(null);
  const ayahDurationsRef = useRef<number[]>([]);

  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentSurahNumber: null,
    currentSurahName: '',
    currentReciter: POPULAR_RECITERS[0].identifier,
    currentReciterName: POPULAR_RECITERS[0].nameAr,
    currentAyahIndex: 0,
    ayahs: [],
    duration: 0,
    currentTime: 0,
    totalElapsed: 0,
    totalDuration: 0,
    ayahDurations: [],
    isLoading: false,
  });

  // Initialize audio elements
  useEffect(() => {
    if (!audioRef.current) audioRef.current = new Audio();
    if (!preloadRef.current) preloadRef.current = new Audio();
    preloadRef.current.preload = 'auto';

    const audio = audioRef.current;

    const onTimeUpdate = () => {
      const elapsed = ayahDurationsRef.current
        .slice(0, audio.dataset.ayahIndex ? parseInt(audio.dataset.ayahIndex) : 0)
        .reduce((a, b) => a + b, 0);
      setState(s => ({
        ...s,
        currentTime: audio.currentTime,
        duration: audio.duration,
        totalElapsed: elapsed + audio.currentTime,
      }));
    };

    const onDurationChange = () => {
      const idx = audio.dataset.ayahIndex ? parseInt(audio.dataset.ayahIndex) : 0;
      ayahDurationsRef.current[idx] = audio.duration;
      const totalDur = ayahDurationsRef.current.reduce((a, b) => a + b, 0);
      setState(s => ({
        ...s,
        duration: audio.duration,
        ayahDurations: [...ayahDurationsRef.current],
        totalDuration: totalDur,
      }));
    };

    const onEnded = () => {
      setState(prev => {
        if (prev.currentAyahIndex < prev.ayahs.length - 1) {
          const nextIndex = prev.currentAyahIndex + 1;
          // Use preloaded audio if available
          if (preloadRef.current && preloadRef.current.src) {
            // Swap: preloaded becomes main
            const preloaded = preloadRef.current;
            audio.src = preloaded.src;
            audio.dataset.ayahIndex = String(nextIndex);
            audio.play();
          } else {
            audio.src = prev.ayahs[nextIndex].audio;
            audio.dataset.ayahIndex = String(nextIndex);
            audio.play();
          }
          // Preload next+1
          if (nextIndex + 1 < prev.ayahs.length && preloadRef.current) {
            preloadRef.current.src = prev.ayahs[nextIndex + 1].audio;
            preloadRef.current.load();
          }
          return { ...prev, currentAyahIndex: nextIndex };
        }
        return { ...prev, isPlaying: false };
      });
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
    };
  }, []);

  const playSurah = useCallback(async (surahNumber: number, surahName: string, reciterIdentifier?: string) => {
    const reciter = reciterIdentifier || state.currentReciter;
    const reciterInfo = POPULAR_RECITERS.find(r => r.identifier === reciter);

    setState(s => ({ ...s, isLoading: true }));

    try {
      const data = await fetchSurahAudio(surahNumber, reciter);
      const audio = audioRef.current!;
      ayahDurationsRef.current = new Array(data.ayahs.length).fill(0);
      audio.src = data.ayahs[0].audio;
      audio.dataset.ayahIndex = '0';

      // Preload second ayah
      if (data.ayahs.length > 1 && preloadRef.current) {
        preloadRef.current.src = data.ayahs[1].audio;
        preloadRef.current.load();
      }

      await audio.play();

      setState(s => ({
        ...s,
        isPlaying: true,
        currentSurahNumber: surahNumber,
        currentSurahName: surahName,
        currentReciter: reciter,
        currentReciterName: reciterInfo?.nameAr || reciter,
        currentAyahIndex: 0,
        ayahs: data.ayahs,
        isLoading: false,
        totalElapsed: 0,
        totalDuration: 0,
        ayahDurations: [],
      }));

      // Media Session API for mobile notifications
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: surahName,
          artist: reciterInfo?.nameAr || reciter,
          album: 'القرآن الكريم',
          artwork: [
            { src: '/logo.png', sizes: '512x512', type: 'image/png' },
          ],
        });
        navigator.mediaSession.setActionHandler('play', () => {
          audio.play();
          setState(s => ({ ...s, isPlaying: true }));
        });
        navigator.mediaSession.setActionHandler('pause', () => {
          audio.pause();
          setState(s => ({ ...s, isPlaying: false }));
        });
        navigator.mediaSession.setActionHandler('nexttrack', () => {
          // Will be handled by component
        });
        navigator.mediaSession.setActionHandler('previoustrack', () => {
          // Will be handled by component
        });
      }
    } catch (error) {
      console.error('Error playing surah:', error);
      setState(s => ({ ...s, isLoading: false }));
    }
  }, [state.currentReciter]);

  const playAyah = useCallback((ayahIndex: number) => {
    if (state.ayahs[ayahIndex]) {
      const audio = audioRef.current!;
      audio.src = state.ayahs[ayahIndex].audio;
      audio.dataset.ayahIndex = String(ayahIndex);
      audio.play();
      // Preload next
      if (ayahIndex + 1 < state.ayahs.length && preloadRef.current) {
        preloadRef.current.src = state.ayahs[ayahIndex + 1].audio;
        preloadRef.current.load();
      }
      setState(s => ({ ...s, isPlaying: true, currentAyahIndex: ayahIndex }));
    }
  }, [state.ayahs]);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current!;
    if (state.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setState(s => ({ ...s, isPlaying: !s.isPlaying }));
  }, [state.isPlaying]);

  const seekTo = useCallback((time: number) => {
    audioRef.current!.currentTime = time;
  }, []);

  const nextAyah = useCallback(() => {
    if (state.currentAyahIndex < state.ayahs.length - 1) {
      playAyah(state.currentAyahIndex + 1);
    }
  }, [state.currentAyahIndex, state.ayahs.length, playAyah]);

  const prevAyah = useCallback(() => {
    if (state.currentAyahIndex > 0) {
      playAyah(state.currentAyahIndex - 1);
    }
  }, [state.currentAyahIndex, playAyah]);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    setState(s => ({ ...s, isPlaying: false, currentSurahNumber: null, ayahs: [], totalElapsed: 0, totalDuration: 0 }));
  }, []);

  const changeReciter = useCallback((reciterIdentifier: string) => {
    const reciterInfo = POPULAR_RECITERS.find(r => r.identifier === reciterIdentifier);
    setState(s => ({
      ...s,
      currentReciter: reciterIdentifier,
      currentReciterName: reciterInfo?.nameAr || reciterIdentifier,
    }));
    if (state.currentSurahNumber) {
      playSurah(state.currentSurahNumber, state.currentSurahName, reciterIdentifier);
    }
  }, [state.currentSurahNumber, state.currentSurahName, playSurah]);

  return {
    ...state,
    playSurah,
    playAyah,
    togglePlayPause,
    seekTo,
    nextAyah,
    prevAyah,
    stop,
    changeReciter,
  };
}

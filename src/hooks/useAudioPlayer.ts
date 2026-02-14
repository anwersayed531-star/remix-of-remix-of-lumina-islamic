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
  isLoading: boolean;
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
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
    isLoading: false,
  });

  // Initialize audio element once
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;

    const onTimeUpdate = () => setState(s => ({ ...s, currentTime: audio.currentTime }));
    const onDurationChange = () => setState(s => ({ ...s, duration: audio.duration }));
    const onEnded = () => {
      // Auto-play next ayah
      setState(prev => {
        if (prev.currentAyahIndex < prev.ayahs.length - 1) {
          const nextIndex = prev.currentAyahIndex + 1;
          audio.src = prev.ayahs[nextIndex].audio;
          audio.play();
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
      audio.src = data.ayahs[0].audio;
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
      }));
    } catch (error) {
      console.error('Error playing surah:', error);
      setState(s => ({ ...s, isLoading: false }));
    }
  }, [state.currentReciter]);

  const playAyah = useCallback((ayahIndex: number) => {
    if (state.ayahs[ayahIndex]) {
      const audio = audioRef.current!;
      audio.src = state.ayahs[ayahIndex].audio;
      audio.play();
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
    setState(s => ({ ...s, isPlaying: false, currentSurahNumber: null, ayahs: [] }));
  }, []);

  const changeReciter = useCallback((reciterIdentifier: string) => {
    const reciterInfo = POPULAR_RECITERS.find(r => r.identifier === reciterIdentifier);
    setState(s => ({
      ...s,
      currentReciter: reciterIdentifier,
      currentReciterName: reciterInfo?.nameAr || reciterIdentifier,
    }));
    // If currently playing, reload with new reciter
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

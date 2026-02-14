import { Play, Pause, SkipBack, SkipForward, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudioPlayerProps {
  isPlaying: boolean;
  isLoading: boolean;
  currentSurahName: string;
  currentReciterName: string;
  currentTime: number;
  duration: number;
  currentAyahIndex: number;
  totalAyahs: number;
  onTogglePlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (time: number) => void;
  onClose: () => void;
}

const AudioPlayer = ({
  isPlaying, isLoading, currentSurahName, currentReciterName,
  currentTime, duration, currentAyahIndex, totalAyahs,
  onTogglePlayPause, onNext, onPrev, onSeek, onClose,
}: AudioPlayerProps) => {
  const formatTime = (t: number) => {
    if (!t || isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-20 left-2 right-2 z-50 bg-card/95 backdrop-blur-lg border border-border rounded-2xl shadow-2xl p-3">
      {/* Progress bar */}
      <div
        className="w-full h-1 bg-muted rounded-full mb-3 cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pct = (e.clientX - rect.left) / rect.width;
          onSeek(pct * duration);
        }}
      >
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex items-center gap-3">
        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-amiri text-sm font-bold text-foreground truncate">{currentSurahName}</p>
          <p className="font-cairo text-xs text-muted-foreground truncate">
            {currentReciterName} • آية {currentAyahIndex + 1}/{totalAyahs}
          </p>
        </div>

        {/* Time */}
        <span className="text-xs text-muted-foreground font-cairo hidden sm:block">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onNext}>
            <SkipForward className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            className="h-10 w-10 rounded-full bg-primary text-primary-foreground"
            onClick={onTogglePlayPause}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 mr-[-2px]" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onPrev}>
            <SkipBack className="w-4 h-4" />
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AudioPlayer;

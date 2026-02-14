import { Volume2, Play, Pause, SkipBack, SkipForward, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const reciters = [
  { nameAr: 'عبد الباسط عبد الصمد', styleKey: 'murattal' as const },
  { nameAr: 'محمد صديق المنشاوي', styleKey: 'mujawwad' as const },
  { nameAr: 'مشاري راشد العفاسي', styleKey: 'murattal' as const },
  { nameAr: 'ماهر المعيقلي', styleKey: 'murattal' as const },
  { nameAr: 'سعد الغامدي', styleKey: 'murattal' as const },
];

const SoundPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedReciter, setSelectedReciter] = useState<number | null>(null);
  const { t, language } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
      <Card className="border-0 shadow-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto mb-4 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <User className="w-12 h-12" />
            </div>
            <h3 className="font-amiri text-xl font-bold">
              {selectedReciter !== null ? reciters[selectedReciter].nameAr : t.sound.selectReciter}
            </h3>
            <p className="text-primary-foreground/80 font-cairo text-sm mt-1">
              {selectedReciter !== null ? t.sound[reciters[selectedReciter].styleKey] : t.sound.recitations}
            </p>
          </div>

          <div className="w-full h-1 bg-primary-foreground/30 rounded-full mb-4">
            <div className="w-0 h-full bg-primary-foreground rounded-full" />
          </div>

          <div className="flex items-center justify-center gap-6">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
              <SkipForward className="w-6 h-6" />
            </Button>
            <Button 
              size="icon" 
              className="w-16 h-16 rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 mr-[-2px]" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
              <SkipBack className="w-6 h-6" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="font-amiri text-xl font-bold text-foreground">{t.sound.reciters}</h3>
        {reciters.map((reciter, index) => (
          <Card 
            key={index}
            className={`border-0 shadow-md cursor-pointer transition-all ${
              selectedReciter === index ? 'bg-primary text-primary-foreground' : 'hover:shadow-lg'
            }`}
            onClick={() => setSelectedReciter(index)}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selectedReciter === index ? 'bg-primary-foreground/20' : 'bg-islamic-light'
              }`}>
                <User className={`w-6 h-6 ${selectedReciter === index ? 'text-primary-foreground' : 'text-primary'}`} />
              </div>
              <div>
                <h4 className="font-cairo font-semibold">{reciter.nameAr}</h4>
                <p className={`text-sm font-cairo ${
                  selectedReciter === index ? 'text-primary-foreground/80' : 'text-muted-foreground'
                }`}>
                  {t.sound[reciter.styleKey]}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SoundPage;

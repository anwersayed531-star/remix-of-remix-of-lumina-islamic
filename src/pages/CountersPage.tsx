import { Circle, ChevronLeft, BookOpen, Settings, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { languages } from '@/lib/languages';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const CountersPage = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage, currentLanguage } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
      <Card className="border-0 shadow-md bg-gradient-to-br from-accent to-accent/80">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-background/20 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-cairo font-semibold text-accent-foreground">{t.settings.language}</h3>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full mt-2 bg-background/80">
                  <SelectValue>{currentLanguage?.nativeName || language}</SelectValue>
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="flex items-center gap-2">
                        <span>{lang.nativeName}</span>
                        <span className="text-muted-foreground text-xs">({lang.name})</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Card className="border-0 shadow-xl cursor-pointer hover:shadow-2xl transition-all active:scale-[0.98] bg-gradient-to-br from-primary to-primary/80" onClick={() => navigate('/dhikr-selection')}>
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary-foreground/20 rounded-2xl flex items-center justify-center">
                <Circle className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-amiri text-xl font-bold text-primary-foreground">{t.counters.selectDhikr}</h3>
                <p className="text-sm text-primary-foreground/80 font-cairo">
                  {t.dhikr.subhanallah}، {t.dhikr.alhamdulillah}، {t.dhikr.allahuakbar}...
                </p>
              </div>
            </div>
            <ChevronLeft className="w-6 h-6 text-primary-foreground" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/tasbeeh')}>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-islamic-light rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-cairo font-semibold text-foreground">{t.counters.tasbeeh}</h3>
                <p className="text-sm text-muted-foreground font-cairo">{t.tasbeeh.morningEveningAdhkar}</p>
              </div>
            </div>
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/settings')}>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-islamic-light rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-cairo font-semibold text-foreground">{t.settings.title}</h3>
                <p className="text-sm text-muted-foreground font-cairo">{t.tasbeeh.customizeSettings}</p>
              </div>
            </div>
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CountersPage;

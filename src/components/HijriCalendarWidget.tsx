import { Card, CardContent } from '@/components/ui/card';
import { 
  getCurrentHijriDate, formatFullHijriDate, formatGregorianDate,
  specialMonthsInfo, isSpecialMonth, isSacredMonth
} from '@/lib/hijriCalendar';
import { Calendar, Star, Moon, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const HijriCalendarWidget = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const hijriDate = getCurrentHijriDate();
  const gregorianDate = new Date();
  const monthInfo = specialMonthsInfo[hijriDate.month];
  const isCurrentMonthSacred = isSacredMonth(hijriDate.month);
  const isCurrentMonthSpecial = isSpecialMonth(hijriDate.month);

  return (
    <Card className="w-full border-0 shadow-xl bg-card/80 backdrop-blur-sm overflow-hidden cursor-pointer hover:shadow-2xl transition-all"
      onClick={() => navigate('/hijri-calendar')}>
      <div className="bg-gradient-to-l from-primary to-primary/80 p-6 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary-foreground/20 rounded-xl"><Calendar className="w-6 h-6" /></div>
            <div>
              <p className="text-primary-foreground/80 text-sm font-cairo">{t.home.hijriCalendar}</p>
              <h2 className="text-2xl font-amiri font-bold">{formatFullHijriDate(hijriDate)}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isCurrentMonthSacred && (
              <div className="flex items-center gap-2 bg-secondary/20 px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 fill-secondary text-secondary" />
                <span className="text-sm font-cairo">{t.calendar.sacredMonth}</span>
              </div>
            )}
            <ChevronLeft className="w-5 h-5 text-primary-foreground/60" />
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
          <Moon className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground font-cairo">{t.calendar.gregorianDate}</p>
            <p className="font-cairo text-foreground">{formatGregorianDate(gregorianDate)}</p>
          </div>
        </div>

        {isCurrentMonthSpecial && monthInfo && (
          <div className="p-4 bg-islamic-light rounded-xl border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg mt-1"><Star className="w-4 h-4 text-primary" /></div>
              <div>
                <h3 className="font-amiri font-bold text-lg text-primary">{monthInfo.name}</h3>
                <p className="text-muted-foreground font-cairo text-sm mt-1">{monthInfo.description}</p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center text-sm text-muted-foreground font-cairo">{t.calendar.tapFullCalendar}</div>
      </CardContent>
    </Card>
  );
};

export default HijriCalendarWidget;

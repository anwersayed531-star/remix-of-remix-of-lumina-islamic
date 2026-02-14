import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Star, Moon, Bell, Calendar } from 'lucide-react';
import { 
  hijriMonths, arabicDays, getCurrentHijriDate, getDaysInHijriMonth, isSacredMonth
} from '@/lib/hijriCalendar';
import { hasEvent, getEventsForDate, getUpcomingEvents, getEventTypeColor, getEventTypeLabel } from '@/lib/islamicEvents';
import { useLanguage } from '@/hooks/useLanguage';

const whiteDays = [13, 14, 15];

const HijriCalendarPage = () => {
  const navigate = useNavigate();
  const currentHijri = getCurrentHijriDate();
  const [selectedYear, setSelectedYear] = useState(currentHijri.year);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'year' | 'month'>('year');
  const { t, language } = useLanguage();
  
  const upcomingEvents = getUpcomingEvents(currentHijri.day, currentHijri.month, t);

  const handlePrevYear = () => setSelectedYear(prev => prev - 1);
  const handleNextYear = () => setSelectedYear(prev => prev + 1);
  const handlePrevMonth = () => {
    if (selectedMonth === 1) { setSelectedMonth(12); setSelectedYear(prev => prev - 1); }
    else { setSelectedMonth(prev => (prev || 1) - 1); }
  };
  const handleNextMonth = () => {
    if (selectedMonth === 12) { setSelectedMonth(1); setSelectedYear(prev => prev + 1); }
    else { setSelectedMonth(prev => (prev || 1) + 1); }
  };

  // Get month name with Arabic in parentheses for non-Arabic
  const getMonthDisplay = (month: number) => {
    const arName = hijriMonths[month - 1];
    const calendarKeys = [
      'muharram', 'safar', 'rabiAlAwwal', 'rabiAlThani', 'jumadaAlUla', 'jumadaAlThani',
      'rajab', 'shaban', 'ramadan', 'shawwal', 'dhuAlQidah', 'dhuAlHijjah'
    ] as const;
    const translatedName = t.calendar[calendarKeys[month - 1]];
    if (language === 'ar') return arName;
    return `${translatedName} (${arName})`;
  };

  const renderMonthCalendar = (month: number, compact: boolean = false) => {
    const daysInMonth = getDaysInHijriMonth(month, selectedYear);
    const isCurrentMonth = currentHijri.month === month && currentHijri.year === selectedYear;
    const isSacred = isSacredMonth(month);
    const firstDayOffset = ((month - 1) * 2 + selectedYear) % 7;
    
    const days = [];
    for (let i = 0; i < firstDayOffset; i++) {
      days.push(<div key={`empty-${i}`} className={compact ? "h-5" : "h-8"} />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && currentHijri.day === day;
      const isWhiteDay = whiteDays.includes(day);
      const dayHasEvent = hasEvent(day, month);
      const dayEvents = getEventsForDate(day, month, t);
      
      days.push(
        <div key={day} onClick={(e) => { if (dayHasEvent && dayEvents.length > 0) { e.stopPropagation(); navigate(`/islamic-event/${dayEvents[0].id}`); } }}
          className={`${compact ? "h-5 text-[10px]" : "h-8 text-sm"} flex items-center justify-center rounded-full font-cairo transition-colors relative
            ${isToday ? 'bg-primary text-primary-foreground font-bold' : ''}
            ${isWhiteDay && !isToday && !dayHasEvent ? 'bg-secondary/30 text-secondary-foreground ring-1 ring-secondary' : ''}
            ${dayHasEvent && !isToday ? 'bg-amber-500 text-white font-bold cursor-pointer hover:bg-amber-600' : ''}
            ${!isToday && !isWhiteDay && !dayHasEvent ? 'text-foreground hover:bg-muted' : ''}`}
        >
          {day}
          {dayHasEvent && !compact && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />}
        </div>
      );
    }

    return (
      <Card className={`border-0 shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg ${isSacred ? 'ring-2 ring-primary/50' : ''}`}
        onClick={() => { if (viewMode === 'year') { setSelectedMonth(month); setViewMode('month'); } }}>
        <div className={`${isSacred ? 'bg-primary' : 'bg-muted'} ${compact ? 'p-2' : 'p-3'} flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            {isSacred && <Star className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} fill-primary-foreground text-primary-foreground`} />}
            <span className={`font-amiri font-bold ${isSacred ? 'text-primary-foreground' : 'text-foreground'} ${compact ? 'text-sm' : 'text-lg'}`}>
              {compact ? hijriMonths[month - 1] : getMonthDisplay(month)}
            </span>
          </div>
          <span className={`font-cairo ${isSacred ? 'text-primary-foreground/80' : 'text-muted-foreground'} ${compact ? 'text-xs' : 'text-sm'}`}>{month}</span>
        </div>
        <CardContent className={compact ? "p-2" : "p-3"}>
          <div className="grid grid-cols-7 gap-1 mb-1">
            {arabicDays.map((day, index) => (
              <div key={index} className={`text-center text-muted-foreground font-cairo ${compact ? 'text-[8px]' : 'text-xs'}`}>
                {compact ? day.charAt(0) : day.slice(0, 3)}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">{days}</div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-4 animate-fade-in">
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex justify-center gap-2 mb-4">
            <Button variant={viewMode === 'year' ? 'default' : 'outline'} size="sm"
              onClick={() => { setViewMode('year'); setSelectedMonth(null); }} className="font-cairo">{t.calendar.year}</Button>
            <Button variant={viewMode === 'month' ? 'default' : 'outline'} size="sm"
              onClick={() => { setViewMode('month'); setSelectedMonth(selectedMonth || currentHijri.month); }} className="font-cairo">{t.calendar.month}</Button>
          </div>
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={viewMode === 'year' ? handlePrevYear : handlePrevMonth}><ChevronRight className="w-5 h-5" /></Button>
            <div className="text-center">
              <h2 className="text-2xl font-amiri font-bold text-primary">
                {viewMode === 'month' && selectedMonth ? getMonthDisplay(selectedMonth) + ' ' : ''}{selectedYear} {t.calendar.hijriYear}
              </h2>
            </div>
            <Button variant="ghost" size="icon" onClick={viewMode === 'year' ? handleNextYear : handleNextMonth}><ChevronLeft className="w-5 h-5" /></Button>
          </div>
        </CardContent>
      </Card>

      {upcomingEvents.length > 0 && (
        <Card className="border-0 shadow-md bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="w-5 h-5 text-amber-600" />
              <h3 className="font-amiri font-bold text-lg text-amber-800 dark:text-amber-200">{t.calendar.upcomingEvents}</h3>
            </div>
            <div className="space-y-2">
              {upcomingEvents.map(event => (
                <div key={event.id} onClick={() => navigate(`/islamic-event/${event.id}`)}
                  className="flex items-center justify-between p-3 bg-white/80 dark:bg-background/50 rounded-xl cursor-pointer hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`} />
                    <div>
                      <p className="font-cairo font-medium text-foreground">{event.name}</p>
                      <p className="text-xs text-muted-foreground font-cairo">{event.day} / {hijriMonths[event.month - 1]}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full text-white ${getEventTypeColor(event.type)}`}>{getEventTypeLabel(event.type, t)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap justify-center gap-3 text-sm font-cairo">
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-primary" /><span>{t.calendar.currentDay}</span></div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-secondary/30 ring-1 ring-secondary" /><span>{t.calendar.whiteDays}</span></div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-amber-500" /><span>{t.calendar.islamicEvent}</span></div>
        <div className="flex items-center gap-2"><Star className="w-4 h-4 fill-primary text-primary" /><span>{t.calendar.sacredMonth}</span></div>
      </div>

      {viewMode === 'year' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (<div key={month}>{renderMonthCalendar(month, true)}</div>))}
        </div>
      ) : (selectedMonth && renderMonthCalendar(selectedMonth, false))}

      <Card className="border-0 shadow-md bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Moon className="w-5 h-5 text-primary" />
            <h3 className="font-amiri font-bold text-lg">{t.calendar.sacredMonths}</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm font-cairo text-muted-foreground">
            <div>• {getMonthDisplay(1)} ({t.calendar.monthNum} 1)</div>
            <div>• {getMonthDisplay(7)} ({t.calendar.monthNum} 7)</div>
            <div>• {getMonthDisplay(11)} ({t.calendar.monthNum} 11)</div>
            <div>• {getMonthDisplay(12)} ({t.calendar.monthNum} 12)</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HijriCalendarPage;

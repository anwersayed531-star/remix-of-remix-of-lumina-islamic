import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getTranslatedEvents, getEventTypeLabel, getEventTypeColor } from '@/lib/islamicEvents';
import { Calendar, BookOpen, Star, Heart, ArrowRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const IslamicEventPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { t, direction } = useLanguage();
  
  const translatedEvents = getTranslatedEvents(t);
  const event = translatedEvents.find(e => e.id === eventId);
  
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-muted-foreground font-cairo">{t.islamicEvent.eventNotFound}</p>
        <Button onClick={() => navigate('/hijri-calendar')} className="mt-4">{t.islamicEvent.backToCalendar}</Button>
      </div>
    );
  }

  const typeLabel = getEventTypeLabel(event.type, t);
  const typeColor = getEventTypeColor(event.type);

  return (
    <div className="container mx-auto px-4 py-6 space-y-4 animate-fade-in">
      <Card className="border-0 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-l from-primary to-primary/80 p-6 text-primary-foreground">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-cairo text-white ${typeColor}`}>{typeLabel}</div>
              <h1 className="text-2xl font-amiri font-bold">{event.name}</h1>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Calendar className="w-4 h-4" />
                <span className="font-cairo text-sm">
                  {event.endDay 
                    ? `${event.day} - ${event.endDay} / ${t.islamicEvent.month} ${event.month}`
                    : `${event.day} / ${t.islamicEvent.month} ${event.month}`}
                </span>
              </div>
            </div>
            <div className="p-3 bg-primary-foreground/20 rounded-xl"><Star className="w-8 h-8" /></div>
          </div>
        </div>
        <CardContent className="p-6 space-y-4">
          <p className="text-foreground font-cairo leading-relaxed text-lg">{event.fullDescription}</p>
        </CardContent>
      </Card>

      {event.practices && event.practices.length > 0 && (
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg"><BookOpen className="w-5 h-5 text-primary" /></div>
              <h2 className="font-amiri font-bold text-xl text-primary">{t.islamicEvent.practices}</h2>
            </div>
            <ul className="space-y-3">
              {event.practices.map((practice, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="font-cairo text-foreground">{practice}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {event.duaOrDhikr && (
        <Card className="border-0 shadow-md bg-gradient-to-br from-secondary/20 to-secondary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-secondary/20 rounded-lg"><Heart className="w-5 h-5 text-secondary-foreground" /></div>
              <h2 className="font-amiri font-bold text-xl">{t.islamicEvent.duaOrDhikr}</h2>
            </div>
            <div className="p-4 bg-background rounded-xl border border-secondary/20">
              <p className="font-amiri text-xl text-center leading-loose text-foreground">{event.duaOrDhikr}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {event.quranVerses && event.quranVerses.length > 0 && (
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg"><BookOpen className="w-5 h-5 text-primary" /></div>
              <h2 className="font-amiri font-bold text-xl text-primary">{t.islamicEvent.quranVerses}</h2>
            </div>
            <div className="space-y-4">
              {event.quranVerses.map((verse, index) => (
                <div key={index} className="p-4 bg-islamic-light rounded-xl border border-primary/20">
                  <p className="font-amiri text-xl leading-loose text-foreground text-center mb-3">{verse.text}</p>
                  <p className="text-center text-muted-foreground font-cairo text-sm">
                    {t.islamicEvent.surah} {verse.surah} - {t.islamicEvent.verse} {verse.verse}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Button variant="outline" onClick={() => navigate('/hijri-calendar')} className="w-full font-cairo">
        {direction === 'rtl' ? <ArrowRight className="w-4 h-4 ml-2" /> : <ChevronLeft className="w-4 h-4 mr-2" />}
        {t.islamicEvent.backToCalendar}
      </Button>
    </div>
  );
};

export default IslamicEventPage;

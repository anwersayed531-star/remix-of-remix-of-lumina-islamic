// Islamic Special Events and Dates

export interface IslamicEvent {
  id: string;
  name: string;
  day: number;
  month: number;
  endDay?: number; // للأحداث التي تمتد لعدة أيام
  description: string;
  fullDescription: string;
  type: 'holiday' | 'fasting' | 'special' | 'worship';
  practices?: string[];
  duaOrDhikr?: string;
  quranVerses?: { surah: string; verse: string; text: string }[];
}

// Event ID to translation key mapping
const eventKeyMap: Record<string, string> = {
  'new-year': 'newYear',
  'ashura': 'ashura',
  'mawlid': 'mawlid',
  'isra-miraj': 'israMiraj',
  'nisf-shaban': 'nisfShaban',
  'ramadan-start': 'ramadanStart',
  'last-ten': 'lastTen',
  'eid-fitr': 'eidFitr',
  'arafah': 'arafah',
  'eid-adha': 'eidAdha',
};

// Static event data (dates, types, Quran verses, duas - never translated)
interface EventStaticData {
  id: string;
  day: number;
  month: number;
  endDay?: number;
  type: IslamicEvent['type'];
  duaOrDhikr?: string;
  quranVerses?: { surah: string; verse: string; text: string }[];
}

const eventsStaticData: EventStaticData[] = [
  { id: 'new-year', day: 1, month: 1, type: 'special' },
  { id: 'ashura', day: 10, month: 1, type: 'fasting' },
  { id: 'mawlid', day: 12, month: 3, type: 'special', duaOrDhikr: 'اللهم صلِّ وسلم على سيدنا محمد وعلى آله وصحبه أجمعين' },
  { id: 'isra-miraj', day: 27, month: 7, type: 'worship', duaOrDhikr: 'اللهم صلِّ وسلم على سيدنا محمد وعلى آله وصحبه أجمعين',
    quranVerses: [{ surah: 'الإسراء', verse: '1', text: 'سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى الَّذِي بَارَكْنَا حَوْلَهُ لِنُرِيَهُ مِنْ آيَاتِنَا ۚ إِنَّهُ هُوَ السَّمِيعُ الْبَصِيرُ' }] },
  { id: 'nisf-shaban', day: 15, month: 8, type: 'worship',
    quranVerses: [{ surah: 'البقرة', verse: '144', text: 'قَدْ نَرَىٰ تَقَلُّبَ وَجْهِكَ فِي السَّمَاءِ ۖ فَلَنُوَلِّيَنَّكَ قِبْلَةً تَرْضَاهَا ۚ فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ ۚ وَحَيْثُ مَا كُنتُمْ فَوَلُّوا وُجُوهَكُمْ شَطْرَهُ' }] },
  { id: 'ramadan-start', day: 1, month: 9, type: 'fasting',
    quranVerses: [{ surah: 'البقرة', verse: '185', text: 'شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ وَبَيِّنَاتٍ مِّنَ الْهُدَىٰ وَالْفُرْقَانِ' }] },
  { id: 'last-ten', day: 21, month: 9, endDay: 29, type: 'worship', duaOrDhikr: 'اللهم إنك عفو تحب العفو فاعف عني',
    quranVerses: [{ surah: 'القدر', verse: '1-3', text: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ ۝ وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ ۝ لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ' }] },
  { id: 'eid-fitr', day: 1, month: 10, type: 'holiday', duaOrDhikr: 'الله أكبر الله أكبر لا إله إلا الله، الله أكبر الله أكبر ولله الحمد' },
  { id: 'arafah', day: 9, month: 12, type: 'fasting', duaOrDhikr: 'لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير' },
  { id: 'eid-adha', day: 10, month: 12, endDay: 13, type: 'holiday', duaOrDhikr: 'الله أكبر الله أكبر لا إله إلا الله، الله أكبر الله أكبر ولله الحمد' },
];

// For backward compat - default Arabic events
// Default Arabic fallback events (used when no translation object is passed)
import { ar } from '@/lib/translations/ar';
export const islamicEvents: IslamicEvent[] = eventsStaticData.map(s => {
  const key = eventKeyMap[s.id] as keyof typeof ar.islamicEvent.events;
  const eventT = ar.islamicEvent.events[key];
  return { ...s, name: eventT.name, description: eventT.description, fullDescription: eventT.fullDescription, practices: eventT.practices };
});

// Get translated events using translation object
export const getTranslatedEvents = (t: any): IslamicEvent[] => {
  return eventsStaticData.map(s => {
    const key = eventKeyMap[s.id];
    const eventT = t.islamicEvent?.events?.[key];
    if (!eventT) {
      return { ...s, name: s.id, description: '', fullDescription: '', practices: [] };
    }
    return { ...s, name: eventT.name, description: eventT.description, fullDescription: eventT.fullDescription, practices: eventT.practices };
  });
};

// Get events for a specific date
export const getEventsForDate = (day: number, month: number, t?: any): IslamicEvent[] => {
  const events = t ? getTranslatedEvents(t) : islamicEvents;
  return events.filter(event => {
    if (event.endDay) {
      return event.month === month && day >= event.day && day <= event.endDay;
    }
    return event.day === day && event.month === month;
  });
};

// Get all events for a month
export const getEventsForMonth = (month: number, t?: any): IslamicEvent[] => {
  const events = t ? getTranslatedEvents(t) : islamicEvents;
  return events.filter(event => event.month === month);
};

// Check if date has event
export const hasEvent = (day: number, month: number): boolean => {
  return eventsStaticData.some(event => {
    if (event.endDay) {
      return event.month === month && day >= event.day && day <= event.endDay;
    }
    return event.day === day && event.month === month;
  });
};

// Get event ID for a date (for navigation)
export const getEventIdForDate = (day: number, month: number): string | undefined => {
  const event = eventsStaticData.find(e => {
    if (e.endDay) return e.month === month && day >= e.day && day <= e.endDay;
    return e.day === day && e.month === month;
  });
  return event?.id;
};

// Get upcoming events
export const getUpcomingEvents = (currentDay: number, currentMonth: number, t?: any): IslamicEvent[] => {
  const upcoming: IslamicEvent[] = [];
  
  for (let m = currentMonth; m <= Math.min(currentMonth + 1, 12); m++) {
    const events = getEventsForMonth(m, t);
    events.forEach(event => {
      if (m === currentMonth && event.day >= currentDay) {
        upcoming.push(event);
      } else if (m > currentMonth) {
        upcoming.push(event);
      }
    });
  }
  
  return upcoming.slice(0, 5);
};

// Get event type color
export const getEventTypeColor = (type: IslamicEvent['type']): string => {
  switch (type) {
    case 'holiday': return 'bg-green-500';
    case 'fasting': return 'bg-amber-500';
    case 'special': return 'bg-blue-500';
    case 'worship': return 'bg-purple-500';
    default: return 'bg-primary';
  }
};

export const getEventTypeLabel = (type: IslamicEvent['type'], t?: any): string => {
  if (t?.islamicEvent) {
    switch (type) {
      case 'holiday': return t.islamicEvent.typeHoliday || 'عيد';
      case 'fasting': return t.islamicEvent.typeFasting || 'صيام';
      case 'special': return t.islamicEvent.typeSpecial || 'مناسبة';
      case 'worship': return t.islamicEvent.typeWorship || 'عبادة';
      default: return '';
    }
  }
  switch (type) {
    case 'holiday': return 'عيد';
    case 'fasting': return 'صيام';
    case 'special': return 'مناسبة';
    case 'worship': return 'عبادة';
    default: return '';
  }
};

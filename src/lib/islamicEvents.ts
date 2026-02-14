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

export const islamicEvents: IslamicEvent[] = [
  {
    id: 'new-year',
    name: 'رأس السنة الهجرية',
    day: 1,
    month: 1,
    description: 'بداية العام الهجري الجديد',
    fullDescription: 'يوم 1 محرم هو بداية السنة الهجرية الجديدة، وهو تذكير بهجرة النبي ﷺ من مكة إلى المدينة.',
    type: 'special',
    practices: [
      'التفكر في العام الماضي والتوبة',
      'وضع نوايا صالحة للعام الجديد',
      'الدعاء بالخير والبركة'
    ]
  },
  {
    id: 'ashura',
    name: 'يوم عاشوراء',
    day: 10,
    month: 1,
    description: 'صيام يوم عاشوراء (ويُستحب صيام 9 معه)',
    fullDescription: 'يوم عاشوراء هو اليوم العاشر من محرم، وهو يوم نجّى الله فيه موسى عليه السلام وقومه من فرعون. صيامه يكفر سنة ماضية.',
    type: 'fasting',
    practices: [
      'صيام يوم التاسع والعاشر من محرم',
      'الإكثار من الذكر والدعاء',
      'الصدقة والإحسان'
    ]
  },
  {
    id: 'mawlid',
    name: 'المولد النبوي الشريف',
    day: 12,
    month: 3,
    description: 'ذكرى مولد الرسول ﷺ',
    fullDescription: 'يوم 12 ربيع الأول هو ذكرى مولد سيدنا محمد ﷺ، وهو مناسبة للتذكير بسيرته العطرة وأخلاقه الكريمة.',
    type: 'special',
    practices: [
      'الصلاة على النبي ﷺ ألف مرة على الأقل',
      'قراءة السيرة النبوية',
      'التعلم من أخلاق النبي ﷺ'
    ],
    duaOrDhikr: 'اللهم صلِّ وسلم على سيدنا محمد وعلى آله وصحبه أجمعين'
  },
  {
    id: 'isra-miraj',
    name: 'الإسراء والمعراج',
    day: 27,
    month: 7,
    description: 'من الليالي المباركة والمميزة',
    fullDescription: 'ليلة الإسراء والمعراج هي الليلة التي أُسري فيها بالنبي ﷺ من المسجد الحرام إلى المسجد الأقصى، ثم عُرج به إلى السماوات العلا.',
    type: 'worship',
    practices: [
      'الصلاة على النبي ﷺ ألف مرة',
      'صلاة ركعتين لله تعالى على الأقل',
      'قراءة سورة الإسراء',
      'التفكر في معجزات الله'
    ],
    duaOrDhikr: 'اللهم صلِّ وسلم على سيدنا محمد وعلى آله وصحبه أجمعين',
    quranVerses: [
      {
        surah: 'الإسراء',
        verse: '1',
        text: 'سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى الَّذِي بَارَكْنَا حَوْلَهُ لِنُرِيَهُ مِنْ آيَاتِنَا ۚ إِنَّهُ هُوَ السَّمِيعُ الْبَصِيرُ'
      }
    ]
  },
  {
    id: 'nisf-shaban',
    name: 'ليلة النصف من شعبان',
    day: 15,
    month: 8,
    description: 'ليلة تحويل القبلة ولها مكانة خاصة',
    fullDescription: 'ليلة النصف من شعبان هي ليلة مباركة، وفيها حُوِّلت القبلة من بيت المقدس إلى الكعبة المشرفة. كان المسلمون يصلون تجاه المسجد الأقصى حتى نزلت الآية الكريمة.',
    type: 'worship',
    practices: [
      'الإكثار من الدعاء والاستغفار',
      'قيام الليل',
      'التفكر في قصة تحويل القبلة'
    ],
    quranVerses: [
      {
        surah: 'البقرة',
        verse: '144',
        text: 'قَدْ نَرَىٰ تَقَلُّبَ وَجْهِكَ فِي السَّمَاءِ ۖ فَلَنُوَلِّيَنَّكَ قِبْلَةً تَرْضَاهَا ۚ فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ ۚ وَحَيْثُ مَا كُنتُمْ فَوَلُّوا وُجُوهَكُمْ شَطْرَهُ'
      }
    ]
  },
  {
    id: 'ramadan-start',
    name: 'بداية شهر رمضان',
    day: 1,
    month: 9,
    description: 'شهر الصيام والقرآن',
    fullDescription: 'شهر رمضان المبارك هو شهر الصيام والقيام وتلاوة القرآن، فيه أُنزل القرآن الكريم هدى للناس.',
    type: 'fasting',
    practices: [
      'صيام الشهر كاملاً',
      'قراءة القرآن وختمه',
      'صلاة التراويح',
      'الإكثار من الصدقة'
    ],
    quranVerses: [
      {
        surah: 'البقرة',
        verse: '185',
        text: 'شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ وَبَيِّنَاتٍ مِّنَ الْهُدَىٰ وَالْفُرْقَانِ'
      }
    ]
  },
  {
    id: 'last-ten',
    name: 'ليالي العشر الأواخر',
    day: 21,
    month: 9,
    endDay: 29,
    description: 'تحري ليلة القدر في الأيام الوترية',
    fullDescription: 'العشر الأواخر من رمضان فيها ليلة القدر التي هي خير من ألف شهر. كان النبي ﷺ يجتهد فيها ما لا يجتهد في غيرها.',
    type: 'worship',
    practices: [
      'قيام الليل في الأيام الوترية (21، 23، 25، 27، 29)',
      'الاعتكاف في المسجد',
      'الإكثار من الدعاء والذكر',
      'تلاوة القرآن'
    ],
    duaOrDhikr: 'اللهم إنك عفو تحب العفو فاعف عني',
    quranVerses: [
      {
        surah: 'القدر',
        verse: '1-3',
        text: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ ۝ وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ ۝ لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ'
      }
    ]
  },
  {
    id: 'eid-fitr',
    name: 'عيد الفطر المبارك',
    day: 1,
    month: 10,
    description: 'فرحة الصائم والتكبيرات',
    fullDescription: 'عيد الفطر هو يوم الفرحة بعد صيام شهر رمضان، وهو يوم شكر الله على نعمة إتمام الصيام.',
    type: 'holiday',
    practices: [
      'التكبير من ليلة العيد حتى صلاة العيد',
      'صلاة العيد',
      'زكاة الفطر قبل الصلاة',
      'صلة الأرحام وزيارة الأقارب'
    ],
    duaOrDhikr: 'الله أكبر الله أكبر لا إله إلا الله، الله أكبر الله أكبر ولله الحمد'
  },
  {
    id: 'arafah',
    name: 'يوم عرفة',
    day: 9,
    month: 12,
    description: 'أفضل يوم لغير الحاج، صيامه يكفر سنتين',
    fullDescription: 'يوم عرفة هو اليوم التاسع من ذي الحجة، وهو أفضل يوم طلعت فيه الشمس. صيامه لغير الحاج يكفر سنة ماضية وسنة قادمة.',
    type: 'fasting',
    practices: [
      'صيام يوم عرفة لغير الحاج',
      'الإكثار من الذكر والدعاء',
      'التوبة والاستغفار'
    ],
    duaOrDhikr: 'لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير'
  },
  {
    id: 'eid-adha',
    name: 'عيد الأضحى المبارك',
    day: 10,
    month: 12,
    endDay: 13,
    description: 'يوم النحر وأيام التشريق',
    fullDescription: 'عيد الأضحى هو يوم النحر (10 ذي الحجة) وتليه أيام التشريق (11، 12، 13). وهي أيام أكل وشرب وذكر لله تعالى.',
    type: 'holiday',
    practices: [
      'التكبير في أيام التشريق',
      'صلاة العيد',
      'ذبح الأضحية',
      'صلة الأرحام'
    ],
    duaOrDhikr: 'الله أكبر الله أكبر لا إله إلا الله، الله أكبر الله أكبر ولله الحمد'
  }
];

// Get events for a specific date
export const getEventsForDate = (day: number, month: number): IslamicEvent[] => {
  return islamicEvents.filter(event => {
    if (event.endDay) {
      return event.month === month && day >= event.day && day <= event.endDay;
    }
    return event.day === day && event.month === month;
  });
};

// Get all events for a month
export const getEventsForMonth = (month: number): IslamicEvent[] => {
  return islamicEvents.filter(event => event.month === month);
};

// Check if date has event
export const hasEvent = (day: number, month: number): boolean => {
  return getEventsForDate(day, month).length > 0;
};

// Get upcoming events (within next 30 days approximately)
export const getUpcomingEvents = (currentDay: number, currentMonth: number): IslamicEvent[] => {
  const upcoming: IslamicEvent[] = [];
  
  // Check current month and next month
  for (let m = currentMonth; m <= Math.min(currentMonth + 1, 12); m++) {
    const events = getEventsForMonth(m);
    events.forEach(event => {
      if (m === currentMonth && event.day >= currentDay) {
        upcoming.push(event);
      } else if (m > currentMonth) {
        upcoming.push(event);
      }
    });
  }
  
  return upcoming.slice(0, 5); // Return max 5 upcoming events
};

// Get event type color
export const getEventTypeColor = (type: IslamicEvent['type']): string => {
  switch (type) {
    case 'holiday':
      return 'bg-green-500';
    case 'fasting':
      return 'bg-amber-500';
    case 'special':
      return 'bg-blue-500';
    case 'worship':
      return 'bg-purple-500';
    default:
      return 'bg-primary';
  }
};

export const getEventTypeLabel = (type: IslamicEvent['type']): string => {
  switch (type) {
    case 'holiday':
      return 'عيد';
    case 'fasting':
      return 'صيام';
    case 'special':
      return 'مناسبة';
    case 'worship':
      return 'عبادة';
    default:
      return '';
  }
};

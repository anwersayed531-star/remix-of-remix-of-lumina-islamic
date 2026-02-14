// Prayer Details - Rakaat counts for Fard and Sunnah

export interface PrayerDetail {
  id: string;
  name: string;
  arabicName: string;
  fardRakaat: number;
  sunnahBefore: number;
  sunnahAfter: number;
  description: string;
  virtues: string[];
}

export const prayerDetails: Record<string, PrayerDetail> = {
  fajr: {
    id: 'fajr',
    name: 'Fajr',
    arabicName: 'الفجر',
    fardRakaat: 2,
    sunnahBefore: 2,
    sunnahAfter: 0,
    description: 'صلاة الفجر هي أول صلوات اليوم، تُصلى قبل طلوع الشمس.',
    virtues: [
      'من صلى الفجر في جماعة فهو في ذمة الله',
      'ركعتا الفجر خير من الدنيا وما فيها',
      'من صلى البردين دخل الجنة'
    ]
  },
  dhuhr: {
    id: 'dhuhr',
    name: 'Dhuhr',
    arabicName: 'الظهر',
    fardRakaat: 4,
    sunnahBefore: 4,
    sunnahAfter: 2,
    description: 'صلاة الظهر تُصلى بعد زوال الشمس عن وسط السماء.',
    virtues: [
      'من حافظ على أربع ركعات قبل الظهر وأربع بعدها حرمه الله على النار',
      'أفضل الصلاة عند الله صلاة الظهر'
    ]
  },
  asr: {
    id: 'asr',
    name: 'Asr',
    arabicName: 'العصر',
    fardRakaat: 4,
    sunnahBefore: 4,
    sunnahAfter: 0,
    description: 'صلاة العصر هي الصلاة الوسطى المذكورة في القرآن.',
    virtues: [
      'حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ',
      'من ترك صلاة العصر فقد حبط عمله',
      'من صلى البردين دخل الجنة'
    ]
  },
  maghrib: {
    id: 'maghrib',
    name: 'Maghrib',
    arabicName: 'المغرب',
    fardRakaat: 3,
    sunnahBefore: 0,
    sunnahAfter: 2,
    description: 'صلاة المغرب تُصلى مباشرة بعد غروب الشمس.',
    virtues: [
      'صلاة المغرب وتر النهار',
      'من صلى قبل المغرب ركعتين كان له أجر عظيم'
    ]
  },
  isha: {
    id: 'isha',
    name: 'Isha',
    arabicName: 'العشاء',
    fardRakaat: 4,
    sunnahBefore: 0,
    sunnahAfter: 2,
    description: 'صلاة العشاء آخر صلوات اليوم، ويُستحب بعدها صلاة الوتر.',
    virtues: [
      'من صلى العشاء في جماعة فكأنما قام نصف الليل',
      'صلاة الوتر حق على كل مسلم'
    ]
  }
};

export const getPrayerById = (id: string): PrayerDetail | undefined => {
  return prayerDetails[id];
};

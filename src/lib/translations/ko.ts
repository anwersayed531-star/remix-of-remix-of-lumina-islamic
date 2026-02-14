// Korean Translation
import type { TranslationKeys } from './ar';

export const ko: TranslationKeys = {
  app: { name: 'Islami', tagline: '당신의 이슬람 동반자' },
  nav: { home: '홈', quran: '꾸란', hadith: '하디스', rulings: '율법', sound: '오디오', counters: '카운터', settings: '설정' },
  home: { prayerTimes: '예배 시간', nextPrayer: '다음 예배', hijriCalendar: '히즈리 달력', today: '오늘', fajr: '파즈르', sunrise: '일출', dhuhr: '두흐르', asr: '아스르', maghrib: '마그립', isha: '이샤' },
  counters: { title: '카운터', dhikr: '지크르', tasbeeh: '타스비흐', preparations: '준비', selectDhikr: '지크르 선택', count: '세기', reset: '초기화', target: '목표' },
  settings: { title: '설정', theme: '테마', light: '밝게', dark: '어둡게', auto: '자동', primaryColor: '기본 색상', fontSize: '글꼴 크기', fontFamily: '글꼴', background: '배경 스타일', navPosition: '내비게이션 위치', bottom: '하단', right: '오른쪽', left: '왼쪽', borderRadius: '모서리 반경', spacing: '간격', fontWeight: '글꼴 굵기', lineHeight: '줄 높이', letterSpacing: '글자 간격', animations: '애니메이션', highContrast: '높은 대비', colorBlind: '색맹 설정', reset: '초기화', language: '언어', selectLanguage: '언어 선택' },
  colors: { green: '이슬람 녹색', gold: '금색', blue: '파란색', purple: '보라색', red: '빨간색', teal: '청록색', orange: '주황색', pink: '분홍색', indigo: '남색', brown: '갈색' },
  fontSizes: { xsmall: '매우 작게', small: '작게', medium: '보통', large: '크게', xlarge: '매우 크게', xxlarge: '최대' },
  colorBlind: { none: '정상', protanopia: '적색맹', deuteranopia: '녹색맹', tritanopia: '청색맹' },
  common: { loading: '로딩 중...', error: '오류가 발생했습니다', retry: '재시도', save: '저장', cancel: '취소', confirm: '확인', back: '뒤로', next: '다음', previous: '이전', search: '검색', notFound: '찾을 수 없음', comingSoon: '곧 출시' },
  calendar: { year: '년', month: '월', sacredMonth: '신성한 달', whiteDays: '백일', islamicEvent: '이슬람 행사', currentDay: '오늘', upcomingEvents: '다가오는 행사', sacredMonths: '신성한 달들', tapFullCalendar: '전체 히즈리 달력 보기', gregorianDate: '양력 날짜', hijriYear: '히즈리', muharram: '무하람', safar: '사파르', rabiAlAwwal: '라비 알아왈', rabiAlThani: '라비 앗사니', jumadaAlUla: '주마다 알울라', jumadaAlThani: '주마다 앗사니야', rajab: '라잡', shaban: '샤반', ramadan: '라마단', shawwal: '샤왈', dhuAlQidah: '줄키다', dhuAlHijjah: '줄히자', monthNum: '월' },
  quran: { title: '거룩한 꾸란', searchPlaceholder: '수라 또는 구절 검색...', bookmarks: '북마크', lastRead: '마지막 읽은 곳', comingSoon: '곧 출시', contentComingSoon: '꾸란 내용이 여기에 추가됩니다' },
  hadith: { title: '하디스', searchPlaceholder: '하디스 검색...', sahihBukhari: '사히흐 알부카리', sahihMuslim: '사히흐 무슬림', comingSoon: '곧 출시', contentComingSoon: '예언자ﷺ의 하디스가 여기에 추가됩니다' },
  sound: { title: '낭독', selectReciter: '낭독자 선택', reciters: '낭독자', recitations: '꾸란 낭독', murattal: '무랏탈', mujawwad: '무자와드' },
  rulings: { title: '율법', searchPlaceholder: '율법 검색...', prayerRulings: '예배 율법', fastingRulings: '단식 율법', zakatRulings: '자카트 율법', hajjRulings: '하즈 율법', breastfeedingRulings: '수유 율법', purificationRulings: '정화 율법', comingSoon: '곧 출시' },
  dhikr: { currentDhikr: '현재 지크르', tapToCount: '탭하여 세기', resetCount: '카운터 초기화', dhikrNotFound: '지크르를 찾을 수 없습니다', backToSelection: '지크르 선택으로 돌아가기', tasbeehah: '회', subhanallah: '수브한알라', alhamdulillah: '알함두릴라', allahuakbar: '알라후 아크바르', lailaha: '라 일라하 일랄라', astaghfirullah: '아스타그피룰라', lahawla: '라 하울라 왈라 쿠와타 일라 빌라', subhanallahwabihamdi: '수브한알라히 와 비함디히', salawat: '예언자ﷺ에 대한 축복', descSubhanallah: '알라를 찬미함', descAlhamdulillah: '알라를 찬양함', descAllahuakbar: '알라를 위대히 여김', descLailaha: '신앙 고백', descAstaghfirullah: '용서 구함', descLahawla: '신뢰의 선언', descSubhanallahwabihamdi: '혀에 가벼운 두 마디', descSalawat: '오 알라, 우리의 예언자 무함마드를 축복하소서' },
  tasbeeh: { title: '타스비흐 페이지', morningAdhkar: '아침 아즈카르', eveningAdhkar: '저녁 아즈카르', sleepAdhkar: '수면 아즈카르', variousAdhkar: '다양한 아즈카르', adhkarCount: '개', resetAll: '모든 카운터 초기화', done: '완료 ✓', morningEveningAdhkar: '아침, 저녁 및 수면 아즈카르', customizeSettings: '색상, 글꼴 및 인터페이스 사용자 지정' },
  preparations: { title: '준비', quranLearning: '거룩한 꾸란', quranLearningDesc: '꾸란과 타즈위드 배우기', breastfeedingRulings: '수유 율법', breastfeedingDesc: '수유에 관한 피크흐 율법', threeDContent: '3D 콘텐츠', threeDDesc: '대화형 교육 콘텐츠', interactiveMap: '대화형 지도', interactiveMapDesc: '이슬람 세계 탐험', mapInfo: '각 국가에 대한 정보가 포함된 이슬람 세계 대화형 지도가 추가됩니다', comingSoon: '곧 출시' },
  prayerDetail: { prayer: '예배', rakaat: '라카트', fard: '의무', sunnahBefore: '전 순나', sunnahAfter: '후 순나', completed: '완료', required: '필수', addRakaat: '라카 추가', completedLabel: '완료', virtues: '미덕', resetCount: '카운터 초기화', prayerNotFound: '예배를 찾을 수 없습니다', backToHome: '홈으로 돌아가기' },
  islamicEvent: {
    practices: '권장 실천', duaOrDhikr: '두아 또는 지크르', quranVerses: '꾸란 구절', surah: '수라', verse: '절', backToCalendar: '달력으로 돌아가기', eventNotFound: '행사를 찾을 수 없습니다', month: '월', typeHoliday: '축일', typeFasting: '단식', typeSpecial: '특별', typeWorship: '예배',
    events: {
      newYear: { name: '이슬람 새해', description: '히즈리 새해 시작', fullDescription: '무하람 1일은 새 이슬람 해의 시작을 알립니다.', practices: ['지난 해를 반성하고 회개하기', '새해를 위한 경건한 의도 세우기', '선과 축복을 위해 기도하기'] },
      ashura: { name: '아슈라의 날', description: '아슈라 단식 (9일에도 단식 권장)', fullDescription: '아슈라는 무하람 10일로, 알라께서 무사와 그의 백성을 파라오로부터 구원한 날입니다.', practices: ['무하람 9일과 10일 단식', '지크르와 두아 늘리기', '자선하기'] },
      mawlid: { name: '예언자 탄신일', description: '예언자ﷺ 탄생 기념', fullDescription: '라비 알아왈 12일은 예언자 무함마드ﷺ의 탄생을 기념합니다.', practices: ['예언자ﷺ에게 많은 축복 보내기', '예언자의 전기 읽기', '예언자ﷺ의 성품에서 배우기'] },
      israMiraj: { name: '이스라와 미라즈', description: '축복받고 특별한 밤', fullDescription: '밤의 여행과 승천은 예언자ﷺ가 성원에서 알아크사 사원으로 옮겨진 것입니다.', practices: ['예언자ﷺ에게 많은 축복 보내기', '최소 두 라카트 기도', '이스라 수라 읽기', '알라의 기적에 대해 묵상하기'] },
      nisfShaban: { name: '샤반 중순의 밤', description: '키블라 변경의 밤', fullDescription: '샤반 중순의 밤은 키블라가 예루살렘에서 카바로 변경된 축복받은 밤입니다.', practices: ['두아와 이스티그파르 늘리기', '키얌 알라일 기도', '키블라 변경 이야기 묵상하기'] },
      ramadanStart: { name: '라마단 시작', description: '단식과 꾸란의 달', fullDescription: '축복받은 라마단 달은 단식, 기도, 꾸란 낭독의 달입니다.', practices: ['한 달 내내 단식', '꾸란 읽고 완독하기', '타라위흐 기도', '자선 늘리기'] },
      lastTen: { name: '마지막 열 밤', description: '홀수 밤에 라일라툴 까드르 찾기', fullDescription: '라마단의 마지막 열 밤에는 천 달보다 나은 라일라툴 까드르가 있습니다.', practices: ['홀수 밤(21, 23, 25, 27, 29)에 키얌 기도', '모스크에서 이티카프', '두아와 지크르 늘리기', '꾸란 낭독'] },
      eidFitr: { name: '이드 알피트르', description: '단식자의 기쁨과 타크비라트', fullDescription: '이드 알피트르는 라마단 단식 후의 기쁨의 날입니다.', practices: ['이드 전야부터 이드 기도까지 타크비라트 낭독', '이드 기도 수행', '기도 전 자카트 알피트르 납부', '친척 방문'] },
      arafah: { name: '아라파의 날', description: '비순례자를 위한 최고의 날, 단식이 2년을 속죄', fullDescription: '아라파의 날은 줄히자 9일로, 해가 뜬 최고의 날입니다.', practices: ['아라파의 날 단식 (비순례자)', '지크르와 두아 늘리기', '회개하고 용서 구하기'] },
      eidAdha: { name: '이드 알아드하', description: '희생의 날과 타슈리크 일', fullDescription: '이드 알아드하는 희생의 날(줄히자 10일)이며 타슈리크 일이 이어집니다.', practices: ['타슈리크 일에 타크비라트 낭독', '이드 기도 수행', '희생 제물 바치기', '가족 유대 유지'] },
    },
  },
};

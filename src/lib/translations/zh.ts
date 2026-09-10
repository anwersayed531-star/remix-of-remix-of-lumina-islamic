// Chinese Translation
import type { TranslationKeys } from './ar';

export const zh: TranslationKeys = {
  app: { name: 'Islami', tagline: '您的伊斯兰伴侣' },
  nav: { home: '首页', quran: '古兰经', hadith: '圣训', rulings: '教法', sound: '音频', counters: '计数器', settings: '设置' },
  home: { prayerTimes: '礼拜时间', nextPrayer: '下次礼拜', hijriCalendar: '伊历日历', today: '今天', fajr: '晨礼', sunrise: '日出', dhuhr: '晌礼', asr: '晡礼', maghrib: '昏礼', isha: '宵礼' },
  counters: { title: '计数器', dhikr: '赞念', tasbeeh: '赞颂', preparations: '准备', selectDhikr: '选择赞念', count: '计数', reset: '重置', target: '目标' },
  settings: { title: '设置', theme: '主题', light: '浅色', dark: '深色', auto: '自动', primaryColor: '主色', fontSize: '字号', fontFamily: '字体', background: '背景样式', navPosition: '导航位置', bottom: '底部', right: '右侧', left: '左侧', borderRadius: '圆角', spacing: '间距', fontWeight: '字重', lineHeight: '行高', letterSpacing: '字间距', animations: '动画', highContrast: '高对比度', colorBlind: '色盲模式', reset: '重置', language: '语言', selectLanguage: '选择语言' },
  colors: { green: '伊斯兰绿', gold: '金色', blue: '蓝色', purple: '紫色', red: '红色', teal: '青色', orange: '橙色', pink: '粉色', indigo: '靛蓝', brown: '棕色' },
  fontSizes: { xsmall: '特小', small: '小', medium: '中', large: '大', xlarge: '特大', xxlarge: '巨大' },
  colorBlind: { none: '正常', protanopia: '红色盲', deuteranopia: '绿色盲', tritanopia: '蓝色盲' },
  common: { loading: '加载中...', error: '发生错误', retry: '重试', save: '保存', cancel: '取消', confirm: '确认', back: '返回', next: '下一个', previous: '上一个', search: '搜索', notFound: '未找到', comingSoon: '即将推出' },
  calendar: { year: '年', month: '月', sacredMonth: '神圣月份', whiteDays: '白昼日', islamicEvent: '伊斯兰事件', currentDay: '当前日', upcomingEvents: '即将到来的事件', sacredMonths: '神圣月份', tapFullCalendar: '点击查看完整伊历日历', gregorianDate: '公历日期', hijriYear: '伊历', muharram: '穆哈兰姆', safar: '色法尔', rabiAlAwwal: '赖比尔·敖外鲁', rabiAlThani: '赖比尔·阿赫尔', jumadaAlUla: '主马达·敖外鲁', jumadaAlThani: '主马达·阿赫尔', rajab: '赖哲卜', shaban: '舍尔邦', ramadan: '赖买丹', shawwal: '闪瓦鲁', dhuAlQidah: '都尔喀尔德', dhuAlHijjah: '都尔黑哲', monthNum: '月' },
  quran: { title: '古兰经', searchPlaceholder: '搜索章节或经文...', bookmarks: '书签', lastRead: '上次阅读', comingSoon: '即将推出', contentComingSoon: '古兰经内容将在此添加', collections: '圣训集', selectCollection: '选择圣训集', sections: '章节', selectSection: '选择章节', hadithNumber: '圣训编号', arabicText: '阿拉伯文', translation: '翻译', loadingHadiths: '正在加载圣训...', errorLoading: '加载时出错', noHadiths: '本章节无圣训', totalHadiths: '圣训总数', allCollections: '全部圣训集', backToCollections: '返回圣训集', backToSections: '返回章节' },
  hadith: { title: '圣训', searchPlaceholder: '搜索圣训...', sahihBukhari: '布哈里圣训', sahihMuslim: '穆斯林圣训', comingSoon: '即将推出', contentComingSoon: '先知ﷺ的圣训将在此添加' },
  sound: { title: '诵读', selectReciter: '选择诵读者', reciters: '诵读者', recitations: '古兰经诵读', murattal: '慢诵', mujawwad: '美诵' },
  rulings: { title: '教法', searchPlaceholder: '搜索教法...', prayerRulings: '礼拜教法', fastingRulings: '斋戒教法', zakatRulings: '天课教法', hajjRulings: '朝觐教法', breastfeedingRulings: '哺乳教法', purificationRulings: '净化教法', comingSoon: '即将推出' },
  dhikr: { currentDhikr: '当前赞念', tapToCount: '点击计数', resetCount: '重置计数', dhikrNotFound: '赞念未找到', backToSelection: '返回赞念选择', tasbeehah: '次', subhanallah: '赞主超绝', alhamdulillah: '一切赞颂归于安拉', allahuakbar: '安拉至大', lailaha: '万物非主唯有安拉', astaghfirullah: '求安拉恕饶', lahawla: '无力量无能力除非凭借安拉', subhanallahwabihamdi: '赞美安拉超绝并赞颂他', salawat: '为先知ﷺ祈福', descSubhanallah: '赞美安拉', descAlhamdulillah: '赞颂安拉', descAllahuakbar: '尊崇安拉', descLailaha: '信仰宣言', descAstaghfirullah: '求恕饶', descLahawla: '信赖宣言', descSubhanallahwabihamdi: '口舌轻便的两个词', descSalawat: '主啊，请赐福我们的先知穆罕默德' },
  tasbeeh: { title: '赞颂页面', morningAdhkar: '晨间祈祷词', eveningAdhkar: '暮间祈祷词', sleepAdhkar: '睡前祈祷词', variousAdhkar: '各种祈祷词', adhkarCount: '条', resetAll: '重置所有计数器', done: '完成 ✓', morningEveningAdhkar: '晨间、暮间和睡前祈祷词', customizeSettings: '自定义颜色、字体和界面' },
  preparations: { title: '准备', quranLearning: '古兰经', quranLearningDesc: '学习古兰经和诵读法', breastfeedingRulings: '哺乳教法', breastfeedingDesc: '关于哺乳的教法', threeDContent: '3D内容', threeDDesc: '互动教育内容', interactiveMap: '互动地图', interactiveMapDesc: '探索伊斯兰世界', mapInfo: '将添加伊斯兰世界互动地图', comingSoon: '即将推出' },
  prayerDetail: { prayer: '礼拜', rakaat: '拜数', fard: '主命', sunnahBefore: '前圣行', sunnahAfter: '后圣行', completed: '已完成', required: '必要', addRakaat: '添加拜数', completedLabel: '已完成', virtues: '美德', resetCount: '重置计数', prayerNotFound: '礼拜未找到', backToHome: '返回首页' },
  islamicEvent: {
    practices: '推荐功修', duaOrDhikr: '祈祷或赞念', quranVerses: '古兰经文', surah: '章', verse: '节', backToCalendar: '返回日历', eventNotFound: '事件未找到', month: '月', typeHoliday: '节日', typeFasting: '斋戒', typeSpecial: '特殊', typeWorship: '功修',
    events: {
      newYear: { name: '伊斯兰新年', description: '伊历新年开始', fullDescription: '穆哈兰姆月1日标志着新伊历年的开始，纪念先知ﷺ从麦加迁徙到麦地那。', practices: ['反思过去一年并忏悔', '为新年立下善意', '祈求美好与祝福'] },
      ashura: { name: '阿舒拉日', description: '阿舒拉日斋戒（建议9日也斋戒）', fullDescription: '阿舒拉日是穆哈兰姆月10日，安拉在这天拯救了穆萨和他的族人脱离法老。', practices: ['穆哈兰姆月9日和10日斋戒', '增加赞念和祈祷', '施舍'] },
      mawlid: { name: '先知诞辰', description: '纪念先知ﷺ的诞生', fullDescription: '赖比尔·敖外鲁月12日标志着先知穆罕默德ﷺ的诞生。', practices: ['大量为先知ﷺ祈福', '阅读先知传记', '学习先知ﷺ的品格'] },
      israMiraj: { name: '夜行登霄', description: '吉祥的夜晚', fullDescription: '夜行和登霄是先知ﷺ从禁寺被带到远寺，然后升上诸天。', practices: ['大量为先知ﷺ祈福', '至少礼两拜', '诵读夜行章', '思索安拉的奇迹'] },
      nisfShaban: { name: '舍尔邦月中之夜', description: '朝向转变之夜', fullDescription: '舍尔邦月中之夜是吉祥之夜，朝向从耶路撒冷转向天房。', practices: ['增加祈祷和求恕', '礼夜间拜', '思索朝向转变的故事'] },
      ramadanStart: { name: '赖买丹月开始', description: '斋戒和古兰经之月', fullDescription: '吉祥的赖买丹月是斋戒、礼拜和诵读古兰经之月。', practices: ['整月斋戒', '诵读和封完古兰经', '礼特拉威哈拜', '增加施舍'] },
      lastTen: { name: '最后十夜', description: '在单数夜寻找盖德尔夜', fullDescription: '赖买丹月最后十夜包含盖德尔夜，胜过一千个月。', practices: ['在单数夜礼夜间拜（21、23、25、27、29）', '在清真寺坐静', '增加祈祷和赞念', '诵读古兰经'] },
      eidFitr: { name: '开斋节', description: '斋戒者的喜悦和大赞词', fullDescription: '开斋节是赖买丹月斋戒后的喜悦之日。', practices: ['从开斋节之夜到节日拜念大赞词', '礼节日拜', '在拜前缴纳开斋捐', '探亲访友'] },
      arafah: { name: '阿拉法日', description: '非朝觐者的最佳日，斋戒可赎两年罪', fullDescription: '阿拉法日是都尔黑哲月9日，太阳升起的最好一天。', practices: ['阿拉法日斋戒（非朝觐者）', '增加赞念和祈祷', '忏悔求恕'] },
      eidAdha: { name: '宰牲节', description: '献祭日和晒肉日', fullDescription: '宰牲节是献祭日（都尔黑哲月10日），之后是晒肉日。', practices: ['在晒肉日念大赞词', '礼节日拜', '宰牲', '维系亲属关系'] },
    },
  },
};

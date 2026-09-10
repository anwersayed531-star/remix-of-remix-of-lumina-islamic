// Japanese Translation
import type { TranslationKeys } from './ar';

export const ja: TranslationKeys = {
  app: { name: 'Islami', tagline: 'あなたのイスラムの伴侶' },
  nav: { home: 'ホーム', quran: 'クルアーン', hadith: 'ハディース', rulings: '法規定', sound: 'オーディオ', counters: 'カウンター', settings: '設定' },
  home: { prayerTimes: '礼拝時間', nextPrayer: '次の礼拝', hijriCalendar: 'ヒジュラ暦', today: '今日', fajr: 'ファジュル', sunrise: '日の出', dhuhr: 'ズフル', asr: 'アスル', maghrib: 'マグリブ', isha: 'イシャー' },
  counters: { title: 'カウンター', dhikr: 'ズィクル', tasbeeh: 'タスビーフ', preparations: '準備', selectDhikr: 'ズィクルを選択', count: 'カウント', reset: 'リセット', target: '目標' },
  settings: { title: '設定', theme: 'テーマ', light: 'ライト', dark: 'ダーク', auto: '自動', primaryColor: 'プライマリカラー', fontSize: 'フォントサイズ', fontFamily: 'フォント', background: '背景スタイル', navPosition: 'ナビゲーション位置', bottom: '下部', right: '右', left: '左', borderRadius: '角丸', spacing: '間隔', fontWeight: 'フォント太さ', lineHeight: '行の高さ', letterSpacing: '文字間隔', animations: 'アニメーション', highContrast: 'ハイコントラスト', colorBlind: '色覚設定', reset: 'リセット', language: '言語', selectLanguage: '言語を選択' },
  colors: { green: 'イスラミックグリーン', gold: 'ゴールド', blue: 'ブルー', purple: 'パープル', red: 'レッド', teal: 'ティール', orange: 'オレンジ', pink: 'ピンク', indigo: 'インディゴ', brown: 'ブラウン' },
  fontSizes: { xsmall: '極小', small: '小', medium: '中', large: '大', xlarge: '極大', xxlarge: '最大' },
  colorBlind: { none: '通常', protanopia: '赤色覚異常', deuteranopia: '緑色覚異常', tritanopia: '青色覚異常' },
  common: { loading: '読み込み中...', error: 'エラーが発生しました', retry: '再試行', save: '保存', cancel: 'キャンセル', confirm: '確認', back: '戻る', next: '次へ', previous: '前へ', search: '検索', notFound: '見つかりません', comingSoon: '近日公開' },
  calendar: { year: '年', month: '月', sacredMonth: '聖なる月', whiteDays: '白い日々', islamicEvent: 'イスラムの行事', currentDay: '今日', upcomingEvents: '今後の行事', sacredMonths: '聖なる月々', tapFullCalendar: 'タップして完全なヒジュラ暦を表示', gregorianDate: '西暦', hijriYear: 'ヒジュラ暦', muharram: 'ムハッラム', safar: 'サファル', rabiAlAwwal: 'ラビー・アル＝アウワル', rabiAlThani: 'ラビー・アッ＝サーニー', jumadaAlUla: 'ジュマーダー・アル＝ウーラー', jumadaAlThani: 'ジュマーダー・アッ＝サーニヤ', rajab: 'ラジャブ', shaban: 'シャアバーン', ramadan: 'ラマダーン', shawwal: 'シャウワール', dhuAlQidah: 'ズー・アル＝カアダ', dhuAlHijjah: 'ズー・アル＝ヒッジャ', monthNum: '月' },
  quran: { title: '聖クルアーン', searchPlaceholder: 'スーラまたは節を検索...', bookmarks: 'ブックマーク', lastRead: '最後に読んだ所', comingSoon: '近日公開', contentComingSoon: 'クルアーンの内容がここに追加されます', collections: 'コレクション', selectCollection: 'コレクションを選択', sections: '章', selectSection: '章を選択', hadithNumber: 'ハディース番号', arabicText: 'アラビア語テキスト', translation: '翻訳', loadingHadiths: 'ハディースを読み込み中...', errorLoading: '読み込みエラー', noHadiths: 'この章にハディースはありません', totalHadiths: '合計ハディース', allCollections: 'すべてのコレクション', backToCollections: 'コレクションに戻る', backToSections: '章に戻る' },
  hadith: { title: 'ハディース', searchPlaceholder: 'ハディースを検索...', sahihBukhari: 'サヒーフ・アル＝ブハーリー', sahihMuslim: 'サヒーフ・ムスリム', comingSoon: '近日公開', contentComingSoon: '預言者ﷺのハディースがここに追加されます' },
  sound: { title: '朗唱', selectReciter: '朗唱者を選択', reciters: '朗唱者', recitations: 'クルアーン朗唱', murattal: 'ムラッタル', mujawwad: 'ムジャッワド' },
  rulings: { title: '法規定', searchPlaceholder: '法規定を検索...', prayerRulings: '礼拝の法規定', fastingRulings: '断食の法規定', zakatRulings: 'ザカートの法規定', hajjRulings: 'ハッジの法規定', breastfeedingRulings: '授乳の法規定', purificationRulings: '浄化の法規定', comingSoon: '近日公開' },
  dhikr: { currentDhikr: '現在のズィクル', tapToCount: 'タップしてカウント', resetCount: 'カウンターをリセット', dhikrNotFound: 'ズィクルが見つかりません', backToSelection: 'ズィクル選択に戻る', tasbeehah: '回', subhanallah: 'スブハーナッラー', alhamdulillah: 'アルハムドゥリッラー', allahuakbar: 'アッラーフ・アクバル', lailaha: 'ラー・イラーハ・イッラッラー', astaghfirullah: 'アスタグフィルッラー', lahawla: 'ラー・ハウラ・ワラー・クッワタ・イッラー・ビッラー', subhanallahwabihamdi: 'スブハーナッラーヒ・ワ・ビハムディヒ', salawat: '預言者ﷺへの祝福', descSubhanallah: 'アッラーを讃美する', descAlhamdulillah: 'アッラーを称賛する', descAllahuakbar: 'アッラーを偉大とする', descLailaha: '信仰告白', descAstaghfirullah: '赦しを求める', descLahawla: '信頼の宣言', descSubhanallahwabihamdi: '舌に軽い二つの言葉', descSalawat: 'アッラーよ、預言者ムハンマドを祝福してください' },
  tasbeeh: { title: 'タスビーフページ', morningAdhkar: '朝のアズカール', eveningAdhkar: '夕方のアズカール', sleepAdhkar: '就寝のアズカール', variousAdhkar: '様々なアズカール', adhkarCount: '個', resetAll: '全カウンターをリセット', done: '完了 ✓', morningEveningAdhkar: '朝・夕方・就寝のアズカール', customizeSettings: '色、フォント、インターフェースをカスタマイズ' },
  preparations: { title: '準備', quranLearning: '聖クルアーン', quranLearningDesc: 'クルアーンとタジュウィードを学ぶ', breastfeedingRulings: '授乳の法規定', breastfeedingDesc: '授乳に関するフィクフの法規定', threeDContent: '3Dコンテンツ', threeDDesc: 'インタラクティブ教育コンテンツ', interactiveMap: 'インタラクティブマップ', interactiveMapDesc: 'イスラム世界を探索', mapInfo: '各国の情報を含むイスラム世界のインタラクティブマップが追加されます', comingSoon: '近日公開' },
  prayerDetail: { prayer: '礼拝', rakaat: 'ラカート', fard: '義務', sunnahBefore: '前のスンナ', sunnahAfter: '後のスンナ', completed: '完了', required: '必須', addRakaat: 'ラカを追加', completedLabel: '完了', virtues: 'の美徳', resetCount: 'カウンターをリセット', prayerNotFound: '礼拝が見つかりません', backToHome: 'ホームに戻る' },
  islamicEvent: {
    practices: '推奨される実践', duaOrDhikr: 'ドゥアーまたはズィクル', quranVerses: 'クルアーンの節', surah: 'スーラ', verse: '節', backToCalendar: 'カレンダーに戻る', eventNotFound: '行事が見つかりません', month: '月', typeHoliday: '祝日', typeFasting: '断食', typeSpecial: '特別', typeWorship: '崇拝',
    events: {
      newYear: { name: 'イスラム新年', description: 'ヒジュラ暦新年の始まり', fullDescription: 'ムハッラム1日は新しいイスラム暦年の始まりを示します。', practices: ['過去の一年を振り返り悔い改める', '新年のための敬虔な意図を持つ', '善と祝福のために祈る'] },
      ashura: { name: 'アーシューラーの日', description: 'アーシューラーの断食（9日も断食推奨）', fullDescription: 'アーシューラーはムハッラム10日で、アッラーがムーサーとその民をファラオから救った日です。', practices: ['ムハッラム9日と10日に断食', 'ズィクルとドゥアーを増やす', '施しをする'] },
      mawlid: { name: '預言者生誕祭', description: '預言者ﷺの誕生の記念', fullDescription: 'ラビー・アル＝アウワル12日は預言者ムハンマドﷺの誕生を記念します。', practices: ['預言者ﷺへの祝福を多く送る', '預言者の伝記を読む', '預言者ﷺの品格から学ぶ'] },
      israMiraj: { name: 'イスラーとミーラージュ', description: '祝福された特別な夜', fullDescription: '夜の旅と昇天は預言者ﷺが聖モスクからアル＝アクサーモスクへ運ばれた出来事です。', practices: ['預言者ﷺへの祝福を多く送る', '少なくとも2ラカートの礼拝', 'イスラーのスーラを読む', 'アッラーの奇跡について省察する'] },
      nisfShaban: { name: 'シャアバーン中日の夜', description: 'キブラ変更の夜', fullDescription: 'シャアバーン中日の夜はキブラがエルサレムからカアバに変更された祝福された夜です。', practices: ['ドゥアーとイスティグファールを増やす', 'キヤーム・アッ＝ライルの礼拝', 'キブラ変更の物語を省察する'] },
      ramadanStart: { name: 'ラマダーン開始', description: '断食とクルアーンの月', fullDescription: '祝福されたラマダーン月は断食、礼拝、クルアーン朗唱の月です。', practices: ['一ヶ月間断食する', 'クルアーンを読み通す', 'タラーウィーフ礼拝', '施しを増やす'] },
      lastTen: { name: '最後の十夜', description: '奇数夜にライラトゥル・カドルを探す', fullDescription: 'ラマダーンの最後の十夜には千ヶ月よりも優れたライラトゥル・カドルがあります。', practices: ['奇数夜(21, 23, 25, 27, 29)にキヤームの礼拝', 'モスクでイティカーフ', 'ドゥアーとズィクルを増やす', 'クルアーンを朗唱する'] },
      eidFitr: { name: 'イード・アル＝フィトル', description: '断食者の喜びとタクビーラート', fullDescription: 'イード・アル＝フィトルはラマダーンの断食後の喜びの日です。', practices: ['イード前夜からイード礼拝までタクビーラートを唱える', 'イード礼拝を行う', '礼拝前にザカート・アル＝フィトルを支払う', '親族を訪問する'] },
      arafah: { name: 'アラファの日', description: '巡礼者以外にとって最良の日、断食で2年分の罪が赦される', fullDescription: 'アラファの日はズー・アル＝ヒッジャ9日で、太陽が昇った最良の日です。', practices: ['アラファの日に断食（巡礼者以外）', 'ズィクルとドゥアーを増やす', '悔い改めて赦しを求める'] },
      eidAdha: { name: 'イード・アル＝アドハー', description: '犠牲の日とタシュリークの日々', fullDescription: 'イード・アル＝アドハーは犠牲の日（ズー・アル＝ヒッジャ10日）でタシュリークの日々が続きます。', practices: ['タシュリークの日々にタクビーラートを唱える', 'イード礼拝を行う', '犠牲を捧げる', '家族の絆を保つ'] },
    },
  },
};

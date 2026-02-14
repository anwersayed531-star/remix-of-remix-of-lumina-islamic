
# خطة إكمال الترجمات

## الوضع الحالي

### الأقسام المطلوبة في كل ترجمة (14 قسم):
`app`, `nav`, `home`, `counters`, `settings`, `colors`, `fontSizes`, `colorBlind`, `common`, `calendar`, `quran`, `hadith`, `sound`, `rulings`, `dhikr`, `tasbeeh`, `preparations`, `prayerDetail`, `islamicEvent`

### ترجمات كاملة (جميع الأقسام موجودة):
ar, en, fr, tr, ur, hi, id

### ترجمات ناقصة (ينقصها 10 أقسام: calendar, quran, hadith, sound, rulings, dhikr, tasbeeh, preparations, prayerDetail, islamicEvent):
bn, ms, sw, pa, sd, ks, ps, gu, ml, ta, te, mr, jv, su, az, uz, kk, ky, tg, ug, ha, so, yo, am, sq, bs, ru, ne, tl, th, km, vi, my, tk, tt, ff, wo, om, fa

**المجموع: 38 لغة ناقصة**

### لغات موجودة في قائمة اللغات لكن بدون ملف ترجمة:
de (ألماني), es (إسباني), it (إيطالي), nl (هولندي), el (يوناني), bg (بلغاري), ro (روماني), uk (أوكراني), hu (مجري), pt (برتغالي), sv (سويدي), no (نرويجي), da (دنماركي), fi (فنلندي), pl (بولندي), zh (صيني), ko (كوري), ja (ياباني)

**المجموع: 18 لغة بدون ملف ترجمة**

---

## خطة التنفيذ

### المرحلة 1: إكمال الترجمات الناقصة (38 لغة)
إضافة الأقسام العشرة المفقودة لكل لغة:
- `calendar` - التقويم الهجري وأسماء الأشهر
- `quran` - واجهة القرآن الكريم
- `hadith` - واجهة الحديث
- `sound` - واجهة التلاوات
- `rulings` - واجهة الأحكام
- `dhikr` - أسماء الأذكار ووصفها
- `tasbeeh` - صفحات التسبيح
- `preparations` - الاستعدادات
- `prayerDetail` - تفاصيل الصلاة
- `islamicEvent` - المناسبات الإسلامية

سيتم تقسيم العمل على دفعات حسب المنطقة:
1. جنوب آسيا: bn, pa, sd, ks, ps, gu, ml, ta, te, mr, ne
2. جنوب شرق آسيا: ms, jv, su, tl, th, km, vi, my
3. آسيا الوسطى: az, uz, kk, ky, tg, ug, tk, tt, fa
4. أفريقيا: sw, ha, so, yo, am, ff, wo, om
5. أوروبا: sq, bs, ru

### المرحلة 2: إنشاء ملفات ترجمة جديدة (18 لغة)
إنشاء ملفات ترجمة كاملة للغات:
- الأوروبية: de, es, it, nl, el, bg, ro, uk, hu, pt, sv, no, da, fi, pl
- شرق آسيا: zh, ko, ja

وتسجيلها في `src/lib/translations/index.ts`

---

## التفاصيل التقنية

- كل ملف ترجمة يحتاج اضافة حوالي 80 مفتاح ترجمة جديد
- نظام deepMerge الموجود يضمن أن أي مفتاح مفقود يرجع للعربية تلقائيا
- الملفات الجديدة تحتاج تسجيل في `index.ts` (import + اضافة في rawTranslations)
- المجموع الكلي: 56 ملف يحتاج تعديل/إنشاء + تحديث index.ts

### ملاحظة
بسبب حجم العمل الكبير (56 لغة)، سيتم التنفيذ على عدة دفعات متتالية.



# خطة إنشاء ملفات الترجمة للـ 18 لغة المفقودة

## المشكلة
18 لغة موجودة في قائمة اختيار اللغات (`languages.ts`) لكن ليس لها ملفات ترجمة ولا مسجلة في `index.ts`. عند اختيار أي منها يظهر التطبيق بالعربية بالكامل.

## اللغات المفقودة
| الكود | اللغة | المنطقة |
|-------|--------|---------|
| de | German (Deutsch) | أوروبا |
| es | Spanish (Español) | أوروبا |
| it | Italian (Italiano) | أوروبا |
| nl | Dutch (Nederlands) | أوروبا |
| el | Greek (Ελληνικά) | أوروبا |
| bg | Bulgarian (Български) | أوروبا |
| ro | Romanian (Română) | أوروبا |
| uk | Ukrainian (Українська) | أوروبا |
| hu | Hungarian (Magyar) | أوروبا |
| pt | Portuguese (Português) | أوروبا |
| sv | Swedish (Svenska) | أوروبا |
| no | Norwegian (Norsk) | أوروبا |
| da | Danish (Dansk) | أوروبا |
| fi | Finnish (Suomi) | أوروبا |
| pl | Polish (Polski) | أوروبا |
| zh | Chinese (中文) | شرق آسيا |
| ko | Korean (한국어) | شرق آسيا |
| ja | Japanese (日本語) | شرق آسيا |

## الحل

### 1. إنشاء 18 ملف ترجمة جديد
إنشاء ملف لكل لغة في `src/lib/translations/` يحتوي على جميع الأقسام:
- `app`, `nav`, `home`, `counters`, `settings`, `colors`, `fontSizes`, `colorBlind`, `common`
- `calendar`, `quran`, `hadith`, `sound`, `rulings`
- `dhikr`, `tasbeeh`, `preparations`, `prayerDetail`
- `islamicEvent` (بما فيه قسم `events` الجديد)

### 2. تسجيل الملفات في `index.ts`
إضافة 18 سطر import وتسجيلها في كائن `rawTranslations`.

### ترتيب التنفيذ
سيتم العمل على دفعات لتجنب الانقطاع:
1. **الدفعة الأولى (6 لغات):** de, es, it, pt, nl, pl
2. **الدفعة الثانية (6 لغات):** sv, no, da, fi, hu, ro
3. **الدفعة الثالثة (6 لغات):** bg, uk, el, zh, ko, ja
4. **تحديث `index.ts`:** تسجيل جميع الـ 18 لغة

### الملفات المتأثرة
- 18 ملف جديد: `de.ts`, `es.ts`, `it.ts`, `nl.ts`, `el.ts`, `bg.ts`, `ro.ts`, `uk.ts`, `hu.ts`, `pt.ts`, `sv.ts`, `no.ts`, `da.ts`, `fi.ts`, `pl.ts`, `zh.ts`, `ko.ts`, `ja.ts`
- ملف واحد يُعدّل: `src/lib/translations/index.ts`


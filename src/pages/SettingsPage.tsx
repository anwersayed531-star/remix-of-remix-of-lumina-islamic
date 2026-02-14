import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Sun, Moon, Monitor, 
  Type, Palette, LayoutGrid,
  RotateCcw, Eye, Check,
  AlignRight, AlignCenter, AlignLeft,
  Sparkles, CircleDot, Square, Maximize2,
  MoveHorizontal, Bold, AlignJustify, LetterText,
  Zap, Contrast, Globe, Search
} from 'lucide-react';
import { useTheme, ThemeMode, PrimaryColor, FontSize, FontFamily, NavPosition, BackgroundStyle, ColorBlindMode, BorderRadius, Spacing } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { languages, languagesByRegion } from '@/lib/languages';
import { fullyTranslatedLanguages } from '@/lib/translations';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

const SettingsPage = () => {
  const { settings, updateSetting, resetSettings } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [langSearch, setLangSearch] = useState('');

  const themeModes: { value: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: t.settings.light, icon: <Sun className="w-5 h-5" /> },
    { value: 'dark', label: t.settings.dark, icon: <Moon className="w-5 h-5" /> },
    { value: 'auto', label: t.settings.auto, icon: <Monitor className="w-5 h-5" /> },
  ];

  const primaryColors: { value: PrimaryColor; label: string; color: string }[] = [
    { value: 'green', label: t.colors.green, color: 'bg-[hsl(150,60%,35%)]' },
    { value: 'gold', label: t.colors.gold, color: 'bg-[hsl(45,80%,50%)]' },
    { value: 'blue', label: t.colors.blue, color: 'bg-[hsl(210,70%,50%)]' },
    { value: 'purple', label: t.colors.purple, color: 'bg-[hsl(270,60%,50%)]' },
    { value: 'red', label: t.colors.red, color: 'bg-[hsl(0,70%,50%)]' },
    { value: 'teal', label: t.colors.teal, color: 'bg-[hsl(175,65%,40%)]' },
    { value: 'orange', label: t.colors.orange, color: 'bg-[hsl(25,85%,55%)]' },
    { value: 'pink', label: t.colors.pink, color: 'bg-[hsl(330,70%,55%)]' },
    { value: 'indigo', label: t.colors.indigo, color: 'bg-[hsl(240,65%,50%)]' },
    { value: 'brown', label: t.colors.brown, color: 'bg-[hsl(25,50%,40%)]' },
  ];

  const fontSizes: { value: FontSize; label: string; size: string }[] = [
    { value: 'xsmall', label: t.fontSizes.xsmall, size: 'text-xs' },
    { value: 'small', label: t.fontSizes.small, size: 'text-sm' },
    { value: 'medium', label: t.fontSizes.medium, size: 'text-base' },
    { value: 'large', label: t.fontSizes.large, size: 'text-lg' },
    { value: 'xlarge', label: t.fontSizes.xlarge, size: 'text-xl' },
    { value: 'xxlarge', label: t.fontSizes.xxlarge, size: 'text-2xl' },
  ];

  const fontFamilies: { value: FontFamily; label: string; sample: string; category: string }[] = [
    // خطوط حديثة
    { value: 'cairo', label: 'القاهرة', sample: 'font-cairo', category: language === 'ar' ? 'حديث' : 'Modern' },
    { value: 'tajawal', label: 'تجوال', sample: 'font-tajawal', category: language === 'ar' ? 'حديث' : 'Modern' },
    { value: 'almarai', label: 'المراعي', sample: 'font-almarai', category: language === 'ar' ? 'حديث' : 'Modern' },
    { value: 'noto-sans', label: 'نوتو سانس', sample: 'font-noto-sans', category: language === 'ar' ? 'حديث' : 'Modern' },
    { value: 'readex', label: 'ريدكس برو', sample: 'font-readex', category: language === 'ar' ? 'حديث' : 'Modern' },
    { value: 'changa', label: 'شنقة', sample: 'font-changa', category: language === 'ar' ? 'حديث' : 'Modern' },
    { value: 'mada', label: 'مدى', sample: 'font-mada', category: language === 'ar' ? 'حديث' : 'Modern' },
    { value: 'harmattan', label: 'هرمتان', sample: 'font-harmattan', category: language === 'ar' ? 'حديث' : 'Modern' },
    // خطوط كلاسيكية
    { value: 'amiri', label: 'أميري', sample: 'font-amiri', category: language === 'ar' ? 'كلاسيكي' : 'Classic' },
    { value: 'noto-naskh', label: 'نوتو نسخ', sample: 'font-noto-naskh', category: language === 'ar' ? 'كلاسيكي' : 'Classic' },
    { value: 'lateef', label: 'لطيف', sample: 'font-lateef', category: language === 'ar' ? 'كلاسيكي' : 'Classic' },
    { value: 'scheherazade', label: 'شهرزاد', sample: 'font-scheherazade', category: language === 'ar' ? 'كلاسيكي' : 'Classic' },
    { value: 'markazi', label: 'مركزي', sample: 'font-markazi', category: language === 'ar' ? 'كلاسيكي' : 'Classic' },
    // خطوط مزخرفة
    { value: 'messiri', label: 'المسيري', sample: 'font-messiri', category: language === 'ar' ? 'مزخرف' : 'Decorative' },
    { value: 'reem-kufi', label: 'ريم كوفي', sample: 'font-reem-kufi', category: language === 'ar' ? 'مزخرف' : 'Decorative' },
    { value: 'aref-ruqaa', label: 'عارف رقعة', sample: 'font-aref-ruqaa', category: language === 'ar' ? 'مزخرف' : 'Decorative' },
  ];

  const navPositions: { value: NavPosition; label: string; icon: React.ReactNode }[] = [
    { value: 'bottom', label: t.settings.bottom, icon: <AlignCenter className="w-5 h-5 rotate-90" /> },
    { value: 'right', label: t.settings.right, icon: <AlignRight className="w-5 h-5" /> },
    { value: 'left', label: t.settings.left, icon: <AlignLeft className="w-5 h-5" /> },
  ];

  const backgroundStyles: { value: BackgroundStyle; label: string; preview: string; category: string }[] = [
    // ألوان ثابتة
    { value: 'solid', label: language === 'ar' ? 'لون موحد' : 'Solid', preview: 'bg-background', category: language === 'ar' ? 'أساسي' : 'Basic' },
    // نقوش إسلامية
    { value: 'pattern', label: language === 'ar' ? 'نقش +' : 'Pattern', preview: 'islamic-pattern bg-background', category: language === 'ar' ? 'نقوش' : 'Patterns' },
    { value: 'pattern-geometric', label: language === 'ar' ? 'هندسي' : 'Geometric', preview: 'pattern-geometric bg-background', category: language === 'ar' ? 'نقوش' : 'Patterns' },
    { value: 'pattern-stars', label: language === 'ar' ? 'نجوم' : 'Stars', preview: 'pattern-stars bg-background', category: language === 'ar' ? 'نقوش' : 'Patterns' },
    { value: 'pattern-arabesque', label: language === 'ar' ? 'أرابيسك' : 'Arabesque', preview: 'pattern-arabesque bg-background', category: language === 'ar' ? 'نقوش' : 'Patterns' },
    { value: 'pattern-hexagon', label: language === 'ar' ? 'سداسي' : 'Hexagon', preview: 'pattern-hexagon bg-background', category: language === 'ar' ? 'نقوش' : 'Patterns' },
    { value: 'pattern-diamonds', label: language === 'ar' ? 'ماسي' : 'Diamond', preview: 'pattern-diamonds bg-background', category: language === 'ar' ? 'نقوش' : 'Patterns' },
    { value: 'pattern-mosaic', label: language === 'ar' ? 'فسيفساء' : 'Mosaic', preview: 'pattern-mosaic bg-background', category: language === 'ar' ? 'نقوش' : 'Patterns' },
    { value: 'pattern-circles', label: language === 'ar' ? 'دوائر' : 'Circles', preview: 'pattern-circles bg-background', category: language === 'ar' ? 'نقوش' : 'Patterns' },
    // تدرجات
    { value: 'gradient-subtle', label: language === 'ar' ? 'تدرج ناعم' : 'Subtle', preview: 'bg-gradient-to-br from-background to-muted', category: language === 'ar' ? 'تدرج' : 'Gradient' },
    { value: 'gradient-sunset', label: language === 'ar' ? 'غروب' : 'Sunset', preview: 'gradient-sunset', category: language === 'ar' ? 'تدرج' : 'Gradient' },
    { value: 'gradient-ocean', label: language === 'ar' ? 'محيط' : 'Ocean', preview: 'gradient-ocean', category: language === 'ar' ? 'تدرج' : 'Gradient' },
    { value: 'gradient-forest', label: language === 'ar' ? 'غابة' : 'Forest', preview: 'gradient-forest', category: language === 'ar' ? 'تدرج' : 'Gradient' },
    { value: 'gradient-royal', label: language === 'ar' ? 'ملكي' : 'Royal', preview: 'gradient-royal', category: language === 'ar' ? 'تدرج' : 'Gradient' },
    { value: 'gradient-gold', label: language === 'ar' ? 'ذهبي' : 'Gold', preview: 'gradient-gold', category: language === 'ar' ? 'تدرج' : 'Gradient' },
    { value: 'gradient-rose', label: language === 'ar' ? 'وردي' : 'Rose', preview: 'gradient-rose', category: language === 'ar' ? 'تدرج' : 'Gradient' },
  ];

  const colorBlindModes: { value: ColorBlindMode; label: string; description: string }[] = [
    { value: 'none', label: t.colorBlind.none, description: language === 'ar' ? 'الألوان الافتراضية' : 'Default colors' },
    { value: 'protanopia', label: t.colorBlind.protanopia, description: language === 'ar' ? 'ألوان بديلة للأحمر' : 'Alternative to red' },
    { value: 'deuteranopia', label: t.colorBlind.deuteranopia, description: language === 'ar' ? 'ألوان بديلة للأخضر' : 'Alternative to green' },
    { value: 'tritanopia', label: t.colorBlind.tritanopia, description: language === 'ar' ? 'ألوان بديلة للأزرق' : 'Alternative to blue' },
  ];

  const borderRadiusOptions: { value: BorderRadius; label: string; icon: React.ReactNode }[] = [
    { value: 'none', label: language === 'ar' ? 'حاد' : 'Sharp', icon: <Square className="w-4 h-4" /> },
    { value: 'small', label: language === 'ar' ? 'صغير' : 'Small', icon: <Square className="w-4 h-4 rounded-sm" /> },
    { value: 'medium', label: language === 'ar' ? 'متوسط' : 'Medium', icon: <Square className="w-4 h-4 rounded" /> },
    { value: 'large', label: language === 'ar' ? 'كبير' : 'Large', icon: <Square className="w-4 h-4 rounded-lg" /> },
    { value: 'full', label: language === 'ar' ? 'دائري' : 'Round', icon: <CircleDot className="w-4 h-4" /> },
  ];

  const spacingOptions: { value: Spacing; label: string; description: string }[] = [
    { value: 'compact', label: language === 'ar' ? 'مضغوط' : 'Compact', description: language === 'ar' ? 'مسافات أقل' : 'Less space' },
    { value: 'normal', label: language === 'ar' ? 'عادي' : 'Normal', description: language === 'ar' ? 'مسافات متوسطة' : 'Medium space' },
    { value: 'spacious', label: language === 'ar' ? 'واسع' : 'Spacious', description: language === 'ar' ? 'مسافات أكثر' : 'More space' },
  ];

  const fontWeightOptions: { value: 'light' | 'normal' | 'bold'; label: string }[] = [
    { value: 'light', label: language === 'ar' ? 'رفيع' : 'Light' },
    { value: 'normal', label: language === 'ar' ? 'عادي' : 'Normal' },
    { value: 'bold', label: language === 'ar' ? 'سميك' : 'Bold' },
  ];

  const lineHeightOptions: { value: 'tight' | 'normal' | 'relaxed'; label: string }[] = [
    { value: 'tight', label: language === 'ar' ? 'ضيق' : 'Tight' },
    { value: 'normal', label: language === 'ar' ? 'عادي' : 'Normal' },
    { value: 'relaxed', label: language === 'ar' ? 'مريح' : 'Relaxed' },
  ];

  const letterSpacingOptions: { value: 'tight' | 'normal' | 'wide'; label: string }[] = [
    { value: 'tight', label: language === 'ar' ? 'متقارب' : 'Tight' },
    { value: 'normal', label: language === 'ar' ? 'عادي' : 'Normal' },
    { value: 'wide', label: language === 'ar' ? 'متباعد' : 'Wide' },
  ];

  // Group fonts by category
  const fontsByCategory = fontFamilies.reduce((acc, font) => {
    if (!acc[font.category]) acc[font.category] = [];
    acc[font.category].push(font);
    return acc;
  }, {} as Record<string, typeof fontFamilies>);

  // Group backgrounds by category
  const backgroundsByCategory = backgroundStyles.reduce((acc, bg) => {
    if (!acc[bg.category]) acc[bg.category] = [];
    acc[bg.category].push(bg);
    return acc;
  }, {} as Record<string, typeof backgroundStyles>);

  // فلترة اللغات حسب البحث
  const filteredLanguages = languages.filter(lang => 
    lang.name.toLowerCase().includes(langSearch.toLowerCase()) ||
    lang.nativeName.includes(langSearch) ||
    lang.region.includes(langSearch)
  );

  // تجميع اللغات المفلترة حسب المنطقة
  const filteredByRegion = filteredLanguages.reduce((acc, lang) => {
    if (!acc[lang.region]) acc[lang.region] = [];
    acc[lang.region].push(lang);
    return acc;
  }, {} as Record<string, typeof languages>);

  return (
    <ScrollArea className="h-[calc(100vh-80px)]">
      <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in pb-32">

        {/* اللغة */}
        <Card className="border-0 shadow-md bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-cairo text-lg">
              <Globe className="w-5 h-5 text-primary" />
              {t.settings.language}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* البحث */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={language === 'ar' ? 'ابحث عن لغة...' : 'Search for a language...'}
                value={langSearch}
                onChange={(e) => setLangSearch(e.target.value)}
                className="pr-10"
              />
            </div>
            
            {/* اللغات حسب المنطقة */}
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {Object.entries(filteredByRegion).map(([region, regionLangs]) => (
                <div key={region}>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2 sticky top-0 bg-background/80 backdrop-blur-sm py-1">
                    {region} ({regionLangs.length})
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {regionLangs.map((lang) => {
                      const isFullyTranslated = fullyTranslatedLanguages.includes(lang.code);
                      return (
                        <button
                          key={lang.code}
                          className={`relative p-3 rounded-xl border-2 transition-all text-right ${
                            language === lang.code 
                              ? 'border-primary bg-primary/10' 
                              : 'border-border hover:border-primary/50 bg-background'
                          }`}
                          onClick={() => setLanguage(lang.code)}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                              isFullyTranslated ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {isFullyTranslated ? '✓' : '○'}
                            </span>
                            <span className="font-cairo font-semibold text-sm">{lang.nativeName}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{lang.name}</p>
                          {language === lang.code && (
                            <Check className="absolute top-2 left-2 w-4 h-4 text-primary" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              {language === 'ar' 
                ? '✓ = ترجمة كاملة | ○ = ترجمة جزئية (واجهة عربية + نصوص دينية بالعربية)' 
                : '✓ = Full translation | ○ = Partial (Arabic UI + Arabic religious texts)'}
            </p>
          </CardContent>
        </Card>
        
        {/* السمة */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-cairo text-lg">
              <Sun className="w-5 h-5 text-primary" />
              {t.settings.theme}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-3">
            {themeModes.map((mode) => (
              <Button
                key={mode.value}
                variant={settings.mode === mode.value ? 'default' : 'outline'}
                className="flex flex-col gap-2 h-auto py-4"
                onClick={() => updateSetting('mode', mode.value)}
              >
                {mode.icon}
                <span className="text-xs font-cairo">{mode.label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* اللون الرئيسي */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-cairo text-lg">
              <Palette className="w-5 h-5 text-primary" />
              {t.settings.primaryColor}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {primaryColors.map((color) => (
              <button
                key={color.value}
                className={`relative w-12 h-12 rounded-xl ${color.color} transition-transform hover:scale-110 ${
                  settings.primaryColor === color.value ? 'ring-2 ring-offset-2 ring-foreground' : ''
                }`}
                onClick={() => updateSetting('primaryColor', color.value)}
                title={color.label}
              >
                {settings.primaryColor === color.value && (
                  <Check className="absolute inset-0 m-auto w-5 h-5 text-white" />
                )}
              </button>
            ))}
          </CardContent>
        </Card>

        {/* حجم الخط */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-cairo text-lg">
              <Maximize2 className="w-5 h-5 text-primary" />
              {t.settings.fontSize}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-2">
            {fontSizes.map((size) => (
              <Button
                key={size.value}
                variant={settings.fontSize === size.value ? 'default' : 'outline'}
                className={`h-auto py-2 ${size.size}`}
                onClick={() => updateSetting('fontSize', size.value)}
              >
                {size.label}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* نوع الخط */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-cairo text-lg">
              <Type className="w-5 h-5 text-primary" />
              {t.settings.fontFamily}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(fontsByCategory).map(([category, fonts]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">{category}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {fonts.map((font) => (
                    <Button
                      key={font.value}
                      variant={settings.fontFamily === font.value ? 'default' : 'outline'}
                      className={`h-auto py-2 text-sm ${font.sample}`}
                      onClick={() => updateSetting('fontFamily', font.value)}
                    >
                      {font.label}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* وزن الخط */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-cairo text-lg">
              <Bold className="w-5 h-5 text-primary" />
              {t.settings.fontWeight}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-3">
            {fontWeightOptions.map((weight) => (
              <Button
                key={weight.value}
                variant={settings.fontWeight === weight.value ? 'default' : 'outline'}
                className="h-auto py-3"
                style={{ fontWeight: weight.value === 'light' ? 300 : weight.value === 'bold' ? 600 : 400 }}
                onClick={() => updateSetting('fontWeight', weight.value)}
              >
                {weight.label}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* ارتفاع السطر */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-cairo text-lg">
              <AlignJustify className="w-5 h-5 text-primary" />
              {t.settings.lineHeight}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-3">
            {lineHeightOptions.map((lh) => (
              <Button
                key={lh.value}
                variant={settings.lineHeight === lh.value ? 'default' : 'outline'}
                className="h-auto py-3"
                onClick={() => updateSetting('lineHeight', lh.value)}
              >
                {lh.label}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* تباعد الأحرف */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-cairo text-lg">
              <LetterText className="w-5 h-5 text-primary" />
              {t.settings.letterSpacing}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-3">
            {letterSpacingOptions.map((ls) => (
              <Button
                key={ls.value}
                variant={settings.letterSpacing === ls.value ? 'default' : 'outline'}
                className="h-auto py-3"
                onClick={() => updateSetting('letterSpacing', ls.value)}
              >
                {ls.label}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* شكل الخلفية */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-cairo text-lg">
              <LayoutGrid className="w-5 h-5 text-primary" />
              {t.settings.background}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(backgroundsByCategory).map(([category, backgrounds]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">{category}</h4>
                <div className="grid grid-cols-4 gap-2">
                  {backgrounds.map((style) => (
                    <button
                      key={style.value}
                      className={`relative h-16 rounded-xl border-2 transition-all ${style.preview} ${
                        settings.backgroundStyle === style.value 
                          ? 'border-primary ring-2 ring-primary/30' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => updateSetting('backgroundStyle', style.value)}
                    >
                      <span className="absolute bottom-1 right-1 text-[10px] font-cairo text-muted-foreground">
                        {style.label}
                      </span>
                      {settings.backgroundStyle === style.value && (
                        <Check className="absolute top-1 left-1 w-3 h-3 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* حجم الحواف */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-cairo text-lg">
              <Square className="w-5 h-5 text-primary" />
              {t.settings.borderRadius}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-5 gap-2">
            {borderRadiusOptions.map((br) => (
              <Button
                key={br.value}
                variant={settings.borderRadius === br.value ? 'default' : 'outline'}
                className="flex flex-col gap-2 h-auto py-3"
                onClick={() => updateSetting('borderRadius', br.value)}
              >
                {br.icon}
                <span className="text-[10px]">{br.label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* التباعد */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-cairo text-lg">
              <MoveHorizontal className="w-5 h-5 text-primary" />
              {t.settings.spacing}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-3">
            {spacingOptions.map((sp) => (
              <button
                key={sp.value}
                className={`relative p-3 rounded-xl border-2 transition-all text-center ${
                  settings.spacing === sp.value 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50 bg-background'
                }`}
                onClick={() => updateSetting('spacing', sp.value)}
              >
                <h4 className="font-cairo font-semibold text-foreground text-sm">{sp.label}</h4>
                <p className="text-[10px] text-muted-foreground font-cairo mt-1">{sp.description}</p>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* موضع شريط التنقل */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-cairo text-lg">
              <LayoutGrid className="w-5 h-5 text-primary" />
              {t.settings.navPosition}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-3">
            {navPositions.map((pos) => (
              <Button
                key={pos.value}
                variant={settings.navPosition === pos.value ? 'default' : 'outline'}
                className="flex flex-col gap-2 h-auto py-4"
                onClick={() => updateSetting('navPosition', pos.value)}
              >
                {pos.icon}
                <span className="text-xs font-cairo">{pos.label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* إعدادات إضافية */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-cairo text-lg">
              <Sparkles className="w-5 h-5 text-primary" />
              {language === 'ar' ? 'إعدادات إضافية' : 'Additional Settings'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-primary" />
                <div>
                  <h4 className="font-cairo font-semibold text-sm">{t.settings.animations}</h4>
                  <p className="text-xs text-muted-foreground">
                    {language === 'ar' ? 'تفعيل أو إيقاف الحركات' : 'Enable or disable animations'}
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.animations}
                onCheckedChange={(checked) => updateSetting('animations', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-3">
                <Contrast className="w-5 h-5 text-primary" />
                <div>
                  <h4 className="font-cairo font-semibold text-sm">{t.settings.highContrast}</h4>
                  <p className="text-xs text-muted-foreground">
                    {language === 'ar' ? 'زيادة التباين للقراءة الأفضل' : 'Increase contrast for better readability'}
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.highContrast}
                onCheckedChange={(checked) => updateSetting('highContrast', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* قسم خاص لذوي عمى الألوان */}
        <Card className="border-0 shadow-md bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-cairo text-lg">
              <Eye className="w-5 h-5 text-primary" />
              {t.settings.colorBlind}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground font-cairo mb-4">
              {language === 'ar' 
                ? 'تشكيلات ألوان مصممة خصيصاً لتكون مريحة ومميزة لذوي أنواع عمى الألوان المختلفة'
                : 'Color palettes designed specifically for different types of color blindness'}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {colorBlindModes.map((mode) => (
                <button
                  key={mode.value}
                  className={`relative p-4 rounded-xl border-2 transition-all text-right ${
                    settings.colorBlindMode === mode.value 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50 bg-background'
                  }`}
                  onClick={() => updateSetting('colorBlindMode', mode.value)}
                >
                  <h4 className="font-cairo font-semibold text-foreground">{mode.label}</h4>
                  <p className="text-xs text-muted-foreground font-cairo mt-1">{mode.description}</p>
                  {settings.colorBlindMode === mode.value && (
                    <Check className="absolute top-2 left-2 w-4 h-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* زر إعادة التعيين */}
        <Button 
          variant="outline" 
          className="w-full gap-2"
          onClick={resetSettings}
        >
          <RotateCcw className="w-4 h-4" />
          {t.settings.reset}
        </Button>
      </div>
    </ScrollArea>
  );
};

export default SettingsPage;
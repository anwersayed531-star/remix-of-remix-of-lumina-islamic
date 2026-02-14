import { useState, useEffect, useCallback } from 'react';

export type ThemeMode = 'light' | 'dark' | 'auto';
export type PrimaryColor = 'green' | 'gold' | 'blue' | 'purple' | 'red' | 'teal' | 'orange' | 'pink' | 'indigo' | 'brown';
export type FontSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
export type FontFamily = 'cairo' | 'amiri' | 'tajawal' | 'almarai' | 'noto-naskh' | 'noto-sans' | 'lateef' | 'scheherazade' | 'readex' | 'changa' | 'messiri' | 'mada' | 'reem-kufi' | 'markazi' | 'harmattan' | 'aref-ruqaa';
export type NavPosition = 'bottom' | 'right' | 'left';
export type BackgroundStyle = 'solid' | 'pattern' | 'gradient-subtle' | 'pattern-geometric' | 'pattern-stars' | 'pattern-arabesque' | 'pattern-hexagon' | 'pattern-diamonds' | 'pattern-mosaic' | 'pattern-circles' | 'gradient-sunset' | 'gradient-ocean' | 'gradient-forest' | 'gradient-royal' | 'gradient-gold' | 'gradient-rose';
export type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
export type BorderRadius = 'none' | 'small' | 'medium' | 'large' | 'full';
export type Spacing = 'compact' | 'normal' | 'spacious';

export interface ThemeSettings {
  mode: ThemeMode;
  primaryColor: PrimaryColor;
  fontSize: FontSize;
  fontFamily: FontFamily;
  navPosition: NavPosition;
  backgroundStyle: BackgroundStyle;
  colorBlindMode: ColorBlindMode;
  borderRadius: BorderRadius;
  spacing: Spacing;
  fontWeight: 'light' | 'normal' | 'bold';
  lineHeight: 'tight' | 'normal' | 'relaxed';
  letterSpacing: 'tight' | 'normal' | 'wide';
  animations: boolean;
  highContrast: boolean;
}

const defaultSettings: ThemeSettings = {
  mode: 'light',
  primaryColor: 'green',
  fontSize: 'medium',
  fontFamily: 'cairo',
  navPosition: 'bottom',
  backgroundStyle: 'pattern',
  colorBlindMode: 'none',
  borderRadius: 'medium',
  spacing: 'normal',
  fontWeight: 'normal',
  lineHeight: 'normal',
  letterSpacing: 'normal',
  animations: true,
  highContrast: false,
};

const PRIMARY_COLORS = {
  green: { h: 150, s: 60, l: 35 },
  gold: { h: 45, s: 80, l: 50 },
  blue: { h: 210, s: 70, l: 50 },
  purple: { h: 270, s: 60, l: 50 },
  red: { h: 0, s: 70, l: 50 },
  teal: { h: 175, s: 65, l: 40 },
  orange: { h: 25, s: 85, l: 55 },
  pink: { h: 330, s: 70, l: 55 },
  indigo: { h: 240, s: 65, l: 50 },
  brown: { h: 25, s: 50, l: 40 },
};

// ألوان مخصصة لذوي عمى الألوان
const COLOR_BLIND_PALETTES = {
  none: PRIMARY_COLORS,
  protanopia: { // عمى اللون الأحمر
    green: { h: 210, s: 70, l: 45 },
    gold: { h: 50, s: 90, l: 55 },
    blue: { h: 220, s: 80, l: 50 },
    purple: { h: 260, s: 70, l: 55 },
    red: { h: 45, s: 80, l: 50 },
    teal: { h: 200, s: 75, l: 45 },
    orange: { h: 55, s: 85, l: 50 },
    pink: { h: 280, s: 60, l: 55 },
    indigo: { h: 230, s: 70, l: 50 },
    brown: { h: 40, s: 60, l: 45 },
  },
  deuteranopia: { // عمى اللون الأخضر
    green: { h: 200, s: 75, l: 45 },
    gold: { h: 48, s: 95, l: 55 },
    blue: { h: 225, s: 85, l: 50 },
    purple: { h: 280, s: 65, l: 55 },
    red: { h: 35, s: 85, l: 50 },
    teal: { h: 195, s: 80, l: 45 },
    orange: { h: 40, s: 90, l: 50 },
    pink: { h: 300, s: 55, l: 55 },
    indigo: { h: 235, s: 75, l: 50 },
    brown: { h: 30, s: 65, l: 45 },
  },
  tritanopia: { // عمى اللون الأزرق
    green: { h: 160, s: 70, l: 40 },
    gold: { h: 30, s: 85, l: 55 },
    blue: { h: 190, s: 60, l: 45 },
    purple: { h: 330, s: 70, l: 50 },
    red: { h: 0, s: 75, l: 50 },
    teal: { h: 170, s: 65, l: 42 },
    orange: { h: 20, s: 90, l: 52 },
    pink: { h: 345, s: 65, l: 55 },
    indigo: { h: 200, s: 50, l: 48 },
    brown: { h: 15, s: 55, l: 42 },
  },
};

const FONT_SIZES = {
  xsmall: '12px',
  small: '14px',
  medium: '16px',
  large: '18px',
  xlarge: '20px',
  xxlarge: '24px',
};

const FONT_FAMILIES = {
  cairo: "'Cairo', sans-serif",
  amiri: "'Amiri', serif",
  tajawal: "'Tajawal', sans-serif",
  almarai: "'Almarai', sans-serif",
  'noto-naskh': "'Noto Naskh Arabic', serif",
  'noto-sans': "'Noto Sans Arabic', sans-serif",
  lateef: "'Lateef', serif",
  scheherazade: "'Scheherazade New', serif",
  readex: "'Readex Pro', sans-serif",
  changa: "'Changa', sans-serif",
  messiri: "'El Messiri', sans-serif",
  mada: "'Mada', sans-serif",
  'reem-kufi': "'Reem Kufi', sans-serif",
  markazi: "'Markazi Text', serif",
  harmattan: "'Harmattan', sans-serif",
  'aref-ruqaa': "'Aref Ruqaa', serif",
};

const BORDER_RADIUS = {
  none: '0',
  small: '0.25rem',
  medium: '0.75rem',
  large: '1.25rem',
  full: '9999px',
};

const SPACING = {
  compact: '0.75',
  normal: '1',
  spacious: '1.25',
};

const FONT_WEIGHTS = {
  light: '300',
  normal: '400',
  bold: '600',
};

const LINE_HEIGHTS = {
  tight: '1.25',
  normal: '1.5',
  relaxed: '1.75',
};

const LETTER_SPACINGS = {
  tight: '-0.025em',
  normal: '0',
  wide: '0.05em',
};

export const useTheme = () => {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    const saved = localStorage.getItem('themeSettings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  const applyTheme = useCallback((newSettings: ThemeSettings) => {
    const root = document.documentElement;
    
    // تطبيق الوضع (فاتح/داكن)
    if (newSettings.mode === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else {
      root.classList.toggle('dark', newSettings.mode === 'dark');
    }
    
    // تطبيق اللون الرئيسي مع مراعاة عمى الألوان
    const palette = COLOR_BLIND_PALETTES[newSettings.colorBlindMode];
    const color = palette[newSettings.primaryColor];
    root.style.setProperty('--primary', `${color.h} ${color.s}% ${color.l}%`);
    root.style.setProperty('--ring', `${color.h} ${color.s}% ${color.l}%`);
    root.style.setProperty('--islamic-green', `${color.h} ${color.s}% ${color.l}%`);
    
    // تطبيق حجم الخط
    root.style.setProperty('--font-size-base', FONT_SIZES[newSettings.fontSize]);
    document.body.style.fontSize = FONT_SIZES[newSettings.fontSize];
    
    // تطبيق نوع الخط
    document.body.style.fontFamily = FONT_FAMILIES[newSettings.fontFamily];
    
    // تطبيق موضع شريط التنقل
    root.setAttribute('data-nav-position', newSettings.navPosition);
    
    // تطبيق نمط الخلفية
    root.setAttribute('data-background-style', newSettings.backgroundStyle);
    
    // تطبيق وضع عمى الألوان
    root.setAttribute('data-color-blind-mode', newSettings.colorBlindMode);
    
    // تطبيق حجم الحواف
    root.style.setProperty('--radius', BORDER_RADIUS[newSettings.borderRadius]);
    
    // تطبيق التباعد
    root.style.setProperty('--spacing-multiplier', SPACING[newSettings.spacing]);
    
    // تطبيق وزن الخط
    root.style.setProperty('--font-weight-base', FONT_WEIGHTS[newSettings.fontWeight]);
    document.body.style.fontWeight = FONT_WEIGHTS[newSettings.fontWeight];
    
    // تطبيق ارتفاع السطر
    root.style.setProperty('--line-height-base', LINE_HEIGHTS[newSettings.lineHeight]);
    document.body.style.lineHeight = LINE_HEIGHTS[newSettings.lineHeight];
    
    // تطبيق تباعد الأحرف
    root.style.setProperty('--letter-spacing-base', LETTER_SPACINGS[newSettings.letterSpacing]);
    document.body.style.letterSpacing = LETTER_SPACINGS[newSettings.letterSpacing];
    
    // تطبيق الحركات
    root.setAttribute('data-animations', newSettings.animations ? 'true' : 'false');
    if (!newSettings.animations) {
      root.style.setProperty('--transition-duration', '0ms');
    } else {
      root.style.removeProperty('--transition-duration');
    }
    
    // تطبيق التباين العالي
    if (newSettings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, []);

  useEffect(() => {
    applyTheme(settings);
    localStorage.setItem('themeSettings', JSON.stringify(settings));
  }, [settings, applyTheme]);

  useEffect(() => {
    if (settings.mode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme(settings);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [settings, applyTheme]);

  const updateSetting = <K extends keyof ThemeSettings>(
    key: K,
    value: ThemeSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return {
    settings,
    updateSetting,
    resetSettings,
  };
};

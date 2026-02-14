import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { getTranslation, TranslationKeys } from '@/lib/translations';
import { getLanguageByCode, Language } from '@/lib/languages';

interface LanguageContextType {
  language: string;
  setLanguage: (code: string) => void;
  t: TranslationKeys;
  currentLanguage: Language | undefined;
  direction: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<string>(() => {
    return localStorage.getItem('appLanguage') || 'ar';
  });

  const setLanguage = useCallback((code: string) => {
    setLanguageState(code);
    localStorage.setItem('appLanguage', code);
    
    // تغيير اتجاه الصفحة حسب اللغة
    const lang = getLanguageByCode(code);
    if (lang) {
      document.documentElement.dir = lang.direction;
      document.documentElement.lang = code;
    }
  }, []);

  useEffect(() => {
    const lang = getLanguageByCode(language);
    if (lang) {
      document.documentElement.dir = lang.direction;
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = getTranslation(language);
  const currentLanguage = getLanguageByCode(language);
  const direction = currentLanguage?.direction || 'rtl';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currentLanguage, direction }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

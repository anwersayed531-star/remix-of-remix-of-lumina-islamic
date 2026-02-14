// نظام الترجمات المركزي
import { ar, TranslationKeys } from './ar';
import { en } from './en';
import { ur } from './ur';
import { id } from './id';
import { tr } from './tr';
import { fr } from './fr';
import { fa } from './fa';
import { bn } from './bn';
import { ms } from './ms';
import { sw } from './sw';
import { hi } from './hi';
import { pa } from './pa';
import { sd } from './sd';
import { ks } from './ks';
import { ps } from './ps';
import { gu } from './gu';
import { ml } from './ml';
import { ta } from './ta';
import { te } from './te';
import { mr } from './mr';
import { jv } from './jv';
import { su } from './su';
import { az } from './az';
import { uz } from './uz';
import { kk } from './kk';
import { ky } from './ky';
import { tg } from './tg';
import { ug } from './ug';
import { ha } from './ha';
import { so } from './so';
import { yo } from './yo';
import { am } from './am';
import { sq } from './sq';
import { bs } from './bs';
import { ru } from './ru';
import { ne } from './ne';
import { tl } from './tl';
import { th } from './th';
import { km } from './km';
import { vi } from './vi';
import { my } from './my';
import { tk } from './tk';
import { tt } from './tt';
import { ff } from './ff';
import { wo } from './wo';
import { om } from './om';
import { de } from './de';
import { es } from './es';
import { it } from './it';
import { pt } from './pt';
import { nl } from './nl';
import { pl } from './pl';
import { sv } from './sv';
import { no } from './no';
import { da } from './da';
import { fi } from './fi';
import { hu } from './hu';
import { ro } from './ro';
import { bg } from './bg';
import { uk } from './uk';
import { el } from './el';
import { zh } from './zh';
import { ko } from './ko';
import { ja } from './ja';

// Deep merge function - merges partial translation with Arabic defaults
function deepMerge(target: any, source: any): any {
  const result = { ...target };
  for (const key of Object.keys(target)) {
    if (source && key in source) {
      if (typeof target[key] === 'object' && target[key] !== null && typeof source[key] === 'object' && source[key] !== null) {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  return result;
}

// جميع الترجمات المتاحة (partial - will be merged with ar defaults)
const rawTranslations: Record<string, any> = {
  ar, en, ur, id, tr, fr, fa, bn, ms, sw,
  hi, pa, sd, ks, ps, gu, ml, ta, te, mr,
  jv, su, az, uz, kk, ky, tg, ug, ha, so,
  yo, am, sq, bs, ru,
  ne, tl, th, km, vi, my, tk, tt, ff, wo, om,
  de, es, it, pt, nl, pl, sv, no, da, fi, hu, ro,
  bg, uk, el, zh, ko, ja,
};

// Merged translations cache
const mergedCache: Record<string, TranslationKeys> = {};

// الحصول على ترجمة بلغة معينة (with Arabic fallback for missing keys)
export const getTranslation = (langCode: string): TranslationKeys => {
  if (langCode === 'ar') return ar;
  if (mergedCache[langCode]) return mergedCache[langCode];
  
  const raw = rawTranslations[langCode];
  if (!raw) return ar;
  
  const merged = deepMerge(ar, raw) as TranslationKeys;
  mergedCache[langCode] = merged;
  return merged;
};

// التحقق من وجود ترجمة للغة
export const hasTranslation = (langCode: string): boolean => {
  return langCode in rawTranslations;
};

// قائمة اللغات المترجمة بالكامل
export const fullyTranslatedLanguages = Object.keys(rawTranslations);

export type { TranslationKeys };

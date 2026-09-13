import type { TranslationKeys } from './ar';

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/** Language files may translate only part of the keys; the rest falls back to Arabic. */
export type PartialTranslation = DeepPartial<TranslationKeys>;

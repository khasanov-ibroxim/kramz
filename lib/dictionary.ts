import type { Locale } from '@/i18n-config';

import type { HomeDictionary as HomeDictionaryType } from '@/lib/types';

const validLocales = ['uz', 'ru', 'en'];
// ── Loaders ──────────────────────────────────────────────────────────────────

export const getCommonDictionary = async (locale: Locale) =>
    (await import(`@/dictionaries/common/${locale}.json`)).default;

export const getHomeDictionary = async (locale: Locale) => {
    const safeLocale = validLocales.includes(locale) ? locale : 'uz';

    return (await import(`@/dictionaries/home/${safeLocale}.json`)).default;
};

export const getAboutDictionary = async (locale: Locale) =>
    (await import(`@/dictionaries/about/${locale}.json`)).default;

export const getProductionDictionary = async (locale: Locale) =>
    (await import(`@/dictionaries/production/${locale}.json`)).default;

export const getContactDictionary = async (locale: Locale) =>
    (await import(`@/dictionaries/contact/${locale}.json`)).default;

// ── Types ─────────────────────────────────────────────────────────────────────

export type CommonDictionary    = Awaited<ReturnType<typeof getCommonDictionary>>;
export type HomeDictionary = HomeDictionaryType;
export type AboutDictionary     = Awaited<ReturnType<typeof getAboutDictionary>>;
export type ProductionDictionary = Awaited<ReturnType<typeof getProductionDictionary>>;
export type ContactDictionary   = Awaited<ReturnType<typeof getContactDictionary>>;
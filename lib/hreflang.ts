import { Locale } from '@/i18n-config';

const baseUrl = 'https://gurlanglobalteks.uz';

export function generateHreflangLinks(lang: Locale, path: string = '') {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return {
    canonical: `${baseUrl}/${lang}/${cleanPath}`,
    languages: {
      'ru': `${baseUrl}/ru/${cleanPath}`,
      'en': `${baseUrl}/en/${cleanPath}`,
      'x-default': `${baseUrl}/ru/${cleanPath}`, // Default to Russian
    }
  };
}

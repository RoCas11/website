import i18nConfig from '@content/config/i18n.json';

export type Locale = 'es' | 'en' | 'pt';
export type TranslationKey = string;

const translations = i18nConfig as Record<Locale, Record<string, any>>;

export function t(locale: Locale, keyPath: string): string {
  const keys = keyPath.split('.');
  let value: any = translations[locale];
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      value = translations['es'];
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return keyPath;
        }
      }
      break;
    }
  }
  
  return typeof value === 'string' ? value : keyPath;
}

export function getSection(locale: Locale, section: string): Record<string, string> {
  const sectionData = translations[locale]?.[section];
  return typeof sectionData === 'object' ? sectionData : {};
}

export function getLocaleFromPath(path: string): Locale {
  const segments = path.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment === 'en' || firstSegment === 'pt') {
    return firstSegment as Locale;
  }
  
  return 'es';
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.replace(/^\/(es|en|pt)/, '');
  
  if (locale === 'es') {
    return cleanPath || '/';
  }
  
  return `/${locale}${cleanPath || ''}`;
}

export function getLocales(): Locale[] {
  return ['es', 'en', 'pt'];
}

export function getLocaleDisplayName(locale: Locale): string {
  const names: Record<Locale, string> = {
    es: 'Español',
    en: 'English',
    pt: 'Português'
  };
  return names[locale];
}

export function getLocaleFlag(locale: Locale): string {
  const flags: Record<Locale, string> = {
    es: '🇪🇸',
    en: '🇺🇸',
    pt: '🇧🇷'
  };
  return flags[locale];
}

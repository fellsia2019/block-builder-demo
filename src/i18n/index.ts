import { en } from './messages/en';
import { ru } from './messages/ru';
import type { Locale, MessageKey, Messages } from './types';

export type { Locale, MessageKey, Messages };

const STORAGE_KEY = 'locale';

const messages: Record<Locale, Messages> = { ru, en };

type LocaleListener = (locale: Locale) => void;

const listeners = new Set<LocaleListener>();

function detectBrowserLocale(): Locale {
  const lang = navigator.language.toLowerCase();
  return lang.startsWith('ru') ? 'ru' : 'en';
}

export function getLocale(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'ru' || saved === 'en') {
    return saved;
  }
  return detectBrowserLocale();
}

export function setLocale(locale: Locale): void {
  const current = getLocale();
  if (current === locale) {
    return;
  }
  localStorage.setItem(STORAGE_KEY, locale);
  document.documentElement.lang = locale;
  listeners.forEach((listener) => listener(locale));
}

export function subscribe(listener: LocaleListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function t(key: MessageKey, locale: Locale = getLocale()): string {
  return messages[locale][key] ?? messages.ru[key] ?? key;
}

export function initLocale(): Locale {
  const locale = getLocale();
  document.documentElement.lang = locale;
  return locale;
}

export function getDemoThemeOptions(locale: Locale = getLocale()) {
  return [
    { id: 'default', label: t('demo.theme.default', locale) },
    { id: 'dark', label: t('demo.theme.dark', locale) },
    { id: 'custom', label: t('demo.theme.custom', locale) },
  ];
}

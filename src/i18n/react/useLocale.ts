import { useEffect, useState } from 'react';
import { getLocale, subscribe, t, type Locale, type MessageKey } from '../index';

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(getLocale);

  useEffect(() => subscribe(setLocaleState), []);

  return {
    locale,
    t: (key: MessageKey) => t(key, locale),
  };
}

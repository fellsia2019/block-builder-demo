import { onUnmounted, ref } from 'vue';
import { getLocale, subscribe, t, type Locale, type MessageKey } from '../index';

export function useLocale() {
  const locale = ref<Locale>(getLocale());
  const unsubscribe = subscribe((next) => {
    locale.value = next;
  });

  onUnmounted(unsubscribe);

  return {
    locale,
    t: (key: MessageKey) => t(key, locale.value),
  };
}

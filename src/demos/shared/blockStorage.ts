/** Запас до лимита localStorage (~5 MB в большинстве браузеров) */
const LOCAL_STORAGE_SAFE_BYTES = 4 * 1024 * 1024;

function isDataUrl(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('data:');
}

/**
 * Убирает base64/data URL из props — они не помещаются в localStorage.
 * HTTP(S) URL и остальные поля сохраняются.
 */
export function stripDataUrlsForStorage<T>(value: T): T {
  if (isDataUrl(value)) {
    return '' as T;
  }

  if (Array.isArray(value)) {
    return value.map(stripDataUrlsForStorage) as T;
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, stripDataUrlsForStorage(nested)])
    ) as T;
  }

  return value;
}

export function loadBlocksFromLocalStorage(storageKey: string): unknown[] {
  try {
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      return JSON.parse(savedData) as unknown[];
    }
  } catch (error) {
    console.error('Ошибка загрузки блоков:', error);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  }

  return [];
}

export type SaveBlocksResult =
  | { ok: true; strippedImages?: boolean }
  | { ok: false; error: Error };

export function saveBlocksToLocalStorage(
  storageKey: string,
  blocks: unknown[]
): SaveBlocksResult {
  try {
    const json = JSON.stringify(blocks);

    if (json.length <= LOCAL_STORAGE_SAFE_BYTES) {
      localStorage.setItem(storageKey, json);
      return { ok: true };
    }

    const stripped = stripDataUrlsForStorage(blocks);
    const strippedJson = JSON.stringify(stripped);

    if (strippedJson.length > LOCAL_STORAGE_SAFE_BYTES) {
      return {
        ok: false,
        error: new Error(
          'Слишком много данных для localStorage. Сохраните на сервер или удалите часть блоков.'
        ),
      };
    }

    localStorage.setItem(storageKey, strippedJson);
    return { ok: true, strippedImages: true };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      try {
        const stripped = stripDataUrlsForStorage(blocks);
        localStorage.setItem(storageKey, JSON.stringify(stripped));
        return { ok: true, strippedImages: true };
      } catch (retryError) {
        return { ok: false, error: retryError instanceof Error ? retryError : (error as Error) };
      }
    }

    return { ok: false, error: error instanceof Error ? error : new Error(String(error)) };
  }
}

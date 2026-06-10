/** Извлечение id/name из значения api-select (id, строка/число или { id, name }). */

export function getApiSelectId(value: unknown): string | number | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  if (typeof value === 'object' && value !== null && 'id' in value) {
    const id = (value as { id: unknown }).id;
    if (typeof id === 'string' || typeof id === 'number') {
      return id;
    }
    return null;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }

  return null;
}

export function getApiSelectName(value: unknown): string {
  if (typeof value === 'object' && value !== null && 'name' in value) {
    const name = (value as { name: unknown }).name;
    if (typeof name === 'string' && name) {
      return name;
    }
  }

  const id = getApiSelectId(value);
  return id !== null ? String(id) : '';
}

export function getApiSelectEntries(values: unknown): Array<{ id: string | number; name: string }> {
  if (!Array.isArray(values)) {
    return [];
  }

  return values
    .map(entry => {
      const id = getApiSelectId(entry);
      if (id === null) {
        return null;
      }
      return { id, name: getApiSelectName(entry) };
    })
    .filter((entry): entry is { id: string | number; name: string } => entry !== null);
}

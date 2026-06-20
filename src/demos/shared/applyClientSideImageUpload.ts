/**
 * На Vercel нет Vite mock API — /api/upload отдаёт 405.
 * Без uploadUrl block-builder читает файл через FileReader (base64/data URL) на клиенте.
 */

interface IFieldLike {
  type?: string;
  fields?: IFieldLike[];
  repeaterConfig?: { fields?: IFieldLike[] };
  fileUploadConfig?: Record<string, unknown>;
}

function patchUploadField(field: IFieldLike): void {
  // Только image: без uploadUrl — base64 на клиенте. file требует uploadUrl (или block-builder 1.5.6+).
  if (field.type !== 'image' || !field.fileUploadConfig) {
    return;
  }

  const { maxFileSize, accept, maxCount } = field.fileUploadConfig;
  field.fileUploadConfig = {
    ...(maxFileSize !== undefined ? { maxFileSize } : {}),
    ...(accept ? { accept } : {}),
    ...(maxCount !== undefined ? { maxCount } : {}),
  };
}

function patchFields(fields: IFieldLike[] | undefined): void {
  fields?.forEach(field => {
    patchUploadField(field);
    patchFields(field.repeaterConfig?.fields);
    patchFields(field.fields);
  });
}

/** Патчит конфиги на месте (в них есть функции — structuredClone не подходит). */
export function applyClientSideImageUpload<T extends Record<string, { fields?: IFieldLike[] }>>(
  configs: T
): T {
  Object.values(configs).forEach(config => {
    patchFields(config.fields);
  });
  return configs;
}

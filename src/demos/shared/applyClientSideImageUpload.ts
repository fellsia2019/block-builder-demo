/**
 * На Vercel нет Vite mock API — /api/upload отдаёт 405.
 * Без uploadUrl block-builder читает файл через FileReader (base64) на клиенте.
 */

interface IFieldLike {
  type?: string;
  fields?: IFieldLike[];
  repeaterConfig?: { fields?: IFieldLike[] };
  imageUploadConfig?: Record<string, unknown>;
}

function patchImageField(field: IFieldLike): void {
  if (field.type !== 'image' || !field.imageUploadConfig) {
    return;
  }

  const { maxFileSize, accept } = field.imageUploadConfig;
  field.imageUploadConfig = {
    ...(maxFileSize !== undefined ? { maxFileSize } : {}),
    ...(accept ? { accept } : {}),
  };
}

function patchFields(fields: IFieldLike[] | undefined): void {
  fields?.forEach(field => {
    patchImageField(field);
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

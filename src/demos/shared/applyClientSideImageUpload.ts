/**
 * На Vercel нет Vite mock API — /api/upload отдаёт 405.
 * Без uploadUrl block-builder читает файл через FileReader (base64/data URL) на клиенте.
 */

interface IFieldLike {
  type?: string;
  fields?: IFieldLike[];
  repeaterConfig?: { fields?: IFieldLike[] };
  fileUploadConfig?: Record<string, unknown>;
  matrixTableConfig?: { imageUploadConfig?: Record<string, unknown> };
}

function patchUploadConfig(
  config: Record<string, unknown> | undefined
): Record<string, unknown> | undefined {
  if (!config) {
    return config;
  }

  const { maxFileSize, accept, maxCount } = config;
  return {
    ...(maxFileSize !== undefined ? { maxFileSize } : {}),
    ...(accept ? { accept } : {}),
    ...(maxCount !== undefined ? { maxCount } : {}),
  };
}

function patchUploadField(field: IFieldLike): void {
  if (field.type === 'image' && field.fileUploadConfig) {
    field.fileUploadConfig = patchUploadConfig(field.fileUploadConfig) ?? {};
  }

  if (field.type === 'matrix-table' && field.matrixTableConfig?.imageUploadConfig) {
    field.matrixTableConfig.imageUploadConfig =
      patchUploadConfig(field.matrixTableConfig.imageUploadConfig) ?? {};
  }
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

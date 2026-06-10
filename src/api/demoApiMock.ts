/**
 * Mock API для demo-bb (Vercel + dev): один JSON /mock/api-select.json, поиск и пагинация на клиенте.
 */
import type {
  IHttpClient,
  IHttpResponse,
  IHttpRequestOptions,
  IApiRequestParams,
} from '@mushket-co/block-builder/BlockBuilderFactory';

const MOCK_DATA_URL = '/mock/api-select.json';
const MOCK_LATENCY_MS = 200;

interface IDemoRecord {
  id: number | string;
  name: string;
  title?: string;
  description?: string;
  date?: string;
  [key: string]: unknown;
}

let datasetCache: IDemoRecord[] | null = null;

function isDemoApiUrl(url: string): boolean {
  const path = url.replace(/^https?:\/\/[^/]+/, '');
  return (
    path.includes('/api/items') ||
    path.includes('/api/news') ||
    path.includes('/api/articles') ||
    path.includes('/mock/api-select')
  );
}

async function loadDataset(): Promise<IDemoRecord[]> {
  if (datasetCache) {
    return datasetCache;
  }

  const response = await fetch(MOCK_DATA_URL);
  if (!response.ok) {
    throw new Error(`Не удалось загрузить mock-данные: ${MOCK_DATA_URL}`);
  }

  const json = (await response.json()) as { data?: IDemoRecord[] };
  datasetCache = Array.isArray(json.data) ? json.data : [];
  return datasetCache;
}

function filterRecords(records: IDemoRecord[], search: string): IDemoRecord[] {
  if (!search) {
    return records;
  }

  const query = search.toLowerCase();
  return records.filter(
    item =>
      item.name.toLowerCase().includes(query) ||
      item.title?.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query)
  );
}

function buildListResponse(
  records: IDemoRecord[],
  page: number,
  limit: number
): Record<string, unknown> {
  const start = (page - 1) * limit;
  const end = start + limit;
  const pageItems = records.slice(start, end);
  const hasMore = end < records.length;

  return {
    data: pageItems,
    total: records.length,
    page,
    hasMore,
    pagination: {
      total: records.length,
      page,
      limit,
      hasMore,
    },
  };
}

export async function fetchDemoApiList(
  options: { search?: string; page?: number; limit?: number } = {}
): Promise<{ data: IDemoRecord[] }> {
  const all = await loadDataset();
  const filtered = filterRecords(all, options.search ?? '');
  const page = options.page ?? 1;
  const limit = options.limit ?? filtered.length;
  const response = buildListResponse(filtered, page, limit);

  return { data: response.data as IDemoRecord[] };
}

export class DemoHttpClient implements IHttpClient {
  async request<T = unknown>(options: IHttpRequestOptions): Promise<IHttpResponse<T>> {
    const { url, method = 'GET', params, data } = options;

    if (method === 'GET') {
      return this.get<T>(url, params, options.headers);
    }

    return this.post<T>(url, data, options.headers);
  }

  async get<T = unknown>(
    url: string,
    params?: IApiRequestParams,
    headers?: Record<string, string>
  ): Promise<IHttpResponse<T>> {
    await new Promise(resolve => setTimeout(resolve, MOCK_LATENCY_MS));

    if (!isDemoApiUrl(url)) {
      throw new Error(`DemoHttpClient: неизвестный URL ${url}`);
    }

    const search = String(params?.search ?? params?.q ?? '');
    const page = Number(params?.page ?? 1);
    const limit = Number(params?.limit ?? 10);
    const all = await loadDataset();
    const filtered = filterRecords(all, search);
    const body = buildListResponse(filtered, page, limit);

    return {
      data: body as T,
      status: 200,
      statusText: 'OK',
      headers: headers ?? {},
    };
  }

  async post<T = unknown>(
    url: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<IHttpResponse<T>> {
    await new Promise(resolve => setTimeout(resolve, MOCK_LATENCY_MS));

    if (url.includes('/api/upload')) {
      const mockUrl = 'https://via.placeholder.com/400x300?text=Uploaded';
      return {
        data: { url: mockUrl, data: { url: mockUrl }, success: true } as T,
        status: 200,
        statusText: 'OK',
        headers: headers ?? {},
      };
    }

    return {
      data: { success: true, data } as T,
      status: 200,
      statusText: 'OK',
      headers: headers ?? {},
    };
  }
}

export { DemoHttpClient as MockHttpClient };

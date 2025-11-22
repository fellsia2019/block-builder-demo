/**
 * Мок API для демонстрации api-select поля
 */
import type { IHttpClient, IHttpResponse, IHttpRequestOptions } from '@mushket-co/block-builder/BlockBuilderFactory';
import type { IApiRequestParams } from '@mushket-co/block-builder/BlockBuilderFactory';

export interface MockApiSelectItem {
  id: string | number;
  name: string;
  description?: string;
  meta?: Record<string, any>;
}

// Мок данные
const mockData: MockApiSelectItem[] = [
  { id: 1, name: 'JavaScript', description: 'Язык программирования для веб-разработки', meta: { type: 'language', popularity: 'high' } },
  { id: 2, name: 'TypeScript', description: 'Типизированный JavaScript', meta: { type: 'language', popularity: 'high' } },
  { id: 3, name: 'Vue.js', description: 'Прогрессивный JavaScript фреймворк', meta: { type: 'framework', popularity: 'high' } },
  { id: 4, name: 'React', description: 'Библиотека для создания пользовательских интерфейсов', meta: { type: 'library', popularity: 'very-high' } },
  { id: 5, name: 'Angular', description: 'Платформа для веб-приложений', meta: { type: 'framework', popularity: 'medium' } },
  { id: 6, name: 'Svelte', description: 'Компилируемый UI фреймворк', meta: { type: 'framework', popularity: 'medium' } },
  { id: 7, name: 'Next.js', description: 'React фреймворк для продакшна', meta: { type: 'framework', popularity: 'high' } },
  { id: 8, name: 'Nuxt.js', description: 'Vue.js фреймворк для продакшна', meta: { type: 'framework', popularity: 'medium' } },
  { id: 9, name: 'Node.js', description: 'JavaScript runtime для сервера', meta: { type: 'runtime', popularity: 'very-high' } },
  { id: 10, name: 'Express', description: 'Минималистичный веб-фреймворк для Node.js', meta: { type: 'framework', popularity: 'high' } },
];

/**
 * Мок HTTP клиента для ApiSelectUseCase
 * Реализует интерфейс IHttpClient из block-builder
 */
export class MockHttpClient implements IHttpClient {
  async request<T = any>(options: IHttpRequestOptions): Promise<IHttpResponse<T>> {
    const { url, method = 'GET', params, data } = options;
    
    if (method === 'GET') {
      return this.get<T>(url, params, options.headers);
    } else {
      return this.post<T>(url, data, options.headers);
    }
  }

  async get<T = any>(
    url: string,
    params?: IApiRequestParams,
    headers?: Record<string, string>
  ): Promise<IHttpResponse<T>> {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const search = params?.search || params?.q || '';
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    
    // Фильтрация по поисковому запросу
    let filtered = mockData;
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = mockData.filter(item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower)
      );
    }
    
    // Пагинация
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = filtered.slice(start, end);
    
    // Форматируем данные в формат, который ожидает ApiSelectUseCase
    // ApiSelectUseCase ожидает структуру { data: [...], pagination: {...} }
    const formattedItems = items.map(item => ({
      id: item.id,
      name: item.name,
      ...(item.description && { description: item.description }),
      ...(item.meta && { meta: item.meta })
    }));
    
    return {
      data: {
        data: formattedItems,
        pagination: {
          page,
          limit,
          total: filtered.length,
          totalPages: Math.ceil(filtered.length / limit),
          hasMore: end < filtered.length
        }
      } as T,
      status: 200,
      statusText: 'OK',
      headers: headers || {}
    };
  }
  
  async post<T = any>(
    url: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<IHttpResponse<T>> {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Обработка загрузки изображений
    if (url === '/api/upload' || url.includes('/api/upload')) {
      // Генерируем моковый URL для загруженного изображения
      const mockImageUrl = `https://via.placeholder.com/400x300?text=Uploaded+Image`;
      
      return {
        data: {
          url: mockImageUrl,
          data: { url: mockImageUrl },
          success: true
        } as T,
        status: 200,
        statusText: 'OK',
        headers: headers || {}
      };
    }
    
    // Для остальных POST запросов просто возвращаем успех
    return {
      data: { success: true, data } as T,
      status: 200,
      statusText: 'OK',
      headers: headers || {}
    };
  }
}

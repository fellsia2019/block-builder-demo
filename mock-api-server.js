/**
 * Mock API Server для демонстрации api-select и upload функционала
 * Эмулирует бэкенд API
 */

// Моковые данные - список элементов
const mockItems = [
  { id: 1, name: 'JavaScript', description: 'Язык программирования для веб-разработки' },
  { id: 2, name: 'TypeScript', description: 'Типизированный JavaScript' },
  { id: 3, name: 'Vue.js', description: 'Прогрессивный JavaScript фреймворк' },
  { id: 4, name: 'React', description: 'Библиотека для создания пользовательских интерфейсов' },
  { id: 5, name: 'Angular', description: 'Платформа для веб-приложений' },
  { id: 6, name: 'Svelte', description: 'Компилируемый UI фреймворк' },
  { id: 7, name: 'Next.js', description: 'React фреймворк для продакшна' },
  { id: 8, name: 'Nuxt.js', description: 'Vue.js фреймворк для продакшна' },
  { id: 9, name: 'Node.js', description: 'JavaScript runtime для сервера' },
  { id: 10, name: 'Express', description: 'Минималистичный веб-фреймворк для Node.js' },
];

const mockArticles = [
  { id: 1, name: 'Статья 1: Запуск нового продукта', title: 'Запуск нового продукта', date: '2025-01-15' },
  { id: 2, name: 'Статья 2: Обновление платформы', title: 'Обновление платформы', date: '2025-01-14' },
  { id: 3, name: 'Статья 3: Новая функция в приложении', title: 'Новая функция в приложении', date: '2025-01-13' },
  { id: 4, name: 'Статья 4: Интеграция с партнерами', title: 'Интеграция с партнерами', date: '2025-01-12' },
  { id: 5, name: 'Статья 5: Успешный год компании', title: 'Успешный год компании', date: '2025-01-11' },
];

/**
 * Обработчик поиска элементов
 */
function handleItemsSearch(searchQuery, page = 1, limit = 10) {
  let filtered = mockItems;

  // Фильтрация по поисковому запросу
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = mockItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
    );
  }

  // Пагинация
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedData = filtered.slice(start, end);
  const hasMore = end < filtered.length;

  return {
    data: paginatedData,
    pagination: {
      total: filtered.length,
      page,
      limit,
      hasMore,
    },
  };
}

/**
 * Обработчик поиска статей
 */
function handleArticlesSearch(searchQuery, page = 1, limit = 10) {
  let filtered = mockArticles;

  // Фильтрация по поисковому запросу
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = mockArticles.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query)
    );
  }

  // Пагинация
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedData = filtered.slice(start, end);
  const hasMore = end < filtered.length;

  return {
    data: paginatedData,
    pagination: {
      total: filtered.length,
      page,
      limit,
      hasMore,
    },
  };
}

/**
 * Регистрация эндпоинтов для dev-server Vite
 */
export function setupMockApi(app) {
  // Обработчик для /api/items
  app.use((req, res, next) => {
    if (!req.url.startsWith('/api/items')) {
      return next();
    }

    // Парсинг query параметров
    const url = new URL(req.url, `http://${req.headers.host}`);
    const search = url.searchParams.get('search') || '';
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');

    // Обработка GET запросов
    if (req.method === 'GET') {
      setTimeout(() => {
        const result = handleItemsSearch(search, page, limit);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      }, 300);
      return;
    }

    next();
  });

  // Обработчик для /api/articles
  app.use((req, res, next) => {
    if (!req.url.startsWith('/api/articles')) {
      return next();
    }

    // Парсинг query параметров
    const url = new URL(req.url, `http://${req.headers.host}`);
    const search = url.searchParams.get('search') || '';
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');

    // Обработка GET запросов
    if (req.method === 'GET') {
      setTimeout(() => {
        const result = handleArticlesSearch(search, page, limit);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      }, 300);
      return;
    }

    next();
  });

  // Обработчик загрузки файлов /api/upload
  app.use((req, res, next) => {
    if (!req.url.startsWith('/api/upload')) {
      return next();
    }

    // Обработка только POST запросов
    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.end('Method Not Allowed');
      return;
    }

    // Простой парсер multipart/form-data (для демо)
    let body = Buffer.alloc(0);
    
    req.on('data', chunk => {
      body = Buffer.concat([body, chunk]);
    });

    req.on('end', () => {
      // Эмулируем задержку загрузки
      setTimeout(() => {
        // Генерируем фиктивный URL - в реальности файл сохранялся бы на сервере
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(7);
        const mockUrl = `/uploads/${timestamp}-${randomId}.jpg`;
        
        // Возвращаем URL загруженного файла как объект
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ url: mockUrl }));
      }, 500);
    });
  });
}


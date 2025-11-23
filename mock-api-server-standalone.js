/**
 * Standalone Mock API Server для production
 * Запускается как отдельный Express сервер
 */

import express from 'express';
import multer from 'multer';

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

const app = express();
const PORT = process.env.MOCK_API_PORT || 3000;

// Middleware для парсинга JSON
app.use(express.json());

// Middleware для CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Обработчик для /api/items
app.get('/api/items', (req, res) => {
  const search = req.query.search || '';
  const page = parseInt(req.query.page || '1');
  const limit = parseInt(req.query.limit || '10');

  setTimeout(() => {
    const result = handleItemsSearch(search, page, limit);
    res.json(result);
  }, 300);
});

// Обработчик для /api/articles
app.get('/api/articles', (req, res) => {
  const search = req.query.search || '';
  const page = parseInt(req.query.page || '1');
  const limit = parseInt(req.query.limit || '10');

  setTimeout(() => {
    const result = handleArticlesSearch(search, page, limit);
    res.json(result);
  }, 300);
});

// Настройка multer для обработки multipart/form-data
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

// Обработчик загрузки файлов /api/upload
app.post('/api/upload', upload.single('file'), (req, res) => {
  // Эмулируем задержку загрузки
  setTimeout(() => {
    // Генерируем фиктивный URL - в реальности файл сохранялся бы на сервере
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(7);
    const mockUrl = `/uploads/${timestamp}-${randomId}.jpg`;
    
    // Возвращаем URL загруженного файла как объект
    res.json({ url: mockUrl });
  }, 500);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Mock API Server running on port ${PORT}`);
});


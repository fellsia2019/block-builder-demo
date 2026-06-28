// Импортируем глобальные стили
import './styles/theme.css';
import './demos/shared/blockBuilderGlass.css';
import { createNavBar } from './components/NavBar';
import { getLocale, initLocale, subscribe, t } from './i18n';

initLocale();

// Главный роутер для демо
const routes = {
  '/': () => import('./pages/Home.ts'),
  '/vue3': () => import('./pages/Vue3Demo.ts'),
  '/react': () => import('./pages/ReactDemo.ts'),
};

// Create and insert navbar
const nav = createNavBar();
document.body.insertBefore(nav, document.body.firstChild);

async function loadPage() {
  const path = window.location.pathname;
  const route = (routes as Record<string, () => Promise<any>>)[path] || routes['/'];
  
  try {
    const module = await route();
    const page = module.default;
    const app = document.getElementById('app');
    if (app && page) {
      app.innerHTML = '';
      page(app);
    }
  } catch (error) {
    console.error('Error loading page:', error);
    const app = document.getElementById('app');
    if (app) {
      const locale = getLocale();
      app.innerHTML = `
        <div class="error-container" style="padding: 3rem; text-align: center;">
          <h2 style="color: var(--error); margin-bottom: 1rem;">${t('error.loadTitle', locale)}</h2>
          <p style="color: var(--text-secondary);">${error}</p>
        </div>
      `;
    }
  }
}

// Обработка навигации
window.addEventListener('popstate', loadPage);
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const href = target.getAttribute('href');
  if (target.tagName === 'A' && href?.startsWith('/')) {
    e.preventDefault();
    window.history.pushState({}, '', href);
    loadPage();
  }
});

subscribe(() => {
  loadPage();
});

// Загрузка начальной страницы
loadPage();

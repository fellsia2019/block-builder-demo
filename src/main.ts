// Импортируем глобальные стили
import './styles/theme.css';
import { createNavBar } from './components/NavBar';

// Главный роутер для демо
const routes = {
  '/': () => import('./pages/Home.ts'),
  '/vue3': () => import('./pages/Vue3Demo.ts'),
  '/pure-js': () => import('./pages/PureJsDemo.ts'),
  '/react': () => import('./pages/ReactDemo.ts'),
};

// Create and insert navbar
const nav = createNavBar();
document.body.insertBefore(nav, document.body.firstChild);

async function loadPage() {
  const path = window.location.pathname;
  const route = routes[path] || routes['/'];
  
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
      app.innerHTML = `
        <div class="error-container" style="padding: 3rem; text-align: center;">
          <h2 style="color: var(--error); margin-bottom: 1rem;">Ошибка загрузки</h2>
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
  if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('/')) {
    e.preventDefault();
    window.history.pushState({}, '', target.getAttribute('href'));
    loadPage();
  }
});

// Загрузка начальной страницы
loadPage();

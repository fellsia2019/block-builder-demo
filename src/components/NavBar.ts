import { createThemeToggle } from './ThemeToggle';

export function createNavBar(): HTMLElement {
  const nav = document.createElement('nav');
  nav.className = 'demo-nav';
  
  // Определяем текущую тему и выбираем соответствующий логотип
  const getTheme = (): 'light' | 'dark' => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  
  const logoSrc = getTheme() === 'dark' ? '/logo-inverse.svg' : '/logo-default.svg';
  
  nav.innerHTML = `
    <div class="nav-container">
      <a href="/" class="nav-logo">
        <img src="${logoSrc}" alt="Block Builder" class="logo-img" id="nav-logo-img" />
        <span class="logo-text">Block Builder</span>
      </a>
      <ul class="nav-links">
        <li><a href="/vue3" class="nav-link">Vue 3</a></li>
        <li><a href="/pure-js" class="nav-link">Pure JS</a></li>
        <li><a href="/react" class="nav-link disabled">React <small>(скоро)</small></a></li>
        <li><a href="https://block-builder.ru" target="_blank" rel="noopener noreferrer" class="nav-link nav-link-external">На наш сайт</a></li>
      </ul>
      <div class="nav-theme-toggle"></div>
    </div>
  `;
  
  // Создаем и добавляем переключатель темы
  const themeToggle = createThemeToggle();
  const toggleContainer = nav.querySelector('.nav-theme-toggle');
  if (toggleContainer) {
    toggleContainer.appendChild(themeToggle);
  }
  
  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .demo-nav {
      background: var(--card-bg);
      border-bottom: 1px solid var(--border-color);
      padding: 0;
      box-shadow: var(--shadow-sm);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }
    
    .nav-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: var(--text-primary);
      font-weight: 700;
      font-size: 1.25rem;
      transition: transform 0.2s ease;
    }
    
    .nav-logo:hover {
      transform: scale(1.05);
    }
    
    .logo-img {
      width: 40px;
      height: 40px;
      object-fit: contain;
      transition: opacity 0.3s ease;
    }
    
    .logo-text {
      background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-hover) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .nav-links {
      list-style: none;
      display: flex;
      gap: 0.5rem;
      margin: 0;
      padding: 0;
      flex-wrap: wrap;
      margin-left: auto;
    }
    
    .nav-link {
      text-decoration: none;
      padding: 0.625rem 1.25rem;
      color: var(--text-secondary);
      border-radius: 8px;
      font-weight: 500;
      transition: all 0.2s ease;
      display: inline-block;
      position: relative;
    }
    
    .nav-link:not(.disabled):hover {
      background: var(--accent-light);
      color: var(--accent-primary);
      transform: translateY(-2px);
    }
    
    .nav-link.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .nav-link small {
      font-size: 0.75rem;
      opacity: 0.8;
    }
    
    .nav-link-external::after {
      content: ' ↗';
      font-size: 0.875rem;
      opacity: 0.7;
    }
    
    .nav-theme-toggle {
      display: flex;
      align-items: center;
    }
    
    @media (max-width: 768px) {
      .nav-container {
        flex-direction: column;
        padding: 1rem;
        gap: 1rem;
      }
      
      .nav-links {
        width: 100%;
        justify-content: center;
      }
      
      .nav-link {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Обновляем логотип при изменении темы
  const updateLogo = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const logoImg = nav.querySelector('#nav-logo-img') as HTMLImageElement;
    if (logoImg) {
      logoImg.src = theme === 'dark' ? '/logo-inverse.svg' : '/logo-default.svg';
    }
  };
  
  // Слушаем изменения темы
  const observer = new MutationObserver(updateLogo);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
  
  return nav;
}


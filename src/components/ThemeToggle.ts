export function createThemeToggle(): HTMLElement {
  const getTheme = (): 'light' | 'dark' => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateButton(theme);
  };

  const toggle = document.createElement('button');
  toggle.className = 'theme-toggle-standalone';
  toggle.setAttribute('aria-label', 'Переключить тему');
  
  const updateButton = (theme: 'light' | 'dark') => {
    toggle.innerHTML = theme === 'dark' 
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  };

  toggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  // Apply initial theme
  applyTheme(getTheme());

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .theme-toggle-standalone {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid var(--border-color);
      background: var(--card-bg);
      color: var(--text-primary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      box-shadow: var(--shadow-sm);
      flex-shrink: 0;
    }
    
    .theme-toggle-standalone:hover {
      transform: scale(1.05);
      border-color: var(--accent-primary);
      background: var(--accent-light);
      box-shadow: var(--shadow-md);
    }
    
    .theme-toggle-standalone:active {
      transform: scale(0.95);
    }
    
    .theme-toggle-standalone svg {
      width: 20px;
      height: 20px;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `;
  
  if (!document.getElementById('theme-toggle-styles')) {
    style.id = 'theme-toggle-styles';
    document.head.appendChild(style);
  }

  return toggle;
}


import { getLocale, setLocale, type Locale } from '../i18n';

export function createLanguageToggle(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'lang-toggle';

  const render = (locale: Locale) => {
    container.innerHTML = `
      <div class="lang-toggle__group" role="group" aria-label="Language">
        <button
          type="button"
          class="lang-toggle__btn${locale === 'ru' ? ' lang-toggle__btn--active' : ''}"
          data-locale="ru"
        >RU</button>
        <button
          type="button"
          class="lang-toggle__btn${locale === 'en' ? ' lang-toggle__btn--active' : ''}"
          data-locale="en"
        >EN</button>
      </div>
    `;
  };

  render(getLocale());

  container.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const nextLocale = target.dataset.locale as Locale | undefined;
    if (nextLocale === 'ru' || nextLocale === 'en') {
      setLocale(nextLocale);
    }
  });

  const style = document.createElement('style');
  style.textContent = `
    .lang-toggle {
      display: flex;
      align-items: center;
    }

    .lang-toggle__group {
      display: inline-flex;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      overflow: hidden;
      background: var(--bg-secondary);
    }

    .lang-toggle__btn {
      border: none;
      background: transparent;
      color: var(--text-secondary);
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      padding: 0.45rem 0.65rem;
      cursor: pointer;
      transition: background 0.2s ease, color 0.2s ease;
    }

    .lang-toggle__btn:hover {
      color: var(--accent-primary);
      background: var(--accent-light);
    }

    .lang-toggle__btn--active {
      background: var(--accent-primary);
      color: #fff;
    }

    .nav-controls {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-shrink: 0;
    }
  `;

  if (!document.getElementById('lang-toggle-styles')) {
    style.id = 'lang-toggle-styles';
    document.head.appendChild(style);
  }

  return container;
}

export default function renderHome(container: HTMLElement) {
  
  container.innerHTML = `
    <div class="home-container">
      <div class="hero-section">
        <h1 class="hero-title">
          <span class="hero-icon">🚀</span>
          Block Builder
          <span class="hero-subtitle">Interactive Demos</span>
        </h1>
        <p class="hero-description">
          Исследуйте возможности Block Builder через интерактивные демо
          с различными фреймворками и подходами
        </p>
      </div>
      
      <div class="demos-grid">
        <a href="/vue3" class="demo-card vue-card">
          <div class="card-icon">⚡</div>
          <h2 class="card-title">Vue 3</h2>
          <p class="card-description">
            Полноценное демо с Vue 3 компонентами, form-import (1.8.0), matrix-table и TypeScript
          </p>
          <div class="card-features">
            <span class="feature-tag">form-import</span>
            <span class="feature-tag">Composition API</span>
            <span class="feature-tag">TypeScript</span>
            <span class="feature-tag">SFC</span>
          </div>
          <div class="card-arrow">→</div>
        </a>
        
        <a href="/pure-js" class="demo-card js-card">
          <div class="card-icon">📦</div>
          <h2 class="card-title">Pure JavaScript</h2>
          <p class="card-description">
            Минималистичное демо на чистом JavaScript без фреймворков
          </p>
          <div class="card-features">
            <span class="feature-tag">Vanilla JS</span>
            <span class="feature-tag">Lightweight</span>
            <span class="feature-tag">Fast</span>
          </div>
          <div class="card-arrow">→</div>
        </a>
        
        <a href="/react" class="demo-card react-card">
          <div class="card-icon">⚛️</div>
          <h2 class="card-title">React</h2>
          <p class="card-description">
            Полноценное демо с React-компонентами, form-import (1.8.0), api-select и кастомными полями
          </p>
          <div class="card-features">
            <span class="feature-tag">form-import</span>
            <span class="feature-tag">React 19+</span>
            <span class="feature-tag">Hooks</span>
            <span class="feature-tag">BlockBuilderComponent</span>
          </div>
          <div class="card-arrow">→</div>
        </a>
      </div>

      <div class="ssr-section">
        <h2 class="ssr-title">SSR: Nuxt и Next.js</h2>
        <p class="ssr-description">
          Интерактивные SSR-примеры не входят в demo-bb — они в репозитории пакета block-builder
        </p>
        <div class="ssr-links">
          <a href="https://github.com/mushket-co/block-builder/tree/master/examples/nuxt3" target="_blank" rel="noopener noreferrer" class="ssr-link nuxt-link">
            <span class="ssr-link-icon">💚</span>
            <span class="ssr-link-text">
              <strong>examples/nuxt3</strong>
              <small>Nuxt 3 SSR</small>
            </span>
            <span class="ssr-link-arrow">↗</span>
          </a>
          <a href="https://github.com/mushket-co/block-builder/tree/master/examples/nuxt4" target="_blank" rel="noopener noreferrer" class="ssr-link nuxt-link">
            <span class="ssr-link-icon">💚</span>
            <span class="ssr-link-text">
              <strong>examples/nuxt4</strong>
              <small>Nuxt 4 SSR</small>
            </span>
            <span class="ssr-link-arrow">↗</span>
          </a>
          <a href="https://github.com/mushket-co/block-builder/tree/master/examples/next" target="_blank" rel="noopener noreferrer" class="ssr-link next-link">
            <span class="ssr-link-icon">▲</span>
            <span class="ssr-link-text">
              <strong>examples/next</strong>
              <small>Next.js App Router SSR</small>
            </span>
            <span class="ssr-link-arrow">↗</span>
          </a>
          <a href="https://github.com/mushket-co/block-builder/tree/master/examples" target="_blank" rel="noopener noreferrer" class="ssr-link all-link">
            <span class="ssr-link-icon">📁</span>
            <span class="ssr-link-text">
              <strong>Все примеры</strong>
              <small>block-builder/examples</small>
            </span>
            <span class="ssr-link-arrow">↗</span>
          </a>
        </div>
      </div>
    </div>
  `;
  
  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .home-container {
      min-height: 100vh;
      padding: 4rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .hero-section {
      text-align: center;
      margin-bottom: 4rem;
      padding: 2rem 0;
    }
    
    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      color: var(--text-primary);
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }
    
    .hero-icon {
      font-size: 4rem;
      display: block;
      animation: float 3s ease-in-out infinite;
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
    
    .hero-subtitle {
      font-size: 2rem;
      font-weight: 400;
      color: var(--text-secondary);
      background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-hover) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .hero-description {
      font-size: 1.25rem;
      color: var(--text-secondary);
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.6;
    }
    
    .demos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }
    
    .demo-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 2.5rem;
      text-decoration: none;
      color: inherit;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      box-shadow: var(--shadow-sm);
    }
    
    .demo-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--accent-primary), var(--accent-hover));
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }
    
    .demo-card:hover:not(.disabled) {
      transform: translateY(-8px);
      box-shadow: var(--shadow-lg);
      border-color: var(--accent-primary);
    }
    
    .demo-card:hover:not(.disabled)::before {
      transform: scaleX(1);
    }
    
    .demo-card.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .vue-card::before {
      background: linear-gradient(90deg, #42b983, #35495e);
    }
    
    .js-card::before {
      background: linear-gradient(90deg, #f7df1e, #f0db4f);
    }
    
    .react-card::before {
      background: linear-gradient(90deg, #61dafb, #20232a);
    }
    
    .card-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      display: block;
    }
    
    .card-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
    }
    
    .card-title small {
      font-size: 0.875rem;
      opacity: 0.7;
      font-weight: 400;
    }
    
    .card-description {
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    
    .card-features {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }
    
    .feature-tag {
      padding: 0.25rem 0.75rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      font-size: 0.75rem;
      color: var(--text-secondary);
    }
    
    .card-arrow {
      position: absolute;
      bottom: 2rem;
      right: 2rem;
      font-size: 1.5rem;
      color: var(--accent-primary);
      transition: transform 0.3s ease;
    }
    
    .demo-card:hover:not(.disabled) .card-arrow {
      transform: translateX(4px);
    }

    .ssr-section {
      margin-top: 4rem;
      padding-top: 3rem;
      border-top: 1px solid var(--border-color);
      text-align: center;
    }

    .ssr-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
    }

    .ssr-description {
      color: var(--text-secondary);
      max-width: 640px;
      margin: 0 auto 2rem;
      line-height: 1.6;
    }

    .ssr-links {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1rem;
      max-width: 900px;
      margin: 0 auto;
      text-align: left;
    }

    .ssr-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      text-decoration: none;
      color: inherit;
      transition: all 0.2s ease;
    }

    .ssr-link:hover {
      border-color: var(--accent-primary);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .ssr-link-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .ssr-link-text {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .ssr-link-text strong {
      color: var(--text-primary);
      font-size: 0.95rem;
    }

    .ssr-link-text small {
      color: var(--text-secondary);
      font-size: 0.8rem;
    }

    .ssr-link-arrow {
      color: var(--accent-primary);
      font-size: 1.1rem;
    }
    
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }
      
      .hero-icon {
        font-size: 3rem;
      }
      
      .hero-subtitle {
        font-size: 1.5rem;
      }
      
      .hero-description {
        font-size: 1.125rem;
      }
      
      .demos-grid {
        grid-template-columns: 1fr;
      }
      
      .demo-card {
        padding: 2rem;
      }
    }
  `;
  document.head.appendChild(style);
}

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
            Полноценное демо с Vue 3 компонентами, Composition API и TypeScript
          </p>
          <div class="card-features">
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
        
        <a href="/react" class="demo-card react-card disabled">
          <div class="card-icon">⚛️</div>
          <h2 class="card-title">React <small>(скоро)</small></h2>
          <p class="card-description">
            Демо с React компонентами и современными хуками (в разработке)
          </p>
          <div class="card-features">
            <span class="feature-tag">React 18</span>
            <span class="feature-tag">Hooks</span>
            <span class="feature-tag">Coming Soon</span>
          </div>
          <div class="card-arrow">→</div>
        </a>
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

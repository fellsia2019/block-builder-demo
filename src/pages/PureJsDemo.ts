// Pure JS Demo страница
export default async function renderPureJsDemo(container: HTMLElement) {
  // Создаем контейнер для демо
  container.innerHTML = '';
  
  // Создаем wrapper div для Shadow DOM
  const demoWrapper = document.createElement('div');
  demoWrapper.id = 'pure-js-demo-wrapper';
  container.appendChild(demoWrapper);
  
  // Инициализируем демо
  const { initPureJsDemo } = await import('../demos/pure-js/BasicDemo');
  const cleanup = await initPureJsDemo(demoWrapper);
  
  // Cleanup функция для страницы
  return () => {
    if (cleanup) {
      cleanup();
    }
    container.innerHTML = '';
  };
}

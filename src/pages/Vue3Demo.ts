// Vue 3 Demo страница
export default async function renderVue3Demo(container: HTMLElement) {
  
  // Импортируем стили block-builder
  await import('@mushket-co/block-builder/index.esm.css');
  
  // Динамически загружаем Vue и демо компонент
  const { createApp } = await import('vue');
  const Vue3Demo = (await import('../demos/vue3/BasicDemo.vue')).default;
  
  const app = createApp(Vue3Demo);
  app.mount(container);
  
  // Cleanup функция
  return () => {
    app.unmount();
  };
}

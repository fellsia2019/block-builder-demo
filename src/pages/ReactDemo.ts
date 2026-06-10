export default async function renderReactDemo(container: HTMLElement) {
  await import('@mushket-co/block-builder/index.esm.css');

  const { createElement } = await import('react');
  const { createRoot } = await import('react-dom/client');
  const { default: BasicDemo } = await import('../demos/react/BasicDemo');

  const root = createRoot(container);
  root.render(createElement(BasicDemo));

  return () => {
    root.unmount();
  };
}

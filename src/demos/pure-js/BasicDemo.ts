/**
 * Pure JavaScript демо
 */

export async function initPureJsDemo(container: HTMLElement): Promise<() => void> {
  try {
    // Очищаем контейнер
    container.innerHTML = '';
    
    // Импортируем стили block-builder
    // @ts-ignore - CSS импорт не имеет типов
    await import('@mushket-co/block-builder/index.esm.css');
    
    // Динамический импорт block-builder
    const BlockBuilderModule = await import('@mushket-co/block-builder');
    const BlockBuilder = BlockBuilderModule.BlockBuilder || (BlockBuilderModule as any).default;
    const { pureJsBlockConfigs: rawBlockConfigs } = await import('../shared/block-configs-pure-js');
    const { applyClientSideImageUpload } = await import('../shared/applyClientSideImageUpload');
    const { loadBlocksFromLocalStorage, saveBlocksToLocalStorage } = await import(
      '../shared/blockStorage'
    );
    const pureJsBlockConfigs = import.meta.env.PROD
      ? applyClientSideImageUpload(rawBlockConfigs)
      : rawBlockConfigs;
    const STORAGE_KEY = 'demo-blocks';
    const { DemoHttpClient } = await import('../../api/demoApiMock');
    const { WysiwygFieldRenderer } = await import('./customFieldRenderers/WysiwygFieldRenderer');

    // Создаем контейнер для BlockBuilder
    const demoContainer = document.createElement('div');
    demoContainer.id = 'demo-block-builder';
    demoContainer.style.cssText = 'width: 100%; min-height: 400px;';
    container.appendChild(demoContainer);

    const httpClient = new DemoHttpClient();
    const savedBlocks = loadBlocksFromLocalStorage(STORAGE_KEY);

    // Инициализируем BlockBuilder
    // apiSelectUseCase будет создан автоматически из httpClient внутри BlockBuilder
    const blockBuilder = new BlockBuilder({
      containerId: 'demo-block-builder',
      blockConfigs: pureJsBlockConfigs,
      httpClient: httpClient,
      controlsContainerClass: 'container', // Кастомный CSS класс для контейнера контролов
      controlsFixedPosition: 'bottom', // Фиксировать контролы (с кнопками и статистикой) снизу
      controlsOffset: 20, // Отступ от края в 20px
      warnOnPageLeave: true,
      isEdit: true,
      // Загружаем сохранённые блоки при инициализации
      initialBlocks: savedBlocks,
      onSave: async (blocks) => {
        const result = saveBlocksToLocalStorage(STORAGE_KEY, blocks);

        if (!result.ok) {
          console.error('Ошибка сохранения:', result.error);
          return false;
        }

        if (result.strippedImages) {
          console.warn(
            'localStorage: base64-изображения не сохранены (лимит браузера). Загружайте файлы на сервер или используйте URL.'
          );
        }

        return true;
      },
    });

    // Регистрируем кастомный WYSIWYG редактор
    blockBuilder.registerCustomFieldRenderer(new WysiwygFieldRenderer());

    // Cleanup функция
    return () => {
      container.innerHTML = '';
    };
  } catch (error) {
    console.error('Ошибка загрузки Pure JS демо:', error);
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = 'padding: 20px; color: red; text-align: center;';
    errorDiv.textContent = `Ошибка загрузки демо: ${error}`;
    container.appendChild(errorDiv);
    return () => {
      container.innerHTML = '';
    };
  }
}

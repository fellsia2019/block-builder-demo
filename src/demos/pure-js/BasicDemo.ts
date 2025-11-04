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
    const { pureJsBlockConfigs } = await import('../shared/block-configs-pure-js');
    const { MockHttpClient } = await import('../../api/mockApiSelect');
    const { WysiwygFieldRenderer } = await import('./customFieldRenderers/WysiwygFieldRenderer');

    // Создаем контейнер для BlockBuilder
    const demoContainer = document.createElement('div');
    demoContainer.id = 'demo-block-builder';
    demoContainer.style.cssText = 'width: 100%; min-height: 400px;';
    container.appendChild(demoContainer);

    // Функция загрузки сохраненных блоков из localStorage
    const loadSavedBlocks = () => {
      try {
        const savedData = localStorage.getItem('demo-blocks');
        if (savedData) {
          const blocks = JSON.parse(savedData);
          return blocks;
        }
      } catch (error) {
        console.error('Ошибка загрузки сохранённых блоков:', error);
      }
      return [];
    };

    // Создаем мок HTTP клиент
    const httpClient = new MockHttpClient();

    // Загружаем сохраненные блоки
    const savedBlocks = loadSavedBlocks();

    // Инициализируем BlockBuilder
    // apiSelectUseCase будет создан автоматически из httpClient внутри BlockBuilder
    const blockBuilder = new BlockBuilder({
      containerId: 'demo-block-builder',
      blockConfigs: pureJsBlockConfigs,
      httpClient: httpClient,
      controlsContainerClass: 'container', // Кастомный CSS класс для контейнера контролов
      controlsFixedPosition: 'bottom', // Фиксировать контролы (с кнопками и статистикой) снизу
      controlsOffset: 20, // Отступ от края в 20px
      license: { key: 'block-builder-pro-key' },
      // Загружаем сохранённые блоки при инициализации
      initialBlocks: savedBlocks,
      onSave: async (blocks) => {
        try {
          // Сохраняем в localStorage для демонстрации
          localStorage.setItem('demo-blocks', JSON.stringify(blocks));
          console.log('Блоки сохранены:', blocks);
          return true;
        } catch (error) {
          console.error('Ошибка сохранения:', error);
          return false;
        }
      }
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

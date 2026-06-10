import { useEffect, useMemo, useState } from 'react';
import {
  BlockBuilderComponent,
  createBlockManagementUseCase,
  ApiSelectUseCase,
  FetchHttpClient,
  CustomFieldRendererRegistry,
} from '@mushket-co/block-builder/react';
import { blockConfigs } from './block-config.js';
import { WysiwygFieldRenderer } from './customFieldRenderers/WysiwygFieldRenderer.js';
import {
  loadBlocksFromLocalStorage,
  saveBlocksToLocalStorage,
} from '../shared/blockStorage';

const STORAGE_KEY = 'saved-blocks-react-demo';

export default function BasicDemo() {
  const blockManagementUseCase = useMemo(() => createBlockManagementUseCase(), []);
  const apiSelectUseCase = useMemo(() => new ApiSelectUseCase(new FetchHttpClient()), []);

  const customFieldRendererRegistry = useMemo(() => {
    const registry = new CustomFieldRendererRegistry();
    registry.register(new WysiwygFieldRenderer());
    return registry;
  }, []);

  useEffect(() => {
    const componentRegistry = blockManagementUseCase.getComponentRegistry();
    Object.entries(blockConfigs).forEach(([type, config]) => {
      if (config.render?.component) {
        componentRegistry.register(type, config.render.component);
      }
    });
  }, [blockManagementUseCase]);

  const availableBlockTypes = useMemo(
    () =>
      Object.entries(blockConfigs).map(([type, cfg]) => ({
        type,
        label: cfg.title,
        icon: cfg.icon,
        render: cfg.render,
        fields: cfg.fields,
        spacingOptions: cfg.spacingOptions,
        defaultSettings: {},
        defaultProps:
          cfg.fields?.reduce<Record<string, unknown>>((acc, field) => {
            acc[field.field] = field.defaultValue;
            return acc;
          }, {}) ?? {},
      })),
    []
  );

  const [initialBlocks] = useState(() => loadBlocksFromLocalStorage(STORAGE_KEY));
  const [isEdit, setIsEdit] = useState(true);

  const handleSave = async (blocks: unknown[]) => {
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
  };

  return (
    <div className="react-demo-container">
      <div className="demo-header">
        <div className="header-content">
          <h1 className="demo-title">
            <span className="title-icon">⚛️</span>
            React Demo
          </h1>
          <p className="demo-description">
            Полноценное демо с React-компонентами BlockBuilder (@mushket-co/block-builder/react)
          </p>
          <div className="demo-badges">
            <span className="badge">React 19+</span>
            <span className="badge">api-select</span>
            <span className="badge">custom fields</span>
          </div>
          <button type="button" className="mode-btn" onClick={() => setIsEdit((v) => !v)}>
            Режим: {isEdit ? 'редактирование' : 'просмотр'}
          </button>
        </div>
      </div>
      <div className="demo-content">
        <BlockBuilderComponent
          config={{ availableBlockTypes }}
          blockManagementUseCase={blockManagementUseCase}
          apiSelectUseCase={apiSelectUseCase}
          customFieldRendererRegistry={customFieldRendererRegistry}
          onSave={handleSave}
          initialBlocks={initialBlocks}
          controlsContainerClass="container"
          controlsFixedPosition="bottom"
          controlsOffset={20}
          isEdit={isEdit}
          warnOnPageLeave
        />
      </div>
      <style>{`
        .react-demo-container { min-height: 100vh; background: var(--bg-secondary); display: flex; flex-direction: column; }
        .demo-header { background: var(--card-bg); border-bottom: 1px solid var(--border-color); padding: 2rem; }
        .header-content { max-width: 1200px; margin: 0 auto; text-align: center; }
        .demo-title { font-size: 2.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: center; gap: 0.75rem; }
        .title-icon { font-size: 2.5rem; }
        .demo-description { color: var(--text-secondary); font-size: 1.125rem; margin-bottom: 1rem; }
        .demo-badges { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1rem; }
        .badge { padding: 0.375rem 0.875rem; background: var(--accent-light); color: var(--accent-primary); border-radius: 20px; font-size: 0.875rem; font-weight: 500; }
        .mode-btn { padding: 0.5rem 1.25rem; border: 1px solid var(--border-color); border-radius: 8px; background: var(--bg-secondary); color: var(--text-primary); cursor: pointer; font-weight: 500; }
        .mode-btn:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
        .demo-content { flex: 1; padding: 1rem 0 2rem; }
      `}</style>
    </div>
  );
}

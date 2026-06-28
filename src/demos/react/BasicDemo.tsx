import { useEffect, useMemo, useState } from 'react';
import {
  BlockBuilderComponent,
  createBlockManagementUseCase,
  ApiSelectUseCase,
  CustomFieldRendererRegistry,
} from '@mushket-co/block-builder/react';
import { DemoHttpClient } from '../../api/demoApiMock';
import { blockConfigs as rawBlockConfigs } from './block-config.js';
import { WysiwygFieldRenderer } from './customFieldRenderers/WysiwygFieldRenderer.js';
import { FormScopeDemoFieldRenderer } from '../shared/formFeaturesDemoFieldRenderer.js';
import { applyClientSideImageUpload } from '../shared/applyClientSideImageUpload';
import {
  loadBlocksFromLocalStorage,
  saveBlocksToLocalStorage,
} from '../shared/blockStorage';
import {
  applyDemoGlassBodyClass,
  DEMO_THEME_OPTIONS,
  resolveDemoBlockBuilderTheme,
} from '../shared/blockBuilderTheme.js';

const STORAGE_KEY = 'saved-blocks-react-demo';

export default function BasicDemo() {
  const blockManagementUseCase = useMemo(() => createBlockManagementUseCase(), []);
  const apiSelectUseCase = useMemo(() => new ApiSelectUseCase(new DemoHttpClient()), []);

  const customFieldRendererRegistry = useMemo(() => {
    const registry = new CustomFieldRendererRegistry();
    registry.register(new WysiwygFieldRenderer());
    registry.register(new FormScopeDemoFieldRenderer());
    return registry;
  }, []);

  const blockConfigs = useMemo(
    () => (import.meta.env.PROD ? applyClientSideImageUpload(rawBlockConfigs) : rawBlockConfigs),
    []
  );

  useEffect(() => {
    const componentRegistry = blockManagementUseCase.getComponentRegistry();
    Object.entries(blockConfigs).forEach(([type, config]) => {
      if (config.render?.component) {
        componentRegistry.register(type, config.render.component);
      }
    });
  }, [blockManagementUseCase, blockConfigs]);

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
    [blockConfigs]
  );

  const [initialBlocks] = useState(() => loadBlocksFromLocalStorage(STORAGE_KEY));
  const [isEdit, setIsEdit] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState('default');

  const themeConfig = useMemo(
    () => resolveDemoBlockBuilderTheme(selectedTheme),
    [selectedTheme]
  );

  useEffect(() => {
    applyDemoGlassBodyClass(themeConfig.glass);
    return () => applyDemoGlassBodyClass(false);
  }, [themeConfig.glass]);

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
          <div className="demo-header-controls">
            <div className="demo-theme-picker">
              <span className="demo-theme-picker__label">Тема UI BlockBuilder</span>
              <div className="demo-theme-toggle" role="group" aria-labelledby="demo-theme-label-react">
                <span id="demo-theme-label-react" className="sr-only">
                  Выбор темы
                </span>
                {DEMO_THEME_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`demo-theme-toggle__btn${
                      selectedTheme === option.id ? ' demo-theme-toggle__btn--active' : ''
                    }`}
                    onClick={() => setSelectedTheme(option.id)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="demo-mode-picker">
              <span className="demo-theme-picker__label">Режим BlockBuilder</span>
              <button type="button" className="demo-mode-btn" onClick={() => setIsEdit((v) => !v)}>
                {isEdit ? 'Редактирование' : 'Просмотр'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`demo-content${themeConfig.glass ? ' builder-shell--glass' : ''}`}>
        <BlockBuilderComponent
          theme={themeConfig.theme}
          themeVars={themeConfig.themeVars}
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
        .demo-content { flex: 1; padding: 1rem 0 2rem; }
      `}</style>
    </div>
  );
}

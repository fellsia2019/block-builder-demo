<template>
  <div class="vue-demo-container">
    <div class="demo-header">
      <div class="header-content">
        <h1 class="demo-title">
          <span class="title-icon">⚡</span>
          Vue 3 Demo
        </h1>
        <p class="demo-description">
          Полноценное демо с использованием настоящих Vue 3 компонентов BlockBuilder
        </p>
        <div class="demo-badges">
          <span class="badge">Vue 3</span>
          <span class="badge">TypeScript</span>
          <span class="badge">Composition API</span>
        </div>
      </div>
    </div>
    <div class="demo-content">
      <BlockBuilderComponent 
        :config="{ availableBlockTypes }"
        :block-management-use-case="blockManagementUseCase"
        :api-select-use-case="apiSelectUseCase"
        :custom-field-renderer-registry="customFieldRendererRegistry"
        :on-save="handleSave"
        :initial-blocks="initialBlocks"
        controls-container-class="container"
        controls-fixed-position="bottom"
        :controls-offset="20"
        license-key="BB-PRO-1234-5678-ABCD"
        :is-edit="isEdit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  BlockBuilderComponent,
  createBlockManagementUseCase,
  ApiSelectUseCase,
  CustomFieldRendererRegistry
} from '@mushket-co/block-builder/vue';
import { demoBlockConfigs } from '../shared/block-configs';
import { MockHttpClient } from '../../api/mockApiSelect';
import { WysiwygFieldRenderer } from './customFieldRenderers/WysiwygFieldRenderer';

// Создаем use cases
const blockManagementUseCase = createBlockManagementUseCase();
const httpClient = new MockHttpClient();
const apiSelectUseCase = new ApiSelectUseCase(httpClient);
const customFieldRendererRegistry = new CustomFieldRendererRegistry();
customFieldRendererRegistry.register(new WysiwygFieldRenderer());

// Регистрируем компоненты блоков
const componentRegistry = blockManagementUseCase.getComponentRegistry();
Object.entries(demoBlockConfigs).forEach(([type, config]) => {
  if (config.render?.component) {
    componentRegistry.register(type, config.render.component);
  }
});

// Формируем availableBlockTypes из конфигураций
const availableBlockTypes = ref(
  Object.entries(demoBlockConfigs).map(([type, cfg]) => {
    const defaultProps: Record<string, any> = {};
    if (cfg.fields) {
      cfg.fields.forEach((field) => {
        defaultProps[field.field] = field.defaultValue;
      });
    }
    
    return {
      type,
      label: cfg.title,
      icon: cfg.icon,
      render: cfg.render,
      fields: cfg.fields,
      ...(cfg.spacingOptions && { spacingOptions: cfg.spacingOptions }),
      defaultSettings: {},
      defaultProps
    };
  })
);

const isEdit = ref(true);

// Загрузка сохраненных блоков из localStorage
const loadSavedBlocks = () => {
  try {
    const savedData = localStorage.getItem('saved-blocks-demo');
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error('Ошибка загрузки блоков:', error);
  }
  return [];
};


const saved = loadSavedBlocks();
const initialBlocks = ref(saved?.length > 0 ? saved : []);

const handleSave = async (blocks: any[]) => {
  try {
    // В реальном приложении здесь будет POST на ваш API:
    // await fetch('/api/blocks', {
    //   method: 'POST',
    //   body: JSON.stringify(blocks)
    // })

    // Для демо сохраняем в localStorage
    localStorage.setItem('saved-blocks-demo', JSON.stringify(blocks));
    console.log('Blocks saved:', blocks);
    return true;
  } catch (error) {
    console.error('Ошибка сохранения:', error);
    return false;
  }
};
</script>

<style>
.vue-demo-container {
  min-height: 100vh;
  background: var(--bg-secondary);
  position: relative;
}

.demo-header {
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  padding: 3rem 2rem;
  box-shadow: var(--shadow-sm);
}

.header-content {
  text-align: center;
}

.demo-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.title-icon {
  font-size: 2.5rem;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.demo-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.demo-badges {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: var(--accent-light);
  color: var(--accent-primary);
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
}

.badge:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

@media (max-width: 768px) {
  .demo-header {
    padding: 2rem 1rem;
  }
  
  .demo-title {
    font-size: 2rem;
  }
  
  .title-icon {
    font-size: 2rem;
  }
  
  .demo-description {
    font-size: 1rem;
  }
}
</style>

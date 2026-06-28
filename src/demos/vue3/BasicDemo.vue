<template>
  <div class="vue-demo-container">
    <div class="demo-header">
      <div class="header-content">
        <h1 class="demo-title">
          <span class="title-icon">⚡</span>
          {{ t('demo.vue.title') }}
        </h1>
        <p class="demo-description">
          {{ t('demo.vue.description') }}
        </p>
        <div class="demo-header-controls">
          <div class="demo-theme-picker">
            <span class="demo-theme-picker__label">{{ t('demo.themeLabel') }}</span>
            <div class="demo-theme-toggle" role="group" aria-labelledby="demo-theme-label-vue">
              <span id="demo-theme-label-vue" class="sr-only">{{ t('demo.themeSelect') }}</span>
              <button
                v-for="option in themeOptions"
                :key="option.id"
                type="button"
                class="demo-theme-toggle__btn"
                :class="{ 'demo-theme-toggle__btn--active': selectedTheme === option.id }"
                @click="selectedTheme = option.id"
              >
                {{ option.label }}
              </button>
            </div>
          </div>
          <div class="demo-mode-picker">
            <span class="demo-theme-picker__label">{{ t('demo.modeLabel') }}</span>
            <button type="button" class="demo-mode-btn" @click="isEdit = !isEdit">
              {{ isEdit ? t('demo.modeEdit') : t('demo.modeView') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="demo-content" :class="{ 'builder-shell--glass': themeConfig.glass }">
      <BlockBuilderComponent
        :key="locale"
        :locale="locale"
        :theme="themeConfig.theme"
        :theme-vars="themeConfig.themeVars"
        :config="{ availableBlockTypes }"
        :block-management-use-case="blockManagementUseCase"
        :api-select-use-case="apiSelectUseCase"
        :custom-field-renderer-registry="customFieldRendererRegistry"
        :on-save="handleSave"
        :initial-blocks="initialBlocks"
        controls-container-class="container"
        controls-fixed-position="bottom"
        :controls-offset="20"
        :is-edit="isEdit"
        :warn-on-page-leave="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';
import {
  BlockBuilderComponent,
  createBlockManagementUseCase,
  ApiSelectUseCase,
  CustomFieldRendererRegistry,
} from '@mushket-co/block-builder/vue';
import { DemoHttpClient } from '../../api/demoApiMock';
import { createBlockConfigs } from './block-config.js';
import { applyClientSideImageUpload } from '../shared/applyClientSideImageUpload';
import {
  loadBlocksFromLocalStorage,
  saveBlocksToLocalStorage,
} from '../shared/blockStorage';
import {
  applyDemoGlassBodyClass,
  getDemoThemeOptionsForLocale,
  resolveDemoBlockBuilderTheme,
} from '../shared/blockBuilderTheme.js';
import { WysiwygFieldRenderer } from './customFieldRenderers/WysiwygFieldRenderer';
import { FormScopeDemoFieldRenderer } from '../shared/formFeaturesDemoFieldRenderer.js';
import { useLocale } from '../../i18n/vue/useLocale';

const STORAGE_KEY = 'saved-blocks-demo';
const { locale, t } = useLocale();

const blockConfigs = computed(() => {
  const configs = createBlockConfigs(locale.value);
  return import.meta.env.PROD ? applyClientSideImageUpload(configs) : configs;
});

const blockManagementUseCase = createBlockManagementUseCase();
const apiSelectUseCase = new ApiSelectUseCase(new DemoHttpClient());
const customFieldRendererRegistry = new CustomFieldRendererRegistry();
customFieldRendererRegistry.register(new WysiwygFieldRenderer());
customFieldRendererRegistry.register(new FormScopeDemoFieldRenderer());

watch(
  blockConfigs,
  (configs) => {
    const componentRegistry = blockManagementUseCase.getComponentRegistry();
    Object.entries(configs).forEach(([type, config]) => {
      if (config.render?.component) {
        componentRegistry.register(type, config.render.component);
      }
    });
  },
  { immediate: true }
);

const availableBlockTypes = computed(() =>
  Object.entries(blockConfigs.value).map(([type, cfg]) => {
    const defaultProps: Record<string, unknown> = {};
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
      ...((cfg as { spacingOptions?: unknown }).spacingOptions && {
        spacingOptions: (cfg as { spacingOptions?: unknown }).spacingOptions,
      }),
      defaultSettings: {},
      defaultProps,
    };
  })
);

const isEdit = ref(true);
const selectedTheme = ref('default');
const themeOptions = computed(() => getDemoThemeOptionsForLocale(locale.value));

const themeConfig = computed(() => resolveDemoBlockBuilderTheme(selectedTheme.value));

watch(
  () => themeConfig.value.glass,
  (glass) => applyDemoGlassBodyClass(glass),
  { immediate: true }
);

onUnmounted(() => applyDemoGlassBodyClass(false));

const initialBlocks = ref(loadBlocksFromLocalStorage(STORAGE_KEY));

const handleSave = async (blocks: unknown[]) => {
  const result = saveBlocksToLocalStorage(STORAGE_KEY, blocks);

  if (!result.ok) {
    console.error(t('demo.saveError'), result.error);
    return false;
  }

  if (result.strippedImages) {
    console.warn(t('demo.saveStrippedImages'));
  }

  return true;
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
  0%,
  100% {
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

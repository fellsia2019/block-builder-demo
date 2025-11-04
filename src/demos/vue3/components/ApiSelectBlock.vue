<template>
  <div>
    <div class="container">
      <div :style="{ backgroundColor: backgroundColor, color: textColor, padding: '20px', borderRadius: '8px' }">
      <h2 v-if="title" class="block-title">{{ title }}</h2>

      <!-- Главный выбранный элемент (одиночный выбор) -->
      <div v-if="featuredItem" class="featured-item">
        <h3 class="featured-label">🌟 Главный элемент:</h3>
        <div class="item-card item-card--featured">
          <h4>{{ featuredItem.name }}</h4>
          <p v-if="featuredItem.description" class="item-description">{{ featuredItem.description }}</p>
          <div v-if="featuredItem.meta" class="item-meta">
            <span v-for="(value, key) in featuredItem.meta" :key="key" class="meta-tag">
              {{ key }}: {{ value }}
            </span>
          </div>
        </div>
      </div>

      <!-- Список выбранных элементов (множественный выбор) -->
      <div v-if="selectedItems && selectedItems.length > 0" class="selected-items">
        <h3 class="items-label">📋 Выбранные элементы ({{ selectedItems.length }}):</h3>
        <div class="items-grid" :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }">
          <div v-for="(item, index) in selectedItems" :key="item.id || index" class="item-card">
            <h4>{{ item.name }}</h4>
            <p v-if="item.description" class="item-description">{{ item.description }}</p>
            <div v-if="item.meta" class="item-meta">
              <span v-for="(value, key) in item.meta" :key="key" class="meta-tag">
                {{ key }}: {{ value }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Состояния загрузки -->
      <div v-if="loading" class="loading-state">
        Загрузка элементов...
      </div>

      <div v-if="error" class="error-state">
        Ошибка загрузки: {{ error }}
      </div>

      <!-- Состояния -->
      <div v-if="!loading && !error && !featuredItem && (!selectedItems || selectedItems.length === 0)" class="no-selection">
        <p>Элементы не выбраны. Настройте блок в редакторе.</p>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { MockHttpClient } from '../../../api/mockApiSelect'

interface IProps {
  title?: string
  featuredItemId?: string | number | null
  selectedItemIds?: (string | number)[]
  columns?: number
  backgroundColor?: string
  textColor?: string
}

interface IItem {
  id: string | number
  name: string
  description?: string
  meta?: Record<string, any>
}

const props = withDefaults(defineProps<IProps>(), {
  title: '',
  featuredItemId: null,
  selectedItemIds: () => [],
  columns: 2,
  backgroundColor: '#f8f9fa',
  textColor: '#333333'
})

const loading = ref(false)
const error = ref<string | null>(null)
const featuredItem = ref<IItem | null>(null)
const selectedItems = ref<IItem[]>([])

// Используем computed для отслеживания изменений
const featuredItemIdValue = computed(() => props.featuredItemId)
const selectedItemIdsValue = computed(() => props.selectedItemIds || [])

/**
 * Загрузка данных элементов с API по ID
 */
async function loadItemsData(): Promise<void> {
  // Если нет выбранных элементов, очищаем данные
  if (!featuredItemIdValue.value && (!selectedItemIdsValue.value || selectedItemIdsValue.value.length === 0)) {
    featuredItem.value = null
    selectedItems.value = []
    return
  }

  loading.value = true
  error.value = null

  try {
    // Создаем мок HTTP клиент для загрузки данных
    const httpClient = new MockHttpClient()
    
    // Загружаем все элементы (в реальном приложении можно отправить список ID)
    const response = await httpClient.get('/api/items', { limit: 100 })
    
    // Извлекаем данные из ответа
    const responseData = response.data as any
    const allItems = responseData?.data || []

    // Находим главный элемент
    if (featuredItemIdValue.value) {
      featuredItem.value = allItems.find((item: IItem) => item.id === featuredItemIdValue.value) || null
    } else {
      featuredItem.value = null
    }

    // Находим выбранные элементы
    if (selectedItemIdsValue.value && selectedItemIdsValue.value.length > 0) {
      selectedItems.value = allItems.filter((item: IItem) => 
        selectedItemIdsValue.value.includes(item.id)
      )
    } else {
      selectedItems.value = []
    }
  } catch (err: any) {
    error.value = err.message || 'Неизвестная ошибка'
    console.error('Ошибка загрузки элементов:', err)
  } finally {
    loading.value = false
  }
}

// Загрузка при монтировании
onMounted(() => {
  loadItemsData()
})

// Перезагрузка при изменении выбранных элементов
watch([selectedItemIdsValue, featuredItemIdValue], () => {
  loadItemsData()
})
</script>

<style scoped>
.block-title {
  margin: 0 0 30px 0;
  font-size: 28px;
  font-weight: 700;
}

.featured-item {
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.featured-label {
  margin: 0 0 15px 0;
  font-size: 18px;
  font-weight: 600;
}

.items-label {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
}

.items-grid {
  display: grid;
  gap: 20px;
}

.item-card {
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.item-card--featured {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.item-card h4 {
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 600;
  color: inherit;
}

.item-description {
  margin: 0 0 12px 0;
  font-size: 14px;
  opacity: 0.9;
  line-height: 1.5;
}

.item-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.meta-tag {
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: inherit;
}

.item-card--featured .meta-tag {
  background: rgba(255, 255, 255, 0.2);
}

.loading-state,
.error-state,
.no-selection {
  text-align: center;
  padding: 40px;
  font-size: 16px;
}

.loading-state {
  opacity: 0.7;
}

.error-state {
  color: #e74c3c;
}

.no-selection {
  opacity: 0.6;
  font-style: italic;
}

@media (max-width: 768px) {
  .items-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>


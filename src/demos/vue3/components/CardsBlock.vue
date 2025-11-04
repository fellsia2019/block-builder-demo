<template>
  <div>
    <div class="container">
      <h2 v-if="title" class="cards-title">{{ title }}</h2>
      <div class="cards-grid" :style="gridStyle">
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="card"
          :style="cardStyle"
        >
          <img v-if="card.image" :src="getImageUrl(card.image)" :alt="card.title || ''" class="card-image" />
          <div class="card-body">
            <h3 class="card-title">{{ card.title }}</h3>
            <p class="card-text">{{ card.text }}</p>
            <a v-if="card.link" :href="card.link" target="_blank" class="card-link">
              {{ card.button || 'Подробнее' }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  cards: {
    type: Array as () => Array<{
      title: string
      text: string
      image?: string | { src: string }
      link?: string
      button?: string
    }>,
    default: () => []
  },
  columns: {
    type: Number,
    default: 3
  },
  gap: {
    type: Number,
    default: 20
  },
  cardBackground: {
    type: String,
    default: '#ffffff'
  },
  cardTextColor: {
    type: String,
    default: '#333333'
  },
  cardBorderRadius: {
    type: Number,
    default: 8
  }
})

const gridStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
  gap: `${props.gap}px`
}))

const cardStyle = computed(() => ({
  backgroundColor: props.cardBackground,
  color: props.cardTextColor,
  borderRadius: `${props.cardBorderRadius}px`
}))

const getImageUrl = (image: string | { src: string }): string => {
  if (!image) return ''
  if (typeof image === 'string') return image
  if (typeof image === 'object' && image !== null) {
    return image.src || ''
  }
  return ''
}
</script>

<style scoped>
.cards-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
}

.cards-grid {
  padding: 20px 0;
}

.card {
  padding: 20px;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 15px;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 600;
}

.card-text {
  margin: 0 0 15px 0;
  line-height: 1.5;
  flex: 1;
  opacity: 0.8;
}

.card-link {
  display: inline-block;
  background-color: var(--accent-primary);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  text-align: center;
}

.card-link:hover {
  background-color: var(--accent-hover);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>


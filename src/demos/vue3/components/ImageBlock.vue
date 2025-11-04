<template>
  <div>
    <div class="container">
      <img
        :src="imageUrl"
        :alt="alt"
        :style="imageStyle"
        @error="handleImageError"
        @load="handleImageLoad"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  image: {
    type: [String, Object] as () => string | { src: string },
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  borderRadius: {
    type: Number,
    default: 0
  }
})

// Преобразуем image в URL для img тега
// base64 - всегда строка
// серверное загрузка - объект с обязательным src
const imageUrl = computed(() => {
  if (typeof props.image === 'string') return props.image
  if (typeof props.image === 'object' && props.image !== null) {
    return props.image.src || ''
  }
  return ''
})

const imageStyle = computed(() => ({
  borderRadius: `${props.borderRadius}px`,
  maxWidth: '100%',
  height: 'auto',
  objectFit: 'cover',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
}))

const handleImageError = () => {
  // Обработка ошибки загрузки изображения
}

const handleImageLoad = () => {
  // Изображение загружено
}
</script>

<style scoped>
.container {
  text-align: center;
}

.container img {
  transition: transform 0.3s ease;
}

.container img:hover {
  transform: scale(1.02);
}
</style>


<template>
  <div>
    <div class="container">
      <h2 v-if="title" class="slider-title">{{ title }}</h2>
      <Swiper
        :modules="modules"
        :slides-per-view="slidesPerView"
        :space-between="spaceBetween"
        :loop="loop"
        :autoplay="autoplayConfig"
        :pagination="{ clickable: true }"
        :navigation="true"
        class="swiper-container"
      >
        <SwiperSlide v-for="(slide, index) in slides" :key="index">
          <div class="slide-content">
            <img v-if="slide.image" :src="getImageUrl(slide.image)" :alt="slide.title || ''" />
            <div v-if="slide.title || slide.description" class="slide-info">
              <h3 v-if="slide.title">{{ slide.title }}</h3>
              <p v-if="slide.description">{{ slide.description }}</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

// Импорт стилей Swiper
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  slides: {
    type: Array as () => Array<{
      image: string | { src: string }
      title?: string
      description?: string
    }>,
    default: () => []
  },
  slidesPerView: {
    type: Number,
    default: 1
  },
  spaceBetween: {
    type: Number,
    default: 30
  },
  loop: {
    type: Boolean,
    default: false
  },
  autoplay: {
    type: Boolean,
    default: false
  },
  autoplayDelay: {
    type: Number,
    default: 3000
  }
})

const modules = [Navigation, Pagination, Autoplay]

const autoplayConfig = computed(() => {
  return props.autoplay ? {
    delay: props.autoplayDelay,
    disableOnInteraction: false
  } : false
})

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
.slider-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
}

.swiper-container {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.slide-content {
  position: relative;
  background: var(--card-bg);
}

.slide-content img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
}

.slide-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  padding: 30px 20px 20px;
  color: white;
}

.slide-info h3 {
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
}

.slide-info p {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: white;
  background: rgba(0, 0, 0, 0.3);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

:deep(.swiper-button-next):hover,
:deep(.swiper-button-prev):hover {
  background: rgba(0, 0, 0, 0.6);
  transform: scale(1.1);
}

:deep(.swiper-pagination-bullet) {
  background: white;
  opacity: 0.7;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: var(--accent-primary);
}
</style>


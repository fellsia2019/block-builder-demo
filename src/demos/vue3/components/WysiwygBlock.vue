<template>
  <div>
    <div class="container">
      <div v-html="content" class="wysiwyg-content" :style="containerStyle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  fontSize: {
    type: Number,
    default: 16
  },
  textColor: {
    type: String,
    default: '#333333'
  },
  textAlign: {
    type: String,
    default: 'left'
  },
  padding: {
    type: String,
    default: '20px'
  }
})

const containerStyle = computed(() => ({
  fontSize: `${props.fontSize}px`,
  color: props.textColor,
  padding: props.padding,
  textAlign: props.textAlign as 'left' | 'center' | 'right' | 'justify'
}))
</script>

<style scoped>
.wysiwyg-content :deep(p) {
  margin: 8px 0;
}

.wysiwyg-content :deep(p:last-child) {
  margin-bottom: 0;
}

.wysiwyg-content :deep(p:first-child) {
  margin-top: 0;
}

.wysiwyg-content :deep(ul),
.wysiwyg-content :deep(ol) {
  margin: 16px 0;
  padding-left: 24px;
}

.wysiwyg-content :deep(strong) {
  font-weight: 700;
}

.wysiwyg-content :deep(em) {
  font-style: italic;
}

.wysiwyg-content :deep(a) {
  color: var(--accent-primary);
  text-decoration: underline;
  transition: opacity 0.2s ease;
}

.wysiwyg-content :deep(a:hover) {
  opacity: 0.75;
}

.wysiwyg-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 16px 0;
}

.wysiwyg-content :deep(h1),
.wysiwyg-content :deep(h2),
.wysiwyg-content :deep(h3),
.wysiwyg-content :deep(h4),
.wysiwyg-content :deep(h5),
.wysiwyg-content :deep(h6) {
  margin: 16px 0 8px 0;
  font-weight: 700;
}

.wysiwyg-content :deep(h1) {
  font-size: 2em;
}

.wysiwyg-content :deep(h2) {
  font-size: 1.5em;
}

.wysiwyg-content :deep(h3) {
  font-size: 1.25em;
}
</style>


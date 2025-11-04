<template>
  <div>
    <div class="container">
      <div :style="blockStyle">
        {{ content }}
      </div>
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
  color: {
    type: String,
    default: '#333333'
  },
  textAlign: {
    type: String,
    default: 'left'
  }
})

const blockStyle = computed(() => ({
  textAlign: props.textAlign,
  fontSize: `${props.fontSize}px`,
  color: props.color,
  padding: '10px',
  border: '1px solid #e9ecef',
  borderRadius: '4px',
  background: '#f8f9fa'
}))
</script>

<style scoped>
</style>


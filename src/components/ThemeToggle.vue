<template>
  <button 
    class="theme-toggle"
    :aria-label="isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему'"
    @click="toggleTheme"
  >
    <svg v-if="isDark" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
    <svg v-else class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const isDark = ref(false);

const getTheme = (): 'light' | 'dark' => {
  const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme: 'light' | 'dark') => {
  document.documentElement.setAttribute('data-theme', theme);
  isDark.value = theme === 'dark';
  localStorage.setItem('theme', theme);
};

const toggleTheme = () => {
  const newTheme = isDark.value ? 'light' : 'dark';
  applyTheme(newTheme);
};

onMounted(() => {
  applyTheme(getTheme());
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
});
</script>

<style scoped>
.theme-toggle {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 1000;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  background: var(--card-bg);
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-md);
}

.theme-toggle:hover {
  transform: scale(1.05);
  border-color: var(--accent-primary);
  background: var(--accent-light);
  box-shadow: var(--shadow-lg);
}

.theme-toggle:active {
  transform: scale(0.95);
}

.icon {
  width: 24px;
  height: 24px;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (max-width: 768px) {
  .theme-toggle {
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
  }
  
  .icon {
    width: 20px;
    height: 20px;
  }
}
</style>


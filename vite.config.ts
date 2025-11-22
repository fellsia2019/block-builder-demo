import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';
import path from 'path';
import { setupMockApi } from './mock-api-server.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    react(),
    // Плагин для Mock API
    {
      name: 'mock-api-server',
      configureServer(server) {
        setupMockApi(server.middlewares);
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    // Разрешаем импорт CSS из node_modules
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.vue', '.css'],
  },
  server: {
    port: 3001,
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
  // Оптимизация зависимостей
  optimizeDeps: {
    include: ['jodit'],
  },
});
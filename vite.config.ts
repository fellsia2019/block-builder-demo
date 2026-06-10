import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';
import { setupMockApi } from './mock-api-server.js';

export default defineConfig({
  plugins: [
    vue(),
    react(),
    {
      name: 'mock-api-server',
      configureServer(server) {
        setupMockApi(server.middlewares);
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
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
  optimizeDeps: {
    include: ['jodit'],
    exclude: ['@mushket-co/block-builder'],
  },
});

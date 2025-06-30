import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/jhn-tts-frontend/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9452',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
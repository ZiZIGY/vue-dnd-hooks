import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'docs/dist',
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});

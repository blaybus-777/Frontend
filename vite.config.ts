import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('/three') ||
              id.includes('@react-three') ||
              id.includes('three-stdlib')
            ) {
              return 'three-vendor';
            }
            if (id.includes('@xyflow')) {
              return 'flow-vendor';
            }
            if (id.includes('@mdxeditor')) {
              return 'editor-vendor';
            }
            if (id.includes('@tanstack')) {
              return 'query-vendor';
            }
          }
        },
      },
    },
  },
});

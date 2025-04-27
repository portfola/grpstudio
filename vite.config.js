import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add any path aliases your project might be using
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // If your app is not hosted at the root level, specify the base path
  // base: '/your-base-path/',
});
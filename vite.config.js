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
  // vite-react-ssg: emit each route as <route>/index.html (not <route>.html).
  // Static hosts (incl. AWS Amplify) serve the directory index for clean URLs,
  // so a hard refresh / crawler hit on /releases/:slug or /albums/:slug gets the
  // prerendered file WITH its per-route OG — no homepage-clobbering SPA rewrite.
  ssgOptions: {
    dirStyle: 'nested',
  },
  // If your app is not hosted at the root level, specify the base path
  // base: '/your-base-path/',
});
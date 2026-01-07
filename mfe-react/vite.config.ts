import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mfe_react',
      filename: 'remoteEntry.js',
      exposes: {
        './Widget': './src/Widget.tsx',
        './mount': './src/mount.ts',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: 4300,
    strictPort: true,
    hmr: false,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: { target: 'esnext', minify: true, outDir: 'dist' },
});

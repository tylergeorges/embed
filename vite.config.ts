import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    }),
    eslint({ include: ['src/**/*.{ts,tsx}'] }),
    tsconfigPaths()
  ],
  server: {
    port: 3443,
    strictPort: true,
    open: true
  }
});

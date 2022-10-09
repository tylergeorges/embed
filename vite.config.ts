import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ssr from 'vite-plugin-ssr/plugin';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';
import codegen from 'vite-plugin-graphql-codegen';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ssr({ }),
    eslint({
      include: ['src/**/*.{ts,tsx}'],
      failOnError: process.env.CI === 'true',
      failOnWarning: process.env.CI === 'true'
    }),
    tsconfigPaths({
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    }),
    codegen()
  ],
  build: {
    outDir: 'build'
  },
  server: {
    port: 3443,
    strictPort: true,
    open: true
  }
});

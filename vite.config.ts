import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import graphqlPlugin from '@rollup/plugin-graphql'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
        parserOpts: {
          plugins: ['decorators-legacy']
        }
      }
    }),
    viteTsconfigPaths(),
    svgrPlugin(),
    graphqlPlugin()
  ],
  server: {
    port: 3000,
    open: true
  }
})

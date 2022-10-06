import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import graphqlPlugin from '@rollup/plugin-graphql'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        // parserOpts: {
        //   plugins: ['decorators-legacy']
        // },
        presets: [
          [
            "@babel/preset-env",
            {
              "modules": false
            }
          ],
          "@babel/preset-react"
        ],
        plugins: [
          [ // This needs to be loaded first.
            "@babel/plugin-proposal-decorators",
            {
              legacy: true
            }
          ],
          "@babel/plugin-syntax-dynamic-import",
          'macros',
          '@emotion/babel-plugin',
          [
            "babel-plugin-transform-builtin-extend",
            {
              globals: [
                "Error",
                "Array"
              ],
              approximate: true
            }
          ],
          "@babel/plugin-syntax-import-meta",
          ["@babel/plugin-proposal-class-properties", { loose: true }],
          "@babel/plugin-proposal-json-strings",
          "@babel/plugin-proposal-function-sent",
          "@babel/plugin-proposal-export-namespace-from",
          "@babel/plugin-proposal-numeric-separator",
          "@babel/plugin-proposal-throw-expressions",
          "@babel/plugin-proposal-export-default-from",
          "@babel/plugin-proposal-logical-assignment-operators",
          "@babel/plugin-proposal-optional-chaining",
          [
            "@babel/plugin-proposal-pipeline-operator",
            {
              proposal: "minimal"
            }
          ],
          "@babel/plugin-proposal-nullish-coalescing-operator",
          "@babel/plugin-proposal-do-expressions",
          "@babel/plugin-proposal-function-bind"
        ]
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

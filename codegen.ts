import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://s-staging.widgetbot.io/api/graphql',
  documents: ['src/**/*.tsx', 'src/**/*.ts', 'src/**/*.graphql'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    'src/graphql': {
      preset: 'client',
      plugins: []
    }
  }
};

export default config;

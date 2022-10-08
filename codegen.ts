import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://s-staging.widgetbot.io/api/graphql',
  documents: 'src/**/*.tsx',
  generates: {
    'src/graphql': {
      preset: 'client',
      plugins: []
    }
  }
};

export default config;

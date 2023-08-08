import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    'https://s-staging.widgetbot.io/api/graphql': {
      headers: {
        'User-Agent': 'WidgetBot Embed GraphQL Codegen'
      }
    }
  },
  documents: ['src/**/*.tsx'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    'src/graphql': {
      preset: 'client',
      plugins: []
    }
  }
};

export default config;

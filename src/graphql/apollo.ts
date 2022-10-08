import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://s-staging.widgetbot.io/api/graphql',
  cache: new InMemoryCache()
});

import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { GRAPHQL_URL, WS_URL } from '@lib/api/url';
import { setContext } from '@apollo/client/link/context';

export const getToken = () => {
  try {
    return localStorage.getItem('token') ?? '';
  } catch (err) {
    console.error(err);
    return '';
  }
};

const getHeaders = (): {} | { Authorization: string } => {
  const token = getToken();

  if (!token) return {};

  return {
    Authorization: token
  };
};

const authContext = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    ...getHeaders()
  }
}));

const httpLink = new HttpLink({
  uri: GRAPHQL_URL
});

const wsLink = new WebSocketLink(
  new SubscriptionClient(WS_URL, {
    reconnect: true,
    timeout: 10000,
    reconnectionAttempts: 3
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link: authContext.concat(splitLink),
  cache
});

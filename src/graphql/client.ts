import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getEnvVar } from '@util/env';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const serverEndpoint = getEnvVar('CUSTOM_SERVER_ENDPOINT');
const isDev = serverEndpoint?.includes('127.0.0.1');

const socketScheme = isDev ? 'ws://' : 'wss://';
const httpScheme = isDev ? 'http://' : 'https://';

const WS_URL = `${socketScheme}${serverEndpoint}/api/graphql`;

const httpLink = new HttpLink({
  uri: `${httpScheme}${serverEndpoint}/api/graphql`
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
  link: splitLink,
  cache
});

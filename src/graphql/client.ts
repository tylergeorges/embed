import { createClient, cacheExchange, fetchExchange, subscriptionExchange } from 'urql';
import { getEnvVar } from '@util/env';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const serverEndpoint = getEnvVar('CUSTOM_SERVER_ENDPOINT');
const isDev = serverEndpoint?.includes('127.0.0.1');

const socketScheme = isDev ? 'ws://' : 'wss://';
const httpScheme = isDev ? 'http://' : 'https://';

const WS_URL = `${socketScheme}${serverEndpoint}/api/graphql`;

const subClient = new SubscriptionClient(WS_URL, {
  reconnect: true,
  timeout: 10000,
  reconnectionAttempts: 3
});

export const client = createClient({
  url: `${httpScheme}${serverEndpoint}/api/graphql`,
  exchanges: [
    fetchExchange,
    cacheExchange,

    subscriptionExchange({
      forwardSubscription: request => subClient.request(request)
    })
  ]
  // TODO: Pass auth header when auth is implemented on frontend.
});

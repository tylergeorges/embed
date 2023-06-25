import { createClient, cacheExchange, fetchExchange, subscriptionExchange } from 'urql';
import { getEnvVar } from '@util/env';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const socketScheme = getEnvVar('CUSTOM_SERVER_ENDPOINT')?.includes('127.0.0.1')
  ? 'ws://'
  : 'wss://';

const WS_URL = `${socketScheme}${getEnvVar('CUSTOM_SERVER_ENDPOINT')}/api/graphql`;

export const client = createClient({
  url: `https://${getEnvVar('CUSTOM_SERVER_ENDPOINT')}/api/graphql`,
  exchanges: [
    cacheExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: request =>
        new SubscriptionClient(WS_URL, { reconnect: true }).request(request)
    })
  ]
  // TODO: Pass auth header when auth is implemented on frontend.
});

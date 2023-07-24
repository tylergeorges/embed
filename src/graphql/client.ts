import { createClient, cacheExchange, fetchExchange, subscriptionExchange } from 'urql';
import { getEnvVar } from '@util/env';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const socketScheme = getEnvVar('CUSTOM_SERVER_ENDPOINT')?.includes('127.0.0.1')
  ? 'ws://'
  : 'wss://';

const WS_URL = `${socketScheme}${getEnvVar('CUSTOM_SERVER_ENDPOINT')}/api/graphql`;

const subClient = new SubscriptionClient(WS_URL, {
  reconnect: true,
  timeout: 10000,
  reconnectionAttempts: 3
});

let threadSubClient: SubscriptionClient;

export const client = createClient({
  url: `https://${getEnvVar('CUSTOM_SERVER_ENDPOINT')}/api/graphql`,
  exchanges: [
    fetchExchange,
    cacheExchange,

    subscriptionExchange({
      forwardSubscription: request => {
        const isThreadQuery = request.query.includes('Thread');

        if (!isThreadQuery) return subClient.request(request);

        if (!threadSubClient) {
          threadSubClient = new SubscriptionClient(WS_URL, {
            reconnect: true,
            timeout: 10000,
            reconnectionAttempts: 3
          });
        }

        return threadSubClient.request(request);
      }
    })
  ]
  // TODO: Pass auth header when auth is implemented on frontend.
});

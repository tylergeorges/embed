import { createClient, cacheExchange, fetchExchange, subscriptionExchange } from 'urql';
import { getEnvVar } from '@util/env';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const socketScheme = getEnvVar('CUSTOM_SERVER_ENDPOINT')?.includes('127.0.0.1')
  ? 'ws://'
  : 'wss://';

const WS_URL = `${socketScheme}${getEnvVar('CUSTOM_SERVER_ENDPOINT')}/api/graphql`;

const subClient: SubscriptionClient = new SubscriptionClient(WS_URL, {
  reconnect: true,
  timeout: 10000,
  reconnectionAttempts: 3
});

// export const client = createClient({
//   url: `https://${getEnvVar('CUSTOM_SERVER_ENDPOINT')}/api/graphql`,

//   exchanges: [
//     fetchExchange,
//     cacheExchange,
//     subscriptionExchange({
//       forwardSubscription: request =>
//         new SubscriptionClient(WS_URL, {
//           reconnect: true,
//           timeout: 10000,
//           reconnectionAttempts: 3
//         }).request(request)
//     })
//   ]
//   // TODO: Pass auth header when auth is implemented on frontend.
// });
export const client = createClient({
  url: `https://${getEnvVar('CUSTOM_SERVER_ENDPOINT')}/api/graphql`,

  exchanges: [
    fetchExchange,
    cacheExchange,
    subscriptionExchange({
      forwardSubscription: request => subClient.request(request)
    })
  ]
  // TODO: Pass auth header when auth is implemented on frontend.
});

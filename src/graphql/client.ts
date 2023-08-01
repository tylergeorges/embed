import { createClient, cacheExchange, fetchExchange, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { GRAPHQL_URL, WS_URL } from '@lib/api/url';

const subClient = new SubscriptionClient(WS_URL, {
  reconnect: true,
  timeout: 10000,
  reconnectionAttempts: 3
});

export const client = createClient({
  url: GRAPHQL_URL,
  exchanges: [
    fetchExchange,
    cacheExchange,

    subscriptionExchange({
      forwardSubscription: request => subClient.request(request)
    })
  ]
  // TODO: Pass auth header when auth is implemented on frontend.
});

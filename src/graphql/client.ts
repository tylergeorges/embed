import { createClient, cacheExchange, fetchExchange, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { GRAPHQL_URL, WS_URL } from '@lib/api/url';

const subClient = new SubscriptionClient(WS_URL, {
  reconnect: true,
  timeout: 10000,
  reconnectionAttempts: 3
});

const getHeaders = () => {
  let token: string = '';

  try {
    token = window.localStorage.getItem('token') ?? '';
  } catch (err) {
    console.error(err);
  }

  console.log(token);

  return { Authorization: token };
};

export const client = createClient({
  url: GRAPHQL_URL,
  exchanges: [
    fetchExchange,
    cacheExchange,

    subscriptionExchange({
      forwardSubscription: request => subClient.request(request)
    })
  ],

  fetchOptions: {
    headers: getHeaders()
  }
  // TODO: Pass auth header when auth is implemented on frontend.
});

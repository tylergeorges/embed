import {
  createClient,
  cacheExchange,
  fetchExchange,
  subscriptionExchange,
  dedupExchange
} from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { GRAPHQL_URL, WS_URL } from '@lib/api/url';

const subClient = new SubscriptionClient(WS_URL, {
  reconnect: true,
  timeout: 10000,
  reconnectionAttempts: 3
});

export const getToken = () => {
  let token: string = '';

  try {
    token = localStorage.getItem('token') ?? '';
  } catch (err) {
    console.error(err);
  }

  return token;
};

export const client = createClient({
  url: GRAPHQL_URL,
  exchanges: [
    cacheExchange,
    dedupExchange,

    fetchExchange,

    subscriptionExchange({
      forwardSubscription: request => subClient.request(request)
    })
  ],

  fetchOptions: () => {
    const token = getToken();

    return { headers: { Authorization: token } };
  }
});

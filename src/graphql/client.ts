/* eslint-disable no-underscore-dangle */
import {
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
  defaultDataIdFromObject
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GRAPHQL_URL, WS_URL } from '@lib/api/url';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';

export const getToken = () => {
  try {
    return localStorage.getItem('token');
  } catch (err) {
    console.error(err);
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

const wsLink = new WebSocketLink({
  uri: WS_URL,
  options: {
    reconnect: true
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache({
  dataIdFromObject(res) {
    switch (res.__typename) {
      case 'User': {
        return `User:${res.id}` as string;
      }
      case 'Mention': {
        return `Mention:${res.id}`;
      }

      default:
        return defaultDataIdFromObject(res);
    }
  }
});

export const client = new ApolloClient({
  link: authContext.concat(splitLink),
  cache
});

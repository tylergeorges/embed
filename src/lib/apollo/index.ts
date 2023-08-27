import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context';

import cache from './cache'
import link from './link'

const queryParams = new URLSearchParams(location.search)

const authLink = setContext((_, { headers }) => {
  headers ??= {}

  if (queryParams.has('settings-group')) headers['X-Settings-Group'] = queryParams.get('settings-group');

  return { headers }
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache,
  connectToDevTools: true
});

export default client

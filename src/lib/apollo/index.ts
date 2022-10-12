import { ApolloClient } from '@apollo/client'

import cache from './cache'
import link from './link'
import {setContext} from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token: string
  try {
    token = window.localStorage.getItem('token');
  } catch (e) {}

  // return the headers to the context so httpLink can read them
  if (token) {
    return {
      headers: {
        ...headers,
        authorization: token ? token : "",
      }
    }
  }
  return {
    headers
  }
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache,
  connectToDevTools: true
});

export default client

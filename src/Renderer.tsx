import client from '@lib/apollo'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

import { Router } from 'react-router-dom'

import App from './app'
import { history } from '@lib/history'

import register, { unregister } from './registerServiceWorker'

const Renderer = () =>
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <Router history={history}>
        <App />
      </Router>
    </ApolloHooksProvider>
  </ApolloProvider>

export default Renderer

// Hot reloading
declare const module: any;
if (module.hot) {
  unregister();
  module.hot.accept()
} else {
  register();
}

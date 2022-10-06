import 'babel-polyfill'

import client from '@lib/apollo'
import * as Sentry from '@sentry/browser';
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './app'

import register, { unregister } from './registerServiceWorker'

if (!window.location.hostname.includes(`127.0.0.1`) && !window.location.hostname.includes(`localhost`))
    Sentry.init({dsn: 'https://ba886140cbbf46d1b8c5a9c7f6d55267@bugs.widgetbot.io/6'});

// Render App
ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// Hot reloading
// declare const module: any;
// if (module.hot) {
//     unregister();
//     module.hot.accept()
// } else {
//     register();
// }

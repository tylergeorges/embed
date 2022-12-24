import React from 'react';
import type { AppProps } from 'next/app';
import { StoreProvider } from 'easy-peasy';
import { Provider } from 'urql';
import { injectGlobal } from '@emotion/css';

import { store } from '../state';
import { client } from '../graphql/client';

function App({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  injectGlobal`
    html,
    body {
      padding: 0;
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
      Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    * {
      box-sizing: border-box;
    }

    @media (prefers-color-scheme: dark) {
      html {
        color-scheme: dark;
      }
      body {
        color: white;
        background: black;
      }
    }
  `;

  return (
    <StoreProvider store={store}>
      <Provider value={client}>
        <Component {...pageProps} />
      </Provider>
    </StoreProvider>
  );
}

export default App;

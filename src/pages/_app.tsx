import React from 'react';
import type { AppProps } from 'next/app';
import { StoreProvider } from 'easy-peasy';
import { Provider } from 'urql';
import { globalCss } from '@stitches/react';
import { store } from '../state';
import { client } from '../graphql/client';
import RenderProvider from '../util/render';
import '../i18n';

function App({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  // injectGlobal`
  //   html,
  //   body {
  //     padding: 0;
  //     margin: 0;
  //     font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
  //     Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  //   }
  //
  //   a {
  //     color: inherit;
  //     text-decoration: none;
  //   }
  //
  //   * {
  //     box-sizing: border-box;
  //   }
  //
  //   @media (prefers-color-scheme: dark) {
  //     html {
  //       color-scheme: dark;
  //     }
  //     body {
  //       color: white;
  //       background: black;
  //     }
  //   }
  // `;

  const globalStyles = globalCss({
    html: {
      padding: 0,
      margin: 0,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
    },
    body: {
      padding: 0,
      margin: 0,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
    },
    a: {
      color: 'inherit',
      textDecoration: 'none'
    },
    '*': {
      boxSizing: 'border-box'
    },
    '@media (prefers-color-scheme: dark)': {
      html: {
        colorScheme: 'dark'
      },
      body: {
        color: 'white',
        background: 'black'
      }
    }
  });

  globalStyles();
  return (
    <RenderProvider>
      <StoreProvider store={store}>
        <Provider value={client}>
          <Component {...pageProps} />
        </Provider>
      </StoreProvider>
    </RenderProvider>
  );
}

export default App;

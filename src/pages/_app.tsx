import React from 'react';
import type { AppProps } from 'next/app';
import { StoreProvider } from 'easy-peasy';
import { Provider as GraphQLProvider } from 'urql';
import { globalCss } from '@stitches/react';
import { store } from '@state';
import '../i18n';
// import { theme } from '../../stitches.config';
import { client } from '@graphql/client';
import SettingsProvider from '@lib/contexts/SettingsProvider';
import { theme } from '@stitches';

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
        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      width: '100%',
      height: '100%'
    },
    body: {
      padding: 0,
      margin: 0,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      width: '100%',
      height: '100%'
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
    },
    '#__next': {
      width: '100%',
      height: '100%'
    },
    'input::placeholder': {
      color: theme.colors.primaryOpacity50
    }
  });

  globalStyles();
  return (
    <StoreProvider store={store}>
      <GraphQLProvider value={client}>
        <SettingsProvider>
          <Component {...pageProps} />
        </SettingsProvider>
      </GraphQLProvider>
    </StoreProvider>
  );
}

export default App;

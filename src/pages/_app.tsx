import React from 'react';
import type { AppProps } from 'next/app';
import { StoreProvider } from 'easy-peasy';
import { Provider as GraphQLProvider } from 'urql';
import { globalCss } from '@stitches/react';
import { store } from '@state/store';
import '../i18n';
import { client } from '@graphql/client';
import SettingsProvider from '@lib/contexts/SettingsProvider';
import { theme } from '@stitches';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  const globalStyles = globalCss({
    html: {
      padding: 0,
      margin: 0,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    },
    body: {
      padding: 0,
      margin: 0,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      width: '100%',
      height: '100%',
      overflowX: 'hidden'
    },
    a: {
      color: 'inherit',
      textDecoration: 'none'
    },
    '*, ::after, ::before': {
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
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
          </Head>
          <Component {...pageProps} />
        </SettingsProvider>
      </GraphQLProvider>
    </StoreProvider>
  );
}

export default App;

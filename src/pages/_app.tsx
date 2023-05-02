import type { AppProps } from 'next/app';
import Head from 'next/head';
import { StoreProvider } from 'easy-peasy';
import { Provider as GraphQLProvider } from 'urql';
import { store } from '@state/store';
import { theme, globalCss } from '@stitches';
import { client } from '@graphql/client';
import '../i18n';
import { GuildProvider } from '@components/Providers';
import React from 'react';

function App({ Component, pageProps }: AppProps) {
  const globalStyles = globalCss({
    html: {
      padding: 0,
      margin: 0,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      backgroundColor: theme.colors.background
    },
    body: {
      padding: 0,
      margin: 0,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      width: '100%',
      height: '100%',
      overflowX: 'hidden',
      backgroundColor: theme.colors.background
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
      color: theme.colors.primaryOpacity30
    }
  });

  globalStyles();
  return (
    <StoreProvider store={store}>
      <GraphQLProvider value={client}>
        <GuildProvider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
          </Head>
          <Component {...pageProps} />
        </GuildProvider>
      </GraphQLProvider>
    </StoreProvider>
  );
}

export default App;

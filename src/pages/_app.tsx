import type { AppProps } from 'next/app';
import Head from 'next/head';
import { StoreProvider } from 'easy-peasy';
import { store } from '@state/store';
import { theme, globalCss } from '@stitches';
import { client } from '@graphql/client';
import '../i18n';
import React from 'react';
import DataProvider from '@components/Providers/DataProvider';
import { ApolloProvider } from '@apollo/client';

const globalStyles = globalCss({
  '@font-face': [
    {
      fontFamily: 'GgSans',
      src: 'url(/font/gg-sans-Regular.ttf)',
      fontWeight: '400'
    },
    {
      fontFamily: 'GgSans',
      src: 'url(/font/gg-sans-Medium.ttf)',
      fontWeight: '500'
    },
    {
      fontFamily: 'GgSans',
      src: 'url(/font/gg-sans-Semibold.ttf)',
      fontWeight: '600'
    },
    {
      fontFamily: 'GgSans',
      src: 'url(/font/gg-sans-Bold.ttf)',
      fontWeight: '700'
    }
  ],
  html: {
    padding: 0,
    margin: 0,
    fontFamily: 'GgSans',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    boxSizing: 'border-box',

    backgroundOverlay: theme.colors.background
  },
  body: {
    padding: 0,
    margin: 0,
    fontFamily: 'inherit',
    width: '100%',
    height: '100%',
    color: theme.colors.textPrimary,
    overflow: 'hidden',
    boxSizing: 'border-box'
  },
  a: {
    color: 'inherit',
    textDecoration: 'none'
  },

  '*, ::after, ::before': {
    fontFamily: 'inherit',
    boxSizing: 'inherit',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(0, 0, 0, 0.4) rgba(0, 0, 0, 0.2)'
  },

  /* width */
  '::-webkit-scrollbar': {
    width: 16,
    height: 16,
    borderRadius: 8
  },

  /* Track */
  '::-webkit-scrollbar-track': {
    borderRadius: 8,
    backgroundClip: 'padding-box',
    border: '4px solid transparent',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },

  /* Handle */
  '::-webkit-scrollbar-thumb': {
    backgroundClip: 'padding-box',
    borderWidth: '4px',
    borderStyle: 'solid',
    borderColor: 'transparent',

    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    visibility: 'none'
  },

  '.scrollbar-thin': {
    scrollbarWidth: 'thin',

    '&::-webkit-scrollbar-thumb': {
      backgroundClip: 'padding-box',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderRadius: 4,
      backgroundColor: 'rgba(0,0,0,0.4)',
      minHeight: 40,
      visibility: 'none'
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
      visibility: 'none'
    },

    '&::-webkit-scrollbar': {
      width: 8,
      height: 8,
      visibility: 'none'
    }
  },

  /* Handle on hover */
  '::-webkit-scrollbar-thumb:hover': {},

  '.channel-name': {
    height: theme.sizes.channelNameHeight,
    width: '100%',

    borderRadius: theme.radii.xxs,

    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    transition: 'transform ease',
    transitionDuration: theme.transitions.defaultDuration
  },

  '#__next': {
    width: '100%',
    height: '100%'
  }
});

export default function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
      </Head>
      <StoreProvider store={store}>
        <ApolloProvider client={client}>
          <DataProvider>
            <Component {...pageProps} />
          </DataProvider>
        </ApolloProvider>
      </StoreProvider>
    </>
  );
}

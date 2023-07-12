import type { AppProps } from 'next/app';
import Head from 'next/head';
import { StoreProvider } from 'easy-peasy';
import { Provider as GraphQLProvider } from 'urql';
import { store } from '@state/store';
import { theme, globalCss } from '@stitches';
import { client } from '@graphql/client';
import GuildProvider from '@components/Providers/GuildProvider';
import '../i18n';
import React from 'react';

const globalStyles = globalCss({
  '@font-face': {
    fontFamily: 'GgSans',
    src: 'url(/font/gg-sans-Regular.ttf)'
  },
  html: {
    padding: 0,
    margin: 0,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: theme.colors.background,
    boxSizing: 'border-box'
  },
  body: {
    padding: 0,
    margin: 0,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    width: '100%',
    height: '100%',
    color: 'white',
    backgroundColor: theme.colors.background,
    overflow: 'hidden',
    boxSizing: 'border-box'
  },
  a: {
    color: 'inherit',
    textDecoration: 'none'
  },

  '*, ::after, ::before': {
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
  '.non-dragable': {
    '-moz-user-select': 'none',
    '-khtml-user-select': 'none',
    '-webkit-user-select': 'none',
    '-webkit-touch-callout': 'none' /* iOS Safari */,
    ' -khtml-user-select': 'none' /* Konqueror HTML */,
    '-ms-user-select': 'none' /* Internet Explorer/Edge */,
    'user-select': 'none'
  },
  '.channel-name': {
    height: theme.sizes.channelNameHeight,
    width: '100%',

    borderRadius: theme.radii.xxs,

    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    transition: 'transform 350ms ease'
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
        <GraphQLProvider value={client}>
          <GuildProvider>
            <Component {...pageProps} />
          </GuildProvider>
        </GraphQLProvider>
      </StoreProvider>
    </>
  );
}

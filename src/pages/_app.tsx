import type { AppProps } from 'next/app';
import Head from 'next/head';
import { StoreProvider } from 'easy-peasy';
import { Provider as GraphQLProvider } from 'urql';
import { store } from '@state/store';
import { theme, globalCss } from '@stitches';
import { client } from '@graphql/client';
import { GuildProvider } from '@components/Providers';
import '../i18n';

function App({ Component, pageProps }: AppProps) {
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
      backgroundColor: theme.colors.background
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
      overflow: 'hidden'
    },
    a: {
      color: 'inherit',
      textDecoration: 'none'
    },
    '*, ::after, ::before': {
      boxSizing: 'border-box'
    },

    /* width */
    '::-webkit-scrollbar': {
      width: 16,
      height: 16
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
      backgroundColor: 'rgba(0,0,0,0.4)',
      minHeight: 40,
      backgroundClip: 'padding-box',
      border: '4px solid transparent',
      borderRadius: 8
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
      width: theme.sizes.channelNameWidth,
      height: theme.sizes.channelNameHeight,

      marginX: theme.space.sm,
      marginY: theme.space.xxs,
      paddingX: theme.space.lg,

      borderRadius: theme.radii.xxs,

      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden'
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

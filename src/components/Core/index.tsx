import { styled, css, theme } from '@stitches';

export const Main = styled(
  'main',
  'main',
  css({
    height: '100%',
    backgroundColor: theme.colors.background
  })
);

export const Notifications = styled(
  'div',
  'notifications',
  css({
    button: {
      cursor: 'pointer',
      outline: 0,
      fontWeight: '500 !important'
    },

    '.notification-br': {
      bottom: theme.url.height ? `calc(100% - ${theme.url.height}px)` : '0'
    },

    '.notification': {
      backgroundColor: `${theme.colors.primaryOpacity10} !important`,
      minHeight: '60px',
      height: 'auto !important'
    },

    '.notification-dismiss': {
      backgroundColor: `${theme.colors.primaryOpacity50} !important`
    }
  })
);

export const Wrapper = styled(
  'div',
  'wrapper',
  css({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    transition: 'margin 0.3s ease, width 0.3s ease',

    '&::after': {
      content: '',
      height: '100%',
      width: '100%',
      zIndex: 8,
      pointerEvents: 'none',
      transition: 'opacity 0.5s ease',
      willChange: 'opacity',
      backgroundColor: 'rgb(0, 0, 0, 0.5)',
      opacity: 0
    },

    variants: {
      // variant: {
      hideOnMobile: {
        true: {
          '@media only screen and (max-width: 520px)': {
            display: 'none'
          }
        }
      },
      threadFullscreen: {
        false: {
          borderLeft: '8px solid #202225'
        }
      },
      squashed: {
        true: {}
      }
      // }
    },
    compoundVariants: [
      {
        squashed: true,
        threadFullscreen: true,
        css: {
          '@media (min-width: 521px)': {
            marginLeft: '200px',
            width: 'calc(100% - 200px)'
          },
          '@media (min-width: 521px) and (max-width: 400px), (min-width: 521px) and (max-height: 340px)':
            {
              marginLeft: '180px',
              width: 'calc(100% - 180px)'
            },
          '@media (max-width: 520px)': {
            '&::after': {
              pointerEvents: 'initial',
              opacity: 1
            },
            '*': {
              pointerEvents: 'none !important'
            }
          }
        }
      }
    ]
  })
);

export const CategoryName = styled(
  'summary',
  'categoryname',
  css({
    textTransform: 'uppercase',
    transition: '100ms ease',
    color: 'rgba(255,255,255,0.4)',
    height: 20,
    //  Ignore dragging
    '-moz-user-select': 'none',
    '-khtml-user-select': 'none',
    '-webkit-user-select': 'none',
    '-webkit-touch-callout': 'none' /* iOS Safari */,
    ' -khtml-user-select': 'none' /* Konqueror HTML */,
    '-ms-user-select': 'none' /* Internet Explorer/Edge */,
    'user-select': 'none',
    marginLeft: 8,
    marginRight: 8,
    marginTop: 2,
    marginBottom: 2,
    '&:hover': {
      color: 'rgba(255,255,255,0.7)'
    }
  })
);
export const MessageWrapper = styled(
  'div',
  'messagewrapper',
  css({
    width: '100%',
    height: '100%',
    paddingLeft: 72,
    paddingRight: 72,
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  })
);

export const ChannelName = styled(
  'a',
  'channelname',
  css({
    fontSize: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    '-moz-user-select': 'none',
    '-khtml-user-select': 'none',
    '-webkit-user-select': 'none',
    '-webkit-touch-callout': 'none' /* iOS Safari */,
    ' -khtml-user-select': 'none' /* Konqueror HTML */,
    '-ms-user-select': 'none' /* Internet Explorer/Edge */,
    'user-select': 'none'
  })
);
export const ChannelNameInner = styled(
  'div',
  'channelname',
  css({
    fontSize: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    lineHeight: 2,
    fontWeight: 600,
    borderRadius: 4,
    padding: 1.5,
    color: 'rgba(255,255,255,0.3)',
    transition: '100ms ease',
    '-moz-user-select': 'none',
    '-khtml-user-select': 'none',
    '-webkit-user-select': 'none',
    '-webkit-touch-callout': 'none' /* iOS Safari */,
    ' -khtml-user-select': 'none' /* Konqueror HTML */,
    '-ms-user-select': 'none' /* Internet Explorer/Edge */,
    'user-select': 'none',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.05)',
      color: 'rgba(255,255,255,0.7)'
    }
  })
);
export const ChannelNameActiveInner = styled(
  'div',
  'channelname',
  css({
    fontSize: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    lineHeight: 2,
    fontWeight: 600,
    borderRadius: 4,
    padding: 1.5,
    color: 'rgba(255,255,255,0.8)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    '-moz-user-select': 'none',
    '-khtml-user-select': 'none',
    '-webkit-user-select': 'none',
    '-webkit-touch-callout': 'none' /* iOS Safari */,
    ' -khtml-user-select': 'none' /* Konqueror HTML */,
    '-ms-user-select': 'none' /* Internet Explorer/Edge */,
    'user-select': 'none',
    transition: '100ms ease'
  })
);

export const ChannelNameContainer = styled(
  'div',
  'channelname_container',
  css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box'
  })
);
export {};

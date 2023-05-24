import { styled, css, theme, keyframes } from '@stitches';

const zoomIn = keyframes({
  from: { transform: 'scale(0.90)', opacity: 0 },
  to: { transform: 'initial', opacity: 1 }
});

export const Main = styled(
  'main',
  'main',
  css({
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: theme.colors.background,
    // position: 'relative',
    animation: `${zoomIn} 0.5s ease`,
    justifyItems: 'center'
  })
);

export const InnerMain = styled(
  'div',
  'inner-main',
  css({
    flexDirection: 'row',
    width: '100%',
    // maxWidth: '100%',
    height: '100%',
    display: 'flex'
    // position: 'relative'
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
      // zIndex: 8,
      pointerEvents: 'none',
      transition: 'opacity 0.5s ease',
      willChange: 'opacity',
      backgroundColor: 'rgb(0, 0, 0, 0.5)',
      opacity: 0
    }

    // variants: {
    //   // variant: {
    //   hideOnMobile: {
    //     true: {
    //       '@media only screen and (max-width: 520px)': {
    //         display: 'none'
    //       }
    //     }
    //   },
    //   threadFullscreen: {
    //     false: {
    //       borderLeft: '8px solid #202225'
    //     }
    //   },
    //   squashed: {
    //     true: {}
    //   }
    //   // }
    // },
    // compoundVariants: [
    //   {
    //     squashed: true,
    //     threadFullscreen: true,
    //     css: {
    //       '@media (min-width: 521px)': {
    //         marginLeft: '200px',
    //         width: 'calc(100% - 250px)'
    //       },
    //       '@media (min-width: 521px) and (max-width: 400px), (min-width: 521px) and (max-height: 340px)':
    //         {
    //           marginLeft: '180px',
    //           width: 'calc(100% - 180px)'
    //         },
    //       '@media (max-width: 520px)': {
    //         '&::after': {
    //           pointerEvents: 'initial',
    //           opacity: 1
    //         },
    //         '*': {
    //           pointerEvents: 'none !important'
    //         }
    //       }
    //     }
    //   }
    // ]
  })
);

export {};

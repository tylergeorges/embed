import { styled, theme, keyframes } from '@stitches';

const zoomIn = keyframes({
  from: { transform: 'scale(0.90)', opacity: 0 },
  to: { transform: 'initial', opacity: 1 }
});

export const Main = styled('main', 'main', {
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  backgroundColor: theme.colors.background,
  animation: `${zoomIn} 0.5s ease`,
  justifyItems: 'center'
});

export const InnerMain = styled('div', 'inner-main', {
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  display: 'flex'
});

export const Notifications = styled('div', 'notifications', {
  button: {
    cursor: 'pointer',
    outline: 0,
    fontWeight: '$medium'
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
});

export const Wrapper = styled('div', 'wrapper', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  transition: 'margin 0.3s ease, width 0.3s ease',

  '&::after': {
    content: '',
    height: '100%',
    width: '100%',
    pointerEvents: 'none',
    transition: 'opacity 0.5s ease',
    willChange: 'opacity',
    backgroundColor: 'rgb(0, 0, 0, 0.5)',
    opacity: 0
  }
});

export {};

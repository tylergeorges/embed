import { styled, css, theme } from '@/../stitches.config';

export const Main = styled('main', 'main', css({
  height: '100%'
}))

export const Notifications = styled('div', 'notifications', css({
  button: {
    cursor: 'pointer',
    outline: 0,
    fontWeight: 'bold'
  },

  backgroundColor: theme.colors.primaryDark,

  variants: {
    dismiss: {
      true: {
        backgroundColor: theme.colors.primaryOpacity50
      }
    }
  }
}))

export const Wrapper = styled('div', 'wrapper', css({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  zIndex: 8,
  pointerEvents: 'none',
  transition: 'opacity 0.5s ease',
  willChange: 'opacity',
  backgroundColor: 'rgb(0, 0, 0, 0.5)',
  opacity: 0,

  variants: {
    hide: {
      true: {
        display: 'none'
      }
    },
    threadFullscreen: {
      true: {
        borderLeft: '8px solid #202225'
      }
    }
  }
}))

export {}
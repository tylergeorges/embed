import { css, theme } from '@stitches';
import { keyframes, styled } from '@stitches/react';

const cube = keyframes({
  '25%': {
    transform: 'translateX(42px) rotate(-90deg) scale(0.5)'
  },
  '50%': {
    transform: 'translateX(42px) translateY(42px) rotate(-179deg)'
  },
  '50.1%': {
    transform: 'translateX(42px) translateY(42px) rotate(-180deg)'
  },
  '75%': {
    transform: 'translateX(0px) translateY(42px) rotate(-270deg) scale(0.5)'
  },
  '100%': {
    transform: 'rotate(-360deg)'
  }
});

export const Spinner = styled(
  'div',
  'spinner',
  css({
    '&::after, &::before': {
      content: '',
      backgroundColor: theme.colors.accent,
      width: 15,
      height: 15,
      position: 'absolute',
      alignSelf: 'center',
      justifySelf: 'center',
      bottom: 15,
      right: 15,
      animation: `${cube} 1.8s infinite ease-in-out`
    },
    '&::after': {
      animationDelay: ' -0.9s'
    },
    variants: {
      type: {
        fetchingMessages: {
          height: 70,
          '&::after, &::before': {
            width: 10,
            height: 10,
            bottom: 0,
            top: 20
          },
          alignSelf: 'center',
          justifySelf: 'center'
        }
      }
    }
  })
);

export const SpinnerWrapper = styled(
  'div',
  'spinner-wrapper',
  css({
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.background,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '*:first-child': {
      position: 'absolute'
    },
    variants: {
      type: {
        fetchingMessages: {
          position: 'relative',
          width: '100%',
          height: 80
          // transform: 'scale(0.9)'
        }
      }
    }
  })
);

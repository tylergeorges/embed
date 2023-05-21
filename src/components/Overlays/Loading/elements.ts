import { css, styled, theme } from '@stitches';
import { keyframes } from '@stitches/react';

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
      //   top: -24,
      //   left: -32,
      animation: `${cube} 1.8s infinite ease-in-out`
    },
    '&::after': {
      animationDelay: ' -0.9s'
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
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    }
  })
);

import { commonComponentId, theme, styled } from '@stitches';
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

export const Spinner = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'spinner'
})('div', {
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
    isFetchingMessages: {
      true: {
        justifySelf: 'center',
        alignSelf: 'center',

        height: 70,

        '&::after, &::before': {
          width: 10,
          height: 10,
          bottom: 0,
          top: 20
        }
      }
    }
  }
});

export const SpinnerWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'spinner-wrapper'
})('div', {
  width: '100%',
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '*:first-child': {
    position: 'absolute'
  },

  variants: {
    isFetchingMessages: {
      true: {
        position: 'relative',
        width: '100%',
        height: 80
      }
    }
  }
});

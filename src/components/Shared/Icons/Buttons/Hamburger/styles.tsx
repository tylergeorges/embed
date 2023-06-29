import { theme, styled } from '@stitches';
// import { styled } from '@stitches/react';

export const Ham = styled('button', 'hamburger', {
  position: 'relative',

  width: theme.sizes.iconSizeSmall,
  height: theme.sizes.iconSizeMed,
  flexShrink: 0,

  marginX: theme.space.sm,

  border: 'none',
  background: 'none',
  color: theme.colors.accent,

  cursor: 'pointer',
  transition: '0.3s',
  outline: 'none',

  '&::before': {
    position: 'absolute',
    display: 'block',
    content: '',
    top: -8,
    left: -10,

    width: 40,
    height: 40,

    borderRadius: '50%',

    opacity: 0,
    transition: 'opacity 0.1s ease',
    backgroundColor: theme.colors.primaryOpacity10
  },

  '&:hover': {
    '&::before': {
      opacity: 1
    }
  },

  variants: {
    open: {
      true: {
        transform: 'rotate(-180deg)',

        '&::before': {
          top: -7,
          left: -9
        },

        div: {
          '&::before': {
            width: 15,
            transform: 'rotate(45deg)',
            top: -4.8,
            right: -3
          },

          '&::after': {
            top: 4.8,
            width: 15,
            transform: 'rotate(-45deg)',
            right: -3
          }
        }
      }
    },

    thread: {
      true: {
        color: 'transparent',

        div: {
          '&::before, &::after': {
            color: theme.colors.accent,
            width: 'inherit',
            right: -1,
            top: 0
          }
        }
      }
    }
  }
});

export const Burger = styled('div', 'burger', {
  '&, &::before, &::after': {
    content: '',
    backgroundColor: theme.colors.accent,
    color: 'inherit',
    position: 'absolute',
    height: 2,
    width: '100%',
    top: 'calc(50% - 2px)',
    right: 0,
    transition: '0.3s'
  },

  '&::before': {
    top: -6
  },

  '&::after': {
    top: 6
  }
});

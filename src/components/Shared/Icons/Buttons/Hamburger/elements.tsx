import { theme, styled } from '@stitches';

export const Ham = styled('button', 'hamburger', {
  border: 'none',
  background: 'none',
  flexShrink: 0,
  color: theme.colors.accent,
  marginLeft: '$sm',
  marginRight: '$xs',
  position: 'relative',
  width: '$iconSizeSmall',
  height: '$iconSizeMed',
  cursor: 'pointer',
  transition: '0.3s',
  outline: 'none',

  '&::before': {
    position: 'absolute',
    content: '',
    display: 'block',
    top: -8,
    left: -10,
    width: 40,
    height: 40,
    opacity: 0,
    transition: 'opacity 0.1s ease',
    backgroundColor: theme.colors.primaryOpacity10,
    borderRadius: '50%'
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

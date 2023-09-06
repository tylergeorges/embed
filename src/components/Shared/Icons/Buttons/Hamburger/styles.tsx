import { theme, styled, commonComponentId } from '@stitches';

export const Ham = styled.withConfig({
  displayName: 'hamburger',
  componentId: commonComponentId
})('button', {
  position: 'relative',

  width: theme.sizes.iconSizeSm,
  height: 28,

  marginLeft: theme.space.lg,
  marginRight: theme.space.sm,

  border: 'none',
  background: 'none',
  color: theme.colors.accent,

  transitionDuration: theme.transitions.defaultDuration,
  transitionTimingFunction: 'ease',

  cursor: 'pointer',
  outline: 'none',
  display: 'block',

  '&::before': {
    position: 'absolute',
    display: 'block',
    content: '',
    top: -6,
    left: -9,

    width: theme.sizes.iconSizeXl,
    height: theme.sizes.iconSizeXl,

    borderRadius: '50%',

    opacity: 0,
    transition: `opacity ${theme.transitions.fastestDuration} ease`,
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
        color: theme.colors.accent,

        '&::before': {
          left: -9,
          top: -5
        },

        div: {
          backgroundColor: theme.colors.accent,

          '&::before': {
            width: 15,
            transform: 'rotate(45deg)',
            top: -5,

            right: -3
          },

          '&::after': {
            top: 5,
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

export const Burger = styled.withConfig({
  displayName: 'burger',
  componentId: commonComponentId
})('div', {
  '&, &::before, &::after': {
    content: '',
    backgroundColor: theme.colors.accent,
    color: theme.colors.accent,
    position: 'absolute',
    height: 2,
    width: '100%',
    right: 0,

    transitionDuration: theme.transitions.defaultDuration,
    transitionTimingFunction: 'ease'
  },

  '&::before': {
    top: -5
  },

  '&::after': {
    top: 6
  }
});

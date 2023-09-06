import { theme, styled, commonComponentId } from '@stitches';

export const Ham = styled.withConfig({
  displayName: 'hamburger',
  componentId: commonComponentId
})('button', {
  position: 'relative',

  width: theme.sizes.iconSizeSm,
  height: theme.sizes.iconSizeMd,
  flexShrink: 0,

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
    top: -7,
    left: -9,

    width: 40,
    height: 40,

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
          top: -7
        },

        div: {
          backgroundColor: theme.colors.accent,

          '&::before': {
            width: 15,
            transform: 'rotate(45deg)',
            top: -4.8,
            backgroundColor: theme.colors.accent,

            right: -3
          },

          '&::after': {
            top: 4.8,
            width: 15,
            transform: 'rotate(-45deg)',
            right: -3,
            backgroundColor: theme.colors.accent
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
    top: 'calc(50% - 2px)',
    right: 0,

    transitionDuration: theme.transitions.defaultDuration,
    transitionTimingFunction: 'ease'
  },

  '&::before': {
    top: -6
  },

  '&::after': {
    top: 6
  }
});

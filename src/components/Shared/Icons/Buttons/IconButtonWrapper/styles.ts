import { theme, styled, commonComponentId } from '@stitches';

export const IconRoot = styled.withConfig({
  displayName: 'button-icons',
  componentId: commonComponentId
})('svg', {
  justifySelf: 'flex-end',

  variants: {
    size: {
      small: {
        width: theme.sizes.iconSizeSmall,
        height: theme.sizes.iconSizeSmall
      },

      regular: {
        width: theme.sizes.iconSizeMed,
        height: theme.sizes.iconSizeMed
      },

      large: {
        width: theme.sizes.iconSizeXl,
        height: theme.sizes.iconSizeXl
      }
    },

    type: {
      headerIcon: {
        marginX: theme.space.sm
      }
    },

    color: {
      light: {
        path: {
          fill: theme.colors.iconLight
        },
        use: {
          color: theme.colors.iconLight
        }
      },

      dark: {
        path: {
          fill: theme.colors.iconDark
        },
        use: {
          color: theme.colors.iconDark
        }
      }
    }
  }
});

export const IconButtonRoot = styled.withConfig({
  displayName: 'icon-button_wrapper_root',
  componentId: commonComponentId
})('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: theme.sizes.iconSizeMed,
  height: theme.sizes.iconSizeMed,

  marginX: theme.space.sm,

  background: 'transparent',
  outline: 'none',
  border: 'none',
  whiteSpace: 'nowrap'
});

export const EmojisIconRoot = styled.withConfig({
  displayName: 'icon-emojis_icon_root',
  componentId: commonComponentId
})('div', {
  backgroundImage:
    'url(https://emerald.widgetbot.io/static/media/15e026451fd814e2d1a13e49c8076978.15e02645.png)',
  backgroundPositionX: 'var(--emoji-x)',
  backgroundPositionY: 'var(--emoji-y)',
  backgroundSize: '242px 110px',

  height: 22,
  minWidth: 22,

  filter: 'grayscale(100%)',
  transition: 'scale  200ms ease, filter 200ms ease',
  cursor: 'pointer',

  '&:hover': {
    scale: '1.14',
    filter: 'grayscale(0%)',
    backgroundPositionX: 'var(--emoji-x)',
    backgroundPositionY: 'var(--emoji-y)'
  }
});

export const SpineIconRoot = styled.withConfig({
  displayName: 'thread-spine',
  componentId: commonComponentId
})('svg', {
  position: 'absolute',
  justifySelf: 'flex-start',
  left: 30,

  width: 12,
  height: 11,

  marginTop: 16
});

export const IconButtonChildrenWrapper = styled.withConfig({
  displayName: 'icon-button_children_wrapper',
  componentId: commonComponentId
})('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  borderRadius: theme.radii.round,

  padding: theme.space.xxs,

  cursor: 'pointer',
  background: 'transparent',
  outline: 'none',
  border: 'none',
  transition: 'background-color ease 150ms',

  '&:hover': {
    path: {
      fill: theme.colors.primaryOpacity80
    },

    use: {
      color: theme.colors.primaryOpacity80
    }
  },

  variants: {
    backgroundGlowOnHover: {
      true: {
        '&:hover': {
          backgroundColor: theme.colors.primaryOpacity20
        }
      }
    },

    isActive: {
      true: {
        path: {
          fill: theme.colors.iconActive
        },

        use: {
          color: theme.colors.iconActive
        }
      }
    }
  }
});

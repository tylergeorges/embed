import { theme, styled, commonComponentId } from '@stitches';

export const IconRoot = styled.withConfig({
  displayName: 'button-icons'
})('svg', {
  variants: {
    size: {
      small: {
        size: theme.sizes.iconSizeSmall
      },

      regular: {
        width: theme.sizes.iconSizeMed.value
      },

      large: {
        size: theme.sizes.iconSizeXl
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
          fill: theme.colors.iconLight.value,
          color: theme.colors.iconLight.value
        },

        use: {
          color: theme.colors.iconLight.value,
          fill: theme.colors.iconLight.value
        }
      },

      dark: {
        use: {
          fill: theme.colors.textMuted.value,
          color: theme.colors.textMuted.value
        },

        path: {
          fill: theme.colors.textMuted.value,
          color: theme.colors.textMuted.value
        }
      }
    }
  }
});

export const IconButtonRoot = styled.withConfig({
  displayName: 'icon-button_wrapper_root'
})('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  cursor: 'pointer',
  size: theme.sizes.iconSizeMed,

  marginX: theme.space.sm,

  background: 'transparent',
  outline: 'none',
  border: 'none',
  whiteSpace: 'nowrap',

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
          fill: theme.colors.iconActive,
          color: theme.colors.iconActive
        },

        use: {
          color: theme.colors.iconActive,
          fill: theme.colors.iconActive
        }
      }
    }
  }
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

export const IconButtonChildrenWrapper = styled.withConfig({
  displayName: 'icon-button_children_wrapper'
})('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  borderRadius: theme.radii.round,

  padding: theme.space.xs,

  cursor: 'pointer',
  background: 'transparent',
  outline: 'none',
  border: 'none',
  transition: 'background-color ease 150ms',
  color: 'white',

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

export const IconButtonContentWrapper = styled.withConfig({
  displayName: 'icon-button_content_wrapper'
})('span', {
  position: 'relative',

  color: theme.colors.primaryOpacity70,
  fontSize: theme.fontSizes.md,
  marginLeft: theme.space.sm
});

export const ThreadSpineSvgWrapper = styled.withConfig({
  displayName: 'thread-spine_svg_wrapper'
})(IconRoot, {
  bottom: 4,
  position: 'absolute',
  width: 12,
  height: 11
});

export const ThreadSpineWrapper = styled.withConfig({
  displayName: 'thread-spine_wrapper'
})('div', {
  position: 'absolute',
  left: 22,
  width: 12,
  height: 11
});

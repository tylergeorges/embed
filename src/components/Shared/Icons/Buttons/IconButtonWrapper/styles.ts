import { theme, styled, commonComponentId } from '@stitches';
import Image from 'next/image';

export const IconRoot = styled.withConfig({
  componentId: commonComponentId,
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
  componentId: commonComponentId,
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
})(Image, {
  position: 'absolute',
  transform: 'translateX(var(--emoji-x)) translateY(var(--emoji-y))',
  cursor: 'pointer',

  filter: 'grayscale(100%)',
  transition: 'filter 200ms ease',

  '&:hover': {
    filter: 'grayscale(0%)',
    transform: 'translateX(var(--emoji-x)) translateY(var(--emoji-y))'
  }
});

export const EmojisIconWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'icon-emojis_icon_wrapper'
})('div', {
  // Each emoji in the grid is 22x22
  height: 22,
  width: 22,

  transition: 'scale  200ms ease',

  overflow: 'hidden',
  position: 'relative',

  '&:hover': {
    scale: '1.14'
  }
});

export const IconButtonChildrenWrapper = styled.withConfig({
  componentId: commonComponentId,
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
  componentId: commonComponentId,
  displayName: 'icon-button_content_wrapper'
})('span', {
  position: 'relative',

  color: theme.colors.primaryOpacity70,
  fontSize: theme.fontSizes.md,
  marginLeft: theme.space.sm
});

export const ThreadSpineSvgWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'thread-spine_svg_wrapper'
})(IconRoot, {
  bottom: 4,
  position: 'absolute',
  width: 12,
  height: 11
});

export const ThreadSpineWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'thread-spine_wrapper'
})('div', {
  position: 'absolute',
  left: 22,
  width: 12,
  height: 11
});

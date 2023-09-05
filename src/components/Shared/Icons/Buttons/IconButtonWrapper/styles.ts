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
        marginLeft: theme.space.sm
      }
    },

    marginX: {
      sm: {
        marginX: theme.space.sm
      },

      md: {
        marginX: theme.space.md
      },

      lg: {
        marginX: theme.space.lg
      }
    },

    color: {
      channel: {
        color: theme.colors.channelsIcon
      },

      light: {
        color: theme.colors.interactiveDefault
      },

      dark: {
        color: theme.colors.interactiveDefault
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
  whiteSpace: 'nowrap'
});

export const EmojisIconRoot = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'icon-emojis_icon_root'
})(Image, {
  position: 'absolute',
  transform: 'translateX(var(--emoji-x)) translateY(var(--emoji-y))',
  cursor: 'pointer',

  filter: 'grayscale(100%)',
  transition: `filter ${theme.transitions.fasterDuration} ease`,

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

  transition: `scale ease`,
  transitionDuration: theme.transitions.fasterDuration,

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
    use: {
      color: theme.colors.interactiveHover
    }
  },

  variants: {
    backgroundGlowSize: {
      sm: {
        size: theme.sizes.iconSizeSmall,
        borderRadius: theme.radii.round
      },

      md: {
        size: theme.sizes.iconSizeMed,
        borderRadius: theme.radii.round
      },

      lg: {
        size: theme.sizes.iconSizeLarge,
        borderRadius: theme.radii.round
      },

      xl: {
        size: theme.sizes.iconSizeXl,
        borderRadius: theme.radii.round
      }
    },

    isActive: {
      true: {
        use: {
          color: theme.colors.interactiveActive
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

export const StarsIconRoot = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'icon-stars'
})('svg', {
  position: 'absolute',
  width: 104,
  height: 80,
  left: -1
});

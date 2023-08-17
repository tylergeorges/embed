import { theme, styled, commonComponentId } from '@stitches';
import Link from 'next/link';

export const CategoryNameContainer = styled.withConfig({
  displayName: 'category-name_container'
})('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  color: theme.colors.primaryOpacity40,
  paddingRight: theme.space.sm,

  transition: 'color  ease',
  transitionDuration: theme.transitions.fastestDuration,

  cursor: 'pointer',
  boxSizing: 'border-box',

  '&:hover': {
    color: theme.colors.primaryOpacity60
  }
});

export const CategoryNameArrow = styled.withConfig({
  displayName: 'category-name_arrow'
})('div', {
  position: 'relative',
  display: 'inline-block',
  boxSizing: 'border-box',

  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='105.167' fill='rgba(255,255,255,0.3)' height='61.651' id='chevron-down'%3e%3cpath d='M2.868 3.155c3.955-4.046 9.458-4.363 14.291 0l35.434 33.971L88.026 3.155c4.834-4.363 10.347-4.046 14.269 0a10.77 10.77 0 0 1 0 14.643c-3.683 3.791-42.568 40.817-42.568 40.817a9.917 9.917 0 0 1-14.286 0S6.574 21.589 2.874 17.798a10.764 10.764 0 0 1 0-14.643Z'%3e%3c/path%3e%3c/svg%3e")`,
  backgroundSize: '35%',
  backgroundPosition: '50% 50%',
  backgroundRepeat: 'no-repeat',

  width: theme.sizes.iconSizeSmall,
  height: theme.sizes.iconSizeSmall,

  cursor: 'pointer',
  transition: 'transform  ase',
  transitionDuration: theme.transitions.fastestDuration,

  variants: {
    opened: {
      false: {
        transform: 'rotate(-90deg)'
      }
    }
  }
});

export const CategoryNameContent = styled.withConfig({
  displayName: 'category-name'
})('div', {
  textTransform: 'uppercase',
  textRendering: 'optimizeLegibility',
  fontSize: theme.fontSizes.sm,
  alignSelf: 'center',
  boxSizing: 'border-box',
  fontWeight: theme.fontWeights.semibold,
  letterSpacing: '.02em'
});

export const CategoryContainer = styled.withConfig({
  displayName: 'category-container'
})('div', {
  width: '100%',
  boxSizing: 'border-box',
  paddingTop: theme.space.xl,
  zIndex: theme.zIndices.channelsSidebar,

  fontWeight: theme.fontWeights.medium,
  transition: `translateY ${theme.transitions.longerDuration} ease`
});

export const ChannelNameWrapper = styled.withConfig({
  displayName: 'channel-name_wrapper'
})('div', {
  height: 'auto',
  maxHeight: theme.sizes.channelNameHeight,
  overflow: 'hidden',
  marginY: theme.space.xxs,
  transition: 'max-height ease',
  transitionDuration: theme.transitions.defaultDuration,

  // @ts-ignore
  paddingX: theme.space.sm.value,
  width: '100%',

  userSelect: 'none',

  variants: {
    isThread: {
      true: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyItems: 'center',
        width: '100%',
        marginLeft: theme.space.xxl.value,

        // @ts-ignore
        paddingY: theme.space.xs.value
      }
    },

    isActive: {
      false: {
        color: theme.colors.textMuted.value
      },

      true: {
        color: theme.colors.interactiveActive
      }
    },

    // TODO: Find a better way of using compound variants to avoid empty variant styles
    isCategoryOpen: {
      true: {}
    }
  },

  compoundVariants: [
    {
      isActive: false,
      isCategoryOpen: false,

      css: {
        maxHeight: 0,
        margin: 0,
        padding: 0
      }
    },

    {
      isActive: false,
      isCategoryOpen: true,

      css: {
        top: 0
      }
    }
  ]
});

export const ChannelNameInner = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'channel-name_inner'
})(Link, {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  userSelect: 'none',

  // @ts-ignore
  paddingX: theme.space.xxs.value,
  width: '100%',
  fontSize: theme.fontSizes.lg,
  boxSizing: 'border-box',

  marginBottom: theme.space.xxs.value,

  variants: {
    isActive: {
      false: {
        color: theme.colors.channelsPrimary,

        '&:hover': {
          backgroundColor: theme.colors.backgroundModifierHover,
          color: theme.colors.interactiveHover
        }
      }
    }
  }
});

export const ChannelNameIconWrapper = styled.withConfig({
  displayName: 'channel-name_icon_wrapper'
})('div', {
  size: theme.sizes.iconSizeSmall,
  marginRight: theme.space.xs.value
});

export const ChannelNameContent = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'channel-name_content'
})('div', {
  textOverflow: 'ellipsis',
  display: 'inline-block',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  width: '100%'
});

export const ThreadNameInner = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'thread-name'
})(ChannelNameInner, {
  margin: theme.space.none
});

export const ChannelsWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'channels-wrapper'
})('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  boxSizing: 'border-box'
});

export const ThreadsWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'thread-wrapper'
})(ChannelsWrapper, {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  width: '100%',
  height: '100%',

  paddingX: theme.space.sm
});

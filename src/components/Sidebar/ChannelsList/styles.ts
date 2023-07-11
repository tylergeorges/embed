// ! Imported from the library instead of custom config because of weird bugs
import { theme, styled, commonComponentId } from '@stitches';
import Link from 'next/link';

export const CategoryNameContainer = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'category-name_container'
})('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  marginLeft: theme.space.lg,

  color: theme.colors.primaryOpacity40,

  transition: 'color 100ms ease',
  cursor: 'pointer',
  boxSizing: 'border-box',

  '&:hover': {
    color: theme.colors.primaryOpacity60
  }
});

export const CategoryNameArrow = styled.withConfig({
  componentId: commonComponentId,
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
  transition: 'transform 0.15s ease',

  variants: {
    opened: {
      false: {
        transform: 'rotate(-90deg)'
      }
    }
  }
});

export const CategoryNameContent = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'category-name'
})('div', {
  textTransform: 'uppercase',
  fontSize: theme.fontSizes.sm,
  alignSelf: 'center',
  boxSizing: 'border-box'
});

export const CategoryContainer = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'category-container'
})('div', {
  width: '100%',
  boxSizing: 'border-box',

  paddingTop: theme.space.xl,

  fontWeight: theme.fontWeights.medium,
  transition: 'translateY 0.5s ease'
});

export const ChannelNameWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'channel-name_wrapper'
})('div', {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',

  height: 'auto',
  maxHeight: theme.sizes.channelNameHeight,

  boxSizing: 'border-box',

  marginY: theme.space.xxs,

  transition: 'max-height 350ms ease',

  variants: {
    isThread: {
      true: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyItems: 'center',

        marginLeft: theme.space.lg,
        marginRight: theme.space.sm,

        paddingTop: theme.space.md,
        paddingLeft: theme.space.lg,
        paddingRight: theme.space.xs
      }
    },

    isActive: {
      false: {}
    },

    isCategoryOpen: {
      true: {}
    }
  },

  compoundVariants: [
    {
      isActive: false,
      isCategoryOpen: false,

      css: {
        position: 'relative',
        overflow: 'hidden',
        maxHeight: 0,
        margin: 0,
        padding: 0
      }
    },
    {
      isActive: false,
      isCategoryOpen: true,

      css: {
        position: 'relative',
        top: 0
      }
    }
  ]
});

export const ChannelNameInner = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'channel-name'
})(Link, {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  fontSize: theme.fontSizes.lg,
  fontWeight: theme.fontWeights.thin,
  color: theme.colors.primaryOpacity30,

  boxSizing: 'border-box',
  transition: '100ms ease',

  '&:hover': {
    backgroundColor: theme.colors.primaryOpacity10,
    color: theme.colors.primaryOpacity50
  },

  variants: {
    active_state: {
      true: {
        color: theme.colors.primaryOpacity70,
        backgroundColor: 'transparent',

        '&:hover': {
          backgroundColor: 'transparent'
        }
      }
    }
  }
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
  width: '100%'
});

export const ChannelsWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'channels-wrapper'
})('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden'
});

export const ThreadsWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'thread-wrapper'
})(ChannelsWrapper, {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  marginTop: -6,
  padding: 0
});

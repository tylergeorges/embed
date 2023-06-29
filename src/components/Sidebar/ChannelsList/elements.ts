// ! Imported from the library instead of custom config because of weird bugs
import { theme } from '@stitches';
import { styled } from '@stitches/react';
import Link from 'next/link';

export const CategoryNameContainer = styled('div', 'category-name_container', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: theme.space.lg,
  transition: 'color 100ms ease',
  color: theme.colors.primaryOpacity30,
  cursor: 'pointer',
  boxSizing: 'border-box',
  '&:hover': {
    color: theme.colors.primaryOpacity60
  }
});

export const CategoryNameArrow = styled('div', 'category-name_arrow', {
  width: theme.sizes.iconSizeSmall,
  height: theme.sizes.iconSizeSmall,

  cursor: 'pointer',
  boxSizing: 'border-box',
  position: 'relative',
  display: 'inline-block',
  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='105.167' fill='rgba(255,255,255,0.3)' height='61.651' id='chevron-down'%3e%3cpath d='M2.868 3.155c3.955-4.046 9.458-4.363 14.291 0l35.434 33.971L88.026 3.155c4.834-4.363 10.347-4.046 14.269 0a10.77 10.77 0 0 1 0 14.643c-3.683 3.791-42.568 40.817-42.568 40.817a9.917 9.917 0 0 1-14.286 0S6.574 21.589 2.874 17.798a10.764 10.764 0 0 1 0-14.643Z'%3e%3c/path%3e%3c/svg%3e")`,
  backgroundSize: '60%',
  backgroundPosition: '50% 50%',
  backgroundRepeat: 'no-repeat',
  transition: 'transform 0.15s ease',

  variants: {
    opened: {
      false: {
        transform: 'rotate(-90deg)'
      }
    }
  }
});

export const CategoryNameContent = styled('div', 'category-name', {
  textTransform: 'uppercase',
  fontSize: theme.fontSizes.sm,
  alignSelf: 'center',
  boxSizing: 'border-box'
});

export const CategoryContainer = styled('div', 'category-container', {
  width: '100%',
  fontWeight: theme.fontWeights.medium,
  paddingTop: theme.space.xl,
  transition: 'translateY 0.5s ease',
  boxSizing: 'border-box'
});

export const ChannelNameWrapper = styled('div', 'channel-name_wrapper', {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'auto',
  boxSizing: 'border-box',
  transition: 'max-height 350ms ease',
  maxHeight: theme.sizes.channelNameHeight,

  marginTop: theme.space.xxs,
  marginBottom: theme.space.xxs,

  variants: {
    isThread: {
      true: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyItems: 'center',

        marginLeft: theme.space.lg,
        marginRight: theme.space.sm,

        paddingLeft: theme.space.lg,
        paddingRight: theme.space.xs,
        paddingTop: theme.space.md
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

export const ChannelNameInner = styled(Link, 'channel-name', {
  transition: '100ms ease',
  fontSize: '$lg',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  boxSizing: 'border-box',
  color: '$primaryOpacity30',
  fontWeight: '$thin',

  '&:hover': {
    backgroundColor: '$primaryOpacity10',
    color: '$primaryOpacity50'
  },

  variants: {
    active_state: {
      true: {
        color: '$primaryOpacity70',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: 'transparent'
        }
      }
    }
  }
});

export const ThreadNameInner = styled(ChannelNameInner, 'thread-name', {
  width: '100%'
});

export const ChannelsWrapper = styled('div', 'channels-wrapper', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden'
});

export const ThreadsWrapper = styled(ChannelsWrapper, 'thread-wrapper', {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  marginTop: -6,
  padding: 0
});

// ! Imported from the library instead of custom config because of weird bugs
import { theme, css } from '@stitches';
import { styled } from '@stitches/react';
import Link from 'next/link';

export const CategoryNameContainer = styled(
  'div',
  'category-name_container',
  css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '$lg',
    transition: 'color 100ms ease',
    color: 'rgba(255,255,255,0.3)',
    cursor: 'pointer',
    '&:hover': {
      color: theme.colors.primaryOpacity60
    }
  })
);
export const CategoryNameArrow = styled(
  'div',
  'category-name_arrow',
  css({
    width: '$iconSizeSmall',
    height: '$iconSizeSmall',
    cursor: 'pointer',
    position: 'relative',
    display: 'inline-block',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='105.167' fill='rgb(107,108,112)' height='61.651' id='chevron-down'%3e%3cpath d='M2.868 3.155c3.955-4.046 9.458-4.363 14.291 0l35.434 33.971L88.026 3.155c4.834-4.363 10.347-4.046 14.269 0a10.77 10.77 0 0 1 0 14.643c-3.683 3.791-42.568 40.817-42.568 40.817a9.917 9.917 0 0 1-14.286 0S6.574 21.589 2.874 17.798a10.764 10.764 0 0 1 0-14.643Z'%3e%3c/path%3e%3c/svg%3e")`,
    backgroundSize: '60%',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    transition: 'transform 0.15s ease',
    fill: 'red',

    variants: {
      opened: {
        false: {
          transform: 'rotate(-90deg)'
        }
      }
    }
  })
);

export const CategoryNameContent = styled(
  'div',
  'category-name',
  css({
    textTransform: 'uppercase',
    fontSize: '$sm',
    alignSelf: 'center'
  })
);
export const CategoryContainer = styled(
  'div',
  'category-container',
  css({
    width: '100%',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '$medium',
    paddingTop: '$xl',
    transition: 'translateY 0.5s ease'
  })
);

export const ChannelNameWrapper = styled(
  'div',
  'channel-name_wrapper',
  css({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',

    transition: 'max-height 350ms ease',
    maxHeight: '$channelNameHeight',

    marginTop: '$2xs',
    marginBottom: '$2xs',

    variants: {
      isThread: {
        true: {
          marginLeft: '$lg',
          paddingLeft: '$lg',
          paddingRight: '$xs',
          marginRight: '$sm',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyItems: 'center',
          paddingTop: '$md'
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
  })
);

export const ChannelNameInner = styled(
  Link,
  'channel-name',
  css({
    transition: '100ms ease',
    fontSize: '$lg',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    color: '$primaryOpacity30',
    willChange: 'background-color, color,',
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
  })
);

export const ThreadNameInner = styled(
  ChannelNameInner,
  'thread-name',
  css({
    width: '100%'
  })
);

export const ChannelsWrapper = styled(
  'div',
  'channels-wrapper',
  css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden'
  })
);

export const ThreadsWrapper = styled(
  ChannelsWrapper,
  'thread-wrapper',
  css({
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    width: '100%',
    // marginTop: "$2xs",
    marginTop: -6,
    // marginTop: -10,
    padding: 0
  })
);

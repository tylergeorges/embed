// ! Imported from the library instead of custom config because of weird bugs
import { theme } from '@stitches';
import { css, styled } from '@stitches/react';
import Link from 'next/link';

export const CategoryNameContainer = styled(
  'div',
  'category-name_container',
  css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
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
    width: 20,
    height: 20,
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

export const CategoryName = styled(
  'div',
  'category-name',
  css({
    textTransform: 'uppercase',

    // height: 20,

    // marginLeft: 8,
    // marginRight: 8,
    // marginTop: 2,
    // marginBottom: 5,
    fontSize: '$sm',
    alignSelf: 'center'
  })
);
export const CategoryContainer = styled(
  'div',
  // 'details',
  'category-container',
  css({
    width: '100%',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 500,
    paddingTop: 20,
    transition: 'translateY 0.5s ease'
    // backgroundColor: 'rgb(46, 48, 54)'
  })
);

export const ChannelNameWrapper = styled(
  'div',
  'channel-name_wrapper',
  css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    width: '100%',
    transition: 'max-height 350ms ease',
    maxHeight: theme.sizes.channelNameHeight,
    marginTop: '$xs',
    marginBottom: '$xs',
    '-moz-user-select': 'none',
    '-khtml-user-select': 'none',
    '-webkit-user-select': 'none',
    '-webkit-touch-callout': 'none' /* iOS Safari */,
    ' -khtml-user-select': 'none' /* Konqueror HTML */,
    '-ms-user-select': 'none' /* Internet Explorer/Edge */,
    'user-select': 'none'
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
    height: '100%',
    lineHeight: theme.sizes.channelNameHeight,

    marginLeft: '$space$lg',
    marginRight: '$space$lg',
    paddingRight: '$lg',
    paddingLeft: '$lg',
    marginTop: '$xs',
    marginBottom: '$xs',

    color: 'rgba(255,255,255,0.3)',
    willChange: 'background-color, color,',
    borderRadius: 4,
    width: 'calc(100% - 16px)',
    fontWeight: '400',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)',
      color: 'rgba(255,255,255,0.5)'
    },
    variants: {
      active_state: {
        true: {
          color: 'rgba(255,255,255,0.7)',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }
      }
    }
  })
);

export const ChannelNameContainer = styled(
  'div',
  'channel-name_container',
  css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden'
  })
);

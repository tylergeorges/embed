// ! Imported from the library instead of custom config because of weird bugs
import { css, styled } from '@stitches/react';
import Link from 'next/link';

export const CategoryName = styled(
  'summary',
  'categoryname',
  css({
    textTransform: 'uppercase',
    transition: '100ms ease',
    color: 'rgba(255,255,255,0.4)',
    height: 20,

    //  Ignore dragging
    '-moz-user-select': 'none',
    '-khtml-user-select': 'none',
    '-webkit-user-select': 'none',
    '-webkit-touch-callout': 'none' /* iOS Safari */,
    ' -khtml-user-select': 'none' /* Konqueror HTML */,
    '-ms-user-select': 'none' /* Internet Explorer/Edge */,
    'user-select': 'none',

    marginLeft: 8,
    marginRight: 8,
    marginTop: 2,
    marginBottom: 5,
    fontSize: '$lg',
    alignSelf: 'center'
  })
);
export const CategoryContainer = styled(
  'details',
  'category-container',
  css({
    width: '100%',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 500,
    paddingTop: 20
  })
);

export const ChannelNameWrapper = styled(
  'div',
  'channelname-wrapper',
  css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '2.5rem',
    width: '100%',
    marginTop: 2,
    marginBottom: 2,

    //  Ignore dragging
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
  'channelname',
  css({
    transition: '100ms ease',

    //  Ignore dragging
    '-moz-user-select': 'none',
    '-khtml-user-select': 'none',
    '-webkit-user-select': 'none',
    '-webkit-touch-callout': 'none' /* iOS Safari */,
    ' -khtml-user-select': 'none' /* Konqueror HTML */,
    '-ms-user-select': 'none' /* Internet Explorer/Edge */,
    'user-select': 'none',

    borderRadius: 4,
    padding: '0.75rem',
    margin: '0.75rem',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    color: 'rgba(255,255,255,0.3)',
    willChange: 'background-color, color,',
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
  'channelname_container',
  css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box'
  })
);

import { styled } from '@stitches/react';
import { css, theme } from '@stitches';

export const BackgroundContainer = styled(
  'div',
  'activechannel-background_container',
  css({
    position: 'absolute',
    // position: 'relative',
    width: '100%',
    left: 0,
    right: 0,
    zIndex: 1
  })
);
export const Background = styled(
  'div',
  'active-channel_background',
  css({
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.1)',

    borderRadius: 4,
    marginLeft: '$space$lg',
    marginRight: '$space$lg',
    paddingRight: '$lg',
    paddingLeft: '$lg',
    marginTop: '$xs',

    marginBottom: '$xs',
    width: 'calc(100% - 16px)',

    height: theme.sizes.channelNameHeight,
    // width: '100%',
    // ignore dragging
    '-moz-user-select': 'none',
    '-khtml-user-select': 'none',
    '-webkit-user-select': 'none',
    '-webkit-touch-callout': 'none' /* iOS Safari */,
    ' -khtml-user-select': 'none' /* Konqueror HTML */,
    '-ms-user-select': 'none' /* Internet Explorer/Edge */,
    'user-select': 'none',

    variants: {
      // Disables animation on initial render of page
      animated: {
        true: {
          transition: '350ms ease'
        },
        false: {
          transition: 'none'
        }
      }
    }
  })
);

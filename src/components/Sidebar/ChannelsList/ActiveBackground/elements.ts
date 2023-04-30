import { styled } from '@stitches/react';
import { css } from '@stitches';

export const BackgroundContainer = styled(
  'div',
  'activechannel-background_container',
  css({
    position: 'relative',
    width: '100%',
    left: 0,
    right: 0
  })
);
export const Background = styled(
  'div',
  'activechannel-background',
  css({
    position: 'absolute',
    height: 40,
    borderRadius: 4,
    padding: '0.75rem',
    left: '0.75rem',
    right: '0.75rem',
    backgroundColor: 'rgba(255,255,255,0.1)',

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

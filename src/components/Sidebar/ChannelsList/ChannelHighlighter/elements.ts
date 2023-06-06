import { styled } from '@stitches/react';
import { css } from '@stitches';

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
    backgroundColor: '$primaryOpacity10',

    pointerEvents: 'none',

    transform: 'translateY(var(--yPos))',

    variants: {
      animated: {
        true: {
          transition: '350ms ease'
        },
        false: {
          transition: 'none'
        }
      },
      isCurrentChannelThread: {
        true: {
          transform: 'translateY(calc(var(--yPos) - 4px)) scaleX(0.79) scaleY(0.9) translateX(25px)'
        }
      }
    }
  })
);

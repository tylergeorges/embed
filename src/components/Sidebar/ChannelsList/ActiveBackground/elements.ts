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
    backgroundColor: '$primaryOpacity10',

    marginLeft: '$sm',
    marginRight: '$sm',
    paddingRight: '$lg',
    paddingLeft: '$lg',
    marginTop: '$2xs',
    marginBottom: '$2xs',
    borderRadius: '$2xs',

    pointerEvents: 'none',

    width: '$channelNameWidth',

    height: theme.sizes.channelNameHeight,
    transform: 'translateY(var(--yPos))',
    // width: '100%',

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
          transform: 'translateY(var(--yPos)) scaleX(0.8) translateX(15px)'
        }
      }
    }
  })
);

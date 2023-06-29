import { theme, styled } from '@stitches';

export const BackgroundContainer = styled('div', 'activechannel-background_container', {
  position: 'absolute',
  width: '100%',
  left: 0,
  right: 0,
  zIndex: 1
});

export const Background = styled('div', 'active-channel_background', {
  position: 'absolute',
  backgroundColor: theme.colors.primaryOpacity10,
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
        transform: 'translateY(var(--yPos)) scaleX(0.79)  translateX(25px)'
      }
    }
  }
});

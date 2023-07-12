import { commonComponentId, theme, styled } from '@stitches';

export const Background = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'active-channel_background'
})('div', {
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

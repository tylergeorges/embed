import { theme, styled, commonComponentId } from '@stitches';

export const Background = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'active-channel_background'
})('div', {
  position: 'absolute',
  backgroundColor: theme.colors.primaryOpacity10,

  pointerEvents: 'none',

  transform: 'translateY(var(--yPos))',
  padding: 0,
  margin: 0,
  width: `calc(100% - ${theme.space.lg.value})`,
  zIndex: theme.zIndices.channelsSidebar,

  variants: {
    animated: {
      true: {
        transition: 'transform 350ms ease'
      },

      false: {
        transition: 'none'
      }
    },

    isCurrentChannelThread: {
      true: {
        transform: `translateY(var(--yPos)) scaleX(0.84)  translateX(20px)`
      }
    }
  }
});

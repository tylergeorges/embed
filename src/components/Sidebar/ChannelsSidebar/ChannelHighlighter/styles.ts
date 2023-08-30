import { theme, styled, commonComponentId } from '@stitches';

export const Background = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'active-channel_background'
})('div', {
  position: 'absolute',
  backgroundColor: theme.colors.backgroundModiferSelected,

  pointerEvents: 'none',

  transform: 'translateY(var(--yPos))',
  padding: 0,
  margin: 0,
  left: theme.space.sm,
  width: `calc(100% - ${theme.space.lg.value})`,

  variants: {
    animated: {
      true: {
        transition: 'transform',
        transitionTimingFunction: 'ease',
        transitionDuration: theme.transitions.defaultDuration
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

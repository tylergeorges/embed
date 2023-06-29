import { theme, styled, commonComponentId } from '@stitches';

export const ToolTipContainer = styled.withConfig({
  displayName: 'tooltip-container',
  componentId: commonComponentId
})('div', {
  position: 'absolute',
  transform: 'scale(0)',
  transformOrigin: 'top',

  padding: theme.space.sm,

  borderRadius: theme.radii.xs,
  pointerEvents: 'none',
  backgroundColor: theme.colors.tooltipBackground,
  transition: 'transform 100ms ease',

  variants: {
    visible: {
      false: {
        transform: 'scale(0)'
      },
      true: {
        transform: 'scale(0.85)'
      }
    },

    placement: {
      top: {
        top: -40
      },
      bottom: {
        top: 30
      }
    }
  }
});

export const ToolTipContent = styled.withConfig({
  displayName: 'tooltip-content',
  componentId: commonComponentId
})('span', {
  position: 'relative',
  display: 'inline-block',

  fontSize: theme.fontSizes.md,
  textAlign: 'center'
});

export const ToolTipWrapper = styled.withConfig({
  displayName: 'tooltip-wrapper',
  componentId: commonComponentId
})('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

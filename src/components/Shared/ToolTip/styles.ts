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
  zIndex: theme.zIndices.tooltip,

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
        top: -50
      },
      bottom: {
        top: 30
      }
    }
  }
});

export const ToolTipContent = styled.withConfig({
  displayName: 'tooltip-content'
})('span', {
  position: 'relative',
  display: 'inline-block',

  fontSize: theme.fontSizes.lg,
  textAlign: 'center'
});

export const ToolTipWrapper = styled.withConfig({
  displayName: 'tooltip-wrapper',
  componentId: commonComponentId
})('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
});

export const ToolTipChildWrapper = styled.withConfig({
  displayName: 'tooltip-child_wrapper',
  componentId: commonComponentId
})('div', {
  alignItems: 'center'
});

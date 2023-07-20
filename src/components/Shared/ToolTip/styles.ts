import { theme, styled, commonComponentId } from '@stitches';

export const ToolTipContainer = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'tooltip-container'
})('div', {
  position: 'absolute',

  padding: theme.space.sm,

  borderRadius: theme.radii.xs,
  pointerEvents: 'none',
  backgroundColor: theme.colors.tooltipBackground,

  transition: 'transform  ease',
  transitionDuration: theme.transitions.fastestDuration,

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
        transformOrigin: 'bottom'
      },

      bottom: {
        transformOrigin: 'top'
      }
    },

    mobile: {
      true: {
        opacity: 0
      }
    }
  }
});

export const ToolTipContent = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'tooltip-content'
})('span', {
  fontSize: theme.fontSizes.lg,
  textAlign: 'center',
  position: 'relative'
});

export const ToolTipWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'tooltip-wrapper'
})('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',

  userSelect: 'none'
});

export const ToolTipChildWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'tooltip-child_wrapper'
})('div', {
  alignItems: 'center',
  position: 'relative'
});

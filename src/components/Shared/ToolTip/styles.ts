import { styled } from '@stitches/react';
import { theme } from '@stitches';

export const ToolTipContainer = styled('div', 'tooltip-container', {
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

export const ToolTipContent = styled('span', 'tooltip-content', {
  position: 'relative',
  display: 'inline-block',

  fontSize: theme.fontSizes.md,
  textAlign: 'center'
});

export const ToolTipWrapper = styled('div', 'tooltip-wrapper', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

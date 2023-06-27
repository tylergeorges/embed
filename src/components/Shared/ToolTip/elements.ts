import { styled } from '@stitches/react';

export const ToolTipContainer = styled('div', 'tooltip-container', {
  backgroundColor: '#18191c',
  position: 'absolute',
  padding: '$sm',
  borderRadius: '$xs',
  transform: 'scale(0)',
  pointerEvents: 'none',
  transition: 'transform 100ms ease',
  transformOrigin: 'top',
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
  display: 'inline-block',
  fontSize: '$md',
  position: 'relative',
  textAlign: 'center'
});

export const ToolTipWrapper = styled('div', 'tooltip-wrapper', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative'
});

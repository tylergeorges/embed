import { styled } from '@stitches/react';
import { css } from '@stitches';

export const ToolTipContainer = styled(
  'div',
  'tool-tip_container',
  css({
    backgroundColor: '#18191c',
    position: 'absolute',
    padding: '$sm',
    borderRadius: '$xs',
    // borderRadius: 8,
    transform: 'scale(0)',
    pointerEvents: 'none',
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
  })
);

export const ToolTipContent = styled(
  'span',
  'tool-tip_content',
  css({
    display: 'inline-block',
    fontSize: '$md',
    position: 'relative',
    textAlign: 'center'
  })
);

export const ToolTipWrapper = styled(
  'div',
  'tool-tip_wrapper',
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative'
  })
);

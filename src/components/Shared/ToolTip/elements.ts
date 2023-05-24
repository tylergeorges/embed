import { styled } from '@stitches/react';
import { css } from '@stitches';

export const ToolTipContainer = styled(
  'div',
  'tool-tip_container',
  css({
    backgroundColor: '#18191c',
    position: 'absolute',
    padding: '$lg',
    borderRadius: 8,
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
          // marginTop: 2
          // marginRight: 40,
          // position:'relative',
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
    // whiteSpace: 'nowrap',
    textAlign: 'center'
  })
);

export const ToolTipWrapper = styled(
  'div',
  'tool-tip_wrapper',
  css({
    // overflow: 'visible',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative'
    // margin: 10,
    // marginLeft: 8,
    // marginRight: 8,
    // width: 24,
    // height: 24
  })
);

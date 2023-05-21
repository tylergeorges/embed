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
          transform: 'scale(0.95)'
        }
      },
      placement: {
        top: {
          marginTop: -70
        },
        bottom: {
          top: 47
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
    display: 'block',
    fontSize: '$md',
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
    alignItems: 'center'
    // margin: 10,
    // marginLeft: 8,
    // marginRight: 8,
    // width: 24,
    // height: 24
  })
);

import { css, theme } from '@stitches';
import { styled } from '@stitches/react';

export const ContextMenuWrapper = styled(
  'div',
  'context-menu_wrapper',
  css({
    backgroundColor: theme.colors.contextMenuBackground,
    // width: 150,
    height: 'auto',
    position: 'absolute',
    zIndex: 12,
    maxHeight: 'calc(100vh - 32px )',
    minWidth: 188,
    maxWidth: 320,
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
    borderRadius: 4,
    padding: 8,
    variants: {
      visible: {
        false: {
          display: 'none'
        }
      }
    }
  })
);

export const ContextMenuItem = styled(
  'div',
  'context-menu_item',
  css({
    width: '100%',
    minHeight: 32,
    paddingTop: '$md',
    paddingBottom: '$md',
    paddingLeft: '$lg',
    paddingRight: '$lg',

    cursor: 'pointer',
    fontSize: '$md',
    borderRadius: 2,
    '&:hover': {
      backgroundColor: theme.colors.accent
    }
  })
);

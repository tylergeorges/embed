import { css, theme } from '@stitches';
import { styled } from '@stitches/react';

export const ContextMenuWrapper = styled(
  'div',
  'context-menu_wrapper',
  css({
    backgroundColor: theme.colors.contextMenuBackground,
    // width: 150,
    // height: '',
    position: 'absolute',
    zIndex: 12,
    minWidth: 188,
    maxWidth: 320,
    boxShadow: '$dropShadow',
    borderRadius: '$xs',
    padding: '$xs',
    variants: {
      visible: {
        false: {
          opacity: 0
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

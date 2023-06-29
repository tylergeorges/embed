import { theme, styled } from '@stitches';
// import { styled } from '@stitches/react';

export const ContextMenuWrapper = styled('div', 'context-menu_wrapper', {
  backgroundColor: theme.colors.contextMenuBackground,
  position: 'absolute',
  zIndex: 12,
  minWidth: 188,
  maxWidth: 320,
  boxShadow: theme.shadows.dropShadow,
  borderRadius: theme.radii.xs,
  padding: theme.space.xs,

  variants: {
    visible: {
      false: {
        opacity: 0
      }
    }
  }
});

export const ContextMenuItem = styled('div', 'context-menu_item', {
  width: '100%',
  minHeight: 32,
  paddingX: theme.space.lg,
  paddingY: theme.space.md,

  cursor: 'pointer',
  fontSize: theme.fontSizes.md,
  borderRadius: 2,
  '&:hover': {
    backgroundColor: theme.colors.accent
  }
});

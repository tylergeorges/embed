import { theme, styled, commonComponentId } from '@stitches';

export const ContextMenuWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'context-menu_wrapper'
})('div', {
  backgroundColor: theme.colors.contextMenuBackground,
  position: 'absolute',

  minWidth: 188,
  maxWidth: 320,

  padding: theme.space.xs,

  borderRadius: theme.radii.xs,

  boxShadow: theme.shadows.dropShadow,
  zIndex: 12,

  variants: {
    visible: {
      false: {
        opacity: 0
      }
    }
  }
});

export const ContextMenuItem = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'context-menu_item'
})('div', {
  width: '100%',
  minHeight: 32,

  paddingY: theme.space.md,
  paddingX: theme.space.lg,

  cursor: 'pointer',
  fontSize: theme.fontSizes.md,
  borderRadius: theme.radii.xxs,

  '&:hover': {
    backgroundColor: theme.colors.accent
  }
});

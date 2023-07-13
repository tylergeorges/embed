import { theme, styled, commonComponentId } from '@stitches';

export const ContextMenuWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'context-menu_wrapper'
})('div', {
  backgroundColor: theme.colors.contextMenuBackground,
  position: 'absolute',

  minWidth: 188,
  maxWidth: 320,

  // @ts-ignore
  // We access the value property directly so the proper size gets applied
  paddingY: theme.space.xs.value,
  paddingX: theme.space.sm,

  borderRadius: theme.radii.xs,

  boxShadow: theme.shadows.dropShadow,
  zIndex: theme.zIndices.modal,

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
  marginY: theme.space.xs,
  paddingX: theme.space.sm,

  // @ts-ignore
  // We access the value property directly so the proper size gets applied
  paddingY: theme.space.xs.value,

  fontSize: theme.fontSizes.md,
  color: theme.colors.primaryOpacity70,

  borderRadius: theme.radii.xxs,

  cursor: 'pointer',

  '&:hover': {
    backgroundColor: theme.colors.accent,
    color: theme.colors.primary
  }
});

export const ContextMenuItemLabel = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'context-menu_item_label'
})('div', {
  width: '100%'
});

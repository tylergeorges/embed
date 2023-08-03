import { theme, styled, commonComponentId } from '@stitches';

export const GuestFormWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-guest_form_wrapper'
})('form', {
  padding: theme.space.lg
});

export const GuestFormLoginButton = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-guest_form_login_button'
})('button', {
  position: 'relative',
  borderRadius: theme.radii.round,
  padding: theme.space.sm,
  border: 'none',
  outline: 'none',
  minWidth: 75,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',

  '&::before': {
    content: '',
    transition: 'opacity ease',
    transitionDuration: theme.transitions.fasterDuration,

    position: 'absolute',
    backgroundColor: theme.colors.accent,
    width: '100%',
    height: '100%',
    borderRadius: theme.radii.xxs,
    zIndex: theme.zIndices.none,
    opacity: 1
  },

  '&:hover': {
    '&::before': {
      content: '',
      opacity: '75%'
    }
  }
});

export const GuestFormLoginButtonLabel = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-guest_form_login_button_label'
})('span', {
  color: theme.colors.primary,
  fontSize: theme.fontSizes.md,

  zIndex: theme.zIndices.tooltip
});

export const GuestFormInputRoot = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-guest_form_input'
})('input', {
  borderRadius: theme.radii.xs,
  width: '100%',
  backgroundColor: theme.colors.inputBackground,
  outline: 'none',
  border: 'none',
  padding: theme.space.md,
  color: theme.colors.primaryOpacity80,
  fontSize: theme.fontSizes.lg
});

export const GuestFormInputLabel = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-guest_form_input_label'
})('h3', {
  fontSize: theme.fontSizes.sm,
  color: theme.colors.textMuted,
  // color: theme.colors.primaryOpacity60,
  fontWeight: '600',
  margin: 0,
  userSelect: 'none',
  marginBottom: theme.space.sm,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  lineHeight: theme.sizes.iconSizeXs
});

export const GuestFormInputWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-guest_form_input_wrapper'
})('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column'
});

export const GuestFormFooter = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-guest_form_footer'
})('div', {
  width: '100%',
  padding: theme.space.xl,
  borderBottomLeftRadius: theme.radii.sm,
  borderBottomRightRadius: theme.radii.sm,

  backgroundColor: theme.colors.modalFooterBackground
});

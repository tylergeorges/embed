import { theme, styled, commonComponentId } from '@stitches';

export const GuestFormWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-guest_form_wrapper'
})('form', {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
});

export const GuestFormLoginButton = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-guest_form_login_button'
})('button', {
  position: 'relative',
  borderRadius: theme.radii.round,
  padding: theme.space.md,
  border: 'none',
  paddingX: theme.space.xxl,
  outline: 'none',
  minWidth: 75,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  marginTop: theme.space.xl.value,
  transition: 'opacity ease',
  transitionDuration: theme.transitions.defaultDuration,
  maxHeight: 45,

  // Buttons background color
  '&::before': {
    content: '',
    transition: 'opacity ease',
    transitionDuration: theme.transitions.defaultDuration,

    position: 'absolute',
    backgroundColor: theme.colors.accent,
    width: '100%',
    height: '100%',
    borderRadius: theme.radii.xxs,
    zIndex: theme.zIndices.none,
    opacity: 1
  },

  variants: {
    disabled: {
      true: {
        opacity: '50%',
        cursor: 'not-allowed',
        userSelect: 'none'
      },

      false: {
        cursor: 'pointer',
        opacity: 1,
        // Darken button on hover
        '&:hover': {
          '&::before': {
            content: '',
            opacity: '80%'
          }
        }
      }
    },

    size: {
      full: {
        width: '100%'
      }
    }
  }
});

export const GuestFormLoginButtonLabel = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-guest_form_login_button_label'
})('span', {
  color: theme.colors.textPrimary,
  fontSize: theme.fontSizes.lg,

  zIndex: theme.zIndices.tooltip,
  fontWeight: theme.fontWeights.medium
});

export const GuestFormInputRoot = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-guest_form_input'
})('input', {
  borderRadius: theme.radii.xs,
  width: '100%',
  outline: 'none',
  border: 'none',
  padding: theme.space.md,
  color: theme.colors.primaryOpacity80,
  fontSize: theme.fontSizes.lg,
  backgroundColor: theme.colors.chatInputBackground,

  variants: {
    color: {
      dark: {
        backgroundColor: theme.colors.inputBackground
      },

      light: {
        backgroundColor: 'rgba(0,0,0, 0.2)',
        border: '1px solid rgba(0,0,0, 0.3)'
      }
    }
  }
});

export const GuestFormInputLabel = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-guest_form_input_label'
})('h3', {
  fontSize: theme.fontSizes.sm,
  color: theme.colors.textMuted,
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
  padding: theme.space.lg,
  borderBottomLeftRadius: theme.radii.sm,
  borderBottomRightRadius: theme.radii.sm
});

export const GuestFormDiscordAuth = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-guest_form_discord_auth'
})('div', {
  width: '100%',
  marginTop: theme.space.sm,

  textAlign: 'center'
});

export const GuestFormDiscordContent = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-guest_form_discord_auth_content'
})('span', {
  color: theme.colors.textMuted,
  fontSize: theme.fontSizes.md
});

export const GuestFormDiscordAuthButton = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-guest_form_discord_link'
})('span', {
  color: theme.colors.link,
  cursor: 'pointer',

  '&:hover': {
    textDecoration: 'underline'
  }
});

export const DiscordIconWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'icon-discord_wrapper'
})('svg', {
  position: 'relative',
  size: theme.sizes.iconSizeLg
});

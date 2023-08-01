import { theme, styled, commonComponentId } from '@stitches';
import Image from 'next/image';

export const ChannelsFooterWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'channels-footer_wrapper'
})('footer', {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: 'rgb(27, 29, 32)',
  flexDirection: 'column'
});

export const ChannelsFooterLoginButton = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'channels-footer_login_button'
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

export const ChannelsFooterLoginButtonLabel = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'channels-footer_login_button_label'
})('span', {
  color: theme.colors.primary,
  fontSize: theme.fontSizes.md,

  zIndex: theme.zIndices.tooltip
});

export const ChannelsFooterButtonWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'channels-footer_button_wrapper'
})('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: 'rgb(38, 40, 44)',
  padding: theme.space.sm,
  alignItems: 'center',
  flexDirection: 'column',
  gap: theme.space.sm
});

export const ChannelsFooterVersionWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'channels-footer_version_wrapper'
})('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  color: theme.colors.primaryOpacity30,
  fontSize: theme.fontSizes.sm,
  padding: theme.space.xs
});

export const ChannelsFooterUserWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'channels-footer_user_wrapper'
})('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  paddingX: theme.space.md,
  paddingY: theme.space.sm,
  gap: theme.space.sm,

  backgroundColor: 'rgb(38, 40, 44)',
  fontWeight: '500'
});

export const ChannelsFooterUserAvatar = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'channels-footer_user_avatar'
})(Image, {
  size: theme.sizes.iconSizeLg,
  borderRadius: theme.radii.round
});

export const ChannelsFooterUserContentWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'channels-footer_user_content_wrapper'
})('div', {
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'start'
});

export const ChannelsFooterUserName = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'channels-footer_username'
})('div', {
  fontSize: theme.fontSizes.md
});

export const ChannelsFooterUserDiscrim = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'channels-footer_user_discrim'
})('div', {
  fontSize: theme.fontSizes.sm,
  color: theme.colors.primaryOpacity30
});

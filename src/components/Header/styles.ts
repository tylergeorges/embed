import { theme, styled, commonComponentId } from '@stitches';
import Image from 'next/image';

export const ChannelHeaderContainer = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'text-channel_header_container'
})('div', {
  backgroundColor: theme.colors.background
});

export const ThreadPanelHeaderContainer = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'panel-thread_header_container'
})(ChannelHeaderContainer, {
  userSelect: 'none'
});

export const HeaderRoot = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'header-root'
})('header', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
  diplay: 'flex',
  flexShrink: 1,
  width: '100%',
  color: theme.colors.textPrimary,

  height: theme.sizes.headerHeight,
  padding: theme.space.md.value,

  boxShadow: theme.shadows.headerBorder,

  variants: {
    shadowEnabled: {
      true: {
        boxShadow: theme.shadows.headerDropShadow,
        backgroundColor: theme.colors.headerBarBackground
      },

      false: {
        backgroundColor: 'transparent'
      }
    }
  }
});

export const HeaderMainContentRoot = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'header-main_content_root'
})('h1', {
  fontSize: theme.fontSizes.lg,
  fontWeight: theme.fontWeights.semibold,
  color: theme.colors.headerPrimary
});

export const GuildHeaderName = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'guild-header_name'
})(HeaderMainContentRoot, {
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  flexGrow: 1,
  margin: 0,
  marginX: theme.space.lg
});

export const GuildIcon = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'guild-icon'
})(Image, {
  size: theme.sizes.iconSizeMd,
  borderRadius: theme.radii.round
});

export const ChannelHeaderName = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'text-channel_header_name'
})(HeaderMainContentRoot, {
  marginRight: theme.space.xl,
  textOverflow: 'ellipsis',
  boxSizing: 'border-box',
  alignSelf: 'center',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  userSelect: 'none',

  color: theme.colors.textPrimary
});

export const Stretch = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'stretch'
})('div', {
  diplay: 'flex',
  flexGrow: 1,
  flexShrink: 1,
  width: 0
});

export const GuildHeader = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'guild-header'
})(HeaderRoot, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: theme.space.lg
});

export const GuildMemberCount = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'guild-member_count'
})('span', {
  fontWeight: theme.fontWeights.semibold,
  fontSize: theme.fontSizes.sm,
  backgroundColor: theme.colors.accentAlt,

  padding: theme.space.xxs.value,
  borderRadius: theme.radii.round
});

export const ChannelHeaderRoot = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'text-channel_header'
})(HeaderRoot, {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',

  paddingX: theme.space.sm,

  zIndex: theme.zIndices.modal
});

export const ChannelHeaderTopic = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'text-channel_header_topic'
})('div', {
  margin: 0,
  paddingX: theme.space.sm,

  color: theme.colors.textMuted,
  fontSize: theme.fontSizes.md,

  borderLeftStyle: 'solid',
  borderLeftWidth: 1,
  borderLeftColor: theme.colors.primaryOpacity10,
  fontWeight: theme.fontWeights.medium,

  wordBreak: 'break-word',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  alignSelf: 'center',
  userSelect: 'none',
  cursor: 'pointer',

  variants: {
    isClickable: {
      false: {
        cursor: 'default'
      }
    }
  }
});

export const ChannelHeaderNameWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'text-channel_header_name_container'
})('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%'
});

export const ChannelNameTopicWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'text-channel_name_topic_container'
})(Stretch, {
  display: 'flex',
  alignItems: 'center',

  height: '100%',

  wordBreak: 'break-word'
});

export const ThreadPanelHeaderRoot = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'panel-thread_header_root'
})(ChannelHeaderRoot, {
  height: theme.sizes.headerHeight,
  width: '100%',
  color: theme.colors.textPrimary,

  margin: 0,
  padding: 0,
  paddingRight: theme.space.sm,

  backgroundColor: theme.colors.background,
  boxShadow: theme.shadows.headerDropShadow,

  userSelect: 'none'
});

export const ThreadPanelHeaderIconContainer = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'panel-thread_header_icon_container'
})('div', {
  width: '100%',
  display: 'flex',
  height: '100%',
  alignItems: 'center'
});

export const ThreadPanelHeaderIconContent = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'panel-thread_header_icon_content'
})('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  fontWeight: theme.fontWeights.bold
});

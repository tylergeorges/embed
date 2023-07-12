import { theme, styled, commonComponentId } from '@stitches';

export const ChannelHeaderContainer = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'text-channel_header_container'
})('div', {
  width: '100%',
  display: 'flex',
  backgroundColor: theme.colors.background
});

export const ThreadPanelHeaderContainer = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'panel-thread_header_container'
})(ChannelHeaderContainer, {});

export const HeaderRoot = styled.withConfig({
  displayName: 'header-root'
})('header', {
  display: 'flex',
  flexShrink: 0,
  justifyContent: 'center',
  alignItems: 'center',

  height: theme.sizes.headerHeight,
  width: '100%',

  // zIndex: 8,

  variants: {
    shadowEnabled: {
      true: {
        boxShadow: theme.shadows.headerDropShadow,
        backgroundColor: theme.colors.background
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
  fontWeight: theme.fontWeights.bold,
  fontSize: theme.fontSizes.lg,
  margin: 0
});

export const GuildHeaderName = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'guild-header_name'
})(HeaderMainContentRoot, {});

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
  userSelect: 'none'
});

export const Stretch = styled.withConfig({
  displayName: 'stretch'
})('div', {
  diplay: 'flex',
  flexGrow: 1,
  flexShrink: 1,
  width: 0
});

export const GuildHeader = styled.withConfig({
  displayName: 'guild-header'
})(Stretch, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

export const ChannelHeaderRoot = styled.withConfig({
  displayName: 'text-channel_header'
})(Stretch, {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  zIndex: theme.zIndices.modal,
  paddingX: theme.space.sm,

  '.text-channel_header_buttons_container': {
    width: '100%'
  }
});

export const ChannelHeaderTopic = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'text-channel_header_topic'
})('div', {
  margin: 0,
  paddingX: theme.space.lg,

  color: theme.colors.textMuted,
  fontSize: theme.fontSizes.md,

  borderLeftStyle: 'solid',
  borderLeftWidth: 1,
  borderLeftColor: theme.colors.primaryOpacity10,

  wordBreak: 'break-word',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  alignSelf: 'center',
  cursor: 'pointer'
});

export const ChannelHeaderNameWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'text-channel_header_name_container'
})('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center'
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
  backgroundColor: theme.colors.background,
  height: theme.sizes.headerHeight,
  boxShadow: theme.shadows.headerDropShadow,
  margin: 0,
  padding: 0,
  width: '100%',
  paddingRight: theme.space.sm
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

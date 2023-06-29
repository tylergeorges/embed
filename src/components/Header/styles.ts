import { theme, styled } from '@stitches';

export const ChannelHeaderContainer = styled('div', 'text-channel_header_container', {
  width: '100%',
  display: 'flex',
  backgroundColor: theme.colors.background
});

export const ThreadPanelHeaderContainer = styled(
  ChannelHeaderContainer,
  'panel-thread_header_container',
  {}
);

export const HeaderRoot = styled('header', 'header-root', {
  display: 'flex',
  flexShrink: 0,
  justifyContent: 'center',
  alignItems: 'center',

  height: theme.sizes.headerHeight,
  width: '100%',

  zIndex: 8,

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

export const HeaderMainContentRoot = styled('h1', 'header-main_content_root', {
  fontWeight: theme.fontWeights.bold,
  fontSize: theme.fontSizes.lg,
  margin: 0
});

export const GuildHeaderName = styled(HeaderMainContentRoot, 'guild-header_name', {});

export const ChannelHeaderName = styled(HeaderMainContentRoot, 'text-channel_header_name', {
  marginRight: theme.space.xl,
  textOverflow: 'ellipsis',
  boxSizing: 'border-box',
  alignSelf: 'center',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  userSelect: 'none'
});

export const SingleChannel = styled('div', 'single-channel', {
  [`& ${theme.singleChannel.enable}`]: {
    display: 'none'
  }
});

export const Inner = styled('div', 'inner', {
  display: 'flex',
  flexShrink: '1',
  flexGrow: 1,
  minWidth: 0,
  height: '47px',
  padding: '10px 0',

  '@media (max-width: 270px), (max-height: 300px)': {
    height: '41px',
    padding: '7px 0'
  }
});

export const Stretch = styled('div', 'stretch', {
  diplay: 'flex',
  flexGrow: 1,
  flexShrink: 1,
  width: 0
});

export const GuildHeader = styled(Stretch, 'guild-header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

export const ChannelHeaderRoot = styled(Stretch, 'text-channel_header', {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  zIndex: 3,
  paddingLeft: 8,
  paddingRight: 8,

  '.text-channel_header_buttons_container': {
    width: '100%'
  }
});

export const ChannelHeaderTopic = styled('div', 'text-channel_header_topic', {
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

export const ChannelHeaderNameWrapper = styled('div', 'text-channel_header_name_container', {
  width: '100%',
  display: 'flex',
  alignItems: 'center'
});

export const ChannelNameTopicWrapper = styled(Stretch, 'text-channel_name_topic_container', {
  display: 'flex',
  alignItems: 'center',

  height: '100%',

  wordBreak: 'break-word'
});

export const ThreadPanelHeaderRoot = styled(ChannelHeaderRoot, 'panel-thread_header_root', {
  backgroundColor: theme.colors.background,
  height: theme.sizes.headerHeight,

  margin: 0,
  padding: 0,
  paddingRight: 8
});

export const ThreadPanelHeaderIconContainer = styled('div', 'panel-thread_header_icon_container', {
  width: '100%',
  display: 'flex',
  height: '100%',
  alignItems: 'center'
});

export const ThreadPanelHeaderIconContent = styled('div', 'panel-thread_header_icon_content', {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  fontWeight: theme.fontWeights.bold
});

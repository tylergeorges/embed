import { theme, styled, commonComponentId } from '@stitches';
import { TextChannelWrapper } from '@components/Core/TextChannelContainer/styles';

export const SidebarWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'sidebar_wrapper'
})('aside', {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',

  height: '100%',
  width: theme.sizes.sideBarWidth,
  maxWidth: theme.sizes.sideBarWidth,

  userSelect: 'none',

  backgroundOverlay: theme.colors.backgroundSecondary,

  willChange: 'transform',
  transition: theme.transitions.defaultTransform,

  variants: {
    channelsListOpen: {
      false: {
        transform: `translateX(-${theme.sizes.sideBarWidth.value})`
      },

      true: {
        transform: 'translateX(0)',
        transition: theme.transitions.defaultTransform
      }
    },

    type: {
      channelsList: {
        zIndex: theme.zIndices.channelsSidebar
      }
    }
  }
});

export const ChannelsSidebarWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'channels-sidebar_wrapper'
})(SidebarWrapper, {
  zIndex: theme.zIndices.channelsSidebar
});

export const ChannelsChildrenWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'channels-children_container'
})('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  position: 'relative',
  marginTop: theme.space.lg
});

export const GuildHeaderWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'guild-header_wrapper'
})('div', {
  textAlign: 'center',
  position: 'relative'
});

export const ThreadsPanelContainer = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'thread-panel_container'
})('div', {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  height: '100%',

  transition: theme.transitions.defaultTransform
});

export const ThreadPanelWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'thread-panel_wrapper'
})('div', {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'row',
  right: 0,

  height: '100%',
  width: theme.sizes.threadPanelMinWidth,

  zIndex: theme.zIndices.channelsSidebar,
  // zIndex: theme.zIndices.channelsSidebarBackdrop,
  transition: theme.transitions.defaultTransform,
  backgroundOverlay: theme.colors.background,

  '&:before': {
    content: '',
    position: 'relative',
    height: '100%',
    width: theme.sizes.panelSeperatorWidth,

    backgroundColor: theme.colors.borderDark,
    zIndex: theme.zIndices.channelsSidebarBackdrop
  },

  variants: {
    isOpen: {
      false: {
        transform: `translateX(100%)`
      }
    },

    mobile: {
      true: {
        width: `calc(100% + ${theme.sizes.panelSeperatorWidth})`
      }
    },

    isFullscreen: {
      true: {
        width: `calc(100% - (${theme.sizes.sideBarWidth} - ${theme.sizes.panelSeperatorWidth}))`
      }
    }
  }
});

export const GuildRoot = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'guild-root'
})(TextChannelWrapper, {
  position: 'relative'
});

export const WbIconContainer = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'wb-icon_wrapper'
})('div', {
  height: '100%',
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  width: `100%`
});

export const WbIconRoot = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'wb-icon_root'
})('svg', {
  width: 'auto',
  height: '35%',
  color: theme.colors.textPrimary,
  opacity: 0.08
});

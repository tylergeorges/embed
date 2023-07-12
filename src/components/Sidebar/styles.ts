import { theme, styled, commonComponentId } from '@stitches';

export const SidebarWrapper = styled.withConfig({
  displayName: 'sidebar_wrapper',
  componentId: commonComponentId
})('aside', {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',

  height: '100%',
  width: theme.sizes.sideBarWidth,
  maxWidth: theme.sizes.sideBarWidth,

  boxSizing: 'border-box',

  backgroundColor: theme.colors.backgroundSecondary,
  willChange: 'transform',
  transition: 'transform 300ms ease',

  variants: {
    channelsListOpen: {
      false: {
        transform: `translateX(-200px)`
      },
      true: {
        transform: 'translateX(0)',
        transition: 'transform 300ms ease'
      }
    },

    membersListOpen: {
      false: {
        transform: `translateX(150%)`
      },
      true: {
        transform: `translateX(0)`
      }
    },

    type: {
      membersList: {
        zIndex: theme.zIndices.membersSidebar
      },

      channelsList: {
        zIndex: theme.zIndices.channelsSidebar,

        '.sidebar-header_container': {
          textAlign: 'center',
          position: 'relative'
        },

        '.sidebar-children_container': {
          position: 'relative',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          marginBottom: theme.space.xl,
          overflowY: 'auto'
        }
      }
    }
  }
});

export const ChannelsSidebarWrapper = styled.withConfig({
  displayName: 'channels-sidebar_wrapper'
})(SidebarWrapper, {
  boxSizing: 'border-box',
  zIndex: theme.zIndices.channelsSidebar
});

export const MembersSidebarWrapper = styled.withConfig({
  displayName: 'members-sidebar_wrapper'
})(SidebarWrapper, {
  right: 0,
  boxSizing: 'border-box',
  zIndex: theme.zIndices.membersSidebar
});

export const ThreadsPanelContainer = styled.withConfig({
  displayName: 'thread-panel_container'
})('div', {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  bottom: 0,

  width: '100%',
  height: '100%',

  zIndex: theme.zIndices.modal,
  transition: 'transform ease 0.3s',

  backgroundColor: theme.colors.background,

  '@small': {
    width: '100%'
  },

  variants: {
    isOpen: {
      false: {
        transform: `translateX(100%)`
      },

      true: {
        width: '100%',

        '@mobile': {
          width: '100%',
          transform: `translateX(-2%)`
        }
      }
    }
  }
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
  minWidth: theme.sizes.threadPanelMinWidth,

  zIndex: theme.zIndices.modal,
  transition: 'transform ease 0.3s',
  backgroundColor: theme.colors.background,

  variants: {
    isOpen: {
      false: {
        transform: `translateX(100%)`
      }
    },

    mobile: {
      true: {
        width: '100%'
      }
    }
  }
});

export const ThreadsPanelSeperator = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'panel-threads_seperator'
})('div', {
  transform: `translateX(-8px)`,

  height: '100%',
  width: 8,

  backgroundColor: theme.colors.borderDark,
  zIndex: theme.zIndices.modal,

  '@small': {
    true: {
      opacity: 0
    }
  },

  variants: {
    isOpen: {
      false: {
        opacity: 0
      }
    }
  }
});

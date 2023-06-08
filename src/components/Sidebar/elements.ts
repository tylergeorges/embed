import { keyframes } from '@stitches/react';
import { css, theme, styled } from '@stitches';

const leftSlideIn = keyframes({
  '0%': {
    transform: 'translateX(-200px)'
  },
  '50%': {
    transform: 'translateX(2px)'
  },
  '100%': {
    transform: 'translateX(0px)'
  }
});

const leftSlideOut = keyframes({
  '0%': {
    transform: 'translateX(0px)'
  },

  '100%': {
    transform: 'translateX(-200px) '
  }
});

export const SidebarWrapper = styled(
  'aside',
  'sidebar_wrapper',
  css({
    position: 'absolute',
    backgroundColor: '$backgroundSecondary',

    zIndex: 9,
    width: theme.sizes.sideBarWidth,
    maxWidth: theme.sizes.sideBarWidth,
    height: '100%',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    willChange: 'transform',
    variants: {
      channelsListOpen: {
        false: {
          animation: `${leftSlideOut} 300ms ease`,
          transform: `translateX(-200px)`
        },
        true: {
          animation: `${leftSlideIn} 550ms ease`
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
        members_list: {},
        channels_list: {
          '.sidebar-header_container': {
            textAlign: 'center',
            position: 'relative'
          },

          '.sidebar-children_container': {
            position: 'relative',
            width: '100%',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            marginBottom: '1.5rem',
            overflowY: 'auto'
          }
        }
      }
    }
  })
);

export const ChannelsSidebarWrapper = styled(SidebarWrapper, 'channels-sidebar_wrapper', {});

export const MembersSidebarWrapper = styled(
  SidebarWrapper,
  'members-sidebar_wrapper',
  css({
    right: 0,
    transition: 'transform ease 0.3s',
    zIndex: 1
    // justifySelf: 'flex-end',
    // transform: `translateX(0)`
  })
);

export const ThreadsPanelContainer = styled(
  'div',
  'thread-panel_wrapper',
  css({
    width: '100%',
    height: '100%',
    bottom: 0,
    display: 'flex',
    zIndex: 2,
    transition: 'transform ease 0.3s',
    position: 'absolute',

    backgroundColor: '$background',
    flexDirection: 'column',
    '@mobile': {
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
  })
);
export const ThreadPanelWrapper = styled(
  'div',
  'thread-panel_wrapper',
  css({
    height: '100%',
    // bottom: 0,
    minWidth: '$threadPanelMinWidth',
    right: 0,
    display: 'flex',
    zIndex: 2,
    transition: 'transform ease 0.3s',
    position: 'absolute',
    backgroundColor: '$background',
    flexDirection: 'row',

    variants: {
      isOpen: {
        false: {
          transform: `translateX(100%)`
        }
      },
      mobile: {
        true: {
          width: '100%'
        },
        false: {}
      }
    }
  })
);

export const Close = styled(
  'button',
  'sidebar_close',
  css({
    right: 0,
    height: '$iconSizeLarge',
    width: '$iconSizeLarge',

    background: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' fill='rgba(255,255,255,0.3)' viewBox='0 0 44 44'%3e%3cpath d='M38.8 0L44 5.2 5.2 44 0 38.8 38.8 0z'/%3e%3cpath d='M5.2 0L44 38.8 38.8 44 0 5.2 5.2 0z'/%3e%3c/svg%3e")`,
    backgroundSize: '50%',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    borderRadius: '50%',

    '&:hover, &:focus': {
      backgroundColor: theme.colors.primaryOpacity10
    },

    variants: {
      color: {
        light: {
          right: 0,
          height: '$iconSizeSmall',
          width: '$iconSizeSmall',

          backgroundSize: '50%',
          backgroundPosition: '50% 50%',
          backgroundRepeat: 'no-repeat',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          borderRadius: '50%',
          background: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' fill='rgb(181, 186, 193)' viewBox='0 0 44 44'%3e%3cpath d='M38.8 0L44 5.2 5.2 44 0 38.8 38.8 0z'/%3e%3cpath d='M5.2 0L44 38.8 38.8 44 0 5.2 5.2 0z'/%3e%3c/svg%3e")`
        }
      }
    }
  })
);

export const ThreadsPanelSeperator = styled(
  'div',
  'panel-threads_seperator',
  css({
    height: '100%',
    width: 8,
    transform: `translateX(-8px)`,
    backgroundColor: '$borderDark',
    zIndex: 9,
    '@mobile': {
      true: {
        opacity: 0
      }
    }
  })
);

import { styled } from '@stitches/react';
import { css, theme } from '@stitches';

export const SidebarWrapper = styled(
  'aside',
  'sidebar_wrapper',
  css({
    position: 'absolute',
    backgroundColor: '$backgroundSecondary',
    // backgroundColor: 'rgb(46, 48, 54)',

    zIndex: 9,
    width: theme.sizes.sideBarWidth,
    maxWidth: theme.sizes.sideBarWidth,
    height: '100%',
    flexShrink: 0,
    transition: 'transform ease 0.3s',
    display: 'flex',
    flexDirection: 'column',
    willChange: 'transform',
    variants: {
      channelsListOpen: {
        false: {
          transform: `translateX(-200px)`
          // display:'none'
        }
      },

      membersListOpen: {
        false: {
          transform: 'translateX(200px)'
          // display: 'none'
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
export const MembersSidebarWrapper = styled(SidebarWrapper, 'members-sidebar_wrapper', {});

export const Close = styled(
  'button',
  'sidebar_close',
  css({
    right: 0,
    height: 30,
    width: 30,

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
    }
  })
);

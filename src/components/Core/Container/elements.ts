import { styled } from '@stitches/react';
import { theme, css } from '@stitches';

export const TextChannelWrapper = styled(
  'div',
  'text-channel_wrapper',
  css({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transition: 'transform 0.3s ease 0s, width 0.3s ease 0s',
    height: '100%',
    // overflowX: 'hidden',
    width: '100% !important',
    // width: 'calc(100% - $sideBarWidth) !important',
    // width:'100%',
    // ! drop shadow, hide it using opacity for animation and only show for mobile users
    // marginLeft: theme.sizes.sideBarWidth,
    transform: `translateX(${theme.sizes.sideBarWidth})`,
    // alignSelf: 'flex-end',

    // ! show drop shadow
    '@md_screen': {
      transition: 'transform 0.3s ease 0s, width 0.3s ease 0s',
      // ! assuming the members side bar is still open
      height: '100%'
    },

    variants: {
      // ! assuming the members sidebar is still open
      channelsListOpen: {
        // false: {
        //   width: '100% !important',
        //   marginLeft: '0px !important',
        //   transform: 'translateX(0px)'
        // },
        true: {
          // transform: `translateX(${theme.sizes.sideBarWidth})`,
          width: 'calc(100% - $sideBarWidth) !important',
          '@md_screen': {
            '&::after': {
              transition: 'opacity 0.5s ease 0s',
              content: '',
              opacity: 1
            }
          }
        },
        false: {
          transform: 'translateX(0px)'
        }
      },
      threadsPanelOpen: {
        true: {
          width: `calc(100% - $threadPanelMinWidth + 8px) !important`
          // transform: `translateX(0px)`
        }
      },
      panelAndChannelsOpen: {
        true: {
          width: `calc(100% - ($sideBarWidth + $threadPanelMinWidth + 8px))  !important`,
          transform: `translateX(200px)`
        }
      }
    }
  })
);

export const TextChannelInnerWrapper = styled(
  'div',
  'text-channel_inner_wrapper',
  css({
    height: '100%',
    width: '100%',
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    '&::after': {
      content: '',
      top: 0,
      left: 0,
      position: 'absolute',
      height: '100%',
      width: '100%',
      pointerEvents: 'none',
      opacity: 0,

      transition: 'opacity 0.5s ease 0s',
      willChange: 'opacity',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    '@md_screen': {
      transition: 'margin 0.3s ease 0s, width 0.3s ease 0s',
      // ! assuming the members side bar is still open
      marginLeft: '0px !important',
      marginRight: 0,
      width: '100% !important',
      height: '100%',
      '&::after': {
        transition: 'opacity 0.5s ease 0s',
        content: '',
        opacity: 1
      }
    }
  })
);

export const MessageWrapper = styled(
  'div',
  'message-wrapper',
  css({
    width: '100%',
    height: '100%',
    // paddingLeft: 40,
    // paddingRight: 40,
    paddingBottom: 10,
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'flex-end',
    transition: 'transform 0.3s ease 0s, width 0.3s ease 0s',
    zIndex: 0,
    // transform: `translateX(-20px)`,
    '@md_screen': {
      // ! assuming the members side bar is still open
      // marginRight: '0px !important',
      width: '100% !important',
      height: '100%'
    },
    '@md': {
      marginRight: '0px !important',
      width: '100% !important'
      // height:'100%'
    },

    '.channel-welcome_header_con': {
      width: '100%',
      display: 'block',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      margin: '$xxl'
    },

    '.channel-welcome_header': {
      fontWeight: 700,
      fontSize: '32px',
      marginBottom: 0,
      alignSelf: 'center',
      textAlign: 'center'
    },
    '.channel-welcome_subheader': {
      margin: 0,
      fontSize: '14px',
      color: 'rgba(255, 255, 255, 0.5)',
      textAlign: 'center'
    },
    variants: {
      membersListOpen: {
        false: {
          width: '100% !important',
          marginRight: 0
          // marginRight: '0px !important'
        },
        true: {
          width: 'calc(100% - $sideBarWidth)',

          '@md_screen': {
            // ! assuming the members side bar is still open
            marginRight: '0px !important',
            width: '100% !important',
            height: '100%'
          },
          '@md': {
            // ! assuming the members side bar is still open
            marginRight: '0px !important',
            height: '100%'
          }
        }
      }
    }
  })
);

export const TextBoxWrapper = styled(
  'div',
  'text-box_wrapper',
  css({
    paddingLeft: '$xxl',
    paddingRight: '$xxl',
    // height: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    // minHeight: 66,
    width: '100%'
  })
);

export const TextBoxInput = styled(
  'input',
  'text-box_input',
  css({
    // padding: '10px 16px 10px 0px',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    border: 'none',
    borderRadius: 8,
    outline: 'none',
    fontSize: '$lg',
    // height:'100%',
    padding: 11,
    // height: theme.sizes.messageInputSize,
    // minHeight: theme.sizes.messageInputSize,
    fontWeight: 400,
    marginBottom: 24,
    color: 'white'
    // marginBottom: '1.3rem',
  })
);
export const MessageContentContainer = styled(
  'div',
  'text-box_input',
  css({
    // overflowWrap: 'break-word',
    // paddingTop: 2,
    // paddingBottom: 2,
    // paddingLeft: 72,
    // paddingRight: 48,
    // marginTop: 17
  })
);

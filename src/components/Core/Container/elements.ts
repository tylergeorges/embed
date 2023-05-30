import { keyframes, styled } from '@stitches/react';
import { theme, css } from '@stitches';
import Image from 'next/image';

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
export const MessageContentOuterWrapper = styled(
  'div',
  'message-content_outer_wrapper',
  css({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 17,
    paddingRight: 48,
    paddingLeft: 72,
    paddingTop: 2,
    paddingBottom: 2,
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.1)'
    }
  })
);

export const MessageContent = styled(
  'div',
  'message-content',
  css({
    position: 'relative',
    textAlign: 'left'
  })
);

export const MessageAvatar = styled(
  Image,
  'message-avatar',
  css({
    borderRadius: 999,
    position: 'absolute',
    left: 16,
    pointerEvents: 'none'
  })
);
export const MessageUsername = styled(
  'h3',
  'message-username',
  css({
    fontSize: 16,
    margin: 0,
    pointerEvents: 'none',
    userSelect: 'none'
  })
);

const SkeletonLoader = keyframes({
  '0%': {
    opacity: '40%'
  },
  '50%': {
    opacity: '80%'
  },
  '100%': {
    opacity: '40%'
  }
});

export const SkeletonLoaderRoot = styled(
  'div',
  'skeleton-loader_root',
  css({
    animation: `${SkeletonLoader} 3s infinite ease-in-out`,
    background: `${theme.colors.primaryOpacity20}`,
    pointerEvents: 'none',
    userSelect: 'none'
  })
);

export const MessageSkeletonWrapper = styled(
  'div',
  'message-skeleton_wrapper',
  css({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 25,
    paddingRight: 48,
    paddingLeft: 72,
    paddingTop: 2,
    paddingBottom: 2
  })
);

export const MessageSkeletonContent = styled(
  'div',
  'message-skeleton_content',
  css({
    position: 'relative',
    textAlign: 'left',
    // width: '60%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    // width: '100%',
    pointerEvents: 'none',
    userSelect: 'none'
  })
);

export const MessageSkeletonContentLine = styled(
  'div',
  'message-skeleton_content_line',
  css({
    position: 'relative',
    textAlign: 'left',
    color: 'transparent',
    // marginTop: 10,
    width: '100%',
    // background: 'rgba(255, 255, 255, 0.2)',
    // height: 16,
    borderRadius: 10
    // display: 'flex',
    // flexDirection: 'row'
  })
);

export const MessageSkeletonContentWord = styled(
  'p',
  'message-skeleton_content_word',
  css({
    position: 'relative',
    color: 'transparent',
    borderRadius: 10,
    background: theme.colors.primaryOpacity10,
    animation: `${SkeletonLoader} 2s infinite ease-in-out`,
    pointerEvents: 'none'
    // height:21,
  })
);

export const MessageSkeletonUsername = styled(
  SkeletonLoaderRoot,
  'message-skeleton_username',
  css({
    fontSize: 16,
    margin: 0,
    color: 'transparent',
    width: 150,
    pointerEvents: 'none',
    userSelect: 'none',
    borderRadius: 10,
    background: theme.colors.primaryOpacity10,
    animationDelay: '1s'
  })
);

export const MessageSkeletonAvatar = styled(
  SkeletonLoaderRoot,
  'message-skeleton_avatar',
  css({
    borderRadius: 999,
    position: 'absolute',
    left: 16,

    width: 40,
    height: 40
  })
);

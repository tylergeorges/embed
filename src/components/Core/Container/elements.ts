import { keyframes } from '@stitches/react';
import { theme, css, styled } from '@stitches';
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
    width: '100%',
    variants: {
      mobile: {
        true: {
          transition: 'transform 0.3s ease 0s',
          transform: `translateX(0px)`,
          width: '100%',
          height: '100%'
        },
        false: {
          transform: `translateX(${theme.sizes.sideBarWidth})`
        }
      },

      channelsListOpen: {
        true: {
          transform: `translateX(${theme.sizes.sideBarWidth})`,
          width: `calc(100% - ${theme.sizes.sideBarWidth})`
        },
        false: {
          transform: 'translateX(0px)'
        }
      },
      threadsPanelOpen: {
        true: {
          width: `calc(100% - ${theme.sizes.threadPanelMinWidth} + 8px)`
          // transform: `translateX(0px)`
        }
      }
    },
    compoundVariants: [
      {
        channelsListOpen: true,
        mobile: true,
        css: {
          transform: `translateX(0px)`,
          width: '100%',
          '&::after': {
            transition: 'opacity 0.5s ease 0s',
            content: '',
            opacity: 1
          }
        }
      },
      {
        channelsListOpen: true,
        mobile: false,
        css: {
          '&::after': {
            transition: 'opacity 0.5s ease 0s',
            content: '',
            opacity: 1
          },
          width: `calc(100% - ${theme.sizes.sideBarWidth})`
        }
      },
      {
        threadsPanelOpen: true,
        channelsListOpen: true,
        mobile: false,
        css: {
          width: `calc(100% - ($sideBarWidth + $threadPanelMinWidth + 8px))`,
          transform: `translateX(200px)`
        }
      },
      {
        threadsPanelOpen: true,
        mobile: true,
        css: {
          width: `calc(${theme.sizes.threadPanelMinWidth})`,
          transform: `translateX(200px)`
        }
      }
    ]
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

    variants: {
      mobile: {
        true: {
          transition: 'margin 0.3s ease 0s, width 0.3s ease 0s',
          margin: 0,
          width: '100%',
          height: '100%'
        }
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
    // paddingBottom: 10,
    position: 'relative',
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease 0s, width 0.3s ease 0s',
    zIndex: 0,

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

    '.channel-welcome_header_con': {
      width: '100%',
      display: 'block',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      margin: `${theme.space['2xl']}`
    },

    '.channel-welcome_header': {
      fontSize: `${theme.space['2xl']}`,
      marginBottom: 0,
      alignSelf: 'center',
      textAlign: 'center'
    },
    '.channel-welcome_subheader': {
      margin: 0,
      fontSize: '14px',
      color: `${theme.colors.primaryOpacity50}`,
      textAlign: 'center'
    },
    variants: {
      membersListOpen: {
        false: {
          width: '100%',
          marginRight: 0
        },
        true: {
          width: 'calc(100% - $sideBarWidth)'
        }
      },
      mobile: {
        true: {
          transition: 'transform 0.3s ease 0s',
          transform: `translateX(0px)`,
          width: '100%',
          height: '100%'
        }
      }
    },
    compoundVariants: [
      {
        membersListOpen: true,
        mobile: true,
        css: {
          marginRight: 'none',
          width: '100%',
          height: '100%',
          transition: 'transform 0.3s ease 0s',
          transform: `translateX(0px)`,

          '&::after': {
            content: '',
            transition: 'opacity 0.5s ease 0s',
            opacity: 1
          }
        }
      }
    ]
  })
);

export const TextBoxWrapper = styled('form', 'textbox-wrapper', {
  position: 'relative',
  // padding: '$2xl',
  // paddingX: '$2xl',
  marginBottom: '$lg',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '$xs',
  width: 'calc(100% - 32px)',
  // width: '100%',
  // padding: '$md',
  backgroundColor: '$inputBackground',
  maxHeight: '50vh',
  paddingY: '$md'

  // overflow:"hidden"
});
export const TextBoxInner = styled('div', 'textbox-inner', {
  width: '100%',
  height: '100%',
  display: 'flex',
  // overflowY: 'hidden',
  maxHeight: '50vh',
  position: 'relative',
  overflowY: 'auto'
});
export const TextBoxButtonWrapper = styled('div', 'textbox-button_wrapper', {
  display: 'flex',
  alignItems: 'flex-start',
  height: '100%',
  position: 'sticky',
  top: 0
});

export const TextBoxInputWrapper = styled(
  'div',
  'textbox-input_wrapper',
  css({
    width: '100%',
    // height: '100%',
    display: 'flex',
    position: 'relative',
    marginBottom: '$md',
    height: 'auto'
    // overflowY: 'auto'
    // overflowY: 'hidden'
    // paddingX: '$md'
  })
);
export const TextBoxInput = styled(
  'div',
  'textbox-input',
  css({
    width: '100%',
    backgroundColor: 'transparent',
    cursorColor: 'white',
    cursor: 'text',
    border: 'none',
    height: 'auto',
    // borderRadius: '$xs',
    fontWeight: '$thin',
    // overflowY: 'auto',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',

    // paddingY: '$md',

    outline: 'none',
    fontSize: '$lg',
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    display: 'block',
    // display: 'flex',
    // padding: '$md',
    // paddingTop: '$sm',
    color: '$textPrimary'
    // height: '$messageInputSize'
  })
);
export const TextBoxPlaceholder = styled(
  'span',
  'textbox-placeholder',
  css({
    color: '$textMuted',
    position: 'absolute',
    pointerEvents: 'none'
  })
);
export const MessageContentOuterWrapper = styled(
  'div',
  'message-content_outer_wrapper',
  css({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    // marginTop: 17,
    paddingRight: 48,
    paddingLeft: 72,
    // paddingTop: 2,
    // paddingBottom: 6,
    // paddingBottom: 2,
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
    paddingTop: '$xs',
    paddingBottom: '$xs'
  })
);

export const MessageSkeletonContent = styled(
  'div',
  'message-skeleton_content',
  css({
    position: 'relative',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
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
    width: '100%',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    height: 22,
    marginTop: 5
  })
);

export const MessageSkeletonContentWord = styled(
  'div',
  'message-skeleton_content_word',
  css({
    position: 'relative',
    color: 'transparent',
    borderRadius: 10,
    background: theme.colors.primaryOpacity10,
    animation: `${SkeletonLoader} 2s infinite ease-in-out`,
    pointerEvents: 'none',
    height: 22,
    marginTop: 5,
    marginRight: 5
  })
);
export const MessageSkeletonContentLongWord = styled(
  MessageSkeletonContentWord,
  'message-skeleton_content_word',
  css({
    position: 'relative',

    width: 100
  })
);
export const MessageSkeletonContentShortWord = styled(
  MessageSkeletonContentWord,
  'message-skeleton_content_word',
  css({
    width: 24
  })
);
export const MessageSkeletonContentMedWord = styled(
  MessageSkeletonContentWord,
  'message-skeleton_content_word',
  css({
    width: 50
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
    height: 22,
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

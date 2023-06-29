import { keyframes } from '@stitches/react';
import { theme, styled } from '@stitches';
import Image from 'next/image';

export const TextChannelWrapper = styled('div', 'text-channel_wrapper', {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',

  height: '100%',
  width: '100%',

  transition: 'transform 0.3s ease 0s, width 0.3s ease 0s',

  variants: {
    mobile: {
      true: {
        width: '100%',
        height: '100%',

        transition: 'transform 0.3s ease 0s',
        transform: `translateX(0px)`
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
        width: `calc(100% - ${theme.sizes.sideBarWidth})`,

        '&::after': {
          transition: 'opacity 0.5s ease 0s',
          content: '',
          opacity: 1
        }
      }
    },

    {
      threadsPanelOpen: true,
      channelsListOpen: true,
      mobile: false,

      css: {
        width: `calc(100% - (${theme.sizes.sideBarWidth} + ${theme.sizes.threadPanelMinWidth} + 8px))`,
        transform: `translateX(${theme.sizes.sideBarWidth})`
      }
    },

    {
      threadsPanelOpen: true,
      mobile: true,

      css: {
        width: theme.sizes.threadPanelMinWidth,
        transform: `translateX(${theme.sizes.sideBarWidth})`
      }
    }
  ]
});

export const TextChannelInnerWrapper = styled('div', 'text-channel_inner_wrapper', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',

  height: '100%',
  width: '100%',

  variants: {
    mobile: {
      true: {
        width: '100%',
        height: '100%',

        transition: 'margin 0.3s ease 0s, width 0.3s ease 0s',
        margin: 0
      }
    }
  }
});

export const MessageWrapper = styled('div', 'message-wrapper', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  textAlign: 'center',

  width: '100%',
  height: '100%',

  transition: 'transform 0.3s ease 0s, width 0.3s ease 0s',
  zIndex: 0,

  '&::after': {
    position: 'absolute',
    top: 0,
    left: 0,

    height: '100%',
    width: '100%',

    content: '',

    opacity: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

    transition: 'opacity 0.5s ease 0s',
    willChange: 'opacity',
    pointerEvents: 'none'
  },

  '.channel-welcome_header_con': {
    display: 'block',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',

    width: '100%',
    margin: theme.space.xxl
  },

  '.channel-welcome_header': {
    alignSelf: 'center',
    textAlign: 'center',

    marginBottom: 0,
    fontSize: theme.space.xxl
  },

  '.channel-welcome_subheader': {
    margin: 0,

    fontSize: theme.fontSizes.md,
    color: theme.colors.primaryOpacity50,
    textAlign: 'center'
  },

  variants: {
    membersListOpen: {
      false: {
        width: '100%',
        marginRight: 0
      },

      true: {
        width: `calc(100% - ${theme.sizes.sideBarWidth})`
      }
    },

    mobile: {
      true: {
        width: '100%',
        height: '100%',

        transition: 'transform 0.3s ease 0s',
        transform: `translateX(0px)`
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
});

export const TextBoxWrapper = styled('form', 'textbox-wrapper', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',

  width: 'calc(100% - 32px)',
  maxHeight: '50vh',

  borderRadius: theme.radii.xs,
  backgroundColor: theme.colors.inputBackground,

  paddingY: theme.space.sm,
  marginBottom: theme.space.lg
});

export const TextBoxInner = styled('div', 'textbox-inner', {
  display: 'flex',
  position: 'relative',

  width: '100%',
  height: '100%',
  maxHeight: '50vh',

  overflowY: 'auto'
});

export const TextBoxButtonWrapper = styled('div', 'textbox-button_wrapper', {
  position: 'sticky',
  display: 'flex',
  alignItems: 'flex-start',

  height: '100%',

  top: 0
});

export const TextBoxInputWrapper = styled('div', 'textbox-input_wrapper', {
  display: 'flex',
  position: 'relative',

  width: '100%',
  height: '100%',

  marginBottom: theme.space.md
});

export const TextInput = styled('div', 'textbox-input', {
  cursor: 'text',
  cursorColor: 'white',

  border: 'none',
  backgroundColor: 'transparent',

  height: 'auto',
  width: '100%',

  display: 'block',
  position: 'relative',
  justifyContent: 'flex-start',
  alignItems: 'center',

  color: theme.colors.textPrimary,
  fontWeight: theme.fontWeights.thin,
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  textAlign: 'left',

  outline: 'none',
  fontSize: theme.fontSizes.lg
});

export const TextBoxPlaceholder = styled('span', 'textbox-placeholder', {
  position: 'absolute',
  color: theme.colors.textMuted,
  pointerEvents: 'none'
});

export const MessageContentOuterWrapper = styled('div', 'message-content_outer_wrapper', {
  display: 'flex',
  flexDirection: 'row',

  width: '100%',

  paddingRight: 48,
  paddingLeft: 72,

  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.1)'
  }
});

export const MessageContent = styled('div', 'message-content', {
  position: 'relative',
  textAlign: 'left'
});

export const MessageAvatar = styled(Image, 'message-avatar', {
  position: 'absolute',
  left: theme.space.lg,

  borderRadius: theme.radii.round,
  pointerEvents: 'none'
});

export const MessageUsername = styled('h3', 'message-username', {
  fontSize: theme.fontSizes.lg,
  margin: 0,
  pointerEvents: 'none',
  userSelect: 'none'
});

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

export const SkeletonLoaderRoot = styled('div', 'skeleton-loader_root', {
  animation: `${SkeletonLoader} 3s infinite ease-in-out`,
  background: theme.colors.primaryOpacity20,
  pointerEvents: 'none',
  userSelect: 'none'
});

export const MessageSkeletonWrapper = styled('div', 'message-skeleton_wrapper', {
  display: 'flex',
  flexDirection: 'row',

  width: '100%',

  marginTop: theme.space.xl,

  paddingRight: 48,
  paddingLeft: 72,
  paddingTop: theme.space.xs,
  paddingBottom: theme.space.xs
});

export const MessageSkeletonContent = styled('div', 'message-skeleton_content', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',

  textAlign: 'left',

  backgroundColor: 'transparent',
  pointerEvents: 'none',
  userSelect: 'none'
});

export const MessageSkeletonContentLine = styled('div', 'message-skeleton_content_line', {
  position: 'relative',
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'row',

  width: '100%',
  height: theme.sizes.iconSizeMed,

  marginTop: theme.space.xxs,

  color: 'transparent',
  borderRadius: theme.radii.sm
});

export const MessageSkeletonContentWord = styled('div', 'message-skeleton_content_word', {
  position: 'relative',

  height: theme.sizes.iconSizeMed,

  marginTop: theme.space.sm,
  marginRight: theme.space.sm,

  borderRadius: theme.radii.lg,

  color: 'transparent',
  background: theme.colors.primaryOpacity10,
  animation: `${SkeletonLoader} 2s infinite ease-in-out`,
  pointerEvents: 'none'
});

export const MessageSkeletonContentLongWord = styled(
  MessageSkeletonContentWord,
  'message-skeleton_content_word',
  {
    position: 'relative',

    width: 100
  }
);

export const MessageSkeletonContentShortWord = styled(
  MessageSkeletonContentWord,
  'message-skeleton_content_word',
  {
    width: 24
  }
);

export const MessageSkeletonContentMedWord = styled(
  MessageSkeletonContentWord,
  'message-skeleton_content_word',
  {
    width: 50
  }
);

export const MessageSkeletonUsername = styled(SkeletonLoaderRoot, 'message-skeleton_username', {
  fontSize: theme.fontSizes.lg,

  width: 150,
  height: 22,

  margin: 0,

  borderRadius: theme.radii.sm,

  color: 'transparent',
  pointerEvents: 'none',
  userSelect: 'none',
  background: theme.colors.primaryOpacity10,
  animationDelay: '1s'
});

export const MessageSkeletonAvatar = styled(SkeletonLoaderRoot, 'message-skeleton_avatar', {
  position: 'absolute',
  left: theme.space.lg,

  width: 40,
  height: 40,

  borderRadius: theme.radii.round
});

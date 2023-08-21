import { theme, styled, commonComponentId } from '@stitches';
import Image from 'next/image';

export const TextChannelWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'text-channel_wrapper'
})('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',

  height: '100%',
  width: '100%',

  transition: theme.transitions.widthAndTransform,

  variants: {
    mobile: {
      true: {
        width: '100%',
        height: '100%',

        transition: theme.transitions.defaultTransform,
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
        width: `calc(100% - ${theme.sizes.threadPanelMinWidth} + ${theme.sizes.panelSeperatorWidth})`
      }
    }
  },

  compoundVariants: [
    {
      channelsListOpen: true,
      mobile: true,

      css: {
        transform: `translateX(0px)`,
        width: '100%'
      }
    },

    {
      channelsListOpen: true,
      mobile: false,

      css: {
        width: `calc(100% - ${theme.sizes.sideBarWidth})`
      }
    },

    {
      threadsPanelOpen: true,
      channelsListOpen: true,
      mobile: false,

      css: {
        width: `calc(100% - (${theme.sizes.sideBarWidth} + ${theme.sizes.threadPanelMinWidth} + ${theme.sizes.panelSeperatorWidth}))`,
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

export const TextChannelInnerWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'text-channel_inner_wrapper'
})('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',

  height: '100%',
  width: '100%',

  backgroundOverlay: theme.colors.background,

  '&:after': {
    content: '',
    boxShadow: theme.shadows.headerBorder,

    position: 'absolute',
    width: '100%',

    top: -1,
    height: 1,

    zIndex: theme.zIndices.membersSidebar
  }
});

export const MessageWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'message-wrapper'
})('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  textAlign: 'center',

  width: '100%',
  height: '100%',

  transition: theme.transitions.widthAndTransform,
  zIndex: theme.zIndices.none,

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

        transition: theme.transitions.defaultTransform,
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
        transition: theme.transitions.defaultTransform,
        transform: `translateX(0px)`
      }
    }
  ]
});

export const TextBoxWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'textbox-wrapper'
})('form', {
  display: 'flex',
  alignItems: 'center',

  width: 'calc(100% - 32px)',
  maxHeight: '50vh',

  borderRadius: theme.radii.xs,
  backgroundColor: theme.colors.chatInputBackground,

  paddingY: theme.space.sm,
  marginBottom: theme.space.lg,

  userSelect: 'none',

  variants: {
    canSend: {
      false: {
        cursor: 'not-allowed'
      }
    }
  }
});

export const TextBoxForm = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'textbox-form'
})('form', {
  display: 'flex',

  width: '100%',
  maxHeight: '50vh',

  variants: {
    canSend: {
      false: {
        cursor: 'not-allowed'
      },

      true: {
        overflowY: 'auto'
      }
    }
  }
});

export const TextBoxButtonWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'textbox-button_wrapper'
})('div', {
  position: 'sticky',
  display: 'flex',
  alignItems: 'flex-start',

  height: '100%',

  top: 0
});

export const TextBoxInputWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'textbox-input_wrapper'
})('div', {
  display: 'flex',
  position: 'relative',

  width: '100%',
  height: '100%',

  marginBottom: theme.space.md,

  variants: {
    canSend: {
      false: {
        pointerEvents: 'none',
        cursor: 'no-drop',
        opacity: '50%'
      },

      true: {
        cursor: 'text'
      }
    }
  }
});

export const TextInput = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'textbox-input'
})('div', {
  border: 'none',
  backgroundColor: 'transparent',

  width: '100%',

  position: 'relative',
  justifyContent: 'flex-start',
  alignItems: 'center',

  color: theme.colors.textPrimary,
  fontWeight: theme.fontWeights.regular,
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  textAlign: 'left',

  outline: 'none',
  fontSize: theme.fontSizes.lg,

  variants: {
    canSend: {
      false: {
        pointerEvents: 'none',
        cursor: 'not-allowed'
      },

      true: {
        cursor: 'text'
      }
    }
  }
});

export const TextBoxPlaceholder = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'textbox-placeholder'
})('div', {
  position: 'absolute',
  color: theme.colors.textMuted,
  pointerEvents: 'none',
  display: 'block',

  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  width: '100%',
  textAlign: 'left'
});

export const MessageContentOuterWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'message-content_outer_wrapper'
})('div', {
  display: 'flex',
  flexDirection: 'row',

  width: '100%',

  paddingRight: 48,
  paddingLeft: 72,

  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.1)'
  }
});

export const MessageContent = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'message-content'
})('div', {
  position: 'relative',
  textAlign: 'left'
});

export const MessageAvatar = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'message-avatar'
})(Image, {
  position: 'absolute',
  left: theme.space.lg,

  borderRadius: theme.radii.round,
  pointerEvents: 'none'
});

export const MessageUsername = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'message-username'
})('h3', {
  fontSize: theme.fontSizes.lg,
  margin: 0,
  pointerEvents: 'none',
  userSelect: 'none'
});

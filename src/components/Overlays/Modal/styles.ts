import { HeaderMainContentRoot, Stretch } from '@components/Header/styles';
import { theme, styled, commonComponentId } from '@stitches';
import { keyframes } from '@stitches/react';

const zoomIn = keyframes({
  '0%': { scale: '0.5' },
  '50%': { scale: '1.05' },
  '100%': { scale: '1' }
});

export const Backdrop = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'backdrop'
})('div', {
  width: '100%',
  height: '100%',

  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  transition: 'opacity 300ms ease',
  opacity: 0,
  backgroundColor: theme.colors.backDrop,
  variants: {
    isOpen: {
      false: {
        opacity: 0,
        pointerEvents: 'none',

        transitionProperty: 'z-index, opacity',
        zIndex: theme.zIndices.negative
      },
      true: {}
    },

    mobile: {
      true: {},

      false: {
        opacity: 0,

        transitionProperty: 'z-index, opacity',
        zIndex: theme.zIndices.negative
      }
    },

    type: {
      modal: {
        zIndex: theme.zIndices.modalBackdrop
      }
    },

    isChannelsListOpen: {
      true: {},
      false: {}
    },

    isMembersListOpen: {
      true: {},
      false: {}
    }
  },

  compoundVariants: [
    {
      isOpen: true,
      type: 'modal',
      css: {
        zIndex: theme.zIndices.modalBackdrop,
        opacity: 1
      }
    },
    {
      mobile: true,
      isMembersListOpen: true,

      css: {
        zIndex: theme.zIndices.membersSidebarBackdrop,
        opacity: 1
      }
    },

    {
      mobile: true,
      isChannelsListOpen: true,

      css: {
        zIndex: theme.zIndices.channelsSidebarBackdrop,
        opacity: 1
      }
    },

    {
      mobile: false,
      isMembersListOpen: true,

      css: {
        zIndex: theme.zIndices.negative,
        opacity: 0
      }
    },

    {
      mobile: false,
      isChannelsListOpen: true,

      css: {
        zIndex: theme.zIndices.negative,
        opacity: 0
      }
    }
  ]
});

export const ModalContainerWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-container_wrapper'
})('div', {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',
  height: '100%',

  pointerEvents: 'none',
  zIndex: theme.zIndices.negative,

  variants: {
    isOpen: {
      false: {
        zIndex: theme.zIndices.negative,

        transitionDelay: '0.5s',
        transitionProperty: 'z-index'
      },
      true: {
        zIndex: theme.zIndices.modal
      }
    }
  }
});

export const PopoutContainerWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-container_wrapper'
})(ModalContainerWrapper, {
  zIndex: theme.zIndices.modal
});

export const ModalContainer = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-container'
})('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  textAlign: 'left',

  width: 490,

  borderRadius: 4,

  pointerEvents: 'all',
  transition: 'transform 200ms ease',
  backgroundColor: theme.colors.background,
  zIndex: theme.zIndices.modal,

  variants: {
    isOpen: {
      false: {
        transform: 'scale(0)'
      },
      true: {
        animation: `${zoomIn} 0.5s ease`
      }
    }
  }
});

export const ModalHeader = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-header'
})('div', {
  width: '100%'
});

export const ModalHeaderContent = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-header_content'
})(HeaderMainContentRoot, {
  display: 'flex',
  justifyContent: 'space-between',

  fontSize: '100%',

  padding: theme.space.xl,

  cursor: 'default'
});

export const PopoutHeader = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-header'
})('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  width: '100%',
  height: 48,

  padding: 0,

  borderTopRightRadius: theme.radii.sm,
  borderTopLeftRadius: theme.radii.sm,

  backgroundColor: theme.colors.backgroundTertiary,
  userSelect: 'none'
});

export const PopoutContainer = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-container'
})('div', {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  alignSelf: 'center',
  justifySelf: 'center',
  top: 48,

  height: '20%',
  minHeight: 400,
  maxHeight: '80vh',
  maxWidth: 600,
  width: '35vw',

  backgroundColor: theme.colors.backgroundSecondary,

  borderRadius: theme.radii.sm,

  boxSizing: 'border-box',

  animation: 'none',
  transition: 'transform 300ms ease',
  zIndex: theme.zIndices.modal,

  pointerEvents: 'all',
  boxShadow: theme.shadows.dropShadow,

  variants: {
    isOpen: {
      true: {},

      false: {
        display: 'none'
      }
    },

    isMobile: {
      true: {
        width: '65vw',
        minWidth: 260
      },

      false: {
        minWidth: 480
      }
    }
  }
});

export const PopoutHeaderContent = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-header_content'
})(ModalHeaderContent, {
  width: '100%'
});

export const PopoutTitleWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-title_container'
})(Stretch, {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%'
});

export const PopoutTitle = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-title'
})('span', {
  background: 'none',
  padding: 0,
  marginLeft: theme.space.sm
});

export const PopoutContentWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-content_container'
})('div', {
  width: '100%',
  height: '100%'
});

export const PopoutWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-wrapper'
})(ModalContainerWrapper, {});

export const ChannelTopicModalContent = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-channel_topic_content'
})(HeaderMainContentRoot, {
  fontSize: theme.fontSizes.lg,
  lineHeight: '20px',

  color: theme.colors.primaryOpacity70,

  height: '100%',

  flexGrow: 1,
  flexShrink: 1,

  paddingLeft: theme.space.xl,
  paddingRight: theme.space.lg,
  paddingBottom: theme.space.xxl,

  textRendering: 'optimizeLegibility',
  whiteSpace: 'pre-wrap',
  overflowWrap: 'break-word'
});

export const NoThreadsIconOuter = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-no_threads_outer'
})('div', {
  position: 'relative',
  marginBottom: theme.space.xl,
  userSelect: 'none'
});

export const NoThreadsIconInner = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-no_threads_inner'
})('div', {
  display: 'flex',
  position: 'relative',
  alignItems: 'center',

  padding: theme.space.xxl,

  borderImageOutset: 'stretch',
  userSelect: 'none'
});

export const NoThreadsHashWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-no_threads_hash_wrapper'
})('div', {
  padding: theme.space.xxl,
  backgroundColor: theme.colors.background,
  borderRadius: theme.radii.round,
  userSelect: 'none'
});

export const ThreadsPopoutList = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-threads_list_container'
})('div', {
  height: '100%',
  width: '100%'
});

export const ThreadName = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-threads_list_threadname'
})('div', {
  width: '100%',
  color: theme.colors.primaryOpacity50,
  fontSize: theme.fontSizes.lg
});

export const ThreadsPopoutListHeader = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-threads_list_header'
})('span', {
  display: 'flex',
  color: theme.colors.primaryOpacity50,

  fontSize: theme.fontSizes.sm,
  fontWeight: theme.fontWeights.bold,

  width: '100%',
  marginY: theme.space.lg
});

export const ThreadsPopoutContent = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-threads_content'
})('div', {
  width: '100%',
  height: '100%',

  position: 'relative',
  display: 'flex',
  flexDirection: 'column',

  paddingX: theme.space.lg,

  overflowY: 'auto',
  boxSizing: 'border-box'
});

export const ThreadsPopoutListItem = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-threads_list_item'
})('div', {
  backgroundColor: theme.colors.background,
  width: '100%',

  padding: theme.space.lg,
  marginBottom: theme.space.lg,

  borderRadius: theme.radii.md,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'transparent',

  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  cursor: 'pointer',

  '&:hover': {
    borderColor: theme.colors.primaryOpacity10
  }
});

export const NoThreadsContent = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-no_threads_content'
})('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  alignSelf: 'center',
  justifySelf: 'center',

  width: '100%',
  height: '100%',
  userSelect: 'none'
});

export const NoThreadsHeader = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-no_threads_header'
})('h2', {
  textAlign: 'center',
  fontWeight: theme.fontWeights.bold,
  userSelect: 'none'
});

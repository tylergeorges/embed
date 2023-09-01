import { HeaderMainContentRoot, Stretch } from '@components/Header/styles';
import { theme, styled, commonComponentId } from '@stitches';
import { keyframes } from '@stitches/react';
import Image from 'next/image';

const zoomInBounce = keyframes({
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

  transition: theme.transitions.defaultOpacity,

  opacity: 0,
  backgroundColor: theme.colors.backDrop,

  variants: {
    isOpen: {
      false: {
        opacity: 0,
        pointerEvents: 'none',

        transitionProperty: 'z-index, opacity',
        zIndex: theme.zIndices.negative
      }
    },

    mobile: {
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

    // TODO: Find a better way of doing this do avoid empty variant styles as this is only used for the compound variants
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
        zIndex: theme.zIndices.none,
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

        transitionDelay: theme.transitions.longerDuration,
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
  backgroundColor: theme.colors.background,
  zIndex: theme.zIndices.modal,

  variants: {
    isOpen: {
      false: {
        // Scaling to 0 is not performant, so we trigger it to render on GPU with translate3d
        transform: 'scale(0) rotate(0deg) translate3d(0,0,0)'
      },
      true: {
        animation: `${zoomInBounce} ${theme.transitions.longerDuration}  ease`
      }
    }
  }
});

export const ModalHeader = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-header'
})('div', {
  width: '100%',
  padding: theme.space.lg,
  paddingRight: theme.space.sm
});

export const ModalHeaderContent = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-header_content'
})(HeaderMainContentRoot, {
  display: 'flex',
  justifyContent: 'space-between',
  userSelect: 'none',

  fontSize: theme.fontSizes.xl,

  cursor: 'default'
});

export const PopoutHeader = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-header'
})('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  height: 48,

  padding: theme.space.lg,

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
  top: theme.sizes.headerHeight,

  maxHeight: `80vh`,
  width: '35vw',
  maxWidth: 'min-content',
  minWidth: theme.sizes.modalWidth,

  backgroundColor: theme.colors.backgroundSecondary,

  borderRadius: theme.radii.sm,

  animation: 'none',
  transition: theme.transitions.defaultTransform,
  zIndex: theme.zIndices.modal,

  pointerEvents: 'all',
  boxShadow: theme.shadows.dropShadow,

  variants: {
    isOpen: {
      false: {
        display: 'none'
      }
    },

    isMobile: {
      true: {
        width: theme.sizes.modalWidth,
        maxWidth: '100%',

        left: 0
      },

      false: {}
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
  marginLeft: theme.space.sm,

  fontWeight: theme.fontWeights.semibold
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

  paddingX: theme.space.lg,
  paddingBottom: theme.space.xxl,

  textRendering: 'optimizeLegibility',
  whiteSpace: 'pre-wrap',
  overflowWrap: 'break-word',
  fontWeight: theme.fontWeights.regular
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
  width: '100%',
  position: 'relative'
});
export const ThreadName = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-threads_list_threadname'
})('div', {
  width: '100%',
  color: theme.colors.textPrimary,
  fontSize: theme.fontSizes.lg,
  fontWeight: theme.fontWeights.semibold
});

export const ThreadContentWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-threads_content_wrapper'
})('div', {
  width: '100%',
  color: theme.colors.textMuted,
  fontSize: theme.fontSizes.md,
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  whiteSpace: 'pre',
  overflow: 'hidden'
});
export const ThreadContent = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-threads_content_wrapper'
})('div', {
  display: 'block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: theme.fontSizes.lg
});

export const ThreadAuthor = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-threads_author'
})('span', {
  color: theme.colors.textPrimary,
  fontWeight: theme.fontWeights.medium,
  margin: 0,
  fontSize: theme.fontSizes.md,

  // @ts-expect-error
  marginX: theme.space.xxs.value
});

export const ThreadAuthorAvatar = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-threads_author_avatar'
})(Image, {
  borderRadius: theme.radii.round
});

export const ThreadsPopoutListHeader = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-threads_list_header'
})('span', {
  display: 'flex',
  color: theme.colors.primaryOpacity50,

  fontSize: theme.fontSizes.sm,
  fontWeight: theme.fontWeights.bold,
  textRendering: 'optimizeLegibility',
  textTransform: 'uppercase',

  width: '100%',
  marginY: theme.space.lg
});

export const ThreadsPopoutContent = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-threads_content'
})('div', {
  width: '100%',
  height: '100%',

  display: 'flex',
  flexDirection: 'column',

  overflowY: 'auto',
  boxSizing: 'border-box'
});

export const PopoutListItem = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-list_item'
})('div', {
  backgroundColor: theme.colors.background,
  width: '100%',

  padding: theme.space.lg,
  borderRadius: theme.radii.sm,

  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',

  marginBottom: theme.space.lg,

  borderWidth: '1px',
  borderStyle: 'solid'
});

export const PinnedMesageListItem = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-pinned_list_item'
})(PopoutListItem, {
  cursor: 'auto',
  display: 'block',
  height: 'fit-content',
  wordBreak: 'break-word',
  padding: theme.space.sm,
  borderColor: theme.colors.backgroundTertiary
});

export const ThreadsPopoutListItem = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-threads_list_item'
})(PopoutListItem, {
  cursor: 'pointer',

  borderColor: 'transparent',
  flexDirection: 'column',

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

export const PopoutChildrenWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-children_wrapper'
})('div', {
  height: '100%',
  width: '100%',
  padding: theme.space.lg,
  overflowY: 'auto',
  overflowX: 'hidden'
});

export const PinnedPopoutWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-pinned_wrapper'
})('div', {
  height: '100%',
  width: '100%'
});

export const NoPinnedContent = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-no_pinned_content'
})('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  userSelect: 'none'
});

export const NoPinsIconWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-no_pins_icon_wrapper'
})('div', {
  width: '100%',
  height: '100%',
  userSelect: 'none'
});

export const NoPinnedMessage = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-no_pinned_message'
})('div', {
  fontSize: theme.fontSizes.lg,
  fontWeight: theme.fontWeights.medium,
  textAlign: 'center',
  whiteSpace: 'pre',
  marginTop: theme.space.lg
});

export const NoThreadsHeader = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-no_threads_header'
})('h2', {
  textAlign: 'center',
  fontWeight: theme.fontWeights.bold,
  userSelect: 'none'
});

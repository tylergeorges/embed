import { HeaderMainContentRoot, Stretch } from '@components/Header/styles';
import { theme, styled, commonComponentId } from '@stitches';
import { keyframes } from '@stitches/react';

const zoomIn = keyframes({
  '0%': { scale: '0.5' },
  '50%': { scale: '1.05' },
  '100%': { scale: '1' }
});

export const ModalBackdrop = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'modal-backdrop'
})('div', {
  width: '100%',
  height: '100%',

  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  zIndex: 10,
  transition: 'opacity 300ms ease',
  opacity: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',

  variants: {
    isOpen: {
      false: {
        transitionDelay: '0.5s',
        opacity: 0,
        pointerEvents: 'none',

        transitionProperty: 'z-index, opacity'
      },
      true: {
        opacity: 1
      }
    }
  }
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
  zIndex: -1,

  variants: {
    isOpen: {
      false: {
        zIndex: -1,

        transitionDelay: '0.5s',
        transitionProperty: 'z-index'
      },
      true: {
        zIndex: 13
      }
    }
  }
});

export const PopoutContainerWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-container_wrapper'
})(ModalContainerWrapper, {});

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

  backgroundColor: theme.colors.backgroundTertiary
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
  zIndex: 1,

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
        width: '65vw !important',
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

  color: 'rgba(255,255,255,0.7)',

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

export const NoThreadsStars = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-no_threads_stars'
})('svg', {
  left: -10,
  position: 'absolute'
});

export const NoThreadsIconOuter = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-no_threads_outer'
})('div', {
  position: 'relative',
  marginBottom: theme.space.xl
});

export const NoThreadsIconInner = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-no_threads_inner'
})('div', {
  display: 'flex',
  position: 'relative',
  alignItems: 'center',

  padding: theme.space.xxl,

  borderImageOutset: 'stretch'
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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  alignSelf: 'center',
  justifySelf: 'center',
  flex: 1,

  width: '100%',
  height: '100%'
});

export const NoThreadsHeader = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'popout-no_threads_header'
})('h2', {
  textAlign: 'center',
  fontWeight: theme.fontWeights.bold
});

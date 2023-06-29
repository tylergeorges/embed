import { HeaderMainContentRoot, Stretch } from '@components/Header/styles';
import { theme, styled } from '@stitches';
import { keyframes } from '@stitches/react';

const zoomIn = keyframes({
  '0%': { scale: '0.5' },
  '50%': { scale: '1.05' },
  '100%': { scale: '1' }
});

export const ModalBackdrop = styled('div', 'modal-backdrop', {
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

export const ModalContainerWrapper = styled('div', 'modal-container_wrapper', {
  width: '100%',
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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

export const PopoutContainerWrapper = styled(ModalContainerWrapper, 'popout-container_wrapper', {});

export const ModalContainer = styled('div', 'modal-container', {
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

export const ModalHeader = styled('div', 'modal-header', {
  width: '100%'
});

export const ModalHeaderContent = styled(HeaderMainContentRoot, 'modal-header_content', {
  display: 'flex',
  justifyContent: 'space-between',

  fontSize: '100%',

  padding: theme.space.xl,

  cursor: 'default'
});

export const PopoutHeader = styled('div', 'popout-header', {
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

export const PopoutContainer = styled('div', 'popout-container', {
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

export const PopoutHeaderContent = styled(ModalHeaderContent, 'popout-header_content', {
  width: '100%'
});

export const PopoutTitleWrapper = styled(Stretch, 'popout-title_container', {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%'
});

export const PopoutTitle = styled('span', 'popout-title', {
  background: 'none',
  padding: 0,
  marginLeft: theme.space.sm
});

export const PopoutContentWrapper = styled('div', 'popout-content_container', {
  width: '100%',
  height: '100%'
});

export const PopoutWrapper = styled(ModalContainerWrapper, 'popout-wrapper', {});

export const ChannelTopicModalContent = styled(
  HeaderMainContentRoot,
  'modal-channel_topic_content',
  {
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
  }
);

export const NoThreadsStars = styled('svg', 'popout-no_threads_stars', {
  left: -10,
  position: 'absolute'
});

export const NoThreadsIconOuter = styled('div', 'popout-no_threads_outer', {
  position: 'relative',
  marginBottom: theme.space.xl
});

export const NoThreadsIconInner = styled('div', 'popout-no_threads_inner', {
  display: 'flex',
  position: 'relative',
  alignItems: 'center',

  padding: theme.space.xxl,

  borderImageOutset: 'stretch'
});

export const ThreadsPopoutList = styled('div', 'popout-threads_list_container', {
  height: '100%',
  width: '100%'
});

export const ThreadName = styled('div', 'popout-threads_list_threadname', {
  width: '100%',
  color: theme.colors.primaryOpacity50,
  fontSize: theme.fontSizes.lg
});

export const ThreadsPopoutListHeader = styled('span', 'popout-threads_list_header', {
  display: 'flex',
  color: theme.colors.primaryOpacity50,

  fontSize: theme.fontSizes.sm,
  fontWeight: theme.fontWeights.bold,

  width: '100%',
  marginY: theme.space.lg
});

export const ThreadsPopoutContent = styled('div', 'popout-threads_content', {
  width: '100%',
  height: '100%',

  position: 'relative',
  display: 'flex',
  flexDirection: 'column',

  paddingX: theme.space.lg,

  overflowY: 'auto',
  boxSizing: 'border-box'
});

export const ThreadsPopoutListItem = styled('div', 'popout-threads_list_item', {
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

export const NoThreadsContent = styled('div', 'popout-no_threads_content', {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
  flexDirection: 'column',
  justifySelf: 'center',
  flex: 1
});

export const NoThreadsHeader = styled('h2', 'popout-no_threads_header', {
  textAlign: 'center',
  fontWeight: theme.fontWeights.bold
});

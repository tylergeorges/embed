import { HeaderMainContentRoot, Stretch } from '@components/Header/styles';
import { theme } from '@stitches';
import { keyframes, styled } from '@stitches/react';

const zoomIn = keyframes({
  '0%': { transform: 'scale(0.5)' },
  '50%': { transform: 'scale(1.05)' },
  '100%': { transform: 'scale(1)' }
});
export const ModalBackdrop = styled('div', 'modal-backdrop', {
  backgroundColor: 'rgba(0,0,0,0.5)',
  width: '100%',
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
  transition: 'opacity 300ms ease',
  opacity: 0,

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
        transitionDelay: '0.5s',
        zIndex: -1,
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
  width: 490,
  backgroundColor: theme.colors.background,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  textAlign: 'left',
  borderRadius: 4,
  pointerEvents: 'all',
  transition: 'transform 200ms ease',

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
  fontSize: '100%',
  padding: theme.space.xl,
  display: 'flex',
  justifyContent: 'space-between',
  cursor: 'default'
});

export const PopoutHeader = styled('div', 'popout-header', {
  backgroundColor: '$backgroundTertiary',
  padding: 0,
  height: 48,
  display: 'flex',
  alignItems: 'center',
  borderTopRightRadius: 8,
  borderTopLeftRadius: 8,
  flexDirection: 'row',
  width: '100%'
});

export const PopoutContainer = styled('div', 'popout-container', {
  backgroundColor: '$backgroundSecondary',
  position: 'absolute',
  animation: 'none',
  minHeight: 400,
  maxHeight: '80vh',
  maxWidth: 600,
  height: '20%',
  width: '35vw',
  top: 48,
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  borderRadius: 4,
  pointerEvents: 'all',
  transition: 'transform 300ms ease',
  borderBottomRightRadius: 8,
  borderBottomLeftRadius: 8,
  boxSizing: 'border-box',
  zIndex: 1,

  alignSelf: 'center',
  justifySelf: 'center',
  boxShadow: '$dropShadow',

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
  marginLeft: '$sm'
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
    fontSize: '$lg',
    color: 'rgba(255,255,255,0.7)',
    height: '100%',
    flexGrow: 1,
    flexShrink: 1,
    paddingLeft: '$xl',
    paddingRight: '$lg',
    paddingBottom: '$xxl',
    textRendering: 'optimizeLegibility',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    lineHeight: '20px'
  }
);

export const NoThreadsStars = styled('svg', 'popout-no_threads_stars', {
  left: -10,
  position: 'absolute'
});

export const NoThreadsIconOuter = styled('div', 'popout-no_threads_outer', {
  position: 'relative',
  marginBottom: '$xl'
});

export const NoThreadsIconInner = styled('div', 'popout-no_threads_inner', {
  position: 'relative',
  padding: '$xxl',
  display: 'flex',
  borderImageOutset: 'stretch',
  alignItems: 'center'
});

export const ThreadsPopoutList = styled('div', 'popout-threads_list_container', {
  height: '100%',
  width: '100%'
});

export const ThreadName = styled('div', 'popout-threads_list_threadname', {
  width: '100%',
  color: '$primaryOpacity50',
  fontSize: '$lg'
});

export const ThreadsPopoutListHeader = styled('span', 'popout-threads_list_header', {
  fontSize: '$sm',
  width: '100%',
  fontWeight: '$bold',
  marginBottom: '$lg',
  marginTop: '$lg',
  color: '$primaryOpacity50',
  display: 'flex'
});

export const ThreadsPopoutContent = styled('div', 'popout-threads_content', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingRight: '$lg',
  paddingLeft: '$lg',
  position: 'relative',
  overflowY: 'auto',
  boxSizing: 'border-box'
});

export const ThreadsPopoutListItem = styled('div', 'popout-threads_list_item', {
  backgroundColor: '$background',
  width: '100%',
  padding: '$lg',
  marginBottom: '$lg',
  borderRadius: '$md',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  cursor: 'pointer',
  '&:hover': {
    borderColor: 'rgba(255, 255, 255, 0.1)'
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
  fontWeight: '$bold'
});

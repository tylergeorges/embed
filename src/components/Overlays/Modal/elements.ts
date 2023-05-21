import { HeaderMainContentRoot, Stretch } from '@components/Header/elements';
import { theme, css } from '@stitches';
import { keyframes, styled } from '@stitches/react';

const zoomIn = keyframes({
  '0%': { transform: 'scale(0.5)' },
  '50%': { transform: 'scale(1.05)' },
  '100%': { transform: 'scale(1)' }
});
const zoomOut = keyframes({
  '0%': { transform: 'initial' },
  '50%': { transform: 'scale(1.05)' },
  '100%': { transform: 'scale(0)' }
});

export const ModalBackdrop = styled(
  'div',
  'modal-backdrop',
  css({
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    // animation: `${fadeIn} 0.5s ease`,
    transition: 'opacity 300ms ease',
    opacity: 0,
    variants: {
      isOpen: {
        false: {
          // transitionDelay: '0.5s',
          opacity: 0,
          pointerEvents: 'none',

          // zIndex: -1,
          transitionProperty: 'z-index, opacity'
        },
        true: {
          // animation: `${fadeIn} 0.5s ease`,
          opacity: 1
        }
      }
    }
  })
);

export const ModalContainerWrapper = styled(
  'div',
  'modal-container_wrapper',
  css({
    width: '100%',
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    zIndex: 13,
    variants: {
      isOpen: {
        false: {
          //   zIndex: -1

          transitionDelay: '0.5s',
          zIndex: -1,
          transitionProperty: 'z-index'
        }
      }
    }
  })
);

export const PopoverContainerWrapper = styled(
  ModalContainerWrapper,
  'popover-container_wrapper',
  css({})
);
export const ModalContainer = styled(
  'div',
  'modal-container',
  css({
    width: 490,
    backgroundColor: theme.colors.background,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    textAlign: 'left',
    borderRadius: 4,
    pointerEvents: 'all',
    transition: 'transform 0.5s ease',
    variants: {
      isOpen: {
        false: {
          animation: `${zoomOut} 0.5s ease`
        },
        true: {
          animation: `${zoomIn} 0.5s ease`
        }
      }
    }
  })
);

export const ModalHeader = styled(
  'div',
  'modal-header',
  css({
    width: '100%'
  })
);

export const ModalHeaderContent = styled(
  HeaderMainContentRoot,
  'modal-header_content',
  css({
    fontSize: '100%',
    // fontSize: '$xl',
    padding: '$xxl',
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'default'
  })
);

export const PopoverHeader = styled(
  'div',
  'popover-header',
  css({
    backgroundColor: '$backgroundTertiary',
    padding: 0,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    flexDirection: 'row',
    width: '100%'
  })
);

export const PopoverContainer = styled(
  'div',
  'popover-container',
  css({
    backgroundColor: '$backgroundSecondary',
    position: 'absolute',
    animation: 'none',
    minHeight: 400,
    maxHeight: '80vh',
    maxWidth: 600,
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
    zIndex: 1,
    alignSelf: 'center',
    justifySelf: 'center',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',

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
  })
);

export const PopoverHeaderContent = styled(
  ModalHeaderContent,
  'popover-header_content',
  css({
    width: '100%'
  })
);
export const PopoverTitleWrapper = styled(
  Stretch,
  'popover-title_container',
  css({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%'

    // borderRightColor: 'rgba(255,255,255,0.1)'
  })
);
export const PopoverTitle = styled(
  'span',
  'popover-title',
  css({
    background: 'none',
    padding: 0,
    marginLeft: '$sm'
  })
);
export const PopoverContentWrapper = styled(
  'div',
  'popover-content_container',
  css({
    width: '100%',
    height: '100%'
  })
);
export const PopoverWrapper = styled(ModalContainerWrapper, 'popover-wrapper', css({}));

export const ChannelTopicModalContent = styled(
  HeaderMainContentRoot,
  'modal-channel_topic_content',
  css({
    fontSize: '$l',
    color: 'rgba(255,255,255,0.7)',
    height: '100%',
    flexGrow: 1,
    flexShrink: 1,
    paddingLeft: '$xxl',
    paddingRight: '$lg',
    paddingBottom: '$xxl',
    textRendering: 'optimizeLegibility',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    lineHeight: '20px'
  })
);
export const NoThreadsStars = styled(
  'svg',
  'popout-no_threads_stars',
  css({
    left: -10,
    position: 'absolute'
  })
);
export const NoThreadsIconOuter = styled(
  'div',
  'popout-no_threads_outer',
  css({
    position: 'relative',
    marginBottom: 16
  })
);
export const NoThreadsIconInner = styled(
  'div',
  'popout-no_threads_inner',
  css({
    position: 'relative',
    padding: 22,
    display: 'flex',
    borderImageOutset: 'stretch',
    alignItems: 'center'
  })
);

export const ThreadsPopoverList = styled(
  'div',
  'popover-threads_list_container',
  css({
    // overflowY: 'scroll',
    height: '100%',
    width: '100%'
  })
);

export const ThreadName = styled(
  'div',
  'popover-threads_list_threadname',
  css({
    width: '100%',
    color: '$primaryOpacity50',
    fontSize: '$lg'
  })
);

export const ThreadsPopoverListHeader = styled(
  'span',
  'popover-threads_list_header',
  css({
    fontSize: '$sm',
    width: '100%',
    fontWeight: '600',
    marginBottom: '$lg',
    marginTop: '$lg',
    color: '$primaryOpacity50',
    display: 'flex'
  })
);

export const ThreadsPopoverContent = styled(
  'div',
  'popover-threads_content',
  css({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 16,
    paddingLeft: 16,
    overflowY: 'auto'
  })
);
export const ThreadsPopoverListItem = styled(
  'div',
  'popover-threads_list_item',
  css({
    backgroundColor: '$background',
    width: '100%',
    height: '100%',
    padding: '$xxl',
    marginBottom: '$lg',
    borderRadius: 8
  })
);

export const NoThreadsContent = styled(
  'div',
  'popover-no_threads_content',
  css({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    justifySelf: 'center',
    flex: 1
  })
);

export const NoThreadsHeader = styled(
  'h2',
  'popover-no_threads_header',
  css({
    textAlign: 'center',
    fontWeight: '600'
  })
);

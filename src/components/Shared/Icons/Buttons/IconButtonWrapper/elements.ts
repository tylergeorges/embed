import { css, theme } from '@stitches';
import { styled } from '@stitches/react';

export const IconRoot = styled(
  'svg',
  'button-icons',
  css({
    cursor: 'pointer',
    path: {
      fill: 'rgb(181,186,193)'
    },
    justifySelf: 'flex-end',
    '&:hover': {
      path: {
        fill: theme.colors.primaryOpacity80
      }
    },
    variants: {
      isActive: {
        true: {
          path: {
            fill: theme.colors.primaryOpacity90
          }
        }
      },
      size: {
        regular: {
          width: '$iconSizeMed',
          height: '$iconSizeMed'
        },
        large: {
          width: '$iconSizeXl',
          height: '$iconSizeXl'
        }
      }
    }
  })
);

export const IconButtonRoot = styled(
  'div',
  'icon-button_wrapper_root',
  css({
    display: 'flex',
    whiteSpace: 'nowrap',
    marginLeft: 8,
    marginRight: 8,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  })
);

export const ThreadsIconRoot = styled(IconRoot, 'thread-hash', {});
export const ThreadsPanelIconRoot = styled(IconRoot, 'threads-panel_icon', {});
export const MembersIconRoot = styled(IconRoot, 'text-channel_header_members_button', {});
export const CloseIconRoot = styled(IconRoot, 'icon-close', {});

export const PinIconRoot = styled(IconRoot, 'text-channel_header_pin_button', {});
export const SpineIconRoot = styled(
  'svg',
  'thread-spine',
  css({
    width: 12,
    height: 11,
    position: 'absolute',
    justifySelf: 'flex-start',
    left: 22
  })
);

export const IconButtonChildrenWrapper = styled(
  'div',
  'icon-button_children_wrapper',
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    transition: 'background-color ease 150ms',

    padding: 3,
    variants: {
      backgroundGlowOnHover: {
        true: {
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.2)'
          }
        }
      }
    }
  })
);

import { css, theme, styled } from '@stitches';
// import { styled } from '@stitches/react';

export const IconRoot = styled(
  'svg',
  'button-icons',
  css({
    cursor: 'pointer',

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
            fill: '$iconActive'
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
      },
      color: {
        light: {
          path: {
            fill: '$iconLight'
          }
        },
        dark: {
          path: {
            fill: '$iconDark'
          }
          // marginLeft: 8, marginRight: 8, path: { fill: 'rgb(128, 132, 142)'
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
    alignItems: 'center',
    justifyContent: 'center',

    whiteSpace: 'nowrap',

    width: '$iconSizeMed',
    height: '$iconSizeMed',
    marginX: '$sm',
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
    left: 30,
    marginTop: 10
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

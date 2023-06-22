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
    background: 'transparent',
    outline: 'none',
    border: 'none',
    whiteSpace: 'nowrap',

    width: '$iconSizeMed',
    height: '$iconSizeMed',
    marginX: '$sm',
    position: 'relative'
  })
);
// https://emerald.widgetbot.io/static/media/15e026451fd814e2d1a13e49c8076978.15e02645.png
export const EmojisIconRoot = styled(
  'div',
  'icon-emojis_icon_root',
  css({
    backgroundImage: 'url(https://emerald.widgetbot.io/static/media/15e026451fd814e2d1a13e49c8076978.15e02645.png)',
    backgroundPositionX: 'var(--emoji-x)',
    backgroundPositionY: 'var(--emoji-y)',
    // backgroundPositionY: '-22px',
    backgroundSize: '242px 110px',
    height: 22,
    minWidth: 22,
    filter: 'grayscale(100%)',
    transition: 'transform 200ms ease, filter 200ms ease',
    // transition: 'transform 200ms ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.14)',
      filter: 'grayscale(0%)',
      backgroundPositionX: 'var(--emoji-x)',
      backgroundPositionY: 'var(--emoji-y)'
    }
  })
);

export const ThreadsIconRoot = styled(IconRoot, 'icon-thread-hash', {});
export const ThreadsPanelIconRoot = styled(IconRoot, 'icon-threads-panel', {});

export const MembersIconRoot = styled(IconRoot, 'icon-text-channel_header_members_button', {});
export const PinIconRoot = styled(IconRoot, 'icon-text-channel_header_pin_button', {});

export const CloseIconRoot = styled(IconRoot, 'icon-close', {});
export const AddAttachmentsIconRoot = styled(IconRoot, 'icon-add_attachments', {});

export const SpineIconRoot = styled(
  'svg',
  'thread-spine',
  css({
    width: 12,
    height: 11,
    position: 'absolute',
    justifySelf: 'flex-start',
    left: 30,
    marginTop: 16
  })
);

export const IconButtonChildrenWrapper = styled(
  'button',
  'icon-button_children_wrapper',
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    background: 'transparent',
    outline: 'none',
    border: 'none',
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

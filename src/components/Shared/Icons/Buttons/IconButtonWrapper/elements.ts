import { theme, styled } from '@stitches';

export const IconRoot = styled('svg', 'button-icons', {
  justifySelf: 'flex-end',

  variants: {
    size: {
      small: {
        width: '$iconSizeSmall',
        height: '$iconSizeSmall'
      },
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
        },
        use: {
          color: '$iconLight'
        }
      },
      dark: {
        path: {
          fill: '$iconDark'
        },
        use: {
          color: '$iconDark'
        }
      }
    }
  }
});

export const IconButtonRoot = styled('div', 'icon-button_wrapper_root', {
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
});
export const EmojisIconRoot = styled('div', 'icon-emojis_icon_root', {
  backgroundImage:
    'url(https://emerald.widgetbot.io/static/media/15e026451fd814e2d1a13e49c8076978.15e02645.png)',
  backgroundPositionX: 'var(--emoji-x)',
  backgroundPositionY: 'var(--emoji-y)',
  backgroundSize: '242px 110px',
  height: 22,
  minWidth: 22,
  filter: 'grayscale(100%)',
  transition: 'transform 200ms ease, filter 200ms ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.14)',
    filter: 'grayscale(0%)',
    backgroundPositionX: 'var(--emoji-x)',
    backgroundPositionY: 'var(--emoji-y)'
  }
});

export const ThreadsIconRoot = styled(IconRoot, 'icon-thread-hash', {});
export const ThreadsPanelIconRoot = styled(IconRoot, 'icon-threads-panel', {});

export const MembersIconRoot = styled(IconRoot, 'icon-text-channel_header_members_button', {});
export const PinIconRoot = styled(IconRoot, 'icon-text-channel_header_pin_button', {});

export const CloseIconRoot = styled(IconRoot, 'icon-close', {});
export const AddAttachmentsIconRoot = styled(IconRoot, 'icon-add_attachments', {});

export const SpineIconRoot = styled('svg', 'thread-spine', {
  width: 12,
  height: 11,
  position: 'absolute',
  justifySelf: 'flex-start',
  left: 30,
  marginTop: 16
});

export const IconButtonChildrenWrapper = styled('button', 'icon-button_children_wrapper', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 999,
  cursor: 'pointer',
  background: 'transparent',
  outline: 'none',
  border: 'none',
  transition: 'background-color ease 150ms',
  '&:hover': {
    path: {
      fill: theme.colors.primaryOpacity80
    },
    use: {
      color: theme.colors.primaryOpacity80
    }
  },
  padding: 3,

  variants: {
    backgroundGlowOnHover: {
      true: {
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.2)'
        }
      }
    },
    isActive: {
      true: {
        path: {
          fill: '$iconActive'
        },
        use: {
          color: '$iconActive'
        }
      }
    }
  }
});

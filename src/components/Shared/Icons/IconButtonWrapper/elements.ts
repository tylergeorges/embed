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
          width: 24,
          height: 24
        },
        large: {
          width: 36,
          height: 36
        }
      }
    }
  })
);

export const IconButtonRoot = styled(
  'div',
  'icon-button_wrapper_root',
  css({
    display: 'inline-block',
    marginLeft: 8,
    marginRight: 8,
    width: 24,
    height: 24
  })
);

export const ThreadsIconRoot = styled(IconRoot, 'thread-hash', {});
export const MembersIconRoot = styled(IconRoot, 'text-channel_header_members_button', {});

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

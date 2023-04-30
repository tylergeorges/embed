import { css, theme } from '@stitches';
// ! IMPORT STITCHES FROM HERE
import { styled } from '@stitches/react';

const Root = styled(
  'header',
  'root',
  css({
    overflow: 'hidden',
    userSelect: 'none',
    display: 'flex',
    flexShrink: 0,
    zIndex: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',

    '.header-text_content': {
      fontWeight: 'bold',
      fontSize: 18
    },

    variants: {
      shadowEnabled: {
        true: {
          boxShadow:
            '0 2px 4px -1px rgba(0, 0, 0, 0.1), 0px 4px 5px 0px rgba(0, 0, 0, 0.12), 0px 1px 10px 0px rgba(0, 0, 0, 0.09), 0 1px 0 rgba(0, 0, 0, 0.1), 0 2px 0 rgba(0, 0, 0, 0.06)',
          backgroundColor: 'transparent',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          height: 60
        },
        false: {
          backgroundColor: 'transparent'
        }
      }
    }
  })
);

export const HeaderRoot = styled(Root, 'header-root', {});

export const SingleChannel = styled(
  'div',
  'single-channel',
  css({
    [`& ${theme.singleChannel.enable}`]: {
      display: 'none'
    }
  })
);

export const Inner = styled(
  'div',
  'inner',
  css({
    display: 'flex',
    flexShrink: '1',
    flexGrow: 1,
    minWidth: 0,
    height: '47px',
    padding: '10px 0',
    '@media (max-width: 270px), (max-height: 300px)': {
      height: '41px',
      padding: '7px 0'
    }
  })
);

export const Stretch = styled(
  'div',
  'stretch',
  css({
    diplay: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
    flexShrink: 1,
    width: 0
  })
);

export const HeaderChannel = styled(
  Stretch,
  'textchannel-header',
  css({
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginLeft: 15,
    flexDirection: 'row',

    '.textchannel-channel_name': {}
  })
);

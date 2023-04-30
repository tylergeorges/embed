import { styled } from '@stitches/react';
import { css, theme } from '@stitches';
import {
  Hash,
  NSFW,
  NSFWNews,
  NSFWVoice,
  News,
  Rules,
  ThreadHash,
  Voice
} from '../Shared/Channel/elements';

export const ChannelHeaderContainer = styled(
  'div',
  'textchannel-header_container',
  css({
    width: 'calc(100% + 250px)',
    position: 'absolute',
    height: 60
  })
);

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

const name = (hash: typeof Hash) =>
  styled(
    hash,
    'name',
    css({
      fontFamily: 'var(--font-display)',
      fontSize: 18,
      fontWeight: 600,
      height: 25,
      margin: '0 15px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      flexShrink: 0,

      backgroundPosition: '0 50%',
      paddingLeft: 25,

      '@media (max-width: 350px)': {
        background: 'none',
        paddingLeft: 0
      },

      '@media (max-width: 330px)': {
        flexShrink: 1
      },

      '@media (max-width: 270px)': {
        fontSize: 16
      }
    })
  );

export const Name = name(Hash);

export const ThreadName = name(ThreadHash);

export const NewsName = name(News);

export const NSFWName = name(NSFW);

export const NSFWNewsName = name(NSFWNews);

export const RulesName = name(Rules);

export const VoiceName = name(Voice);

export const NSFWVoiceName = name(NSFWVoice);

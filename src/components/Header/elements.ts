import { styled, css, theme } from '@/../stitches.config';
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
import Button from '../Shared/button';

export const Root = styled(
  'header',
  'root',
  css({
    overflow: 'hidden',
    userSelect: 'none',
    display: 'flex',
    flexShrink: 0,
    zIndex: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    boxShadow:
      '0 2px 4px -1px rgba(0, 0, 0, 0.1), 0px 4px 5px 0px rgba(0, 0, 0, 0.12), 0px 1px 10px 0px rgba(0, 0, 0, 0.09), 0 1px 0 rgba(0, 0, 0, 0.1), 0 2px 0 rgba(0, 0, 0, 0.06)'
  })
);

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

export const TopicWrapper = styled(
  'div',
  'topic-wrapper',
  css({
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden'
  })
);

export const JoinLink = styled(
  'a',
  'join-link',
  css({
    [`& ${Button}`]: {
      background: theme.colors.accentOpacity60,
      marginRight: 20,
      flexShrink: 0
    }
  })
);

export const SingleChannelAuthWrapper = styled(
  'div',
  'single-channel-auth-wrapper',
  css({
    [`& ${theme.singleChannel.enable && !theme.readOnly.enable}`]: {
      display: 'none'
    },
    marginLeft: 10,
    '> a': {
      display: 'block'
    }
  })
);

export const Fullscreen = styled(
  'svg',
  'fullscreen',
  css({
    marginLeft: '1rem',
    cursor: 'pointer',
    path: {
      color: theme.colors.primaryOpacity60
    }
  })
);

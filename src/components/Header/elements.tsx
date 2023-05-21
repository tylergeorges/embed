import { styled } from '@stitches/react';
import { css, theme } from '@stitches';
import { Hash, NSFW, NSFWNews, NSFWVoice, News, Rules, Voice } from '../Shared/Channel/elements';

export const ChannelHeaderContainer = styled(
  'div',
  'text-channel_header_container',
  css({
    // width: 'calc(100% + $sideBarWidth)',
    width: '100%',
    display: 'flex',
    backgroundColor: '$background'

    // position: 'absolute',
    // zIndex: 1
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
    // backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 48,

    variants: {
      shadowEnabled: {
        true: {
          boxShadow:
            '0 2px 4px -1px rgba(0, 0, 0, 0.1), 0px 4px 5px 0px rgba(0, 0, 0, 0.12), 0px 1px 10px 0px rgba(0, 0, 0, 0.09), 0 1px 0 rgba(0, 0, 0, 0.1), 0 2px 0 rgba(0, 0, 0, 0.06)',
          backgroundColor: '$background',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        },
        false: {
          backgroundColor: 'transparent'
        }
      }
    }
  })
);

export const HeaderMainContentRoot = styled(
  'h1',
  'header-main_content_root',
  css({
    fontWeight: '600',
    // fontSize: '100%',
    fontSize: '$lg',
    margin: 0
  })
);

export const GuildHeaderName = styled(HeaderMainContentRoot, 'guild-header_name', css({}));
export const ChannelHeaderName = styled(
  HeaderMainContentRoot,
  'text-channel_header_name',
  css({
    backgroundPosition: '0 0',
    backgroundSize: '24px 24px',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' class='icon-1_QxNX'%3E%3Cpath fill='rgba(255,255,255,0.3)' fill-rule='evenodd' clip-rule='evenodd' d='M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z'%3E%3C/path%3E%3C/svg%3E")`,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 25,
    textOverflow: 'ellipsis',
    boxSizing: 'border-box',
    alignSelf: 'center',
    whiteSpace: 'nowrap'
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
  'header',
  'stretch',
  css({
    diplay: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
    flexShrink: 1,
    width: 0
  })
);
export const GuildHeader = styled(
  Stretch,
  'guild-header',
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  })
);

export const ChannelHeaderRoot = styled(
  Stretch,
  'text-channel_header',
  css({
    display: 'flex',
    // position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 3,
    paddingLeft: 8,
    paddingRight: 8,
    // backgroundColor: '$primary',

    '.text-channel_header_buttons_container': {
      width: '100%'
    }
  })
);

export const ChannelHeaderTopic = styled(
  'div',
  'text-channel_header_topic',
  css({
    color: 'rgba(255,255,255,0.4)',
    fontSize: 14,
    margin: 0,
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.1)',
    paddingLeft: 15,
    paddingRight: 15,
    wordBreak: 'break-word',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    alignSelf: 'center',
    cursor: 'pointer'
  })
);

export const ChannelHeaderNameWrapper = styled(
  'div',
  'text-channel_header_name_container',
  css({
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  })
);

export const ChannelNameTopicWrapper = styled(
  Stretch,
  'text-channel_name_topic_container',
  css({
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    overflow: 'hidden',
    wordBreak: 'break-word',
    flexShrink: 1,
    flexGrow: 1
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

export const NewsName = name(News);

export const NSFWName = name(NSFW);

export const NSFWNewsName = name(NSFWNews);

export const RulesName = name(Rules);

export const VoiceName = name(Voice);

export const NSFWVoiceName = name(NSFWVoice);

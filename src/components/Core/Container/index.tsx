import { useStoreActions, useStoreState } from '@state';
import { useContextMenu, useMediaQuery } from '@lib/hooks';
import { MembersList } from '@components/Sidebar/MembersList';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Channel } from '@graphql/graphql';
import { TextChannelInnerWrapper, TextChannelWrapper } from './elements';
import { TextChannelHeader } from './TextChannelHeader';
import { MessageContainer } from './MessageContainer';
import { RouterQuery } from '../../../types/routerQuery';

/** The overall text channel view container.
 *
 * This component contains the message input to send messages,
 * the current text channels header, and all the messages for the current text channel.
 *
 */
export const Container = () => {
  // Used to check if the screen size is mobile because if it is then the sidebars
  // hover over the text channel and we want to be able to close them by clicking on
  // the text channel.
  const windowIsMobile = useMediaQuery('screen and (max-width: 768px)');

  // boolean check for sidebar lists
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  const isChannelsListOpen = useStoreState(state => state.ui.isChannelsListOpen);
  const isThreadsPanelOpen = useStoreState(state => state.ui.isThreadsPanelOpen);
  const isCurrentChannelThread = useStoreState(state => state.ui.isCurrentChannelThread);

  const channelThreads = useStoreState(state => state.guild.channelThreads);

  const router = useRouter();
  const { thread: threadID, channel } = router.query as RouterQuery;

  const setCurrentThread = useStoreActions(state => state.guild.setCurrentThread);
  // actions to set sidebar lists state
  const setIsChannelsListOpen = useStoreActions(state => state.ui.setIsChannelsListOpen);
  const setIsMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);

  const { hideContextMenu } = useContextMenu();

  const guildName = useStoreState(state => state.guild.data?.name);

  // TODO: Write a hook (useCurrentChannel) or something to pull channel id from url & get it from state.guild.channels.

  useEffect(() => {
    if (isCurrentChannelThread) {
      const thread = channelThreads[channel].threads.find(th => th.id === threadID) as Channel;
      setCurrentThread(thread);
    }

    if (!isThreadsPanelOpen) {
      setIsMembersListOpen(!windowIsMobile);
    }
  }, [
    windowIsMobile,
    setIsMembersListOpen,
    isThreadsPanelOpen,
    channel,
    isCurrentChannelThread,
    setCurrentThread,
    channelThreads,
    threadID
  ]);
  // const translate = useTranslation();

  const hideSidebar = useCallback(() => {
    if ((windowIsMobile && isChannelsListOpen) || (windowIsMobile && isMembersListOpen)) {
      setIsChannelsListOpen(false);
      setIsMembersListOpen(false);
    }
  }, [
    isChannelsListOpen,
    isMembersListOpen,
    windowIsMobile,
    setIsMembersListOpen,
    setIsChannelsListOpen
  ]);

  if (!guildName) return <div>Loading...</div>;

  return (
    <TextChannelWrapper
      className="text-channel_wrapper"
      css={{
        '@media screen  and (max-width: 768px)': {
          transition: 'transform 0.3s ease 0s',

          // ! assuming the members side bar is still open
          transform: `translateX(0px) !important`,
          width: '100% !important',
          height: '100%'
        }
      }}
      panelAndChannelsOpen={isThreadsPanelOpen && isChannelsListOpen}
      channelsListOpen={!isThreadsPanelOpen && isChannelsListOpen}
      threadsPanelOpen={!isChannelsListOpen && isThreadsPanelOpen}
      onClick={hideContextMenu}
    >
      <TextChannelHeader />
      <TextChannelInnerWrapper
        className="text-channel_inner_wrapper"
        css={{
          '@media screen  and (max-width: 768px)': {
            transition: 'margin 0.3s ease 0s, width 0.3s ease 0s',

            // ! assuming the members side bar is still open
            marginRight: '0px !important',
            width: '100% !important',
            height: '100%',
            '&::after': {
              transition: 'opacity 0.5s ease 0s',
              content: '',
              opacity: isChannelsListOpen || isMembersListOpen ? 1 : 0
            }
          }
        }}
      >
        <MessageContainer guildName={guildName} onClick={hideSidebar} />
      </TextChannelInnerWrapper>
      <MembersList />
    </TextChannelWrapper>
  );
};

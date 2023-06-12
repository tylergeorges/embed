import { useStoreActions, useStoreState } from '@state';
import { useContextMenu, useMediaQuery, useAppRouter } from '@lib/hooks';
import { MembersList } from '@components/Sidebar/MembersList';
import { useCallback, useEffect } from 'react';

import { Channel } from '@graphql/graphql';
import { TextChannelInnerWrapper, TextChannelWrapper } from './elements';
import { TextChannelHeader } from './TextChannelHeader';
import { MessageContainer } from './MessageContainer';

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
  const { threadId, channelId } = useAppRouter();
  const { hideContextMenu } = useContextMenu();

  // boolean check for sidebar lists
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  const isChannelsListOpen = useStoreState(state => state.ui.isChannelsListOpen);
  const isThreadsPanelOpen = useStoreState(state => state.ui.isThreadsPanelOpen);
  const isCurrentChannelThread = useStoreState(state => state.ui.isCurrentChannelThread);

  const channelThreads = useStoreState(state => state.guild.channelThreads);

  // actions to set sidebar lists state
  const setIsChannelsListOpen = useStoreActions(state => state.ui.setIsChannelsListOpen);
  const setIsMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);
  const setCurrentThread = useStoreActions(state => state.guild.setCurrentThread);

  // TODO: Write a hook (useCurrentChannel) or something to pull channel id from url & get it from state.guild.channels.

  useEffect(() => {
    if (isCurrentChannelThread && threadId) {
      const thread = channelThreads[channelId].threads.find(th => th.id === threadId) as Channel;
      setCurrentThread(thread);
    }

    if (!isThreadsPanelOpen) {
      setIsMembersListOpen(!windowIsMobile);
    }
  }, [
    windowIsMobile,
    setIsMembersListOpen,
    isThreadsPanelOpen,
    threadId,
    channelId,
    isCurrentChannelThread,
    setCurrentThread,
    channelThreads
  ]);

  const hideSidebar = useCallback(() => {
    if ((windowIsMobile && isChannelsListOpen) || (windowIsMobile && isMembersListOpen)) {
      setIsChannelsListOpen(false);
      setIsMembersListOpen(false);
    }
  }, [isChannelsListOpen, isMembersListOpen, windowIsMobile, setIsMembersListOpen, setIsChannelsListOpen]);

  return (
    <TextChannelWrapper
      className="text-channel_wrapper"
      mobile={{
        '@initial': false,
        '@small': true
      }}
      channelsListOpen={isChannelsListOpen}
      threadsPanelOpen={isThreadsPanelOpen}
      onClick={hideContextMenu}
    >
      <TextChannelHeader />
      <TextChannelInnerWrapper
        className="text-channel_inner_wrapper"
        mobile={{
          '@initial': false,
          '@small': true
        }}
      >
        <MessageContainer onBackdropClick={hideSidebar} />
        <MembersList />
      </TextChannelInnerWrapper>
    </TextChannelWrapper>
  );
};

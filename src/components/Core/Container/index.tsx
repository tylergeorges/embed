import { useStoreActions, useStoreState } from '@state';
import { useMediaQuery, useAppRouter } from '@lib/hooks';
import { MembersList } from '@components/Sidebar/MembersList';
import { useCallback, useEffect } from 'react';

import { Channel } from '@graphql/graphql';
import { TextChannelInnerWrapper, TextChannelWrapper } from './elements';
import { TextChannelHeader } from './TextChannelHeader';
import { MessageContainer } from './MessageContainer';

export const Container = () => {
  // Used to check if the screen size is mobile because if it is then the sidebars
  // hover over the text channel and we want to be able to close them by clicking on
  // the text channel.
  const windowIsMobile = useMediaQuery('screen and (max-width: 768px)');
  const { threadId, channelId } = useAppRouter();

  // boolean check for sidebar lists
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  const isChannelsListOpen = useStoreState(state => state.ui.isChannelsListOpen);
  const isThreadsPanelOpen = useStoreState(state => state.ui.isThreadsPanelOpen);
  const isCurrentChannelThread = useStoreState(state => state.ui.isCurrentChannelThread);

  const guildChannels = useStoreState(state => state.guild.guildChannels);

  // actions to set sidebar lists state
  const setIsChannelsListOpen = useStoreActions(state => state.ui.setIsChannelsListOpen);
  const setIsMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);
  const setCurrentChannel = useStoreActions(state => state.guild.setCurrentChannel);
  const setCurrentThread = useStoreActions(state => state.guild.setCurrentThread);

  useEffect(() => {
    setCurrentChannel(channelId);

    if (isCurrentChannelThread && threadId) {
      // @ts-ignore
      const thread = guildChannels[channelId].threads.find(th => th.id === threadId) as Channel;
      setCurrentThread(thread);
    }

    if (!isThreadsPanelOpen) {
      setIsMembersListOpen(!windowIsMobile);
    }
  }, [
    windowIsMobile,
    setIsMembersListOpen,
    isThreadsPanelOpen,
    setCurrentChannel,
    threadId,
    channelId,
    isCurrentChannelThread,
    setCurrentThread,
    guildChannels
  ]);

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

  return (
    <TextChannelWrapper
      className="text-channel_wrapper"
      mobile={{
        '@initial': false,
        '@small': true
      }}
      channelsListOpen={isChannelsListOpen}
      threadsPanelOpen={isThreadsPanelOpen}
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

import { useStoreActions, useStoreState } from '@state';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { useAppRouter } from '@hooks/useAppRouter';
import { MembersSidebar } from '@components/Sidebar/MembersSidebar';
import { useCallback, useEffect } from 'react';

import { Backdrop } from '@components/Overlays/Modal/styles';
import { TextChannelHeader } from '@components/Header/TextChannelHeader';
import { useIsModalOpen } from '@hooks/useIsModalOpen';
import * as Styles from './styles';
import { MessageContainer } from './MessageContainer';

export const TextChannelContainer = () => {
  const windowIsMobile = useMediaQuery('screen and (max-width: 768px)');
  const { channelId } = useAppRouter();

  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  const isChannelsListOpen = useStoreState(state => state.ui.isChannelsListOpen);
  const isThreadsPanelOpen = useIsModalOpen('thread-panel');

  const setIsMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);
  const setIsChannelsListOpen = useStoreActions(state => state.ui.setIsChannelsListOpen);

  const setCurrentChannel = useStoreActions(state => state.guild.setCurrentChannel);

  useEffect(() => {
    setCurrentChannel(channelId);

    // Used to hide members list if the threads panel is open
    if (!isThreadsPanelOpen) {
      setIsMembersListOpen(!windowIsMobile);
    }
  }, [windowIsMobile, setIsMembersListOpen, isThreadsPanelOpen, setCurrentChannel, channelId]);

  const hideSidebar = useCallback(() => {
    if ((windowIsMobile && isChannelsListOpen) || (windowIsMobile && isMembersListOpen)) {
      setIsMembersListOpen(false);
      setIsChannelsListOpen(false);
    }
  }, [
    isChannelsListOpen,
    isMembersListOpen,
    windowIsMobile,
    setIsMembersListOpen,
    setIsChannelsListOpen
  ]);

  return (
    <Styles.TextChannelWrapper
      mobile={{
        '@initial': false,
        '@small': true
      }}
      channelsListOpen={isChannelsListOpen}
      threadsPanelOpen={isThreadsPanelOpen}
    >
      <TextChannelHeader />
      <Styles.TextChannelInnerWrapper>
        <MessageContainer />

        <Backdrop
          onClick={hideSidebar}
          mobile={{
            '@initial': false,
            '@small': true
          }}
          isMembersListOpen={isMembersListOpen}
          isOpen={!isChannelsListOpen && isMembersListOpen && windowIsMobile}
        />

        <MembersSidebar />
      </Styles.TextChannelInnerWrapper>
    </Styles.TextChannelWrapper>
  );
};

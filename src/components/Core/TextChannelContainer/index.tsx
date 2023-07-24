import { useStoreActions, useStoreState } from '@state';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { useAppRouter } from '@hooks/useAppRouter';
import { MembersSidebar } from '@components/Sidebar/MembersSidebar';
import { useCallback, useEffect } from 'react';

import { Backdrop } from '@components/Overlays/Modal/styles';
import * as Styles from './styles';
import { MessageContainer } from './MessageContainer';
import { TextChannelHeader } from './TextChannelHeader';

export const TextChannelContainer = () => {
  const windowIsMobile = useMediaQuery('screen and (max-width: 768px)');
  const { channelId } = useAppRouter();

  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  const isChannelsListOpen = useStoreState(state => state.ui.isChannelsListOpen);
  const isTransitionedThreadsPanelOpen = useStoreState(
    state => state.ui.isTransitionedThreadsPanelOpen
  );

  const setIsChannelsListOpen = useStoreActions(state => state.ui.setIsChannelsListOpen);
  const setIsMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);
  const setCurrentChannel = useStoreActions(state => state.guild.setCurrentChannel);

  useEffect(() => {
    setCurrentChannel(channelId);

    // Used to hide members list if the threads panel is open
    if (!isTransitionedThreadsPanelOpen) {
      setIsMembersListOpen(!windowIsMobile);
    }
  }, [
    windowIsMobile,
    setIsMembersListOpen,
    isTransitionedThreadsPanelOpen,
    setCurrentChannel,
    channelId
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
    <Styles.TextChannelWrapper
      mobile={{
        '@initial': false,
        '@small': true
      }}
      channelsListOpen={isChannelsListOpen}
      threadsPanelOpen={isTransitionedThreadsPanelOpen}
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

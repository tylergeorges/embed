import { useStoreActions, useStoreState } from '@state';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { useAppRouter } from '@hooks/useAppRouter';
import { MembersSidebar } from '@components/Sidebar/MembersSidebar';
import { useCallback, useEffect } from 'react';

import { Backdrop } from '@components/Overlays/Modal/styles';
import * as Styles from './styles';
import { TextChannelHeader } from './TextChannelHeader';
import { MessageContainer } from './MessageContainer';

export const TextChannelContainer = () => {
  const windowIsMobile = useMediaQuery('screen and (max-width: 768px)');
  const { channelId } = useAppRouter();

  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  const isChannelsListOpen = useStoreState(state => state.ui.isChannelsListOpen);
  const isThreadsPanelOpen = useStoreState(state => state.ui.isThreadsPanelOpen);

  const setIsChannelsListOpen = useStoreActions(state => state.ui.setIsChannelsListOpen);
  const setIsMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);
  const setCurrentChannel = useStoreActions(state => state.guild.setCurrentChannel);

  useEffect(() => {
    setCurrentChannel(channelId);

    // Used to hide mmbers list if the threads panel is open
    if (!isThreadsPanelOpen) {
      setIsMembersListOpen(!windowIsMobile);
    }
  }, [windowIsMobile, setIsMembersListOpen, isThreadsPanelOpen, setCurrentChannel, channelId]);

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
      threadsPanelOpen={isThreadsPanelOpen}
    >
      <TextChannelHeader />
      <Styles.TextChannelInnerWrapper
        mobile={{
          '@initial': false,
          '@small': true
        }}
      >
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

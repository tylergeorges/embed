import { useStoreActions, useStoreState } from '@state';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { MembersSidebar } from '@components/Sidebar/MembersSidebar';
import { useCallback } from 'react';

import { Backdrop } from '@components/Overlays/Modal/styles';
import * as Styles from './styles';
import { TextChannelHeader } from './TextChannelHeader';
import { MessageContainer } from './MessageContainer';

const TextChannelContainer = () => {
  const windowIsMobile = useMediaQuery('screen and (max-width: 768px)');

  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  const isChannelsListOpen = useStoreState(state => state.ui.isChannelsListOpen);

  const isTransitionedThreadsPanelOpen = useStoreState(
    state => state.ui.isTransitionedThreadsPanelOpen
  );

  const setIsChannelsListOpen = useStoreActions(state => state.ui.setIsChannelsListOpen);

  const setIsMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);

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

TextChannelContainer.displayName = 'TextChannelContainer';
TextChannelContainer.whyDidYouRender = true;

export default TextChannelContainer;

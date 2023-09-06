import { useStoreActions, useStoreState } from '@state';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { useAppRouter } from '@hooks/useAppRouter';
import { useCallback, useEffect } from 'react';

import { Backdrop } from '@components/Overlays/Modal/styles';
import { TextChannelHeader } from '@components/Header/TextChannelHeader';
import * as Styles from './styles';
import { MessageContainer } from './MessageContainer';

export const TextChannelContainer = () => {
  const windowIsMobile = useMediaQuery('screen and (max-width: 768px)');
  const { channelId } = useAppRouter();

  const isChannelsListOpen = useStoreState(state => state.ui.isChannelsListOpen);
  const isTransitionedThreadsPanelOpen = useStoreState(
    state => state.ui.isTransitionedThreadsPanelOpen
  );

  const setIsChannelsListOpen = useStoreActions(state => state.ui.setIsChannelsListOpen);
  const setCurrentChannel = useStoreActions(state => state.guild.setCurrentChannel);

  useEffect(() => {
    setCurrentChannel(channelId);
  }, [windowIsMobile, isTransitionedThreadsPanelOpen, setCurrentChannel, channelId]);

  const hideSidebar = useCallback(() => {
    if (windowIsMobile && isChannelsListOpen) {
      setIsChannelsListOpen(false);
    }
  }, [isChannelsListOpen, windowIsMobile, setIsChannelsListOpen]);

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
          isOpen={!isChannelsListOpen && windowIsMobile}
        />
      </Styles.TextChannelInnerWrapper>
    </Styles.TextChannelWrapper>
  );
};

import * as Styles from '@components/Sidebar/styles';
import { MessageContainer } from '@components/Core/TextChannelContainer/MessageContainer';
import { ThreadPanelHeader } from '@components/Header/ThreadPanelHeader';

import { useStoreActions, useStoreState } from '@state';
import { useCallback, useEffect } from 'react';
import { useAppRouter } from '@hooks/useAppRouter';

// TODO: Make a ModalProvider component system to prevent having to do this for every modal
export const ThreadPanel = () => {
  const { channelId, guildId, router } = useAppRouter();

  const setIsDomThreadsPanelOpen = useStoreActions(state => state.ui.setIsDomThreadsPanelOpen);

  const setIsTransitionedThreadsPanelOpen = useStoreActions(
    state => state.ui.setIsTransitionedThreadsPanelOpen
  );

  const isTransitionedThreadsPanelOpen = useStoreState(
    state => state.ui.isTransitionedThreadsPanelOpen
  );
  const isDomThreadsPanelOpen = useStoreState(state => state.ui.isDomThreadsPanelOpen);

  useEffect(() => {
    // We set this to true after element is in DOM so the transition is shown
    if (isDomThreadsPanelOpen) {
      setIsTransitionedThreadsPanelOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDomThreadsPanelOpen]);

  // Remove panel entirely from DOM after it's been transitioned off screen
  const closePanel = () => {
    if (isTransitionedThreadsPanelOpen) return;

    setIsDomThreadsPanelOpen(false);
    router.push(`/channels/${guildId}/${channelId}`);
  };

  // Transition panel off page but not DOM
  const startPanelHideTransition = useCallback(() => {
    setIsTransitionedThreadsPanelOpen(false);
  }, [setIsTransitionedThreadsPanelOpen]);

  return (
    <Styles.ThreadPanelWrapper
      mobile={{
        '@initial': false,
        '@small': true
      }}
      onTransitionEnd={closePanel}
      isOpen={isTransitionedThreadsPanelOpen}
    >
      <Styles.ThreadsPanelSeperator
        mobile={{
          '@initial': false,
          '@small': true
        }}
        isOpen={isTransitionedThreadsPanelOpen}
      />

      <Styles.ThreadsPanelContainer>
        <ThreadPanelHeader startPanelHideTransition={startPanelHideTransition} />

        <MessageContainer channelIsThread />
      </Styles.ThreadsPanelContainer>
    </Styles.ThreadPanelWrapper>
  );
};

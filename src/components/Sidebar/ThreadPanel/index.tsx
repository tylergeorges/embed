import * as Styles from '@components/Sidebar/styles';

import { useStoreActions, useStoreState } from '@state';
import { useCallback, useEffect, useRef } from 'react';
import { useAppRouter } from '@hooks/useAppRouter';
import { ThreadChannelContainer } from '@components/Core/TextChannelContainer/ThreadChannelContainer';

// TODO: Make a ModalProvider component system to prevent having to do this for every modal
export const ThreadPanel = () => {
  const { channelId, guildId, router } = useAppRouter();
  const threadPanelRef = useRef<HTMLDivElement>(null);
  const removeFromDOMTimeout = useRef<NodeJS.Timeout>();
  const transitionDuration = useRef(0);

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
    if (isDomThreadsPanelOpen && !isTransitionedThreadsPanelOpen) {
      setIsTransitionedThreadsPanelOpen(true);
    }

    if (threadPanelRef.current && transitionDuration.current === 0) {
      const durationString = getComputedStyle(threadPanelRef.current).transitionDuration;

      const duration = Number(durationString.split('s')[0][2]) * 100;
      transitionDuration.current = duration;
    }

    return () => {
      if (removeFromDOMTimeout.current) {
        clearTimeout(removeFromDOMTimeout.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Remove panel entirely from DOM after it's been transitioned off screen

  const startPanelHideTransition = useCallback(() => {
    setIsTransitionedThreadsPanelOpen(false);

    router.push(`/channels/${guildId}/${channelId}`);

    removeFromDOMTimeout.current = setTimeout(() => {
      setIsDomThreadsPanelOpen(false);
    }, transitionDuration.current);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Styles.ThreadPanelWrapper
      mobile={{
        '@initial': false,
        '@small': true
      }}
      isOpen={isTransitionedThreadsPanelOpen}
      ref={threadPanelRef}
    >
      <Styles.ThreadsPanelSeperator
        mobile={{
          '@initial': false,
          '@small': true
        }}
        isOpen={isTransitionedThreadsPanelOpen}
      />

      <ThreadChannelContainer startPanelHideTransition={startPanelHideTransition} />
    </Styles.ThreadPanelWrapper>
  );
};

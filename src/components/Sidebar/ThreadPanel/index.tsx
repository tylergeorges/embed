import * as Styles from '@components/Sidebar/styles';

import { useAppRouter } from '@hooks/useAppRouter';
import { MessageContainer } from '@components/Core/TextChannelContainer/MessageContainer';
import { ThreadPanelHeader } from '@components/Header/ThreadPanelHeader';
import { useModal } from '@hooks/useModal';

export const ThreadPanel = () => {
  const { guildId, channelId, router } = useAppRouter();
  const { waitForElementRef, closeModal, isOpen, removeAfterTransitionEnd } = useModal({
    modalId: 'thread-panel'
  });
  // Remove panel entirely from DOM after it's been transitioned off screen
  const closePanel = () => {
    closeModal();
    router.push(`/channels/${guildId}/${channelId}`);
  };

  return (
    <Styles.ThreadPanelWrapper
      mobile={{
        '@initial': false,
        '@small': true
      }}
      onTransitionEnd={removeAfterTransitionEnd}
      ref={waitForElementRef}
      isOpen={isOpen}
    >
      <Styles.ThreadsPanelSeperator
        mobile={{
          '@initial': false,
          '@small': true
        }}
        isOpen={isOpen}
      />

      <Styles.ThreadsPanelContainer>
        <ThreadPanelHeader handleClose={closePanel} />

        <MessageContainer channelIsThread />
      </Styles.ThreadsPanelContainer>
    </Styles.ThreadPanelWrapper>
  );
};

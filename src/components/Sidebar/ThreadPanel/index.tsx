import * as Styles from '@components/Sidebar/styles';
import { MessageContainer } from '@components/Core/TextChannelContainer/MessageContainer';
import { ThreadPanelHeader } from '@components/Header/ThreadPanelHeader';

import { useAppRouter } from '@hooks/useAppRouter';

interface ThreadPanelProps {
  isOpen: boolean;
  hideModal: () => void;
}

export const ThreadPanel = ({ isOpen, hideModal }: ThreadPanelProps) => {
  const { guildId, channelId, router } = useAppRouter();

  // Remove panel entirely from DOM after it's been transitioned off screen
  const closePanel = () => {
    hideModal();
    router.push(`/channels/${guildId}/${channelId}`);
  };

  return (
    <Styles.ThreadPanelWrapper
      mobile={{
        '@initial': false,
        '@small': true
      }}
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

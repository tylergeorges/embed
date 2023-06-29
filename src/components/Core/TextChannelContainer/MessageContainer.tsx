import { TextBox } from '@components/Core/TextChannelContainer/TextBox';

import { useStoreState } from '@state';
import { useState } from 'react';
import { MessageRenderer } from '@components/Core/VirtualLists/MessageRenderer';
import { useMessages } from '@hooks/useMessages';
import { useAppRouter } from '@lib/hooks';
import * as Styles from './styles';

interface MessageContainerProps {
  /** Used if the device is mobile and the backdrop over the container is shown. */
  onBackdropClick?: () => void;
}

export const MessageContainer = ({ onBackdropClick }: MessageContainerProps) => {
  const [isListRendered, setIsListRendered] = useState(false);

  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  const { channelId, guildId, threadId } = useAppRouter();

  const { groupedMessages, loadMoreMessages, isReady, firstItemIndex } = useMessages({
    guild: guildId,
    channel: channelId,
    thread: threadId
  });

  const handleBottomStateChanged = () => {
    if (!isListRendered) {
      setIsListRendered(true);
    }
  };

  return (
    <Styles.MessageWrapper
      draggable={false}
      membersListOpen={isMembersListOpen}
      onClick={onBackdropClick}
      mobile={{
        '@initial': false,
        '@small': true
      }}
    >
      <MessageRenderer
        groupedMessages={groupedMessages}
        startReached={loadMoreMessages}
        isReady={isReady}
        firstItemIndex={firstItemIndex}
        handleBottomStateChanged={handleBottomStateChanged}
      />

      <TextBox />
    </Styles.MessageWrapper>
  );
};

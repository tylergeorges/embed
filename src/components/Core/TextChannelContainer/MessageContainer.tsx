import { TextBox } from '@components/Core/TextChannelContainer/TextBox';

import { useStoreState } from '@state';
import { useState } from 'react';
import { MessageRenderer } from '@components/Core/VirtualLists/MessageRenderer';
import { useMessages } from '@hooks/useMessages';
import { useAppRouter } from '@hooks/useAppRouter';
import * as Styles from './styles';

interface MessageContainerProps {
  channelIsThread?: boolean;
}

export const MessageContainer = ({ channelIsThread }: MessageContainerProps) => {
  const [isListRendered, setIsListRendered] = useState(false);

  const { channelId, guildId } = useAppRouter();
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);

  const { groupedMessages, loadMoreMessages, isReady, firstItemIndex } = useMessages({
    guild: guildId,
    channel: channelId,
    thread: ''
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

      <TextBox channelIsThread={channelIsThread} />
    </Styles.MessageWrapper>
  );
};

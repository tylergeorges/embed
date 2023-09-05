import { TextBox } from '@components/Core/TextChannelContainer/TextBox';

import { useCallback, useState } from 'react';
import { MessageRenderer } from '@components/Core/VirtualLists/MessageRenderer';
import { useAppRouter } from '@hooks/useAppRouter';
import { useMessages } from '@hooks/useMessages';
import { useMessageSubscription } from '@hooks/useMessageSubscription';
import * as Styles from './styles';

interface MessageContainerProps {
  channelIsThread?: boolean;
}

export const MessageContainer = ({ channelIsThread }: MessageContainerProps) => {
  const [isListRendered, setIsListRendered] = useState(false);
  const { channelId: channel, guildId: guild, threadId } = useAppRouter();

  const { groupedMessages, loadMoreMessages, isReady, firstItemIndex, updateQuery } = useMessages({
    guild,
    channel,
    threadId: channelIsThread ? threadId : undefined
  });

  useMessageSubscription({
    guild,
    channel,
    threadId: channelIsThread ? threadId : undefined,
    updateQuery
  });

  const handleBottomStateChanged = useCallback(() => {
    if (!isListRendered) {
      setIsListRendered(true);
    }
  }, [isListRendered]);

  return (
    <Styles.MessageWrapper
      draggable={false}
      mobile={{
        '@initial': false,
        '@small': true
      }}
    >
      <MessageRenderer
        startReached={loadMoreMessages}
        messages={groupedMessages}
        isReady={isReady}
        firstItemIndex={firstItemIndex}
        handleBottomStateChanged={handleBottomStateChanged}
      />

      <TextBox channelIsThread={channelIsThread} />
    </Styles.MessageWrapper>
  );
};

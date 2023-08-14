import { TextBox } from '@components/Core/TextChannelContainer/TextBox';
import { useStoreState } from '@state';
import { useCallback, useState } from 'react';
import { MessagesListRenderer } from '@components/Core/VirtualLists/MessagesListRenderer';
import { useAppRouter } from '@hooks/useAppRouter';
import { useMessages } from '@hooks/useMessages';
import { useMessageSubscription } from '@hooks/useMessageSubscription';
import { StateMessages } from 'types/messages.types';
import { MessageRenderer } from '@components/Providers/MessageRenderer';
import * as Styles from './styles';

interface MessageContainerProps {
  channelIsThread?: boolean;
}

export const MessageContainer = ({ channelIsThread }: MessageContainerProps) => {
  const [isListRendered, setIsListRendered] = useState(false);
  const { channelId: channel, guildId: guild, threadId } = useAppRouter();
  const [messages, setMessages] = useState<StateMessages[]>([]);

  const { groupedMessages, loadMoreMessages, isReady, firstItemIndex } = useMessages({
    guild,
    channel,
    messages,
    setMessages,
    threadId: channelIsThread ? threadId : undefined
  });

  useMessageSubscription({
    messages,
    guild,
    channel,
    setMessages,
    threadId: channelIsThread ? threadId : undefined
  });

  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);

  const handleBottomStateChanged = useCallback(() => {
    if (!isListRendered) {
      setIsListRendered(true);
    }
  }, [isListRendered]);

  return (
    <MessageRenderer>
      <Styles.MessageWrapper
        draggable={false}
        membersListOpen={isMembersListOpen}
        mobile={{
          '@initial': false,
          '@small': true
        }}
      >
        <MessagesListRenderer
          startReached={loadMoreMessages}
          messages={groupedMessages}
          isReady={isReady}
          firstItemIndex={firstItemIndex}
          handleBottomStateChanged={handleBottomStateChanged}
        />

        <TextBox />
      </Styles.MessageWrapper>
    </MessageRenderer>
  );
};

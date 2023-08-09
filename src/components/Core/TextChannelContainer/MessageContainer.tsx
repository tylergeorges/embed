import { TextBox } from '@components/Core/TextChannelContainer/TextBox';

import { useStoreState } from '@state';
import { useCallback, useRef, useState } from 'react';
import { MessageRenderer } from '@components/Core/VirtualLists/MessageRenderer';
import { useAppRouter } from '@hooks/useAppRouter';
import { useMessages } from '@hooks/useMessages';
import { useMessageSubscription } from '@hooks/useMessageSubscription';
import { StateMessages } from 'types/messages.types';
import { VirtuosoHandle } from 'react-virtuoso';
import * as Styles from './styles';

interface MessageContainerProps {
  channelIsThread?: boolean;
}

export const MessageContainer = ({ channelIsThread }: MessageContainerProps) => {
  const [isListRendered, setIsListRendered] = useState(false);
  const { channelId: channel, guildId: guild, threadId } = useAppRouter();
  const [messages, setMessages] = useState<StateMessages[]>([]);
  const listRef = useRef<VirtuosoHandle>(null);

  const { groupedMessages, loadMoreMessages, isReady, firstItemIndex } = useMessages({
    guild,
    channel,
    messages,
    setMessages,
    threadId: channelIsThread ? threadId : undefined
  });

  const scrollToBottom = useCallback(() => {
    listRef.current?.scrollTo({ top: 9999999999999 });
  }, []);

  useMessageSubscription({
    messages,
    guild,
    channel,
    setMessages,
    threadId: channelIsThread ? threadId : undefined,
    scrollToBottom
  });

  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);

  const handleBottomStateChanged = useCallback(() => {
    if (!isListRendered) {
      setIsListRendered(true);
    }
  }, [isListRendered]);

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
        startReached={loadMoreMessages}
        messages={groupedMessages}
        ref={listRef}
        isReady={isReady}
        firstItemIndex={firstItemIndex}
        handleBottomStateChanged={handleBottomStateChanged}
      />

      <TextBox />
    </Styles.MessageWrapper>
  );
};

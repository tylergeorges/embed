import { TextBox } from '@components/Core/TextChannelContainer/TextBox';

import { useStoreState } from '@state';
import { useCallback, useState } from 'react';
import { MessageRenderer } from '@components/Core/VirtualLists/MessageRenderer';
import { useAppRouter } from '@hooks/useAppRouter';
import { useMessages } from '@hooks/useMessages';
import { BaseMessageFragment } from '@graphql/graphql';
import { useThreadSubscription } from '@hooks/useThreadSubscription';
import * as Styles from '../styles';

export const ThreadMessageContainer = () => {
  const [isListRendered, setIsListRendered] = useState(false);

  const { channelId, guildId, threadId } = useAppRouter();
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  const [messages, setMessages] = useState<BaseMessageFragment[]>([]);

  const { groupedMessages, loadMoreMessages, isReady, firstItemIndex } = useMessages({
    guild: guildId,
    channel: channelId,
    threadId,
    messages,
    setMessages
  });

  useThreadSubscription({
    guild: guildId,
    channel: channelId,
    threadId,
    messages,
    setMessages
  });

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
        messages={groupedMessages}
        startReached={loadMoreMessages}
        isReady={isReady}
        firstItemIndex={firstItemIndex}
        handleBottomStateChanged={handleBottomStateChanged}
      />

      <TextBox channelIsThread />
    </Styles.MessageWrapper>
  );
};

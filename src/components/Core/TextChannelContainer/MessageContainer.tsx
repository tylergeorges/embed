import { TextBox } from '@components/Core/TextChannelContainer/TextBox';

import { useStoreState } from '@state';
import { useCallback, useState } from 'react';
import { MessageRenderer } from '@components/Core/VirtualLists/MessageRenderer';
import { useAppRouter } from '@hooks/useAppRouter';
import { useMessages } from '@hooks/useMessages';
import { BaseMessageFragment } from '@graphql/graphql';
import { useSub } from '@hooks/useSub';
import * as Styles from './styles';

export const MessageContainer = () => {
  const [isListRendered, setIsListRendered] = useState(false);
  const { channelId: channel, guildId: guild } = useAppRouter();
  const [messages, setMessages] = useState<BaseMessageFragment[]>([]);

  const { groupedMessages, loadMoreMessages, isReady, firstItemIndex } = useMessages({
    guild,
    channel,
    messages,
    setMessages,
    threadId: undefined
  });

  useSub({
    messages,
    guild,
    channel,
    setMessages
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
        isReady={isReady}
        firstItemIndex={firstItemIndex}
        handleBottomStateChanged={handleBottomStateChanged}
      />

      <TextBox />
    </Styles.MessageWrapper>
  );
};

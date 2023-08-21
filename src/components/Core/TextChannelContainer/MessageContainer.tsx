import { TextBox } from '@components/Core/TextChannelContainer/TextBox';
import { useStoreState } from '@state';
import { useCallback, useState } from 'react';
import { MessageListRenderer } from '@components/Core/VirtualLists/MessageListRenderer';
import { useAppRouter } from '@hooks/useAppRouter';
import { useMessages } from '@hooks/useMessages';
import { useMessageSubscription } from '@hooks/useMessageSubscription';
import { StateMessages } from 'types/messages.types';
import { MessagesQuery, client } from '@graphql/client';
import { moreMessagesQuery } from '@hooks/messagesQuery';
import * as Styles from './styles';

interface MessageContainerProps {
  channelIsThread?: boolean;
}

export const MessageContainer = ({ channelIsThread }: MessageContainerProps) => {
  const [messages, setMessages] = useState<StateMessages[]>([]);

  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);

  const canSend = useStoreState(state => state.guild.currentChannel)?.canSend;
  const user = useStoreState(state => state.user.data);

  const { channelId: channel, guildId: guild, threadId: thread } = useAppRouter();

  const threadId = channelIsThread ? thread : undefined;

  const { groupedMessages, isReady, firstItemIndex } = useMessages({
    guild,
    channel,
    messages,
    setMessages,
    threadId
  });

  useMessageSubscription({
    messages,
    guild,
    channel,
    setMessages,
    threadId
  });

  const fetchMore = useCallback(
    (before: string) => {
      if (!isReady) return;

      client
        .executeQuery<MessagesQuery>({
          query: moreMessagesQuery,
          variables: { channel, guild, before, thread: threadId },
          key: Number(before)
        })
        .then(res => {
          if (!res.data || !res.data.channelV2) return;

          const oldMessages = res.data.channelV2.messageBunch.messages;

          setMessages(recent => [...oldMessages, ...recent]);
        });
    },
    [channel, guild, isReady, threadId, setMessages]
  );

  const loadMoreMessages = useCallback(() => {
    fetchMore(messages[0].id);
  }, [fetchMore, messages]);

  return (
    <Styles.MessageWrapper
      draggable={false}
      membersListOpen={isMembersListOpen}
      mobile={{
        '@initial': false,
        '@small': true
      }}
    >
      <MessageListRenderer
        startReached={loadMoreMessages}
        messages={groupedMessages}
        isReady={isReady}
        firstItemIndex={firstItemIndex}
      />

      <TextBox channelIsThread={channelIsThread} canSend={!!canSend && !!user} />
    </Styles.MessageWrapper>
  );
};

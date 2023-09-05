import { useCallback, useMemo, useState } from 'react';
import { Message, MessagesQueryQuery } from '@graphql/graphql';
import { groupMessages } from '@util/groupMessages';
import { messagesQuery } from '@hooks/messagesQuery';
import { produce } from 'structurajs';
import { convertMessageToDiscord } from '@util/convertToDiscord/convertMessageToDiscord';
import { useQuery } from '@apollo/client';

interface UseMessagesProps {
  guild: string;
  channel: string;
  threadId?: string;
}

export const useMessages = ({ guild, channel, threadId }: UseMessagesProps) => {
  const [newMessageGroupLength] = useState(0);

  const {
    data,
    fetchMore: fetchHook,
    updateQuery,
    loading
  } = useQuery(messagesQuery, {
    variables: {
      guild,
      channel,
      threadId
    }
  });

  const isReady = data?.channel.id === channel && !loading;
  const messages = data?.channel?.messageBunch?.messages;

  const fetchMore = useCallback(
    (before: string) => {
      if (!isReady) return;

      fetchHook({
        query: messagesQuery,
        variables: { channel, guild, before, threadId },
        updateQuery: (prev, { fetchMoreResult }) => {
          const olderMessages = fetchMoreResult?.channel?.messageBunch.messages;

          return produce(prev, draft => {
            if (!draft || !draft.channel.messageBunch) return;

            draft.channel.messageBunch.messages = [
              ...olderMessages,
              ...draft.channel.messageBunch.messages
            ];
          }) as MessagesQueryQuery;
        }
      });
    },
    [channel, fetchHook, guild, isReady, threadId]
  );

  const loadMoreMessages = useCallback(() => {
    if (messages) {
      fetchMore(messages[0].id);
    }
  }, [fetchMore, messages]);

  const messageState = useMemo(() => {
    let firstItemIndex = 100_000;

    if (messages === undefined)
      return {
        groupedMessages: [],
        firstItemIndex
      };

    const grouped = groupMessages(messages.map(msg => convertMessageToDiscord(msg as Message)));

    firstItemIndex -= grouped.length - 1;

    return {
      groupedMessages: grouped,
      firstItemIndex
    };
  }, [messages]);

  return {
    ...messageState,
    fetchMore,
    newMessageGroupLength,
    loadMoreMessages,
    updateQuery
  };
};

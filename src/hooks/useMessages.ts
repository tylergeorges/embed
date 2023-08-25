/* eslint-disable no-underscore-dangle */
import { useCallback, useMemo, useState } from 'react';
import {
  // @ts-ignore
  BaseMessageFragment,
  Message,
  MessagesQueryQuery
} from '@graphql/graphql';
import { groupMessages } from '@util/groupMessages';
import { APIMessage } from 'discord-api-types/v10';
import { messagesQuery } from '@hooks/messagesQuery';
import { useQuery } from '@apollo/client';
import { produce } from 'structurajs';
import { convertMessageToDiscord } from '@util/convertToDiscord/convertMessageToDiscord';

type MessageState = {
  groupedMessages: APIMessage[][];
  firstItemIndex: number;
};

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

  const messages = data?.channel?.messageBunch?.messages as Message[];

  const fetchMore = useCallback(
    (before: string) => {
      if (!isReady) return;

      fetchHook({
        query: messagesQuery,
        variables: { channel, guild, before, threadId },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!('messageBunch' in fetchMoreResult.channel)) return prev;

          const olderMessages = fetchMoreResult?.channel?.messageBunch.messages as Message[];

          if (olderMessages.length === 0) {
            return prev;
          }

          return produce(prev, draft => {
            if (!('messageBunch' in draft.channel)) return draft;

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

  const messageState: MessageState = useMemo(() => {
    let firstItemIndex = 100_000;

    if (messages === undefined)
      return {
        groupedMessages: [],
        firstItemIndex
      };

    const grouped = groupMessages(
      messages.map(msg => convertMessageToDiscord(msg as BaseMessageFragment))
    );
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
    isReady,
    loadMoreMessages,
    updateQuery
  };
};

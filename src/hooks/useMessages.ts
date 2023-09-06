/* eslint-disable no-continue */
/* eslint-disable no-underscore-dangle */
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  // @ts-ignore
  BaseMessageFragment,
  Message,
  MessagesQueryQuery
} from '@graphql/graphql';
import { groupMessages } from '@util/groupMessages';
import { convertMessageToDiscord } from '@util/convertToDiscord/convertMessageToDiscord';
import { messagesQuery } from '@hooks/messagesQuery';
import { produce } from 'structurajs';
import { useStoreActions, useStoreState } from '@state';
import { useQuery } from '@apollo/client';

interface UseMessagesProps {
  guild: string;
  channel: string;
  threadId?: string;
}

export const useMessages = ({ guild, channel, threadId }: UseMessagesProps) => {
  const [newMessageGroupLength] = useState(0);

  const setPinnedMessages = useStoreActions(state => state.guild.setPinnedMessages);
  const statePinnedMessages = useStoreState(state => state.guild.pinnedMessages);

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

  const isReady = data?.channelV2.id === channel && !loading;

  const messages = data?.channelV2?.messageBunch?.messages as Message[];
  const pinnedMessages = data?.channelV2?.messageBunch?.pinnedMessages as Message[];

  useEffect(() => {
    // Check if pins are already set
    if (
      pinnedMessages &&
      (statePinnedMessages.length === 0 || statePinnedMessages[0].channel_id !== channel)
    ) {
      const convertedPinned = pinnedMessages.map(msg => convertMessageToDiscord(msg));
      setPinnedMessages(convertedPinned);
    }
  }, [pinnedMessages, setPinnedMessages, channel, statePinnedMessages]);

  const fetchMore = useCallback(
    (before: string) => {
      if (!isReady) return;

      fetchHook({
        query: messagesQuery,
        variables: { channel, guild, before, threadId },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult.channelV2?.messageBunch) return prev;

          const olderMessages = fetchMoreResult?.channelV2?.messageBunch.messages as Message[];

          if (olderMessages.length === 0) {
            return prev;
          }

          return produce(prev, draft => {
            if (!draft.channelV2?.messageBunch) return draft;

            draft.channelV2.messageBunch.messages = [
              ...olderMessages,
              ...draft.channelV2.messageBunch.messages
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

  // eslint-disable-next-line prefer-const
  const messageState = useMemo(() => {
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

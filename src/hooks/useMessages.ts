/* eslint-disable no-bitwise */
/* eslint-disable no-continue */
import { useQuery } from 'urql';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { MessagesQueryQueryVariables, BaseMessageFragment, Message } from '@graphql/graphql';
import { groupMessages } from '@util/groupMessages';
import { APIMessage } from 'discord-api-types/v10';
import { convertMessageToDiscord } from '@util/convertToDiscord/convertMessageToDiscord';
import { messagesQuery, moreMessagesQuery } from '@hooks/messagesQuery';
import { StateMessages } from 'types/messages.types';
import { MessagesQuery, client } from '@graphql/client';
import { getOptimisticIndex } from '@util/getOptimisticIndex';

type MessageState = {
  groupedMessages: APIMessage[][];
  firstItemIndex: number;
};

interface UseMessagesProps {
  guild: string;
  channel: string;
  messages: StateMessages[];
  setMessages: Dispatch<SetStateAction<StateMessages[]>>;
  threadId?: string;
}

export const useMessages = ({
  guild,
  channel,
  threadId,
  setMessages,
  messages
}: UseMessagesProps) => {
  const [variables, setVariables] = useState<MessagesQueryQueryVariables>({
    guild,
    channel,
    threadId
  });

  const [newMessageGroupLength, setNewMessageGroupLength] = useState(0);

  const [{ data }] = useQuery<MessagesQuery>({
    query: messagesQuery,
    variables: { guild, threadId, channel }
  });

  const isReady = (data && data.channelV2?.id === channel) || false;

  useEffect(() => {
    if (variables.channel !== channel || variables.threadId !== threadId) {
      setMessages([]);
      setVariables({ channel, threadId, guild });
    }

    const apiMsgs: Message[] = data?.channelV2?.messageBunch?.messages ?? [];

    const isReadyWithMessages =
      isReady && apiMsgs[apiMsgs.length - 1]?.id !== messages[messages.length - 1]?.id;

    const msgs = isReadyWithMessages ? apiMsgs : [];

    if (msgs.length) {
      if (isReadyWithMessages) {
        // @ts-expect-error
        setNewMessageGroupLength(groupMessages(msgs).length);

        if (messages.length === 0) {
          setMessages(msgs);
        } else if (messages.length) {
          const recentMessage = msgs[msgs.length - 1];

          const msgFlags = recentMessage.flags as number;

          if (!(msgFlags & (1 << 4))) {
            // trims spaces so Discord's normalization doesn't break it
            const optimisticIndex = getOptimisticIndex(messages, recentMessage);

            if (optimisticIndex > -1) {
              setMessages(prevMsgs => prevMsgs.filter((m, idx) => idx === optimisticIndex));
            }
          } else {
            // setMessages(prev => [...prev, recentMessage]);
          }
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isReady]);

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

  let messageState: MessageState;

  // eslint-disable-next-line prefer-const
  messageState = useMemo(() => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variables, messages]);

  return {
    ...messageState,
    loadMoreMessages,
    newMessageGroupLength,
    isReady
  };
};

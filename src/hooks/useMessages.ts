import { useQuery } from 'urql';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { MessagesQueryQueryVariables, BaseMessageFragment, Message } from '@graphql/graphql';
import { groupMessages } from '@util/groupMessages';
import { APIMessage } from 'discord-api-types/v10';
import { convertMessageToDiscord } from '@util/convertToDiscord/convertMessageToDiscord';
import { messagesQuery, moreMessagesQuery } from '@hooks/messagesQuery';
import { MessagesQuery, client } from '@graphql/client';
import { getOptimisticIndex } from '@util/getOptimisticIndex';

type MessageState = {
  firstItemIndex: number;
};

interface UseMessagesProps {
  guild: string;
  channel: string;
  groupedMessages: APIMessage[][];
  setGroupedMessages: Dispatch<SetStateAction<APIMessage[][]>>;
  addMessageToGroupCB: (msg: BaseMessageFragment) => void;
  threadId?: string;
}

export const useMessages = ({
  guild,
  channel,
  threadId,
  setGroupedMessages,
  groupedMessages,
  addMessageToGroupCB
}: UseMessagesProps) => {
  const [variables, setVariables] = useState<MessagesQueryQueryVariables>({
    guild,
    channel,
    threadId
  });

  const [newMessageGroupLength, setNewMessageGroupLength] = useState(0);

  const [{ data }, fetchHook] = useQuery<MessagesQuery>({
    query: messagesQuery,
    variables
  });

  const isReady = (data && data.channelV2?.id === channel) || false;

  useEffect(() => {
    if (variables.channel !== channel || variables.threadId !== threadId) {
      setVariables({ channel, threadId, guild });
      fetchHook({ requestPolicy: 'network-only' });
      setGroupedMessages([]);
    }

    const apiMsgs: Message[] = data?.channelV2?.messageBunch?.messages ?? [];

    const lastGroup = groupedMessages[groupedMessages.length - 1] ?? [];

    const lastGroupedMessage = lastGroup[lastGroup.length - 1];

    const isReadyWithMessages =
      isReady && apiMsgs[apiMsgs.length - 1]?.id !== lastGroupedMessage?.id;

    if (isReadyWithMessages) {
      if (groupedMessages.length === 0) {
        setGroupedMessages(
          groupMessages(apiMsgs.map(msg => convertMessageToDiscord(msg as BaseMessageFragment)))
        );

        setNewMessageGroupLength(groupedMessages.length);
      } else if (groupedMessages.length) {
        const recentMessage = apiMsgs[apiMsgs.length - 1];

        // Make sure we dont add message twice
        if (recentMessage && !lastGroup.find(m => m.id === recentMessage.id)) {
          const optimisticIndex = getOptimisticIndex(lastGroup, recentMessage);

          // Make sure optimistic message isnt in array
          if (optimisticIndex === -1) {
            addMessageToGroupCB(recentMessage);
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isReady, channel, threadId]);

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

          const oldMessages = groupMessages(
            res.data.channelV2.messageBunch.messages.map(m => convertMessageToDiscord(m))
          );

          setGroupedMessages(recent => [...oldMessages, ...recent]);
        });
    },
    [channel, guild, isReady, threadId, setGroupedMessages]
  );

  const loadMoreMessages = useCallback(() => {
    fetchMore(groupedMessages[0][0].id);
  }, [fetchMore, groupedMessages]);

  let messageState: MessageState;

  // eslint-disable-next-line prefer-const
  messageState = useMemo(() => {
    let firstItemIndex = 100_000;

    if (groupedMessages.length === 0)
      return {
        firstItemIndex
      };

    firstItemIndex -= groupedMessages.length - 1;

    return {
      firstItemIndex
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variables, groupedMessages]);

  return {
    ...messageState,
    groupedMessages,
    loadMoreMessages,
    newMessageGroupLength,
    isReady
  };
};

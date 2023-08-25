import { useQuery } from 'urql';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MessagesQueryQueryVariables, BaseMessageFragment, Message } from '@graphql/graphql';
import { groupMessages } from '@util/groupMessages';
import { convertMessageToDiscord } from '@util/convertToDiscord/convertMessageToDiscord';
import { messagesQuery, moreMessagesQuery } from '@hooks/messagesQuery';
import { ExpandedAPIMessage, MessagesQuery } from 'types/messages.types';

type MessageState = {
  firstItemIndex: number;
};

interface UseMessagesProps {
  guild: string;
  channel: string;
  groupedMessages: ExpandedAPIMessage[][];
  setGroupedMessages: Dispatch<SetStateAction<ExpandedAPIMessage[][]>>;
  threadId?: string;
}

const compareArr = (a: ExpandedAPIMessage[][], b: ExpandedAPIMessage[][]) =>
  JSON.stringify(a) === JSON.stringify(b);

const convertAndGroup = (msgs: Message[]) =>
  groupMessages(msgs.map(msg => convertMessageToDiscord(msg as BaseMessageFragment)));

export const useMessages = ({
  guild,
  channel,
  threadId,
  setGroupedMessages,
  groupedMessages
}: UseMessagesProps) => {
  const [variables, setVariables] = useState<MessagesQueryQueryVariables>({
    guild,
    channel,
    threadId
  });
  const [newMessageGroupLength, setNewMessageGroupLength] = useState(0);
  const [pauseMain, setPauseMain] = useState(false);

  const lastMessages = useRef<ExpandedAPIMessage[][]>([]);
  const fetching = useRef(false);

  // Intial message query
  const [{ data: rootQueryData }] = useQuery<MessagesQuery>({
    query: messagesQuery,
    variables: {
      guild,
      channel,
      threadId
    },

    // Dont re-fetch data after initial query
    pause: pauseMain
  });

  const [{ data: moreMessagesData }, fetchMoreMessages] = useQuery<MessagesQuery>({
    query: moreMessagesQuery,
    variables,
    pause: !pauseMain,
    requestPolicy: 'cache-and-network'
  });

  const messageData = pauseMain ? moreMessagesData : rootQueryData;

  const isReady = !!messageData;
  const messages = messageData?.channel?.messageBunch?.messages ?? [];

  console.log(messageData);
  useEffect(() => {
    if (variables.channel !== channel || variables.threadId !== threadId) {
      setGroupedMessages([]);
      setVariables({ channel, threadId, guild });
    }

    if (isReady) {
      const convertedApiMessages = convertAndGroup(messages);

      // Prevent setting cached data
      const isSameArr = compareArr(convertedApiMessages, lastMessages.current);

      if (!isSameArr) {
        // Set initial message data
        if (groupedMessages.length === 0) {
          setGroupedMessages(convertedApiMessages);
          setNewMessageGroupLength(convertedApiMessages.length - 1);
          setPauseMain(true);
        }
        // This runs when more messages are fetched
        else {
          setGroupedMessages(prev => [...convertedApiMessages, ...prev]);
          setNewMessageGroupLength(convertedApiMessages.length - 1);
          fetching.current = false;
        }

        lastMessages.current = convertedApiMessages;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageData, isReady, moreMessagesData, pauseMain]);

  const fetchMore = useCallback(
    (before: string) => {
      if (fetching.current && moreMessagesData) return;

      setVariables({ channel, guild, before, threadId });
      fetchMoreMessages({ requestPolicy: 'cache-and-network' });

      fetching.current = true;
    },
    [channel, guild, threadId, fetchMoreMessages, fetching, moreMessagesData]
  );

  const loadMoreMessages = useCallback(() => {
    fetchMore(groupedMessages[0][0].id);
  }, [fetchMore, groupedMessages]);

  const messageState = useMemo(() => {
    let firstItemIndex = 100_000;

    if (groupedMessages === undefined)
      return {
        firstItemIndex
      };

    firstItemIndex -= groupedMessages.length - 1;

    return {
      firstItemIndex
    };
  }, [groupedMessages]) as MessageState;

  return {
    firstItemIndex: messageState.firstItemIndex,
    groupedMessages,
    loadMoreMessages,
    newMessageGroupLength,
    isReady
  };
};

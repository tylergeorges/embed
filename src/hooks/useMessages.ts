/* eslint-disable no-bitwise */
import { useQuery } from 'urql';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import {
  MessagesQueryQueryVariables,
  // @ts-ignore
  MessageFragmentFragment,
  BaseMessageFragment,
  Message
} from '@graphql/graphql';
import { groupMessages } from '@util/groupMessages';
import { APIMessage } from 'discord-api-types/v10';
import { convertMessageToDiscord } from '@util/convertMessageToDiscord';
import { messagesQuery } from '@hooks/messagesQuery';
import { StateMessages } from 'types/messages.types';
import { MessagesQuery } from '@graphql/client';
import { getOptimisticIndex } from '@util/getOptimisticIndex';

type MessageState = {
  messages: MessageFragmentFragment[];
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
          const recentMessage = apiMsgs[apiMsgs.length - 1];

          if (!(recentMessage.flags ?? 0 & (1 << 4))) {
            // trims spaces so Discord's normalization doesn't break it

            const optimisticIndex = getOptimisticIndex(messages, recentMessage);

            if (optimisticIndex > -1) {
              const updatedMessages = messages;
              updatedMessages.splice(optimisticIndex, 1, recentMessage);

              setMessages([...updatedMessages]);
            }
          } else {
            setMessages(prev => [...prev, recentMessage]);
          }
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isReady]);

  let messageState: MessageState;

  // @ts-ignore
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

    newMessageGroupLength,
    isReady
  };
};

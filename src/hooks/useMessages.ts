import { useQuery } from 'urql';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BaseMessageFragment,
  MessagesQueryQueryVariables,
  // @ts-ignore
  MessageFragmentFragment
} from '@graphql/graphql';
import { groupMessages } from '@util/groupMessages';
import { APIMessage } from 'discord-api-types/v10';
import { convertMessageToDiscord } from '@util/convertMessageToDiscord';
import { messagesQuery } from '@hooks/messagesQuery';

type MessageState = {
  messages: MessageFragmentFragment[];
  groupedMessages: APIMessage[][];
  firstItemIndex: number;
};

interface UseMessagesProps {
  guild: string;
  channel: string;
  thread?: string;
}

export const useMessages = ({
  guild,
  channel,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  thread
}: UseMessagesProps) => {
  const [variables, setVariables] = useState<MessagesQueryQueryVariables>({
    guild: '',
    channel: ''
  });

  const [messages, setMessages] = useState<BaseMessageFragment[]>([]);
  const [newMessageGroupLength, setNewMessageGroupLength] = useState(0);
  const [{ data }, fetchHook] = useQuery({
    query: messagesQuery,
    variables
  });

  const ready = data?.channelV2.id === channel;

  useEffect(() => {
    // @ts-ignore
    const isReadyWithMessages = ready && data?.channelV2.messageBunch?.messages;

    if (variables.channel !== channel) {
      setMessages([]);
    }

    if (variables.channel !== channel || variables.guild !== guild) {
      setVariables({ channel, guild });
    }
    // @ts-ignore TODO: Fix this

    // @ts-ignore
    const msgs = isReadyWithMessages ? data.channelV2?.messageBunch?.messages : [];
    if (msgs.length) {
      setNewMessageGroupLength(groupMessages(msgs).length);

      if (ready) {
        setMessages(prev => [...msgs, ...prev]);
      } else {
        setMessages([]);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, channel, guild, ready]);

  const fetchMore = useCallback(
    (before: string) => {
      if (!ready) return;

      setVariables({ channel, guild, before });

      fetchHook({ requestPolicy: 'network-only' });
    },
    [channel, fetchHook, guild, ready]
  );

  const loadMoreMessages = useCallback(() => {
    fetchMore(messages[0].id);
  }, [fetchMore, messages]);

  let messageState: MessageState;

  // @ts-ignore
  // eslint-disable-next-line prefer-const
  messageState = useMemo(() => {
    let firstItemIndex = 100_000;

    if (messages === undefined)
      return {
        messages: [],
        groupedMessages: [],
        firstItemIndex
      };

    const grouped = groupMessages(messages.map(convertMessageToDiscord));
    firstItemIndex -= grouped.length - 1;
    return {
      messages,
      groupedMessages: grouped,
      firstItemIndex
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return {
    ...messageState,
    fetchMore,
    newMessageGroupLength,
    isReady: ready,
    loadMoreMessages
  };
};

import { useQuery, useSubscription } from 'urql';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BaseMessageFragment,
  MessagesQueryQueryVariables,
  // @ts-ignore
  MessageFragmentFragment
} from '@graphql/graphql';
import { groupMessages } from '@util/groupMessages';
import { APIMessage } from 'discord-api-types/v10';
import { convertMessageToDiscord } from '@util/convertMessageToDiscord';
import {
  deletedMessageSubscription,
  messagesQuery,
  newMessageSubscription,
  updateMessageSubscription
} from '@hooks/messagesQuery';

type MessageState = {
  messages: MessageFragmentFragment[];
  groupedMessages: APIMessage[][];
  firstItemIndex: number;
};

interface UseMessagesProps {
  guild: string;
  channel: string;
  threadId?: string;
}

export const useMessages = ({
  guild,
  channel,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  threadId
}: UseMessagesProps) => {
  const currentChannelId = useRef('');

  // const beforeRef = useRef('');

  const [variables, setVariables] = useState<MessagesQueryQueryVariables>({
    guild,
    channel,
    threadId
  });

  const [messages, setMessages] = useState<BaseMessageFragment[]>([]);
  const [newMessageGroupLength, setNewMessageGroupLength] = useState(0);
  const isFetching = useRef(false);

  const [{ data }, fetchHook] = useQuery({
    query: messagesQuery,
    variables
  });
  const ready = data?.channelV2.id === channel;

  const handleNewMessage = (
    // eslint-disable-next-line @typescript-eslint/default-param-last, @typescript-eslint/no-unused-vars
    _: never[] | undefined = [],
    response: { message: BaseMessageFragment }
  ) => {
    // We check this so regular text channel messages dont get added to thread channels
    if (response.message.channelId === currentChannelId.current) {
      setMessages(prev => [...prev, response.message]);
    }
  };

  const handleUpdatedMessage = (
    // eslint-disable-next-line @typescript-eslint/default-param-last, @typescript-eslint/no-unused-vars
    _: never[] | undefined = [],
    response: { messageUpdate: { content: string; id: string } }
  ) => {
    console.log(response, _);
    const oldMessages = [...messages];
    const updatedMessage = response.messageUpdate;

    const messageIdx = oldMessages.findIndex(msg => msg.id === updatedMessage.id);

    // If -1 item doesnt exist in array
    if (messageIdx >= 0) {
      const messageToUpdate = oldMessages[messageIdx];
      console.log(messageIdx);

      messageToUpdate.content = updatedMessage.content;
      messageToUpdate.editedAt = new Date().toISOString();

      setMessages(oldMessages);
    }
  };

  const handleDeletedMessage = (
    // eslint-disable-next-line @typescript-eslint/default-param-last, @typescript-eslint/no-unused-vars
    _: never[] | undefined = [],
    response: { messageDelete: { id: string } }
  ) => {
    const messageId = response.messageDelete.id;

    setMessages(oldMsgs => oldMsgs.filter(msg => msg.id !== messageId));
  };

  useSubscription(
    {
      variables,
      query: newMessageSubscription
    },
    // @ts-ignore
    handleNewMessage
  );

  useSubscription(
    {
      variables,
      query: deletedMessageSubscription
    },
    // @ts-ignore
    handleDeletedMessage
  );

  useSubscription(
    {
      variables,
      query: updateMessageSubscription
    },
    // @ts-ignore
    handleUpdatedMessage
  );

  useEffect(() => {
    if (!currentChannelId.current) {
      currentChannelId.current = threadId ?? channel;
    }
    // @ts-ignore
    const isReadyWithMessages = ready && data?.channelV2.messageBunch?.messages;
    if (
      variables.channel !== channel ||
      variables.guild !== guild ||
      variables.threadId !== threadId
    ) {
      setVariables({ channel, guild, threadId });
    }

    // @ts-ignore TODO: Fix this

    // @ts-ignore
    const msgs = isReadyWithMessages ? data.channelV2?.messageBunch?.messages : [];

    if (msgs.length) {
      setNewMessageGroupLength(groupMessages(msgs).length);

      if (ready) {
        setMessages(prev => [...msgs, ...prev]);
        isFetching.current = false;
      }

      //     // messages = [...msgs, prev];
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, data]);

  const fetchMore = useCallback(
    (before: string) => {
      if (!ready) return;

      // if (before !== beforeRef) {
      setVariables({ threadId, guild, channel, before });

      if (!isFetching.current) {
        isFetching.current = true;
        console.log('fetching');
        fetchHook({ requestPolicy: 'network-only' });
      }
      // setMessages(prev => [...data.channelV2?.messageBunch?.messages, ...prev]);
      // }

      // setMessages(prev => [...prev, ...data.channelV2?.messageBunch?.messages]);
    },
    [channel, fetchHook, guild, threadId, ready]
  );

  const loadMoreMessages = useCallback(() => {
    const lastMsg = messages[messages.length - newMessageGroupLength]?.id;

    console.log('last ', lastMsg);

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
  }, [messages, variables]);

  return {
    ...messageState,
    fetchMore,
    newMessageGroupLength,
    isReady: ready,
    loadMoreMessages
  };
};

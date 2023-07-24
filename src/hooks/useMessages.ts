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

  /** Used for testing  */
  type?: string;
}

export const useMessages = ({
  guild,
  channel,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  threadId,
  type
}: UseMessagesProps) => {
  const currentChannelId = useRef('');

  const [variables, setVariables] = useState<MessagesQueryQueryVariables>({
    guild,
    channel,
    threadId
  });

  const [messages, setMessages] = useState<BaseMessageFragment[]>([]);
  const [newMessageGroupLength, setNewMessageGroupLength] = useState(0);
  // let messages = [];

  const [{ data }, fetchHook] = useQuery({
    query: messagesQuery,
    variables
  });

  useSubscription(
    {
      variables,
      query: newMessageSubscription
    },

    (prev, data) => {
      const message = data.message as BaseMessageFragment;
      console.log(message, threadId, currentChannelId.current, 'type ', type);

      if (message) {
        const messageChannelId = message.channelId;

        // We check this so regular text channel messages dont get added to thread channels
        if (threadId && messageChannelId === threadId) {
          // messages.push(message);
          setMessages(prev => [...prev, message]);
        } else if (!threadId && messageChannelId === channel) {
          setMessages(prev => [...prev, message]);
          // messages.push(message);
        }
      }

      return data;
    }
  );

  useSubscription(
    {
      variables,
      query: deletedMessageSubscription
    },
    (prev, data) => {
      const { messageDelete } = data;

      if (messageDelete) {
        const messageId = messageDelete.id;

        setMessages(oldMsgs => oldMsgs.filter(msg => msg.id !== messageId));

        // messages = messages.filter(msg => msg.id !== messageId);
      }

      return data;
    }
  );

  useSubscription(
    {
      variables,
      query: updateMessageSubscription
    },
    (prev, data) => {
      const updatedMessage = data.messageUpdate;

      if (updatedMessage && typeof updatedMessage.content === 'string') {
        const oldMessages = [...messages];

        const messageIdx = oldMessages.findIndex(msg => msg.id === updatedMessage.id);

        // If -1 item doesnt exist in array
        if (messageIdx >= 0) {
          const messageToUpdate = oldMessages[messageIdx];
          console.log(messageIdx);

          messageToUpdate.content = updatedMessage.content;
          messageToUpdate.editedAt = new Date().toISOString();

          setMessages(oldMessages);
          // messages = oldMessages;

          // Object.assign(messages, oldMessages);
        }
      }
      return data;
    }
  );

  const isReady = data?.channelV2.id === channel;

  // const apiMsgs = data?.channelV2?.messageBunch?.messages ?? [];

  // const isReadyWithMessages =
  //   isReady && apiMsgs[apiMsgs.length - 1]?.id !== messages[messages.length - 1]?.id;

  // messages = isReadyWithMessages ? data.channelV2?.messageBunch?.messages : [];
  useEffect(() => {
    // if (!isSubscribed.current) {
    //   isSubscribed.current = true;
    //   fetchHook();
    //   subToNewMsgs();
    //   subToUpdatedMsgs();
    //   subToDeletedMsgs();
    // }

    // if (!currentChannelId.current) {
    //   currentChannelId.current = threadId ?? channel;
    // }

    // if (data?.channelV2.id === channel) {
    //   setIsReady(true);
    // }
    if (
      variables.channel !== channel ||
      variables.guild !== guild ||
      variables.threadId !== threadId
    ) {
      setVariables({ channel, guild, threadId });
    }
    const apiMsgs = data?.channelV2?.messageBunch?.messages ?? [];
    // @ts-ignore
    const isReadyWithMessages =
      isReady && apiMsgs[apiMsgs.length - 1]?.id !== messages[messages.length - 1]?.id;
    // const isReadyWithMessages = isReady && data?.channelV2.messageBunch?.messages;

    if (variables.channel !== channel || variables.threadId !== threadId) {
      setMessages([]);
    }

    // @ts-ignore TODO: Fix this

    // @ts-ignore
    const msgs = isReadyWithMessages ? data.channelV2?.messageBunch?.messages : [];

    if (msgs.length) {
      if (isReadyWithMessages) {
        setNewMessageGroupLength(groupMessages(msgs).length);
        // TODO: find out why this causes so many renders
        setMessages(prev => [...msgs, ...prev]);

        console.log(msgs[msgs.length - 1], messages[messages.length - 1]);
        // isFetching.current = false;
      }

      //     // messages = [...msgs, prev];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isReady]);

  // useEffect(() => {
  //   const apiMsgs = data?.channelV2?.messageBunch?.messages ?? [];
  //   // @ts-ignore
  //   const isReadyWithMessages =
  //     isReady && apiMsgs[apiMsgs.length - 1]?.id !== messages[messages.length - 1]?.id;

  //   // @ts-ignore
  //   const msgs = isReadyWithMessages ? data.channelV2?.messageBunch?.messages : [];

  //   if (msgs.length) {
  //     if (isReadyWithMessages) {
  //       setNewMessageGroupLength(groupMessages(msgs).length);
  //       // TODO: find out why this causes so many renders
  //       setMessages(prev => [...msgs, ...prev]);

  //       console.log(msgs[msgs.length - 1], messages[messages.length - 1]);
  //       // isFetching.current = false;
  //     }

  //     //     // messages = [...msgs, prev];
  //   }
  // }, []);

  const fetchMore = useCallback(
    (before: string) => {
      if (!isReady) return;

      setVariables({ channel, guild, before, threadId });

      fetchHook({ requestPolicy: 'network-only' });
    },
    [channel, fetchHook, guild, isReady, threadId]
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
  }, [messages, variables]);

  return {
    ...messageState,
    fetchMore,
    newMessageGroupLength,
    isReady,
    loadMoreMessages
  };
};

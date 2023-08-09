import { useQuery } from 'urql';
import { Dispatch, SetStateAction, useCallback, useMemo, useRef, useState } from 'react';
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

export const useMessages = ({ guild, channel, threadId }: UseMessagesProps) => {
  const [variables, setVariables] = useState<MessagesQueryQueryVariables>({
    guild,
    channel,
    threadId
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [newMessageGroupLength, setNewMessageGroupLength] = useState(0);

  const [{ data }, fetchHook] = useQuery({
    query: messagesQuery,
    variables
  });
  const isReady = data?.channelV2.id === channel;

  // useEffect(() => {
  // if (variables.channel !== channel || variables.threadId !== threadId) {
  //   setMessages([]);
  //   setVariables({ channel, threadId, guild });
  // }

  const fetchedMoreData = useRef(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let messages: Message[] = [];

  // @ts-expect-error
  const apiMsgs: Message[] = data?.channelV2?.messageBunch?.messages ?? [];
  // @ts-ignore
  const isReadyWithMessages =
    isReady && apiMsgs[apiMsgs.length - 1]?.id !== messages[messages.length - 1]?.id;

  const msgs: Message[] = isReadyWithMessages ? apiMsgs : [];

  if (isReadyWithMessages) {
    if (!messages.length) {
      messages = msgs;
    } else if (msgs[0].id !== messages[0].id && fetchedMoreData.current) {
      messages.unshift(...msgs);
      fetchedMoreData.current = false;
    }
  }
  // console.log(data);

  // if (msgs.length) {
  //   if (isReadyWithMessages) {
  //     // setNewMessageGroupLength(groupMessages(msgs).length);

  //     if (messages.length === 0) {
  //       setMessages(prev => [...msgs, ...prev]);
  //     } else if (apiMsgs.length === messages.length + 1) {
  //       console.log(apiMsgs.length === messages.length + 1);
  //       const latestMsg = apiMsgs[messages.length];

  //       console.log('api set msgs');
  //       setMessages(prev => [...prev, latestMsg]);
  //       console.log('after mss', messages);
  //     }
  //   }
  // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data, isReady]);

  const fetchMore = useCallback(
    (before: string) => {
      if (!isReady) return;

      setVariables({ channel, guild, before, threadId });

      fetchHook({ requestPolicy: 'network-only' });
      fetchedMoreData.current = true;
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
    fetchMore,
    newMessageGroupLength,
    isReady,
    loadMoreMessages
  };
};

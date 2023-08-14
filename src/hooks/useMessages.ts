/* eslint-disable no-continue */
import { useQuery } from 'urql';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { MessagesQueryQueryVariables, BaseMessageFragment, Message } from '@graphql/graphql';
import { groupMessages } from '@util/groupMessages';
import { APIMessage } from 'discord-api-types/v10';
import { convertMessageToDiscord } from '@util/convertToDiscord/convertMessageToDiscord';
import { messagesQuery } from '@hooks/messagesQuery';
import { StateMessages } from 'types/messages.types';
import { useStoreActions } from '@state';

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
  const addMember = useStoreActions(state => state.guild.addMember);

  const [{ data }, fetchHook] = useQuery({
    query: messagesQuery,
    variables
  });

  const isReady = data?.channelV2.id === channel;

  const getMentionedMembers = (msgs: Message[]) => {
    for (const msg of msgs) {
      const { mentions } = msg;

      if (!mentions.length) continue;

      for (const member of mentions) {
        addMember(member);
      }
    }
  };

  useEffect(() => {
    if (variables.channel !== channel || variables.threadId !== threadId) {
      setMessages([]);
      setVariables({ channel, threadId, guild });
    }

    // @ts-expect-error
    const apiMsgs: Message[] = data?.channelV2?.messageBunch?.messages ?? [];
    const isReadyWithMessages =
      isReady && apiMsgs[apiMsgs.length - 1]?.id !== messages[messages.length - 1]?.id;

    // @ts-expect-error
    const msgs = isReadyWithMessages ? data.channelV2?.messageBunch?.messages : [];

    if (msgs.length) {
      if (isReadyWithMessages) {
        setNewMessageGroupLength(groupMessages(msgs).length);

        getMentionedMembers(msgs);
        setMessages(prev => [...msgs, ...prev]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isReady]);

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

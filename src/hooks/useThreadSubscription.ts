import { useSubscription } from 'urql';
import { BaseMessageFragment, UpdatedMessage } from '@graphql/graphql';

import {
  newThreadMessageSubscription,
  deletedThreadMessageSubscription,
  updateThreadMessageSubscription
} from '@hooks/messagesQuery';
import { Dispatch, SetStateAction } from 'react';

type StateMessages = BaseMessageFragment | UpdatedMessage;

interface UseThreadsSubArgs {
  guild: string;
  channel: string;
  messages: Array<StateMessages>;
  setMessages: Dispatch<SetStateAction<Array<StateMessages>>>;
  threadId?: string;
}

export const useThreadSubscription = ({
  messages,
  setMessages,
  threadId,
  channel,
  guild
}: UseThreadsSubArgs) => {
  useSubscription(
    {
      variables: { threadId, guild, channel },
      query: newThreadMessageSubscription
    },

    (prev, data) => {
      const message = data.messageV2 as BaseMessageFragment;

      if (message && message.channelId === threadId) {
        setMessages(prev => [...prev, message]);
      }

      return data;
    }
  );

  useSubscription(
    {
      variables: { threadId, guild, channel },
      query: deletedThreadMessageSubscription
    },
    (prev, data) => {
      const { messageDeleteV2 } = data;
      if (messageDeleteV2) {
        const messageId = messageDeleteV2.id;

        setMessages(oldMsgs => oldMsgs.filter(msg => msg.id !== messageId));
      }

      return data;
    }
  );

  useSubscription(
    {
      variables: { threadId, guild, channel },
      query: updateThreadMessageSubscription
    },
    (prev, data) => {
      const updatedMessage = data.messageUpdateV2 as UpdatedMessage;

      if (updatedMessage && typeof updatedMessage.content === 'string') {
        const oldMessages = [...messages];

        const messageIdx = oldMessages.findIndex(msg => msg.id === updatedMessage.id);

        if (messageIdx >= 0) {
          oldMessages[messageIdx] = updatedMessage;

          setMessages(oldMessages);
        }
      }
      return data;
    }
  );
};

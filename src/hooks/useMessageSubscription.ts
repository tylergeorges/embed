import { useSubscription } from 'urql';
import { Dispatch, SetStateAction } from 'react';
import { BaseMessageFragment, UpdatedMessage } from '@graphql/graphql';
import {
  deletedMessageSubscription,
  newMessageSubscription,
  updateMessageSubscription
} from '@hooks/messagesQuery';
import { StateMessages } from 'types/messages.types';

interface UseSubArgs {
  guild: string;
  channel: string;
  messages: StateMessages[];
  setMessages: Dispatch<SetStateAction<StateMessages[]>>;
  threadId?: string;
}

export const useMessageSubscription = ({
  messages,
  setMessages,
  channel,
  guild,
  threadId
}: UseSubArgs) => {
  useSubscription(
    {
      variables: { guild, channel, threadId },
      query: newMessageSubscription
    },

    (prev, data) => {
      const message = data.messageV2 as BaseMessageFragment;

      if (message) {
        setMessages(prev => [...prev, message]);
      }

      return data;
    }
  );

  useSubscription(
    {
      variables: { guild, channel, threadId },
      query: deletedMessageSubscription
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
      variables: { guild, channel, threadId },
      query: updateMessageSubscription
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

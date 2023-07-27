import { useSubscription } from 'urql';
import { Dispatch, SetStateAction } from 'react';
import { BaseMessageFragment, UpdatedMessage } from '@graphql/graphql';
import {
  deletedMessageSubscription,
  newMessageSubscription,
  updateMessageSubscription
} from '@hooks/messagesQuery';

type StateMessages = BaseMessageFragment | UpdatedMessage;

interface UseSubArgs {
  guild: string;
  channel: string;
  messages: Array<StateMessages>;
  setMessages: Dispatch<SetStateAction<Array<StateMessages>>>;
}

export const useMessageSubscription = ({ messages, setMessages, channel, guild }: UseSubArgs) => {
  useSubscription(
    {
      variables: { guild, channel },
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
      variables: { guild, channel },
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
      variables: { guild, channel },
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

import { useSubscription } from 'urql';
import { Dispatch, SetStateAction } from 'react';
import { BaseMessageFragment } from '@graphql/graphql';
import {
  deletedMessageSubscription,
  newMessageSubscription,
  updateMessageSubscription
} from '@hooks/messagesQuery';

interface UseSubArgs {
  guild: string;
  channel: string;
  messages: BaseMessageFragment[];
  setMessages: Dispatch<SetStateAction<BaseMessageFragment[]>>;
  threadId?: string;
}

export const useSub = ({ messages, setMessages, threadId, channel, guild }: UseSubArgs) => {
  useSubscription(
    {
      variables: { guild, channel, threadId },
      query: newMessageSubscription
    },

    (prev, data) => {
      const message = data.message as BaseMessageFragment;

      if (message) {
        setMessages(prev => [...prev, message]);
      }

      return data;
    }
  );

  useSubscription(
    {
      variables: { threadId, guild, channel },
      query: deletedMessageSubscription
    },
    (prev, data) => {
      const { messageDelete } = data;

      if (messageDelete) {
        const messageId = messageDelete.id;

        setMessages(oldMsgs => oldMsgs.filter(msg => msg.id !== messageId));
      }

      return data;
    }
  );

  useSubscription(
    {
      variables: { threadId, guild, channel },
      query: updateMessageSubscription
    },
    (prev, data) => {
      const updatedMessage = data.messageUpdate;

      if (updatedMessage && typeof updatedMessage.content === 'string') {
        const oldMessages = [...messages];

        const messageIdx = oldMessages.findIndex(msg => msg.id === updatedMessage.id);

        if (messageIdx >= 0) {
          const messageToUpdate = oldMessages[messageIdx];
          console.log(messageIdx);

          messageToUpdate.content = updatedMessage.content;
          messageToUpdate.editedAt = new Date().toISOString();

          setMessages(oldMessages);
        }
      }
      return data;
    }
  );
};

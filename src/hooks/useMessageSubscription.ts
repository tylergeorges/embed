/* eslint-disable no-bitwise */
import { useSubscription } from 'urql';
import { Dispatch, SetStateAction } from 'react';
import { Message, NewMessageSubscription, UpdatedMessage } from '@graphql/graphql';
import {
  deletedMessageSubscription,
  newMessageSubscription,
  updateMessageSubscription
} from '@hooks/messagesQuery';
import { StateMessages } from 'types/messages.types';
import { getOptimisticIndex } from '@util/getOptimisticIndex';

interface UseSubArgs {
  guild: string;
  channel: string;
  messages: StateMessages[];
  setMessages: Dispatch<SetStateAction<StateMessages[]>>;
  threadId?: string;
  // scrollToBottom: (index: number) => void;
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
      const newMessage = data.messageV2 as NewMessageSubscription & Message;

      if (newMessage && !messages.find(m => m.id === newMessage.id)) {
        const msgFlags = newMessage.flags as number;

        if (!(msgFlags & (1 << 4))) {
          const optimisticIndex = getOptimisticIndex(messages, newMessage);

          if (optimisticIndex > -1) {
            setMessages(prevMsgs => {
              prevMsgs.splice(optimisticIndex, 1, newMessage);

              return prevMsgs;
            });

            return data;
          }

          setMessages(msgs => [...msgs, newMessage]);
          return data;
        }

        setMessages(msgs => [...msgs, newMessage]);
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
        const oldMessages = messages;

        const messageIdx = messages.findIndex(msg => msg.id === updatedMessage.id);

        if (messageIdx >= 0) {
          oldMessages[messageIdx] = updatedMessage;

          setMessages(oldMessages);
        }
      }
      return data;
    }
  );
};

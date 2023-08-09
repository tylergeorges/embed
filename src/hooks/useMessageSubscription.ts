/* eslint-disable no-bitwise */
import { useSubscription } from 'urql';
import { Dispatch, SetStateAction } from 'react';
import { Message, UpdatedMessage } from '@graphql/graphql';
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
      const newMessage = data.messageV2 as Message;

      console.log(newMessage);
      if (newMessage && !messages.find(m => m.id === newMessage.id)) {
        // @ts-expect-error
        if (!(newMessage.flags & (1 << 4))) {
          // trims spaces so Discord's normalization doesn't break it
          const optimisticIndex = messages.findIndex(
            m =>
              // @ts-expect-error
              m.content.replace(/ /g, '') === newMessage.content.replace(/ /g, '') &&
              // @ts-expect-error
              m.flags & (1 << 4)
          );

          if (optimisticIndex > -1) {
            console.log('messages before adding ', messages, newMessage);
            const updatedMessages = [...messages];
            updatedMessages.splice(optimisticIndex, 1);
            updatedMessages.concat(newMessage);

            setMessages([...updatedMessages]);
            // setMessages(msgs => {
            //   msgs.splice(optimisticIndex, 1);
            //   msgs.concat(newMessage);

            //   return msgs;
            // });
            console.log('messages after adding ', messages, newMessage);

            // scrollToBottom(messages.length - 1);

            return data;
          }

          setMessages(msgs => [...msgs, newMessage]);
          // scrollToBottom(messages.length - 1);
        }
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

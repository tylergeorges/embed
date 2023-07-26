import { useSubscription } from 'urql';
import { BaseMessageFragment } from '@graphql/graphql';

import {
  newThreadMessageSubscription,
  deletedThreadMessageSubscription,
  updateThreadMessageSubscription
} from '@hooks/messagesQuery';
import { Dispatch, SetStateAction } from 'react';

interface UseThreadsSubArgs {
  guild: string;
  channel: string;
  messages: BaseMessageFragment[];
  setMessages: Dispatch<SetStateAction<BaseMessageFragment[]>>;
  threadId?: string;
}

export const useThreadsSub = ({
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
      const updatedMessage = data.messageUpdateV2;

      if (updatedMessage && typeof updatedMessage.content === 'string') {
        const oldMessages = [...messages];

        const messageIdx = oldMessages.findIndex(msg => msg.id === updatedMessage.id);

        // If -1 item doesnt exist in array
        if (messageIdx >= 0) {
          const messageToUpdate = oldMessages[messageIdx];

          messageToUpdate.content = updatedMessage.content;
          messageToUpdate.editedAt = new Date().toISOString();

          setMessages(oldMessages);
        }
      }
      return data;
    }
  );
};

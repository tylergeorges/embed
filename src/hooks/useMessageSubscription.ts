import { useSubscription } from 'urql';
import { Dispatch, SetStateAction } from 'react';
import {
  deletedMessageSubscription,
  newMessageSubscription,
  updateMessageSubscription
} from '@hooks/messagesQuery';
import { convertMessageToDiscord } from '@util/convertToDiscord/convertMessageToDiscord';
import { ExpandedAPIMessage } from 'types/messages.types';
import { addMessageToGroup } from '@util/groupMessages';
import { Message } from '@graphql/graphql';

interface UseSubArgs {
  guild: string;
  channel: string;
  setGroupedMessages: Dispatch<SetStateAction<ExpandedAPIMessage[][]>>;
  threadId?: string;
}

export const useMessageSubscription = ({
  channel,
  guild,
  threadId,
  setGroupedMessages
}: UseSubArgs) => {
  useSubscription(
    {
      variables: { guild, channel, threadId },
      query: newMessageSubscription
    },

    (prev, data) => {
      const newMessage = data.messageV2;

      const converted = convertMessageToDiscord(newMessage as Message);

      setGroupedMessages(prev => addMessageToGroup(prev, converted));

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

        setGroupedMessages(msgGroups =>
          msgGroups.map(group => group.filter(msg => msg.id !== messageId))
        );
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
      //
      // @ts-expect-error
      const updatedMessage = data.messageUpdateV2 as Message;

      if (updatedMessage) {
        setGroupedMessages(msgGroups =>
          msgGroups.map(group => {
            const oldMessageIdx = group.findIndex(msg => msg.id === updatedMessage.id);

            if (oldMessageIdx >= 0) {
              group[oldMessageIdx] = convertMessageToDiscord(updatedMessage);
            }

            return group;
          })
        );
      }
      return data;
    }
  );
};

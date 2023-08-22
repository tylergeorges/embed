/* eslint-disable no-bitwise */
import { useSubscription } from 'urql';
import { Dispatch, SetStateAction } from 'react';
import { BaseMessageFragment, Message, NewMessageSubscription } from '@graphql/graphql';
import {
  deletedMessageSubscription,
  newMessageSubscription,
  updateMessageSubscription
} from '@hooks/messagesQuery';
import { getOptimisticIndex } from '@util/getOptimisticIndex';
import { convertMessageToDiscord } from '@util/convertToDiscord/convertMessageToDiscord';
import { ExpandedAPIMessage } from 'types/messages.types';

interface UseSubArgs {
  guild: string;
  channel: string;
  groupedMessages: ExpandedAPIMessage[][];
  setGroupedMessages: Dispatch<SetStateAction<ExpandedAPIMessage[][]>>;
  addMessageToGroupCB: (msg: BaseMessageFragment) => void;
  threadId?: string;
  // scrollToBottom: (index: number) => void;
}

export const useMessageSubscription = ({
  channel,
  guild,
  threadId,
  addMessageToGroupCB,
  groupedMessages,
  setGroupedMessages
}: UseSubArgs) => {
  useSubscription(
    {
      variables: { guild, channel, threadId },
      query: newMessageSubscription
    },

    (prev, data) => {
      const newMessage = data.messageV2 as NewMessageSubscription & Message;

      const lastGroup = groupedMessages[groupedMessages.length - 1];

      const isMessageAdded = lastGroup.find(m => m.id === newMessage.id);

      if (!isMessageAdded) {
        const optimisticIndex = getOptimisticIndex(lastGroup, newMessage);

        if (optimisticIndex > -1) {
          return data;
        }

        addMessageToGroupCB(newMessage);
        return data;
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

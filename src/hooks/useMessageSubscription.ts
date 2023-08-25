/* eslint-disable no-underscore-dangle */
import { Message } from '@graphql/graphql';
import {
  deletedMessageSubscription,
  newMessageSubscription,
  updateMessageSubscription
} from '@hooks/messagesQuery';
import { MessagesQuery } from 'types/messages.types';
import { OperationVariables, useSubscription } from '@apollo/client';
import { WatchQueryOptions } from '@apollo/client/core/watchQueryOptions';
import { produce } from 'structurajs';

type UpdateQuery = <TVars extends OperationVariables = OperationVariables>(
  mapFn: (
    previousQueryResult: MessagesQuery,
    options: Pick<WatchQueryOptions<TVars, MessagesQuery>, 'variables'>
  ) => MessagesQuery
) => void;

interface UseSubArgs {
  guild: string;
  channel: string;
  updateQuery: UpdateQuery;
  threadId?: string;
}

export const useMessageSubscription = ({ channel, guild, threadId, updateQuery }: UseSubArgs) => {
  useSubscription(newMessageSubscription, {
    variables: { guild, channel, threadId },

    onSubscriptionData: ({ subscriptionData }) => {
      updateQuery(
        prev =>
          produce(prev, data => {
            const messages = data?.channelV2?.messageBunch.messages;

            if (!messages || !subscriptionData.data) {
              return;
            }

            const message = subscriptionData.data.messageV2 as Message;

            if (!messages.find(m => m.id === message.id)) messages.push(message);
          }) as MessagesQuery
      );
    }
  });

  useSubscription(deletedMessageSubscription, {
    variables: { guild, channel, threadId },

    onSubscriptionData: ({ subscriptionData }) => {
      updateQuery(
        prev =>
          produce(prev, data => {
            const messages = data?.channelV2?.messageBunch.messages;

            if (!messages || !subscriptionData.data) {
              return;
            }

            const deletedMessage = subscriptionData.data.messageDeleteV2 as Message;

            if (deletedMessage) {
              const messageId = deletedMessage.id;

              data.channelV2.messageBunch.messages = messages.filter(msg => msg.id !== messageId);
            }
          }) as MessagesQuery
      );
    }
  });

  useSubscription(updateMessageSubscription, {
    variables: { guild, channel, threadId },

    onSubscriptionData: ({ subscriptionData }) => {
      updateQuery(
        prev =>
          produce(prev, data => {
            const updatedMessage = subscriptionData?.data?.messageUpdateV2 as Message;

            if (updatedMessage) {
              const { messages } = data.channelV2.messageBunch;

              const messageIdx = data.channelV2.messageBunch.messages.findIndex(
                msg => msg.id === updatedMessage.id
              );

              if (messageIdx > -1) {
                delete updatedMessage.__typename;
                Object.assign(messages[messageIdx], updatedMessage);
              }
            }
          }) as MessagesQuery
      );
    }
  });
};

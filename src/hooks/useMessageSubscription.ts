/* eslint-disable no-underscore-dangle */
import { Exact, InputMaybe, Message, MessagesQueryQuery, UpdatedMessage } from '@graphql/graphql';
import {
  deletedMessageSubscription,
  messagesQuery,
  newMessageSubscription,
  updateMessageSubscription
} from '@hooks/messagesQuery';
import { useSubscription } from '@apollo/client';
import { WatchQueryOptions } from '@apollo/client/core/watchQueryOptions';
import { produce } from 'structurajs';

type UpdateQuery = (
  mapFn: (
    previousQueryResult: MessagesQueryQuery,
    options: Pick<
      WatchQueryOptions<
        Exact<{
          guild: string;
          channel: string;
          threadId?: InputMaybe<string> | undefined;
          before?: InputMaybe<string> | undefined;
        }>,
        MessagesQueryQuery
      >,
      'variables'
    >
  ) => MessagesQueryQuery
) => void;

interface UseSubArgs {
  guild: string;
  channel: string;
  updateQuery: UpdateQuery;
  scrollToBottom: ({ forceScroll }: { forceScroll?: boolean | undefined }) => void;
  threadId?: string;
}

export const useMessageSubscription = ({
  channel,
  guild,
  threadId,
  updateQuery,
  scrollToBottom
}: UseSubArgs) => {
  useSubscription(newMessageSubscription, {
    variables: { guild, channel, threadId },

    onSubscriptionData: ({ subscriptionData, client }) => {
      if (!subscriptionData.data) return;

      const message = subscriptionData.data.messageV2 as Message;

      const messagesCache = client.cache.readQuery({
        query: messagesQuery,
        variables: { guild, channel, threadId }
      })?.channel.messageBunch.messages;

      if (!subscriptionData.data) {
        return;
      }

      if (messagesCache?.find(m => m.id === message?.id)) return;
      updateQuery(
        prev =>
          produce(prev, data => {
            const messages = data.channel.messageBunch.messages as Message[];

            if (!messages || !subscriptionData.data) {
              return;
            }

            messages.push(message);
            scrollToBottom({});
          }) as MessagesQueryQuery
      );
    }
  });

  useSubscription(deletedMessageSubscription, {
    variables: { guild, channel, threadId },

    onSubscriptionData: ({ subscriptionData }) => {
      updateQuery(
        prev =>
          produce(prev, data => {
            const messages = data.channel?.messageBunch.messages;

            if (!messages || !subscriptionData.data) {
              return;
            }

            const deletedMessage = subscriptionData.data.messageDeleteV2;

            if (deletedMessage) {
              const messageId = deletedMessage.id;

              data.channel.messageBunch.messages = messages.filter(msg => msg.id !== messageId);
            }
          }) as MessagesQueryQuery
      );
    }
  });

  useSubscription(updateMessageSubscription, {
    variables: { guild, channel, threadId },

    onSubscriptionData: ({ subscriptionData }) => {
      updateQuery(
        prev =>
          produce(prev, data => {
            const updatedMessage = subscriptionData?.data
              ?.messageUpdateV2 as Partial<UpdatedMessage>;

            if (updatedMessage) {
              const messages = data.channel.messageBunch.messages as Message[];

              const messageIdx = messages.findIndex(msg => msg.id === updatedMessage.id);

              if (messageIdx > -1) {
                delete updatedMessage.__typename;

                Object.assign(messages[messageIdx], updatedMessage);
              }
            }
          }) as MessagesQueryQuery
      );
    }
  });
};

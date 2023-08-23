/* eslint-disable no-bitwise */
import { Client, fetchExchange, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { GRAPHQL_URL, WS_URL } from '@lib/api/url';
import { cacheExchange } from '@urql/exchange-graphcache';
import { Message, MessageType } from '@graphql/graphql';
import { generateSnowflake } from '@util/generateSnowflake';
import { store } from '@state/store';
import { messagesQuery } from '@hooks/messagesQuery';
import { getOptimisticIndex } from '@util/getOptimisticIndex';

export interface MessagesQuery {
  channelV2: {
    id: string;
    __typename: 'TextChannel';
    messageBunch: {
      __typename: 'MessageBunch';
      messages: Message[];
    };
  };
}

const subClient = new SubscriptionClient(WS_URL, {
  reconnect: true,
  timeout: 10000,
  reconnectionAttempts: 3
});

export const getToken = () => {
  try {
    return localStorage.getItem('token') ?? '';
  } catch (err) {
    console.error(err);
    return '';
  }
};

const cache = cacheExchange({
  updates: {
    Mutation: {
      sendMessage(_result, args, _cache) {
        const user = store.getState().user.data;
        const guild = store.getState().guild.data?.id as string;

        const newMessage = _result.sendMessage as Message;

        if (newMessage && user) {
          _cache
            .inspectFields('Query')
            .filter(field => field.fieldName === 'channelV2')
            .forEach(() => {
              _cache.updateQuery(
                {
                  query: messagesQuery,
                  variables: {
                    channel: args.channel as string,
                    guild,
                    threadId: args.threadId as string
                  }
                },

                (data: MessagesQuery | undefined | null) => {
                  if (!data) return;

                  const { messages } = data.channelV2.messageBunch;
                  const optimisticIndex = getOptimisticIndex(messages, newMessage);

                  if (optimisticIndex === -1) {
                    messages.push(newMessage);
                  }

                  return data;
                }
              );
            });
        }
      }
    }
  },

  optimistic: {
    sendMessage(args): (Message & { isOptimistic: true }) | {} {
      const user = store.getState().user.data;

      if (!user) return {};

      return {
        __typename: 'Message',
        id: generateSnowflake(),
        channelId: args.channel as string,
        content: args.content as string,
        type: MessageType.Default,
        createdAt: +new Date(),
        editedAt: null,
        isGuest: user.provider !== 'Guest',
        unread: true,
        flags: 1 << 4,
        author: {
          __typename: 'User',
          avatarUrl: user.avatarUrl,
          avatar: user.avatarUrl,
          bot: user.provider === 'Guest',

          color: 0,
          discrim: '0000',
          id: user.id,
          name: user.username,
          roles: [],
          system: false,
          isWebhook: true
        },
        reactions: [],
        attachments: [],
        stickers: [],
        messageReference: null,
        referencedMessage: null,
        embeds: [],
        mentions: [],
        interaction: null,
        thread: null
      };
    }
  }
});

export const client = new Client({
  url: GRAPHQL_URL,

  exchanges: [
    cache,

    fetchExchange,

    subscriptionExchange({
      forwardSubscription: request => subClient.request(request)
    })
  ],

  fetchOptions: () => {
    const token = getToken();

    return { headers: { Authorization: token } };
  }
});

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-bitwise */
import { Client, fetchExchange, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { GRAPHQL_URL, WS_URL } from '@lib/api/url';
import { cacheExchange } from '@urql/exchange-graphcache';
import { Message, MessageType } from '@graphql/graphql';
import { generateSnowflake } from '@util/generateSnowflake';
import { store } from '@state/store';
import { messagesQuery } from '@hooks/messagesQuery';

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

                  if (!messages.find(m => m.id === newMessage.id)) {
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
    sendMessage(args): Message | {} {
      const user = store.getState().user.data;

      if (!user) return {};

      return {
        __typename: 'Message',
        id: generateSnowflake(),
        channelId: args.channel as string,
        content: args.content as string,
        type: MessageType.Default,
        flags: 1 << 4, // reusing flag for optimistic messages
        createdAt: +new Date(),
        editedAt: null,
        isGuest: user.provider === 'Guest',
        unread: true,
        author: {
          __typename: 'User',
          avatarUrl: user.avatarUrl,
          avatar: user.avatarUrl,
          bot: true,
          color: 0,
          discrim: '0000',
          id: '_id' in user ? user._id : user.id,
          flags: null,
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

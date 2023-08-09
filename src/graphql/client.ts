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

interface MessagesQuery {
  channelV2?: {
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
  let token: string = '';

  try {
    token = localStorage.getItem('token') ?? '';
  } catch (err) {
    console.error(err);
  }

  return token;
};

const getState = () => store.getState();

const cache = cacheExchange({
  updates: {
    Mutation: {
      sendMessage(_result, args, _cache) {
        // if (!info.optimistic) return;

        const guild = getState().guild.data?.id as string;
        const newMessage = _result.sendMessage as Message;

        if (newMessage) {
          newMessage.isGuest = true;

          _cache
            .inspectFields('Query')
            .filter(field => field.fieldName === 'channelV2')
            .forEach(field => {
              _cache.updateQuery(
                {
                  query: messagesQuery,
                  variables: {
                    channel: field.arguments?.id as string,
                    guild
                  }
                },
                (data: MessagesQuery | undefined | null) => {
                  console.log(field);
                  // if (!data || !data.channelV2) return;

                  // const messages = data.channelV2?.messageBunch.messages as StateMessages[];
                  // const messages = data.channelV2?.messageBunch.messages as StateMessages[];

                  // console.log(
                  //   'data log ',
                  //   data.channelV2?.messageBunch.messages,
                  //   newMessage.id,
                  //   field
                  // );

                  if (!data?.channelV2?.messageBunch.messages.find(m => m.id === newMessage.id))
                    data?.channelV2?.messageBunch.messages.push(newMessage);

                  // @ts-expect-error
                  if (!(newMessage.flags & (1 << 4))) {
                    // trims spaces so Discord's normalization doesn't break it
                    const optimisticIndex = data?.channelV2?.messageBunch.messages.findIndex(
                      m =>
                        m.content.replace(/ /g, '') === newMessage.content.replace(/ /g, '') &&
                        // @ts-expect-error
                        m.flags & (1 << 4)
                    );

                    console.log('optimisticIndex ', optimisticIndex);
                    // @ts-expect-error
                    if (optimisticIndex > -1)
                      // @ts-expect-error
                      data?.channelV2?.messageBunch.messages.splice(optimisticIndex, 1);
                  }

                  // console.log('deconstruct ', newMessage, data.channelV2.messageBunch.messages);
                  // console.log(
                  //   'data?.channelV2.messageBunch.messages',
                  //   data?.channelV2.messageBunch.messages
                  // );

                  // data.channelV2.messageBunch.messages = messages;
                  return data;
                }
              );
            });
        }
        // _cache.updateQuery(
        //   {
        //     query: messagesQuery,
        //     variables: { channel: args.channel, guild, threadId: args.thread }
        //   },
        //   data => {
        //     console.log(data);
        //     if (!data || !data.channelV2?.messageBunch?.messages) return data;

        //     console.log(data);
        //     const messages = data.channelV2?.messageBunch.messages as StateMessages[];

        //     if (!messages.find(m => m.id === newMessage.id)) {
        //       messages.push(newMessage);
        //       data.channelV2.messageBunch.messages = messages;
        //     }

        //     // if (!(newMessage.flags & (1 << 4))) {
        //     //   // trims spaces so Discord's normalization doesn't break it
        //     //   const optimisticIndex = messages.findIndex(
        //     //     m =>
        //     //       m.content.replace(/ /g, '') === newMessage.content.replace(/ /g, '') &&
        //     //       m.flags & (1 << 4)
        //     //   );

        //     //   if (optimisticIndex > -1) messages.splice(optimisticIndex, 1);
        //     // }
        //     console.log('updates ', data);

        //     return data;
        //   }
        // );
        // }

        // console.log('qweqw ', messages);
        // _cache.updateQuery(
        //   { query: messagesQuery, variables: { channel: args.channel, guild } },
        //   data => {
        //     data?.channelV2.messageBunch.messages.push(newMessage);

        //     return data;
        //   }
        // );
      }
    }
  },

  optimistic: {
    sendMessage(args): Message | {} {
      // const { authorId, authorAvatar, authorUsername } = info.variables;
      const user = getState().user.data;

      // console.log('args ', args, '\n cache ', _cache, '\n info ', info, user);

      if (!user) return {};

      // const messageId = DiscordSnowflake.generate();
      // const createdAt = DiscordSnowflake.timestampFrom(messageId);

      return {
        __typename: 'Message',
        id: generateSnowflake(),
        channelId: args.channel as string,
        content: args.content as string,
        type: MessageType.Default,
        flags: 1 << 4, // reusing flag for optimistic messages
        createdAt: +new Date(),
        editedAt: null,
        isGuest: true,
        unread: true,
        author: {
          __typename: 'User',
          avatarUrl: user.avatarUrl,
          avatar: user.avatarUrl,
          bot: true,
          color: 0,
          discrim: '0000',
          id: '_id' in user ? user._id : generateSnowflake(),
          flags: 0,
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

/* eslint-disable no-bitwise */
import { cacheExchange } from '@urql/exchange-graphcache';
import { Message, MessageType } from '@graphql/graphql';
import { generateSnowflake } from '@util/generateSnowflake';
import { store } from '@state/store';
import { messagesQuery } from '@hooks/messagesQuery';
import { MessagesQuery } from 'types/messages.types';

export const cache = cacheExchange({
  keys: {
    Message: data => data.id as string,
    TextChannel: data => data.id as string,
    ThreadChannel: data => data.id as string,
    AnnouncementChannel: data => data.id as string,
    ForumChannel: data => data.id as string,
    MessageBunch: data => data.id as string
  },

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

                  if (!data.channel.messageBunch.messages.find(m => m.id === newMessage.id)) {
                    data.channel.messageBunch.messages.push(newMessage);
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
        unread: true,
        flags: 1 << 4,
        isGuest: true,
        author: {
          __typename: 'User',
          avatarUrl: user.avatarUrl,
          avatar: user.avatarUrl,
          bot: true,
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

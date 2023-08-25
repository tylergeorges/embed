/* eslint-disable no-bitwise */
/* eslint-disable no-underscore-dangle */
import { useMutation } from '@apollo/client';
import { messagesQuery, sendMessageMutation } from '@hooks/messagesQuery';
import { useAppRouter } from '@hooks/useAppRouter';
import { useStoreState } from '@state';
import { generateSnowflake } from '@util/generateSnowflake';
import { MessageType } from 'discord-api-types/v10';
import { SendMessageMutation } from '../graphql/graphql';

interface UseSendMessageProps {
  thread?: string | null;
}

export const useSendMessage = ({ thread }: UseSendMessageProps) => {
  const { channelId, guildId, threadId } = useAppRouter();
  const [sendMutation] = useMutation(sendMessageMutation);

  const user = useStoreState(state => state.user.data);

  const sendMessage = (content: string, fileName?: string, fileData?: string, fileAlt?: string) => {
    if (!user) return;

    sendMutation({
      variables: {
        channel: channelId,
        content,
        fileAlt,
        fileData,
        fileName,
        threadId: thread
      },

      optimisticResponse: {
        __typename: 'Mutation',

        sendMessage: {
          __typename: 'Message',
          id: generateSnowflake(),
          channelId,
          content,
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
            isWebhook: true,
            flags: null
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
        }
      } as SendMessageMutation,

      update: (cache, { data }) => {
        const sendMessage = data?.sendMessage;

        const messagesCache = cache.readQuery({
          query: messagesQuery,
          variables: { channel: channelId, guild: guildId, threadId }
        })?.channel.messageBunch.messages;

        if (!messagesCache || !sendMessage || messagesCache.find(m => m.id === sendMessage?.id))
          return;

        cache.writeQuery({
          query: messagesQuery,
          variables: { channel: channelId, guild: guildId, threadId },

          data: {
            __typename: 'Query',

            channel: {
              __typename: 'TextChannel',
              id: channelId,

              messageBunch: {
                __typename: 'MessageBunch',
                pinnedMessages: [],
                messages: [...messagesCache, sendMessage]
              }
            }
          }
        });
      }
    });
  };

  return { sendMessage };
};

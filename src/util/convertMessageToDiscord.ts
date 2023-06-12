import { APIMessage, MessageType } from 'discord-api-types/v10';
import { MessageFragmentFragment } from '@graphql/graphql';

export const convertMessageToDiscord = (message: MessageFragmentFragment): APIMessage => ({
  id: message.id,
  type: MessageType.Default,
  channel_id: message.channelId,
  content: message.content,
  // convert epoch to '2022-11-17T19:23:27.904000+00:00'
  timestamp: new Date(message.createdAt).toISOString(),
  edited_timestamp: null,
  author: {
    id: message.author.id,
    bot: message.author.bot,
    username: message.author.name,
    avatar: message.author.avatarUrl?.split('/').pop()?.split('.')[0] ?? null,
    discriminator: message.author.discrim
  },
  attachments: [],
  embeds: [],
  reactions: [],
  mentions: [],
  mention_roles: [],
  pinned: false,
  tts: false,
  mention_everyone: false
});

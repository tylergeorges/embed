import { APIMessage, MessageType } from 'discord-api-types/v10';
import { BaseMessageFragment } from '@graphql/graphql';

export const convertMessageToDiscord = (message: BaseMessageFragment): APIMessage => ({
  id: message.id,
  type: MessageType.Default,
  channel_id: message.channelId,
  content: message.content,
  // convert epoch to '2022-11-17T19:23:27.904000+00:00'
  timestamp: new Date(message.createdAt).toISOString(),
  edited_timestamp: message.editedAt,
  author: {
    id: message.author.id,
    bot: message.author.bot,
    username: message.author.name,
    avatar: message.author.avatarUrl?.split('/')?.pop()?.split('.')[0] ?? null,
    global_name: message.author.name,
    discriminator: message.author.discrim
  },
  attachments: message.attachments.map(a => ({
    id: '0',
    url: a.url,
    height: a.height,
    width: a.width,
    filename: a.filename,
    size: a.size,
    proxy_url: a.url
  })),
  embeds: [],
  reactions: [],
  mentions: [],
  mention_roles: [],
  pinned: false,
  tts: false,
  mention_everyone: false
});

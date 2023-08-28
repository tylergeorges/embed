import { MessageType } from 'discord-api-types/v10';
import { BaseMessageFragment, Message } from '@graphql/graphql';
import { getAvatarId } from '@util/convertToDiscord/getAvatarId';
import { ExpandedAPIMessage } from 'types/messages.types';

const getIdFromUrl = (message: BaseMessageFragment | Message) => {
  const id = message.author.avatarUrl.includes('gravatar')
    ? message.author.id
    : message.author.avatarUrl.split('/')[4] ?? null;

  return id;
};

export const convertMessageToDiscord = (
  message: BaseMessageFragment | Message
): ExpandedAPIMessage => ({
  id: message.id,
  type: MessageType.Default,
  channel_id: message.channelId,
  content: message.content,
  // convert epoch to '2022-11-17T19:23:27.904000+00:00'
  timestamp: new Date(message?.createdAt)?.toISOString(),
  edited_timestamp: message.editedAt,
  flags: message.flags ?? 0,
  isGuest: message.isGuest,

  author: {
    id: message.isGuest && message.author.bot ? getIdFromUrl(message) : message.author.id,
    bot: message.author.bot,
    username: message.author.name,
    avatar: getAvatarId(message.author.avatarUrl),
    global_name: message.author.name,
    system: message.author.system,
    flags: message.author.flags ?? 0,
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

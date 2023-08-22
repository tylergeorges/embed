/* eslint-disable no-bitwise */
import { MessageType } from 'discord-api-types/v10';
import { BaseMessageFragment } from '@graphql/graphql';
import { getAvatarId } from '@util/convertToDiscord/getAvatarId';
import { ExpandedAPIMessage } from 'types/messages.types';

// Used to resolve avatars for bot accounts
const getIdFromUrl = (avatarUrl: string) => {
  const id = avatarUrl.split('/')[4] ?? null;

  return id;
};

export const convertMessageToDiscord = (message: BaseMessageFragment): ExpandedAPIMessage => ({
  id: message.id,
  type: MessageType.Default,
  channel_id: message.channelId,
  content: message.content,
  // convert epoch to '2022-11-17T19:23:27.904000+00:00'
  timestamp: new Date(message.createdAt).toISOString(),
  edited_timestamp: message.editedAt,
  flags: message.flags ?? 0,
  isGuest: message.isGuest,

  author: {
    id: '_id' in message.author ? message.author.id : getIdFromUrl(message.author.avatarUrl),
    bot: message.isGuest || message.author.bot,
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

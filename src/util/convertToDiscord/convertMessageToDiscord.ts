import {
  APIEmbed,
  APIUser,
  MessageType,
  APIMessage,
  InteractionType,
  APIMessageInteraction
} from 'discord-api-types/v10';
import { Message } from '@graphql/graphql';
import { getAvatarId } from '@util/convertToDiscord/getAvatarId';

const getIdFromUrl = (avatarUrl: string) => {
  const id = avatarUrl.split('/')[4] ?? null;

  return id;
};

export const convertMessageToDiscord = (message: Message): APIMessage & { isGuest: boolean } => ({
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
    id:
      message.isGuest && message.author.bot
        ? getIdFromUrl(message.author.avatarUrl)
        : message.author.id,
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
    filename: a.filename,
    size: a.size,
    proxy_url: a.url,
    width: a.width
  })),

  embeds: message.embeds
    ? (message.embeds.map(e => ({
        author: e.author,
        color: e.color,
        description: e.description,
        footer: e.footer,
        image: e.image ?? {},
        provider: e.provider,
        thumbnail: e.thumbnail ?? {},
        timestamp: e.timestamp,
        title: e.title,
        url: e.url,
        fields: e.fields,
        video: e.video ?? {}
      })) as APIEmbed[])
    : [],

  reactions: message.reactions
    ? message.reactions.map(r => ({
        count: r.count as number,
        emoji: {
          id: r.emojiId as string,
          name: r.emojiName as string,
          animated: r.animated as boolean
        },
        me: r.me
      }))
    : [],

  mentions: message.mentions
    ? (message.mentions.map(m => ({
        id: m.id,
        guild_id: m.id,
        type: m.type,
        name: m.name,
        global_name: m.name,
        discriminator: '0000',
        username: m.name,
        avatar: ''
      })) as APIUser[])
    : [],

  interaction: message.interaction
    ? ({
        id: message.interaction.id,
        name: message.interaction.name,

        user: {
          avatar: getAvatarId(message.interaction.user.avatarUrl),
          discriminator: '0000',
          global_name: message.interaction.user.username,
          username: message.interaction.user.username,
          id: message.interaction.user.bot
            ? getIdFromUrl(message.interaction.user.avatarUrl)
            : message.interaction.user.id,
          bot: message.interaction.user.bot
        },

        type: InteractionType.MessageComponent
      } as APIMessageInteraction)
    : undefined,

  mention_roles: [],
  pinned: false,
  tts: false,
  mention_everyone: false
});

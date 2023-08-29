import { APIEmbed, APIUser, InteractionType, APIMessageInteraction } from 'discord-api-types/v10';
import {
  Attachment,
  Embed,
  Maybe,
  Mention,
  Message,
  MessageInteraction,
  Reaction
} from '@graphql/graphql';
import { getAvatarId, getIdFromUrl } from '@util/convertToDiscord/getAvatarId';

export const convertField = {
  author: (message: Message) => ({
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

    accent_color: message.author.color,

    discriminator: message.author.discrim
  }),

  interaction: (messageInteraction: Maybe<MessageInteraction> | undefined) =>
    messageInteraction
      ? ({
          id: messageInteraction.id,
          name: messageInteraction.name,

          user: {
            avatar: getAvatarId(messageInteraction.user.avatarUrl),

            discriminator: '0000',

            global_name: messageInteraction.user.username,

            username: messageInteraction.user.username,

            id: messageInteraction.user.bot
              ? getIdFromUrl(messageInteraction.user.avatarUrl)
              : messageInteraction.user.id,

            bot: messageInteraction.user.bot
          },

          type: InteractionType.MessageComponent
        } as APIMessageInteraction)
      : undefined,

  attachments: (messageAttachments: Attachment[]) =>
    messageAttachments.map(a => ({
      id: '0',
      url: a.url,
      height: a.height,
      filename: a.filename,
      size: a.size,
      proxy_url: a.url,
      width: a.width
    })),

  embeds: (messageEmbeds: Embed[]) =>
    messageEmbeds
      ? (messageEmbeds.map(e => ({
          author: {
            name: e.author?.name,

            icon_url: e.author?.icon,

            proxy_icon_url: e.author?.proxyIconUrl,

            url: e.author?.url
          },

          color: e.color,
          description: e.description,

          footer: {
            text: e.footer?.text,

            icon_url: e.footer?.proxyIconUrl,

            proxy_icon_url: e.footer?.proxyIconUrl
          },

          image:
            {
              url: e.image?.url,

              height: e.image?.height,

              proxy_url: e.image?.proxyUrl,

              width: e.image?.width
            } ?? undefined,

          provider: e.provider,

          thumbnail:
            {
              url: e.thumbnail?.url,

              height: e.thumbnail?.height,

              proxy_url: e.thumbnail?.proxyUrl,

              width: e.thumbnail?.width
            } ?? undefined,

          timestamp: e.timestamp,
          title: e.title,
          url: e.url,

          fields: e.fields,

          video:
            {
              height: e.video?.height,

              proxy_url: e.video?.proxyUrl,

              url: e.video?.url,

              width: e.video?.width
            } ?? undefined
        })) as APIEmbed[])
      : [],

  mentions: (messageMentions: Mention[]) =>
    messageMentions
      ? (messageMentions.map(m => ({
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

  reactions: (messageReactions: Maybe<Reaction[]> | undefined) =>
    messageReactions
      ? messageReactions.map(r => ({
          count: r.count as number,

          emoji: {
            id: r.emojiId as string,
            name: r.emojiName as string,
            animated: r.animated as boolean
          },

          me: r.me
        }))
      : []
} as const;

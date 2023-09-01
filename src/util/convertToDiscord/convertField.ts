import {
  APIEmbed,
  APIUser,
  InteractionType,
  APIMessageInteraction,
  MessageType as DiscordMessageType,
  APIAttachment,
  APIReaction,
  APIMessageReference,
  APIChannel,
  ChannelType
} from 'discord-api-types/v10';
import {
  Attachment,
  Embed,
  Maybe,
  Mention,
  Message,
  MessageInteraction,
  MessageType as GqlMessageType,
  Reaction,
  MessageReference,
  Thread
} from '@graphql/graphql';
import { getAvatarId, getIdFromUrl } from '@util/convertToDiscord/getAvatarId';
import { messageTypeTable } from '@util/convertToDiscord/messageTypeTable';

// temp workaround for resolving author's nick color
// github issue - https://github.com/widgetbot-io/message-renderer/issues/29
type ConvertedAuthorWorkaround = APIUser & {
  roles: Maybe<string[]> | undefined;

  joined_at: string;

  user: {
    id: string;
    avatar: string | null;
    global_name: string;
  };
};

export const convertField = {
  messageType: (type: GqlMessageType): DiscordMessageType => messageTypeTable[type],

  messageReference: (
    reference: Maybe<MessageReference> | undefined
  ): APIMessageReference | undefined =>
    reference
      ? {
          channel_id: reference.channelId,
          guild_id: reference.guildId as string,
          message_id: reference.messageId as string
        }
      : undefined,

  thread: (messageThread: Maybe<Thread> | undefined): APIChannel | undefined =>
    messageThread
      ? {
          id: messageThread.id,
          name: messageThread.name,
          message_count: messageThread.messageCount,
          position: 0,
          type: ChannelType.PublicThread,
          applied_tags: []
        }
      : undefined,

  author: (message: Message): ConvertedAuthorWorkaround => ({
    id:
      message.isGuest && message.author.bot
        ? getIdFromUrl(message.author.avatarUrl)
        : message.author.id,

    avatar: getAvatarId(message.author.avatarUrl),

    bot: message.author.bot,

    username: message.author.name,

    global_name: message.author.name,

    // Temporary work around for resolving nick color
    // github issue - https://github.com/widgetbot-io/message-renderer/issues/29
    user: {
      id:
        message.isGuest && message.author.bot
          ? getIdFromUrl(message.author.avatarUrl)
          : message.author.id,

      avatar: getAvatarId(message.author.avatarUrl),

      global_name: message.author.name
    },

    // Temporary work around for resolving nick color
    // github issue - https://github.com/widgetbot-io/message-renderer/issues/29
    joined_at: '',

    roles: message.author.roles,

    system: message.author.system,

    flags: message.author.flags ?? 0,

    discriminator: message.author.discrim
  }),

  interaction: (
    messageInteraction: Maybe<MessageInteraction> | undefined
  ): APIMessageInteraction | undefined =>
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

  attachments: (messageAttachments: Attachment[]): APIAttachment[] =>
    messageAttachments.map(a => ({
      id: '0',
      url: a.url,
      height: a.height,
      filename: a.filename,
      size: a.size,
      proxy_url: a.url,
      width: a.width
    })),

  embeds: (messageEmbeds: Embed[]): APIEmbed[] =>
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

  mentions: (messageMentions: Mention[]): APIUser[] =>
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

  reactions: (messageReactions: Maybe<Reaction[]> | undefined): APIReaction[] =>
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

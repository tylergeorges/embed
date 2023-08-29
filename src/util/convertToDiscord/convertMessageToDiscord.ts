import { MessageType, APIMessage, ChannelType } from 'discord-api-types/v10';
import { Message } from '@graphql/graphql';
import { convertField } from '@util/convertToDiscord/convertField';

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

  author: convertField.author(message),

  attachments: convertField.attachments(message.attachments),

  embeds: convertField.embeds(message.embeds),

  reactions: convertField.reactions(message.reactions),

  mentions: convertField.mentions(message.mentions),

  interaction: convertField.interaction(message.interaction),

  referenced_message: message.referencedMessage
    ? convertMessageToDiscord(message.referencedMessage)
    : undefined,

  message_reference: message.messageReference
    ? {
        channel_id: message.messageReference.channelId,
        guild_id: message.messageReference.guildId as string,
        message_id: message.messageReference.messageId as string
      }
    : undefined,

  thread: message.thread
    ? {
        id: message.thread.id,
        name: message.thread.name,
        message_count: message.thread.messageCount,
        position: 0,
        type: ChannelType.PublicThread,
        applied_tags: []
      }
    : undefined,

  mention_roles: [],
  pinned: false,
  tts: false,
  mention_everyone: false
});

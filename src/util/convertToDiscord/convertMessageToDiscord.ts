import { APIMessage, MessageType } from 'discord-api-types/v10';
import { Message } from '@graphql/graphql';
import { convertField } from '@util/convertToDiscord/convertField';

export const convertMessageToDiscord = (message: Message): APIMessage => ({
  id: message.id,
  type: message.type ? convertField.messageType(message.type) : MessageType.Default,

  channel_id: message.channelId,
  content: message.content,

  // convert epoch to '2022-11-17T19:23:27.904000+00:00'
  timestamp: new Date(message?.createdAt)?.toISOString(),

  edited_timestamp: message.editedAt,

  flags: message.flags ?? 0,

  author: convertField.author(message),

  attachments: convertField.attachments(message.attachments),

  embeds: convertField.embeds(message.embeds),

  reactions: convertField.reactions(message.reactions),

  mentions: convertField.mentions(message.mentions),

  interaction: convertField.interaction(message.interaction),

  referenced_message: message.referencedMessage
    ? convertMessageToDiscord(message.referencedMessage)
    : undefined,

  message_reference: convertField.messageReference(message.messageReference),

  thread: convertField.thread(message.thread),

  mention_roles: [],
  pinned: false,

  tts: false,

  mention_everyone: false
});

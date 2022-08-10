/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MessageType, FormatType, MentionType } from "./globalTypes";

// ====================================================
// GraphQL query operation: ChatMessages
// ====================================================

export interface ChatMessages_getMessagesForChat_author {
  __typename: "User";
  avatarUrl: string;
  bot: boolean;
  discrim: string;
  id: string;
  flags: number | null;
  name: string;
  roles: string[] | null;
  color: number;
}

export interface ChatMessages_getMessagesForChat_attachments {
  __typename: "Attachment";
  url: string;
  height: number | null;
  width: number | null;
  filename: string;
  size: number;
}

export interface ChatMessages_getMessagesForChat_stickers {
  __typename: "Sticker";
  id: string;
  name: string;
  formatType: FormatType;
  lottieData: string | null;
}

export interface ChatMessages_getMessagesForChat_reactions {
  __typename: "Reaction";
  count: number;
  emojiId: string | null;
  emojiName: string | null;
  animated: boolean | null;
}

export interface ChatMessages_getMessagesForChat_messageReference {
  __typename: "MessageReference";
  guildId: string | null;
  channelId: string;
  messageId: string | null;
}

export interface ChatMessages_getMessagesForChat_embeds_author {
  __typename: "EmbedAuthor";
  url: string | null;
  name: string | null;
  icon: string | null;
}

export interface ChatMessages_getMessagesForChat_embeds_fields {
  __typename: "EmbedField";
  value: string;
  name: string;
  inline: boolean | null;
}

export interface ChatMessages_getMessagesForChat_embeds_image {
  __typename: "EmbedImage";
  url: string | null;
  width: number | null;
  height: number | null;
}

export interface ChatMessages_getMessagesForChat_embeds_provider {
  __typename: "EmbedProvider";
  name: string | null;
  url: string | null;
}

export interface ChatMessages_getMessagesForChat_embeds_footer {
  __typename: "EmbedFooter";
  url: string | null;
  text: string;
}

export interface ChatMessages_getMessagesForChat_embeds_thumbnail {
  __typename: "EmbedThumbnail";
  height: number | null;
  width: number | null;
  url: string | null;
}

export interface ChatMessages_getMessagesForChat_embeds_video {
  __typename: "EmbedVideo";
  height: number | null;
  width: number | null;
  url: string | null;
  proxyUrl: string | null;
}

export interface ChatMessages_getMessagesForChat_embeds {
  __typename: "Embed";
  title: string | null;
  description: string | null;
  url: string | null;
  timestamp: string | null;
  color: number | null;
  type: string | null;
  author: ChatMessages_getMessagesForChat_embeds_author | null;
  fields: ChatMessages_getMessagesForChat_embeds_fields[] | null;
  image: ChatMessages_getMessagesForChat_embeds_image | null;
  provider: ChatMessages_getMessagesForChat_embeds_provider | null;
  footer: ChatMessages_getMessagesForChat_embeds_footer | null;
  thumbnail: ChatMessages_getMessagesForChat_embeds_thumbnail | null;
  video: ChatMessages_getMessagesForChat_embeds_video | null;
}

export interface ChatMessages_getMessagesForChat_mentions {
  __typename: "Mention";
  id: string;
  type: MentionType;
  name: string;
}

export interface ChatMessages_getMessagesForChat_interaction_user {
  __typename: "Author";
  id: string;
  username: string;
  discriminator: string;
  avatarUrl: string;
}

export interface ChatMessages_getMessagesForChat_interaction {
  __typename: "MessageInteraction";
  name: string;
  user: ChatMessages_getMessagesForChat_interaction_user;
}

export interface ChatMessages_getMessagesForChat_thread {
  __typename: "Thread";
  id: string;
  name: string;
  archivedAt: any | null;
  locked: boolean;
  messageCount: number;
}

export interface ChatMessages_getMessagesForChat_referencedMessage_author {
  __typename: "User";
  avatarUrl: string;
  bot: boolean;
  discrim: string;
  id: string;
  flags: number | null;
  name: string;
  roles: string[] | null;
  color: number;
}

export interface ChatMessages_getMessagesForChat_referencedMessage_attachments {
  __typename: "Attachment";
  url: string;
  height: number | null;
  width: number | null;
  filename: string;
  size: number;
}

export interface ChatMessages_getMessagesForChat_referencedMessage_stickers {
  __typename: "Sticker";
  id: string;
  name: string;
  formatType: FormatType;
  lottieData: string | null;
}

export interface ChatMessages_getMessagesForChat_referencedMessage_reactions {
  __typename: "Reaction";
  count: number;
  emojiId: string | null;
  emojiName: string | null;
  animated: boolean | null;
}

export interface ChatMessages_getMessagesForChat_referencedMessage_messageReference {
  __typename: "MessageReference";
  guildId: string | null;
  channelId: string;
  messageId: string | null;
}

export interface ChatMessages_getMessagesForChat_referencedMessage_embeds_author {
  __typename: "EmbedAuthor";
  url: string | null;
  name: string | null;
  icon: string | null;
}

export interface ChatMessages_getMessagesForChat_referencedMessage_embeds_fields {
  __typename: "EmbedField";
  value: string;
  name: string;
  inline: boolean | null;
}

export interface ChatMessages_getMessagesForChat_referencedMessage_embeds_image {
  __typename: "EmbedImage";
  url: string | null;
  width: number | null;
  height: number | null;
}

export interface ChatMessages_getMessagesForChat_referencedMessage_embeds_provider {
  __typename: "EmbedProvider";
  name: string | null;
  url: string | null;
}

export interface ChatMessages_getMessagesForChat_referencedMessage_embeds_footer {
  __typename: "EmbedFooter";
  url: string | null;
  text: string;
}

export interface ChatMessages_getMessagesForChat_referencedMessage_embeds_thumbnail {
  __typename: "EmbedThumbnail";
  height: number | null;
  width: number | null;
  url: string | null;
}

export interface ChatMessages_getMessagesForChat_referencedMessage_embeds_video {
  __typename: "EmbedVideo";
  height: number | null;
  width: number | null;
  url: string | null;
  proxyUrl: string | null;
}

export interface ChatMessages_getMessagesForChat_referencedMessage_embeds {
  __typename: "Embed";
  title: string | null;
  description: string | null;
  url: string | null;
  timestamp: string | null;
  color: number | null;
  type: string | null;
  author: ChatMessages_getMessagesForChat_referencedMessage_embeds_author | null;
  fields: ChatMessages_getMessagesForChat_referencedMessage_embeds_fields[] | null;
  image: ChatMessages_getMessagesForChat_referencedMessage_embeds_image | null;
  provider: ChatMessages_getMessagesForChat_referencedMessage_embeds_provider | null;
  footer: ChatMessages_getMessagesForChat_referencedMessage_embeds_footer | null;
  thumbnail: ChatMessages_getMessagesForChat_referencedMessage_embeds_thumbnail | null;
  video: ChatMessages_getMessagesForChat_referencedMessage_embeds_video | null;
}

export interface ChatMessages_getMessagesForChat_referencedMessage_mentions {
  __typename: "Mention";
  id: string;
  type: MentionType;
  name: string;
}

export interface ChatMessages_getMessagesForChat_referencedMessage_interaction_user {
  __typename: "Author";
  id: string;
  username: string;
  discriminator: string;
  avatarUrl: string;
}

export interface ChatMessages_getMessagesForChat_referencedMessage_interaction {
  __typename: "MessageInteraction";
  name: string;
  user: ChatMessages_getMessagesForChat_referencedMessage_interaction_user;
}

export interface ChatMessages_getMessagesForChat_referencedMessage_thread {
  __typename: "Thread";
  id: string;
  name: string;
  archivedAt: any | null;
  locked: boolean;
  messageCount: number;
}

export interface ChatMessages_getMessagesForChat_referencedMessage {
  __typename: "Message";
  id: string;
  content: string;
  type: MessageType;
  flags: number | null;
  createdAt: any;
  editedAt: any | null;
  isGuest: boolean;
  author: ChatMessages_getMessagesForChat_referencedMessage_author;
  attachments: ChatMessages_getMessagesForChat_referencedMessage_attachments[];
  stickers: ChatMessages_getMessagesForChat_referencedMessage_stickers[];
  reactions: ChatMessages_getMessagesForChat_referencedMessage_reactions[] | null;
  messageReference: ChatMessages_getMessagesForChat_referencedMessage_messageReference | null;
  embeds: ChatMessages_getMessagesForChat_referencedMessage_embeds[];
  mentions: ChatMessages_getMessagesForChat_referencedMessage_mentions[];
  interaction: ChatMessages_getMessagesForChat_referencedMessage_interaction | null;
  thread: ChatMessages_getMessagesForChat_referencedMessage_thread | null;
}

export interface ChatMessages_getMessagesForChat {
  __typename: "Message";
  id: string;
  content: string;
  type: MessageType;
  flags: number | null;
  createdAt: any;
  editedAt: any | null;
  isGuest: boolean;
  author: ChatMessages_getMessagesForChat_author;
  attachments: ChatMessages_getMessagesForChat_attachments[];
  stickers: ChatMessages_getMessagesForChat_stickers[];
  reactions: ChatMessages_getMessagesForChat_reactions[] | null;
  messageReference: ChatMessages_getMessagesForChat_messageReference | null;
  embeds: ChatMessages_getMessagesForChat_embeds[];
  mentions: ChatMessages_getMessagesForChat_mentions[];
  interaction: ChatMessages_getMessagesForChat_interaction | null;
  thread: ChatMessages_getMessagesForChat_thread | null;
  referencedMessage: ChatMessages_getMessagesForChat_referencedMessage | null;
}

export interface ChatMessages {
  getMessagesForChat: ChatMessages_getMessagesForChat[];
}

export interface ChatMessagesVariables {
  guild: string;
  user: string;
}

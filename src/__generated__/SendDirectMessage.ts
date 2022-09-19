/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MessageType, FormatType, MentionType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SendDirectMessage
// ====================================================

export interface SendDirectMessage_sendChat_author {
  __typename: "User";
  avatarUrl: string;
  bot: boolean;
  discrim: string;
  id: string;
  flags: number | null;
  name: string;
  roles: string[] | null;
  system: boolean;
  isWebhook: boolean;
  color: number;
}

export interface SendDirectMessage_sendChat_attachments {
  __typename: "Attachment";
  url: string;
  height: number | null;
  width: number | null;
  filename: string;
  size: number;
}

export interface SendDirectMessage_sendChat_stickers {
  __typename: "Sticker";
  id: string;
  name: string;
  formatType: FormatType;
  lottieData: string | null;
}

export interface SendDirectMessage_sendChat_reactions {
  __typename: "Reaction";
  count: number;
  emojiId: string | null;
  emojiName: string | null;
  animated: boolean | null;
}

export interface SendDirectMessage_sendChat_messageReference {
  __typename: "MessageReference";
  guildId: string | null;
  channelId: string;
  messageId: string | null;
}

export interface SendDirectMessage_sendChat_embeds_author {
  __typename: "EmbedAuthor";
  url: string | null;
  name: string | null;
  proxyIconUrl: string | null;
}

export interface SendDirectMessage_sendChat_embeds_fields {
  __typename: "EmbedField";
  value: string;
  name: string;
  inline: boolean | null;
}

export interface SendDirectMessage_sendChat_embeds_image {
  __typename: "EmbedImage";
  url: string | null;
  proxyUrl: string | null;
  width: number | null;
  height: number | null;
}

export interface SendDirectMessage_sendChat_embeds_provider {
  __typename: "EmbedProvider";
  name: string | null;
  url: string | null;
}

export interface SendDirectMessage_sendChat_embeds_footer {
  __typename: "EmbedFooter";
  proxyIconUrl: string | null;
  text: string;
}

export interface SendDirectMessage_sendChat_embeds_thumbnail {
  __typename: "EmbedThumbnail";
  height: number | null;
  width: number | null;
  url: string | null;
  proxyUrl: string | null;
}

export interface SendDirectMessage_sendChat_embeds_video {
  __typename: "EmbedVideo";
  height: number | null;
  width: number | null;
  url: string | null;
  proxyUrl: string | null;
}

export interface SendDirectMessage_sendChat_embeds {
  __typename: "Embed";
  title: string | null;
  description: string | null;
  url: string | null;
  timestamp: string | null;
  color: number | null;
  type: string | null;
  author: SendDirectMessage_sendChat_embeds_author | null;
  fields: SendDirectMessage_sendChat_embeds_fields[] | null;
  image: SendDirectMessage_sendChat_embeds_image | null;
  provider: SendDirectMessage_sendChat_embeds_provider | null;
  footer: SendDirectMessage_sendChat_embeds_footer | null;
  thumbnail: SendDirectMessage_sendChat_embeds_thumbnail | null;
  video: SendDirectMessage_sendChat_embeds_video | null;
}

export interface SendDirectMessage_sendChat_mentions {
  __typename: "Mention";
  id: string;
  type: MentionType;
  name: string;
}

export interface SendDirectMessage_sendChat_interaction_user {
  __typename: "Author";
  id: string;
  username: string;
  discriminator: string;
  avatarUrl: string;
}

export interface SendDirectMessage_sendChat_interaction {
  __typename: "MessageInteraction";
  name: string;
  user: SendDirectMessage_sendChat_interaction_user;
}

export interface SendDirectMessage_sendChat_thread {
  __typename: "Thread";
  id: string;
  name: string;
  archivedAt: any | null;
  locked: boolean;
  messageCount: number;
}

export interface SendDirectMessage_sendChat_referencedMessage_author {
  __typename: "User";
  avatarUrl: string;
  bot: boolean;
  discrim: string;
  id: string;
  flags: number | null;
  name: string;
  roles: string[] | null;
  system: boolean;
  isWebhook: boolean;
  color: number;
}

export interface SendDirectMessage_sendChat_referencedMessage_attachments {
  __typename: "Attachment";
  url: string;
  height: number | null;
  width: number | null;
  filename: string;
  size: number;
}

export interface SendDirectMessage_sendChat_referencedMessage_stickers {
  __typename: "Sticker";
  id: string;
  name: string;
  formatType: FormatType;
  lottieData: string | null;
}

export interface SendDirectMessage_sendChat_referencedMessage_reactions {
  __typename: "Reaction";
  count: number;
  emojiId: string | null;
  emojiName: string | null;
  animated: boolean | null;
}

export interface SendDirectMessage_sendChat_referencedMessage_messageReference {
  __typename: "MessageReference";
  guildId: string | null;
  channelId: string;
  messageId: string | null;
}

export interface SendDirectMessage_sendChat_referencedMessage_embeds_author {
  __typename: "EmbedAuthor";
  url: string | null;
  name: string | null;
  proxyIconUrl: string | null;
}

export interface SendDirectMessage_sendChat_referencedMessage_embeds_fields {
  __typename: "EmbedField";
  value: string;
  name: string;
  inline: boolean | null;
}

export interface SendDirectMessage_sendChat_referencedMessage_embeds_image {
  __typename: "EmbedImage";
  url: string | null;
  proxyUrl: string | null;
  width: number | null;
  height: number | null;
}

export interface SendDirectMessage_sendChat_referencedMessage_embeds_provider {
  __typename: "EmbedProvider";
  name: string | null;
  url: string | null;
}

export interface SendDirectMessage_sendChat_referencedMessage_embeds_footer {
  __typename: "EmbedFooter";
  proxyIconUrl: string | null;
  text: string;
}

export interface SendDirectMessage_sendChat_referencedMessage_embeds_thumbnail {
  __typename: "EmbedThumbnail";
  height: number | null;
  width: number | null;
  url: string | null;
  proxyUrl: string | null;
}

export interface SendDirectMessage_sendChat_referencedMessage_embeds_video {
  __typename: "EmbedVideo";
  height: number | null;
  width: number | null;
  url: string | null;
  proxyUrl: string | null;
}

export interface SendDirectMessage_sendChat_referencedMessage_embeds {
  __typename: "Embed";
  title: string | null;
  description: string | null;
  url: string | null;
  timestamp: string | null;
  color: number | null;
  type: string | null;
  author: SendDirectMessage_sendChat_referencedMessage_embeds_author | null;
  fields: SendDirectMessage_sendChat_referencedMessage_embeds_fields[] | null;
  image: SendDirectMessage_sendChat_referencedMessage_embeds_image | null;
  provider: SendDirectMessage_sendChat_referencedMessage_embeds_provider | null;
  footer: SendDirectMessage_sendChat_referencedMessage_embeds_footer | null;
  thumbnail: SendDirectMessage_sendChat_referencedMessage_embeds_thumbnail | null;
  video: SendDirectMessage_sendChat_referencedMessage_embeds_video | null;
}

export interface SendDirectMessage_sendChat_referencedMessage_mentions {
  __typename: "Mention";
  id: string;
  type: MentionType;
  name: string;
}

export interface SendDirectMessage_sendChat_referencedMessage_interaction_user {
  __typename: "Author";
  id: string;
  username: string;
  discriminator: string;
  avatarUrl: string;
}

export interface SendDirectMessage_sendChat_referencedMessage_interaction {
  __typename: "MessageInteraction";
  name: string;
  user: SendDirectMessage_sendChat_referencedMessage_interaction_user;
}

export interface SendDirectMessage_sendChat_referencedMessage_thread {
  __typename: "Thread";
  id: string;
  name: string;
  archivedAt: any | null;
  locked: boolean;
  messageCount: number;
}

export interface SendDirectMessage_sendChat_referencedMessage {
  __typename: "Message";
  id: string;
  channelId: string;
  content: string;
  type: MessageType;
  flags: number | null;
  createdAt: any;
  editedAt: any | null;
  isGuest: boolean;
  author: SendDirectMessage_sendChat_referencedMessage_author;
  attachments: SendDirectMessage_sendChat_referencedMessage_attachments[];
  stickers: SendDirectMessage_sendChat_referencedMessage_stickers[];
  reactions: SendDirectMessage_sendChat_referencedMessage_reactions[] | null;
  messageReference: SendDirectMessage_sendChat_referencedMessage_messageReference | null;
  embeds: SendDirectMessage_sendChat_referencedMessage_embeds[];
  mentions: SendDirectMessage_sendChat_referencedMessage_mentions[];
  interaction: SendDirectMessage_sendChat_referencedMessage_interaction | null;
  thread: SendDirectMessage_sendChat_referencedMessage_thread | null;
}

export interface SendDirectMessage_sendChat {
  __typename: "Message";
  id: string;
  channelId: string;
  content: string;
  type: MessageType;
  flags: number | null;
  createdAt: any;
  editedAt: any | null;
  isGuest: boolean;
  author: SendDirectMessage_sendChat_author;
  attachments: SendDirectMessage_sendChat_attachments[];
  stickers: SendDirectMessage_sendChat_stickers[];
  reactions: SendDirectMessage_sendChat_reactions[] | null;
  messageReference: SendDirectMessage_sendChat_messageReference | null;
  embeds: SendDirectMessage_sendChat_embeds[];
  mentions: SendDirectMessage_sendChat_mentions[];
  interaction: SendDirectMessage_sendChat_interaction | null;
  thread: SendDirectMessage_sendChat_thread | null;
  referencedMessage: SendDirectMessage_sendChat_referencedMessage | null;
}

export interface SendDirectMessage {
  sendChat: SendDirectMessage_sendChat;
}

export interface SendDirectMessageVariables {
  guild: string;
  user: string;
  content: string;
}

/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
  '\n  query Guild($id: String!) {\n    guild(id: $id) {\n      id\n      name\n      settings {\n        readonly\n      }\n      channels {\n        id\n        name\n        type\n        position\n\n        threads {\n          id\n          name\n        }\n        category {\n          id\n          name\n          position\n        }\n        rateLimitPerUser\n      }\n    }\n  }\n':
    types.GuildDocument,
  'fragment BaseMessage on Message {\n  ...BaseSubscriptionMessage\n  author {\n    color\n  }\n}': types.BaseMessageFragmentDoc,
  'fragment BaseSubscriptionMessage on Message {\n  id\n  channelId\n  content\n  type\n  flags\n  createdAt\n  editedAt\n  isGuest\n  author {\n    avatarUrl\n    bot\n    discrim\n    id\n    flags\n    name\n    roles\n    system\n    isWebhook\n  }\n  attachments {\n    url\n    height\n    width\n    filename\n    size\n  }\n  stickers {\n    id\n    name\n    formatType\n    lottieData\n  }\n  reactions {\n    count\n    emojiId\n    emojiName\n    animated\n  }\n  messageReference {\n    guildId\n    channelId\n    messageId\n  }\n  embeds {\n    ...Embed\n  }\n  mentions {\n    id\n    type\n    name\n  }\n  interaction {\n    name\n    user {\n      id\n      username\n      discriminator\n      avatarUrl\n    }\n  }\n  thread {\n    id\n    name\n    archivedAt\n    locked\n    messageCount\n  }\n}':
    types.BaseSubscriptionMessageFragmentDoc,
  'fragment Embed on Embed {\n  title\n  description\n  url\n  timestamp\n  color\n  type\n  author {\n    url\n    name\n    proxyIconUrl\n  }\n  fields {\n    value\n    name\n    inline\n  }\n  image {\n    url\n    proxyUrl\n    width\n    height\n  }\n  provider {\n    name\n    url\n  }\n  footer {\n    proxyIconUrl\n    text\n  }\n  thumbnail {\n    height\n    width\n    url\n    proxyUrl\n  }\n  video {\n    height\n    width\n    url\n    proxyUrl\n  }\n}':
    types.EmbedFragmentDoc,
  'fragment Message on Message {\n  ...BaseMessage\n  referencedMessage {\n    ...BaseMessage\n  }\n}': types.MessageFragmentDoc,
  '\n  fragment MessageFragment on Message {\n    id\n    type\n    channelId\n    content\n    author {\n      bot\n      id\n      name\n      avatarUrl\n      discrim\n    }\n    createdAt\n    editedAt\n  }\n':
    types.MessageFragmentFragmentDoc,
  '\n  query messagesQuery($guild: String!, $channel: String!, $before: String) {\n    channelV2(guild: $guild, id: $channel) {\n      id\n      ... on TextChannel {\n        messageBunch(before: $before) {\n          messages {\n            ...MessageFragment\n          }\n        }\n      }\n    }\n  }\n\n  fragment MessageFragment on Message {\n    id\n    type\n    channelId\n    content\n    author {\n      bot\n      id\n      name\n      avatarUrl\n      discrim\n    }\n    createdAt\n    editedAt\n  }\n':
    types.MessagesQueryDocument
};

export function graphql(
  source: '\n  query Guild($id: String!) {\n    guild(id: $id) {\n      id\n      name\n      settings {\n        readonly\n      }\n      channels {\n        id\n        name\n        type\n        position\n\n        threads {\n          id\n          name\n        }\n        category {\n          id\n          name\n          position\n        }\n        rateLimitPerUser\n      }\n    }\n  }\n'
): typeof documents['\n  query Guild($id: String!) {\n    guild(id: $id) {\n      id\n      name\n      settings {\n        readonly\n      }\n      channels {\n        id\n        name\n        type\n        position\n\n        threads {\n          id\n          name\n        }\n        category {\n          id\n          name\n          position\n        }\n        rateLimitPerUser\n      }\n    }\n  }\n'];
export function graphql(
  source: 'fragment BaseMessage on Message {\n  ...BaseSubscriptionMessage\n  author {\n    color\n  }\n}'
): typeof documents['fragment BaseMessage on Message {\n  ...BaseSubscriptionMessage\n  author {\n    color\n  }\n}'];
export function graphql(
  source: 'fragment BaseSubscriptionMessage on Message {\n  id\n  channelId\n  content\n  type\n  flags\n  createdAt\n  editedAt\n  isGuest\n  author {\n    avatarUrl\n    bot\n    discrim\n    id\n    flags\n    name\n    roles\n    system\n    isWebhook\n  }\n  attachments {\n    url\n    height\n    width\n    filename\n    size\n  }\n  stickers {\n    id\n    name\n    formatType\n    lottieData\n  }\n  reactions {\n    count\n    emojiId\n    emojiName\n    animated\n  }\n  messageReference {\n    guildId\n    channelId\n    messageId\n  }\n  embeds {\n    ...Embed\n  }\n  mentions {\n    id\n    type\n    name\n  }\n  interaction {\n    name\n    user {\n      id\n      username\n      discriminator\n      avatarUrl\n    }\n  }\n  thread {\n    id\n    name\n    archivedAt\n    locked\n    messageCount\n  }\n}'
): typeof documents['fragment BaseSubscriptionMessage on Message {\n  id\n  channelId\n  content\n  type\n  flags\n  createdAt\n  editedAt\n  isGuest\n  author {\n    avatarUrl\n    bot\n    discrim\n    id\n    flags\n    name\n    roles\n    system\n    isWebhook\n  }\n  attachments {\n    url\n    height\n    width\n    filename\n    size\n  }\n  stickers {\n    id\n    name\n    formatType\n    lottieData\n  }\n  reactions {\n    count\n    emojiId\n    emojiName\n    animated\n  }\n  messageReference {\n    guildId\n    channelId\n    messageId\n  }\n  embeds {\n    ...Embed\n  }\n  mentions {\n    id\n    type\n    name\n  }\n  interaction {\n    name\n    user {\n      id\n      username\n      discriminator\n      avatarUrl\n    }\n  }\n  thread {\n    id\n    name\n    archivedAt\n    locked\n    messageCount\n  }\n}'];
export function graphql(
  source: 'fragment Embed on Embed {\n  title\n  description\n  url\n  timestamp\n  color\n  type\n  author {\n    url\n    name\n    proxyIconUrl\n  }\n  fields {\n    value\n    name\n    inline\n  }\n  image {\n    url\n    proxyUrl\n    width\n    height\n  }\n  provider {\n    name\n    url\n  }\n  footer {\n    proxyIconUrl\n    text\n  }\n  thumbnail {\n    height\n    width\n    url\n    proxyUrl\n  }\n  video {\n    height\n    width\n    url\n    proxyUrl\n  }\n}'
): typeof documents['fragment Embed on Embed {\n  title\n  description\n  url\n  timestamp\n  color\n  type\n  author {\n    url\n    name\n    proxyIconUrl\n  }\n  fields {\n    value\n    name\n    inline\n  }\n  image {\n    url\n    proxyUrl\n    width\n    height\n  }\n  provider {\n    name\n    url\n  }\n  footer {\n    proxyIconUrl\n    text\n  }\n  thumbnail {\n    height\n    width\n    url\n    proxyUrl\n  }\n  video {\n    height\n    width\n    url\n    proxyUrl\n  }\n}'];
export function graphql(
  source: 'fragment Message on Message {\n  ...BaseMessage\n  referencedMessage {\n    ...BaseMessage\n  }\n}'
): typeof documents['fragment Message on Message {\n  ...BaseMessage\n  referencedMessage {\n    ...BaseMessage\n  }\n}'];
export function graphql(
  source: '\n  fragment MessageFragment on Message {\n    id\n    type\n    channelId\n    content\n    author {\n      bot\n      id\n      name\n      avatarUrl\n      discrim\n    }\n    createdAt\n    editedAt\n  }\n'
): typeof documents['\n  fragment MessageFragment on Message {\n    id\n    type\n    channelId\n    content\n    author {\n      bot\n      id\n      name\n      avatarUrl\n      discrim\n    }\n    createdAt\n    editedAt\n  }\n'];
export function graphql(
  source: '\n  query messagesQuery($guild: String!, $channel: String!, $before: String) {\n    channelV2(guild: $guild, id: $channel) {\n      id\n      ... on TextChannel {\n        messageBunch(before: $before) {\n          messages {\n            ...MessageFragment\n          }\n        }\n      }\n    }\n  }\n\n  fragment MessageFragment on Message {\n    id\n    type\n    channelId\n    content\n    author {\n      bot\n      id\n      name\n      avatarUrl\n      discrim\n    }\n    createdAt\n    editedAt\n  }\n'
): typeof documents['\n  query messagesQuery($guild: String!, $channel: String!, $before: String) {\n    channelV2(guild: $guild, id: $channel) {\n      id\n      ... on TextChannel {\n        messageBunch(before: $before) {\n          messages {\n            ...MessageFragment\n          }\n        }\n      }\n    }\n  }\n\n  fragment MessageFragment on Message {\n    id\n    type\n    channelId\n    content\n    author {\n      bot\n      id\n      name\n      avatarUrl\n      discrim\n    }\n    createdAt\n    editedAt\n  }\n'];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<infer TType, any>
  ? TType
  : never;

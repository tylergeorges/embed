/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query Guild($id: String!) {\n    guild(id: $id) {\n      id\n      name\n      settings {\n        readonly\n      }\n      channels {\n        id\n        name\n        type\n        position\n\n        threads {\n          id\n          name\n        }\n        category {\n          id\n          name\n          position\n        }\n\n        ... on TextChannel {\n          topic\n\n          threads {\n            id\n          }\n        }\n        ... on AnnouncementChannel {\n          topic\n\n          threads {\n            id\n          }\n        }\n        ... on ForumChannel {\n          topic\n        }\n\n        rateLimitPerUser\n      }\n    }\n  }\n": types.GuildDocument,
    "\n  fragment Embed on Embed {\n    title\n    description\n    url\n    timestamp\n    color\n    type\n    author {\n      url\n      name\n      proxyIconUrl\n    }\n    fields {\n      value\n      name\n      inline\n    }\n    image {\n      url\n      proxyUrl\n      width\n      height\n    }\n    provider {\n      name\n      url\n    }\n    footer {\n      proxyIconUrl\n      text\n    }\n    thumbnail {\n      height\n      width\n      url\n      proxyUrl\n    }\n    video {\n      height\n      width\n      url\n      proxyUrl\n    }\n  }\n": types.EmbedFragmentDoc,
    "\n  fragment BaseMessage on Message {\n    id\n    channelId\n    content\n    type\n    flags\n    createdAt\n    editedAt\n    isGuest\n\n    author {\n      avatarUrl\n      bot\n      discrim\n      id\n      flags\n      name\n      roles\n      system\n      isWebhook\n    }\n\n    attachments {\n      url\n      height\n      width\n      filename\n      size\n    }\n\n    stickers {\n      id\n      name\n      formatType\n      lottieData\n    }\n\n    reactions {\n      count\n      emojiId\n      emojiName\n      animated\n    }\n\n    messageReference {\n      guildId\n      channelId\n      messageId\n    }\n\n    embeds {\n      ...Embed\n    }\n\n    mentions {\n      id\n      type\n      name\n    }\n\n    interaction {\n      name\n      user {\n        id\n        username\n        discriminator\n        avatarUrl\n      }\n    }\n\n    thread {\n      id\n      name\n      archivedAt\n      locked\n      messageCount\n    }\n  }\n": types.BaseMessageFragmentDoc,
    "\n  query messagesQuery($guild: String!, $channel: String!, $before: String) {\n    channelV2(guild: $guild, id: $channel) {\n      id\n      ... on TextChannel {\n        messageBunch(before: $before) {\n          messages {\n            ...BaseMessage\n          }\n        }\n      }\n    }\n  }\n": types.MessagesQueryDocument,
    "\n  subscription newMessageSubscription($guild: String!, $channel: String!) {\n    message(guild: $guild, channel: $channel) {\n      ...BaseMessage\n    }\n  }\n": types.NewMessageSubscriptionDocument,
    "\n  subscription updateMessageSubscription($guild: String!, $channel: String!) {\n    messageUpdate(guild: $guild, channel: $channel) {\n      id\n      content\n    }\n  }\n": types.UpdateMessageSubscriptionDocument,
};

export function graphql(source: "\n  query Guild($id: String!) {\n    guild(id: $id) {\n      id\n      name\n      settings {\n        readonly\n      }\n      channels {\n        id\n        name\n        type\n        position\n\n        threads {\n          id\n          name\n        }\n        category {\n          id\n          name\n          position\n        }\n\n        ... on TextChannel {\n          topic\n\n          threads {\n            id\n          }\n        }\n        ... on AnnouncementChannel {\n          topic\n\n          threads {\n            id\n          }\n        }\n        ... on ForumChannel {\n          topic\n        }\n\n        rateLimitPerUser\n      }\n    }\n  }\n"): (typeof documents)["\n  query Guild($id: String!) {\n    guild(id: $id) {\n      id\n      name\n      settings {\n        readonly\n      }\n      channels {\n        id\n        name\n        type\n        position\n\n        threads {\n          id\n          name\n        }\n        category {\n          id\n          name\n          position\n        }\n\n        ... on TextChannel {\n          topic\n\n          threads {\n            id\n          }\n        }\n        ... on AnnouncementChannel {\n          topic\n\n          threads {\n            id\n          }\n        }\n        ... on ForumChannel {\n          topic\n        }\n\n        rateLimitPerUser\n      }\n    }\n  }\n"];
export function graphql(source: "\n  fragment Embed on Embed {\n    title\n    description\n    url\n    timestamp\n    color\n    type\n    author {\n      url\n      name\n      proxyIconUrl\n    }\n    fields {\n      value\n      name\n      inline\n    }\n    image {\n      url\n      proxyUrl\n      width\n      height\n    }\n    provider {\n      name\n      url\n    }\n    footer {\n      proxyIconUrl\n      text\n    }\n    thumbnail {\n      height\n      width\n      url\n      proxyUrl\n    }\n    video {\n      height\n      width\n      url\n      proxyUrl\n    }\n  }\n"): (typeof documents)["\n  fragment Embed on Embed {\n    title\n    description\n    url\n    timestamp\n    color\n    type\n    author {\n      url\n      name\n      proxyIconUrl\n    }\n    fields {\n      value\n      name\n      inline\n    }\n    image {\n      url\n      proxyUrl\n      width\n      height\n    }\n    provider {\n      name\n      url\n    }\n    footer {\n      proxyIconUrl\n      text\n    }\n    thumbnail {\n      height\n      width\n      url\n      proxyUrl\n    }\n    video {\n      height\n      width\n      url\n      proxyUrl\n    }\n  }\n"];
export function graphql(source: "\n  fragment BaseMessage on Message {\n    id\n    channelId\n    content\n    type\n    flags\n    createdAt\n    editedAt\n    isGuest\n\n    author {\n      avatarUrl\n      bot\n      discrim\n      id\n      flags\n      name\n      roles\n      system\n      isWebhook\n    }\n\n    attachments {\n      url\n      height\n      width\n      filename\n      size\n    }\n\n    stickers {\n      id\n      name\n      formatType\n      lottieData\n    }\n\n    reactions {\n      count\n      emojiId\n      emojiName\n      animated\n    }\n\n    messageReference {\n      guildId\n      channelId\n      messageId\n    }\n\n    embeds {\n      ...Embed\n    }\n\n    mentions {\n      id\n      type\n      name\n    }\n\n    interaction {\n      name\n      user {\n        id\n        username\n        discriminator\n        avatarUrl\n      }\n    }\n\n    thread {\n      id\n      name\n      archivedAt\n      locked\n      messageCount\n    }\n  }\n"): (typeof documents)["\n  fragment BaseMessage on Message {\n    id\n    channelId\n    content\n    type\n    flags\n    createdAt\n    editedAt\n    isGuest\n\n    author {\n      avatarUrl\n      bot\n      discrim\n      id\n      flags\n      name\n      roles\n      system\n      isWebhook\n    }\n\n    attachments {\n      url\n      height\n      width\n      filename\n      size\n    }\n\n    stickers {\n      id\n      name\n      formatType\n      lottieData\n    }\n\n    reactions {\n      count\n      emojiId\n      emojiName\n      animated\n    }\n\n    messageReference {\n      guildId\n      channelId\n      messageId\n    }\n\n    embeds {\n      ...Embed\n    }\n\n    mentions {\n      id\n      type\n      name\n    }\n\n    interaction {\n      name\n      user {\n        id\n        username\n        discriminator\n        avatarUrl\n      }\n    }\n\n    thread {\n      id\n      name\n      archivedAt\n      locked\n      messageCount\n    }\n  }\n"];
export function graphql(source: "\n  query messagesQuery($guild: String!, $channel: String!, $before: String) {\n    channelV2(guild: $guild, id: $channel) {\n      id\n      ... on TextChannel {\n        messageBunch(before: $before) {\n          messages {\n            ...BaseMessage\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query messagesQuery($guild: String!, $channel: String!, $before: String) {\n    channelV2(guild: $guild, id: $channel) {\n      id\n      ... on TextChannel {\n        messageBunch(before: $before) {\n          messages {\n            ...BaseMessage\n          }\n        }\n      }\n    }\n  }\n"];
export function graphql(source: "\n  subscription newMessageSubscription($guild: String!, $channel: String!) {\n    message(guild: $guild, channel: $channel) {\n      ...BaseMessage\n    }\n  }\n"): (typeof documents)["\n  subscription newMessageSubscription($guild: String!, $channel: String!) {\n    message(guild: $guild, channel: $channel) {\n      ...BaseMessage\n    }\n  }\n"];
export function graphql(source: "\n  subscription updateMessageSubscription($guild: String!, $channel: String!) {\n    messageUpdate(guild: $guild, channel: $channel) {\n      id\n      content\n    }\n  }\n"): (typeof documents)["\n  subscription updateMessageSubscription($guild: String!, $channel: String!) {\n    messageUpdate(guild: $guild, channel: $channel) {\n      id\n      content\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
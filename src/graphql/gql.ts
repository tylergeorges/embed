/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
  '\n  fragment TextChannel on TextChannel {\n    id\n    name\n    type\n    position\n    canSend\n    topic\n\n    category {\n      id\n      name\n      position\n    }\n\n    threads {\n      id\n      name\n    }\n  }\n':
    types.TextChannelFragmentDoc,
  '\n  fragment AnnouncementChannel on AnnouncementChannel {\n    id\n    name\n    type\n    position\n    canSend\n    topic\n\n    category {\n      id\n      name\n      position\n    }\n\n    threads {\n      id\n      name\n    }\n  }\n':
    types.AnnouncementChannelFragmentDoc,
  '\n  query Guild($id: String!) {\n    __typename\n\n    guild(id: $id) {\n      id\n      name\n      icon\n      memberCount\n      rulesChannelId\n      banner\n      splash\n      partnered\n      verified\n      tier\n      __typename\n\n      settings {\n        __typename\n        readonly\n        guestMode\n      }\n\n      roles {\n        __typename\n\n        id\n        name\n        position\n        color\n        icon\n        unicodeEmoji\n      }\n\n      emojis {\n        id\n        name\n        animated\n        available\n      }\n\n      channels {\n        id\n        name\n        type\n        position\n        canSend\n        __typename\n\n        ... on ThreadChannel {\n          __typename\n\n          id\n          type\n          name\n          parentId\n        }\n\n        category {\n          id\n          name\n          position\n        }\n\n        ... on TextChannel {\n          __typename\n\n          topic\n\n          threads {\n            ... on ThreadChannel {\n              __typename\n\n              id\n              type\n              name\n              parentId\n            }\n          }\n        }\n        ... on AnnouncementChannel {\n          __typename\n          id\n          topic\n\n          threads {\n            __typename\n            id\n            ... on ThreadChannel {\n              __typename\n\n              id\n              type\n              name\n              parentId\n            }\n          }\n        }\n        ... on ForumChannel {\n          __typename\n          id\n          topic\n        }\n\n        rateLimitPerUser\n      }\n    }\n  }\n':
    types.GuildDocument,
  '\n  fragment Embed on Embed {\n    title\n    description\n    url\n    timestamp\n    color\n    type\n    author {\n      url\n      name\n      proxyIconUrl\n    }\n    fields {\n      value\n      name\n      inline\n    }\n    image {\n      url\n      proxyUrl\n      width\n      height\n    }\n    provider {\n      name\n      url\n    }\n    footer {\n      proxyIconUrl\n      text\n    }\n    thumbnail {\n      height\n      width\n      url\n      proxyUrl\n    }\n    video {\n      height\n      width\n      url\n      proxyUrl\n    }\n  }\n':
    types.EmbedFragmentDoc,
  '\n  fragment BaseMessage on Message {\n    id\n    channelId\n    content\n    type\n    flags\n    createdAt\n    editedAt\n    isGuest\n    __typename\n\n    author {\n      __typename\n      avatarUrl\n      bot\n      discrim\n      id\n      flags\n      name\n      roles\n      system\n      isWebhook\n    }\n\n    attachments {\n      url\n      height\n      width\n      filename\n      size\n    }\n\n    stickers {\n      id\n      name\n      formatType\n      lottieData\n    }\n\n    reactions {\n      count\n      emojiId\n      emojiName\n      animated\n    }\n\n    messageReference {\n      guildId\n      channelId\n      messageId\n    }\n\n    embeds {\n      ...Embed\n    }\n\n    mentions {\n      id\n      type\n      name\n    }\n\n    interaction {\n      name\n      user {\n        id\n        username\n        discriminator\n        avatarUrl\n      }\n    }\n\n    thread {\n      id\n      name\n      archivedAt\n      locked\n      messageCount\n    }\n  }\n':
    types.BaseMessageFragmentDoc,
  '\n  fragment Message on Message {\n    __typename\n    id\n    ...BaseMessage\n\n    referencedMessage {\n      __typename\n      id\n      ...BaseMessage\n    }\n  }\n':
    types.MessageFragmentDoc,
  '\n  fragment UpdatedMessage on UpdatedMessage {\n    id\n    content\n    type\n    flags\n    createdAt\n    editedAt\n\n    author {\n      __typename\n      avatarUrl\n      bot\n      discrim\n      id\n      flags\n      name\n      roles\n    }\n\n    attachments {\n      url\n      height\n      width\n      filename\n      size\n    }\n\n    stickers {\n      id\n      name\n      formatType\n      lottieData\n    }\n\n    reactions {\n      count\n      emojiId\n      emojiName\n      animated\n    }\n\n    messageReference {\n      guildId\n      channelId\n      messageId\n    }\n\n    embeds {\n      ...Embed\n    }\n\n    mentions {\n      id\n      type\n      name\n    }\n\n    interaction {\n      name\n      user {\n        id\n        username\n        discriminator\n        avatarUrl\n      }\n    }\n\n    thread {\n      id\n      name\n      archivedAt\n      locked\n      messageCount\n    }\n  }\n':
    types.UpdatedMessageFragmentDoc,
  '\n  query messagesQuery(\n    $guild: String!\n    $channel: String!\n    $threadId: String\n    $around: String\n    $before: String\n    $after: String\n    $limit: Int\n  ) {\n    __typename\n\n    channel: channelV2(guild: $guild, id: $channel) {\n      id\n      __typename\n      ... on TextChannel {\n        messageBunch(\n          threadId: $threadId\n          limit: $limit\n          after: $after\n          before: $before\n          around: $around\n        ) {\n          __typename\n\n          messages {\n            id\n            __typename\n            ...Message\n          }\n        }\n      }\n      ... on ThreadChannel {\n        # This is not currently used but it resolves type issues\n        messageBunch(\n          threadId: $threadId\n          limit: $limit\n          after: $after\n          before: $before\n          around: $around\n        ) {\n          __typename\n\n          messages {\n            __typename\n            id\n            ...Message\n          }\n        }\n      }\n    }\n  }\n':
    types.MessagesQueryDocument,
  '\n  query MoreMessages(\n    $guild: String!\n    $channel: String!\n    $threadId: String\n    $around: String\n    $before: String\n    $after: String\n    $limit: Int\n  ) {\n    __typename\n\n    channel: channelV2(guild: $guild, id: $channel) {\n      id\n      __typename\n      ... on TextChannel {\n        messageBunch(\n          threadId: $threadId\n          limit: $limit\n          after: $after\n          before: $before\n          around: $around\n        ) {\n          __typename\n\n          messages {\n            id\n            __typename\n            ...Message\n          }\n        }\n      }\n      ... on ThreadChannel {\n        # This is not currently used but it resolves type issues\n        messageBunch(\n          threadId: $threadId\n          limit: $limit\n          after: $after\n          before: $before\n          around: $around\n        ) {\n          __typename\n\n          messages {\n            __typename\n            id\n            ...Message\n          }\n        }\n      }\n    }\n  }\n':
    types.MoreMessagesDocument,
  '\n  subscription MessageUpdated($guild: String!, $channel: String!, $threadId: String) {\n    messageUpdateV2(guild: $guild, channels: [$channel], threadId: $threadId) {\n      __typename\n      id\n      ...UpdatedMessage\n    }\n  }\n':
    types.MessageUpdatedDocument,
  '\n  subscription NewMessage($guild: String!, $channel: String!, $threadId: String) {\n    messageV2(channels: [$channel], guild: $guild, threadId: $threadId) {\n      __typename\n      id\n      ...Message\n    }\n  }\n':
    types.NewMessageDocument,
  '\n  subscription MessageDeleted($guild: String!, $channel: String!, $threadId: String) {\n    messageDeleteV2(channels: [$channel], guild: $guild, threadId: $threadId) {\n      __typename\n      id\n    }\n  }\n':
    types.MessageDeletedDocument,
  '\n  mutation SendMessage(\n    $channel: String!\n    $content: String!\n    $threadId: String\n    $fileData: String\n    $fileName: String\n    $fileAlt: String\n  ) {\n    __typename\n\n    sendMessage(\n      channel: $channel\n      content: $content\n      threadId: $threadId\n      fileData: $fileData\n      fileName: $fileName\n      fileAlt: $fileAlt\n    ) {\n      __typename\n      id\n      ...Message\n    }\n  }\n':
    types.SendMessageDocument
};

export function graphql(
  source: '\n  fragment TextChannel on TextChannel {\n    id\n    name\n    type\n    position\n    canSend\n    topic\n\n    category {\n      id\n      name\n      position\n    }\n\n    threads {\n      id\n      name\n    }\n  }\n'
): typeof documents['\n  fragment TextChannel on TextChannel {\n    id\n    name\n    type\n    position\n    canSend\n    topic\n\n    category {\n      id\n      name\n      position\n    }\n\n    threads {\n      id\n      name\n    }\n  }\n'];
export function graphql(
  source: '\n  fragment AnnouncementChannel on AnnouncementChannel {\n    id\n    name\n    type\n    position\n    canSend\n    topic\n\n    category {\n      id\n      name\n      position\n    }\n\n    threads {\n      id\n      name\n    }\n  }\n'
): typeof documents['\n  fragment AnnouncementChannel on AnnouncementChannel {\n    id\n    name\n    type\n    position\n    canSend\n    topic\n\n    category {\n      id\n      name\n      position\n    }\n\n    threads {\n      id\n      name\n    }\n  }\n'];
export function graphql(
  source: '\n  query Guild($id: String!) {\n    __typename\n\n    guild(id: $id) {\n      id\n      name\n      icon\n      memberCount\n      rulesChannelId\n      banner\n      splash\n      partnered\n      verified\n      tier\n      __typename\n\n      settings {\n        __typename\n        readonly\n        guestMode\n      }\n\n      roles {\n        __typename\n\n        id\n        name\n        position\n        color\n        icon\n        unicodeEmoji\n      }\n\n      emojis {\n        id\n        name\n        animated\n        available\n      }\n\n      channels {\n        id\n        name\n        type\n        position\n        canSend\n        __typename\n\n        ... on ThreadChannel {\n          __typename\n\n          id\n          type\n          name\n          parentId\n        }\n\n        category {\n          id\n          name\n          position\n        }\n\n        ... on TextChannel {\n          __typename\n\n          topic\n\n          threads {\n            ... on ThreadChannel {\n              __typename\n\n              id\n              type\n              name\n              parentId\n            }\n          }\n        }\n        ... on AnnouncementChannel {\n          __typename\n          id\n          topic\n\n          threads {\n            __typename\n            id\n            ... on ThreadChannel {\n              __typename\n\n              id\n              type\n              name\n              parentId\n            }\n          }\n        }\n        ... on ForumChannel {\n          __typename\n          id\n          topic\n        }\n\n        rateLimitPerUser\n      }\n    }\n  }\n'
): typeof documents['\n  query Guild($id: String!) {\n    __typename\n\n    guild(id: $id) {\n      id\n      name\n      icon\n      memberCount\n      rulesChannelId\n      banner\n      splash\n      partnered\n      verified\n      tier\n      __typename\n\n      settings {\n        __typename\n        readonly\n        guestMode\n      }\n\n      roles {\n        __typename\n\n        id\n        name\n        position\n        color\n        icon\n        unicodeEmoji\n      }\n\n      emojis {\n        id\n        name\n        animated\n        available\n      }\n\n      channels {\n        id\n        name\n        type\n        position\n        canSend\n        __typename\n\n        ... on ThreadChannel {\n          __typename\n\n          id\n          type\n          name\n          parentId\n        }\n\n        category {\n          id\n          name\n          position\n        }\n\n        ... on TextChannel {\n          __typename\n\n          topic\n\n          threads {\n            ... on ThreadChannel {\n              __typename\n\n              id\n              type\n              name\n              parentId\n            }\n          }\n        }\n        ... on AnnouncementChannel {\n          __typename\n          id\n          topic\n\n          threads {\n            __typename\n            id\n            ... on ThreadChannel {\n              __typename\n\n              id\n              type\n              name\n              parentId\n            }\n          }\n        }\n        ... on ForumChannel {\n          __typename\n          id\n          topic\n        }\n\n        rateLimitPerUser\n      }\n    }\n  }\n'];
export function graphql(
  source: '\n  fragment Embed on Embed {\n    title\n    description\n    url\n    timestamp\n    color\n    type\n    author {\n      url\n      name\n      proxyIconUrl\n    }\n    fields {\n      value\n      name\n      inline\n    }\n    image {\n      url\n      proxyUrl\n      width\n      height\n    }\n    provider {\n      name\n      url\n    }\n    footer {\n      proxyIconUrl\n      text\n    }\n    thumbnail {\n      height\n      width\n      url\n      proxyUrl\n    }\n    video {\n      height\n      width\n      url\n      proxyUrl\n    }\n  }\n'
): typeof documents['\n  fragment Embed on Embed {\n    title\n    description\n    url\n    timestamp\n    color\n    type\n    author {\n      url\n      name\n      proxyIconUrl\n    }\n    fields {\n      value\n      name\n      inline\n    }\n    image {\n      url\n      proxyUrl\n      width\n      height\n    }\n    provider {\n      name\n      url\n    }\n    footer {\n      proxyIconUrl\n      text\n    }\n    thumbnail {\n      height\n      width\n      url\n      proxyUrl\n    }\n    video {\n      height\n      width\n      url\n      proxyUrl\n    }\n  }\n'];
export function graphql(
  source: '\n  fragment BaseMessage on Message {\n    id\n    channelId\n    content\n    type\n    flags\n    createdAt\n    editedAt\n    isGuest\n    __typename\n\n    author {\n      __typename\n      avatarUrl\n      bot\n      discrim\n      id\n      flags\n      name\n      roles\n      system\n      isWebhook\n    }\n\n    attachments {\n      url\n      height\n      width\n      filename\n      size\n    }\n\n    stickers {\n      id\n      name\n      formatType\n      lottieData\n    }\n\n    reactions {\n      count\n      emojiId\n      emojiName\n      animated\n    }\n\n    messageReference {\n      guildId\n      channelId\n      messageId\n    }\n\n    embeds {\n      ...Embed\n    }\n\n    mentions {\n      id\n      type\n      name\n    }\n\n    interaction {\n      name\n      user {\n        id\n        username\n        discriminator\n        avatarUrl\n      }\n    }\n\n    thread {\n      id\n      name\n      archivedAt\n      locked\n      messageCount\n    }\n  }\n'
): typeof documents['\n  fragment BaseMessage on Message {\n    id\n    channelId\n    content\n    type\n    flags\n    createdAt\n    editedAt\n    isGuest\n    __typename\n\n    author {\n      __typename\n      avatarUrl\n      bot\n      discrim\n      id\n      flags\n      name\n      roles\n      system\n      isWebhook\n    }\n\n    attachments {\n      url\n      height\n      width\n      filename\n      size\n    }\n\n    stickers {\n      id\n      name\n      formatType\n      lottieData\n    }\n\n    reactions {\n      count\n      emojiId\n      emojiName\n      animated\n    }\n\n    messageReference {\n      guildId\n      channelId\n      messageId\n    }\n\n    embeds {\n      ...Embed\n    }\n\n    mentions {\n      id\n      type\n      name\n    }\n\n    interaction {\n      name\n      user {\n        id\n        username\n        discriminator\n        avatarUrl\n      }\n    }\n\n    thread {\n      id\n      name\n      archivedAt\n      locked\n      messageCount\n    }\n  }\n'];
export function graphql(
  source: '\n  fragment Message on Message {\n    __typename\n    id\n    ...BaseMessage\n\n    referencedMessage {\n      __typename\n      id\n      ...BaseMessage\n    }\n  }\n'
): typeof documents['\n  fragment Message on Message {\n    __typename\n    id\n    ...BaseMessage\n\n    referencedMessage {\n      __typename\n      id\n      ...BaseMessage\n    }\n  }\n'];
export function graphql(
  source: '\n  fragment UpdatedMessage on UpdatedMessage {\n    id\n    content\n    type\n    flags\n    createdAt\n    editedAt\n\n    author {\n      __typename\n      avatarUrl\n      bot\n      discrim\n      id\n      flags\n      name\n      roles\n    }\n\n    attachments {\n      url\n      height\n      width\n      filename\n      size\n    }\n\n    stickers {\n      id\n      name\n      formatType\n      lottieData\n    }\n\n    reactions {\n      count\n      emojiId\n      emojiName\n      animated\n    }\n\n    messageReference {\n      guildId\n      channelId\n      messageId\n    }\n\n    embeds {\n      ...Embed\n    }\n\n    mentions {\n      id\n      type\n      name\n    }\n\n    interaction {\n      name\n      user {\n        id\n        username\n        discriminator\n        avatarUrl\n      }\n    }\n\n    thread {\n      id\n      name\n      archivedAt\n      locked\n      messageCount\n    }\n  }\n'
): typeof documents['\n  fragment UpdatedMessage on UpdatedMessage {\n    id\n    content\n    type\n    flags\n    createdAt\n    editedAt\n\n    author {\n      __typename\n      avatarUrl\n      bot\n      discrim\n      id\n      flags\n      name\n      roles\n    }\n\n    attachments {\n      url\n      height\n      width\n      filename\n      size\n    }\n\n    stickers {\n      id\n      name\n      formatType\n      lottieData\n    }\n\n    reactions {\n      count\n      emojiId\n      emojiName\n      animated\n    }\n\n    messageReference {\n      guildId\n      channelId\n      messageId\n    }\n\n    embeds {\n      ...Embed\n    }\n\n    mentions {\n      id\n      type\n      name\n    }\n\n    interaction {\n      name\n      user {\n        id\n        username\n        discriminator\n        avatarUrl\n      }\n    }\n\n    thread {\n      id\n      name\n      archivedAt\n      locked\n      messageCount\n    }\n  }\n'];
export function graphql(
  source: '\n  query messagesQuery(\n    $guild: String!\n    $channel: String!\n    $threadId: String\n    $around: String\n    $before: String\n    $after: String\n    $limit: Int\n  ) {\n    __typename\n\n    channel: channelV2(guild: $guild, id: $channel) {\n      id\n      __typename\n      ... on TextChannel {\n        messageBunch(\n          threadId: $threadId\n          limit: $limit\n          after: $after\n          before: $before\n          around: $around\n        ) {\n          __typename\n\n          messages {\n            id\n            __typename\n            ...Message\n          }\n        }\n      }\n      ... on ThreadChannel {\n        # This is not currently used but it resolves type issues\n        messageBunch(\n          threadId: $threadId\n          limit: $limit\n          after: $after\n          before: $before\n          around: $around\n        ) {\n          __typename\n\n          messages {\n            __typename\n            id\n            ...Message\n          }\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query messagesQuery(\n    $guild: String!\n    $channel: String!\n    $threadId: String\n    $around: String\n    $before: String\n    $after: String\n    $limit: Int\n  ) {\n    __typename\n\n    channel: channelV2(guild: $guild, id: $channel) {\n      id\n      __typename\n      ... on TextChannel {\n        messageBunch(\n          threadId: $threadId\n          limit: $limit\n          after: $after\n          before: $before\n          around: $around\n        ) {\n          __typename\n\n          messages {\n            id\n            __typename\n            ...Message\n          }\n        }\n      }\n      ... on ThreadChannel {\n        # This is not currently used but it resolves type issues\n        messageBunch(\n          threadId: $threadId\n          limit: $limit\n          after: $after\n          before: $before\n          around: $around\n        ) {\n          __typename\n\n          messages {\n            __typename\n            id\n            ...Message\n          }\n        }\n      }\n    }\n  }\n'];
export function graphql(
  source: '\n  query MoreMessages(\n    $guild: String!\n    $channel: String!\n    $threadId: String\n    $around: String\n    $before: String\n    $after: String\n    $limit: Int\n  ) {\n    __typename\n\n    channel: channelV2(guild: $guild, id: $channel) {\n      id\n      __typename\n      ... on TextChannel {\n        messageBunch(\n          threadId: $threadId\n          limit: $limit\n          after: $after\n          before: $before\n          around: $around\n        ) {\n          __typename\n\n          messages {\n            id\n            __typename\n            ...Message\n          }\n        }\n      }\n      ... on ThreadChannel {\n        # This is not currently used but it resolves type issues\n        messageBunch(\n          threadId: $threadId\n          limit: $limit\n          after: $after\n          before: $before\n          around: $around\n        ) {\n          __typename\n\n          messages {\n            __typename\n            id\n            ...Message\n          }\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query MoreMessages(\n    $guild: String!\n    $channel: String!\n    $threadId: String\n    $around: String\n    $before: String\n    $after: String\n    $limit: Int\n  ) {\n    __typename\n\n    channel: channelV2(guild: $guild, id: $channel) {\n      id\n      __typename\n      ... on TextChannel {\n        messageBunch(\n          threadId: $threadId\n          limit: $limit\n          after: $after\n          before: $before\n          around: $around\n        ) {\n          __typename\n\n          messages {\n            id\n            __typename\n            ...Message\n          }\n        }\n      }\n      ... on ThreadChannel {\n        # This is not currently used but it resolves type issues\n        messageBunch(\n          threadId: $threadId\n          limit: $limit\n          after: $after\n          before: $before\n          around: $around\n        ) {\n          __typename\n\n          messages {\n            __typename\n            id\n            ...Message\n          }\n        }\n      }\n    }\n  }\n'];
export function graphql(
  source: '\n  subscription MessageUpdated($guild: String!, $channel: String!, $threadId: String) {\n    messageUpdateV2(guild: $guild, channels: [$channel], threadId: $threadId) {\n      __typename\n      id\n      ...UpdatedMessage\n    }\n  }\n'
): typeof documents['\n  subscription MessageUpdated($guild: String!, $channel: String!, $threadId: String) {\n    messageUpdateV2(guild: $guild, channels: [$channel], threadId: $threadId) {\n      __typename\n      id\n      ...UpdatedMessage\n    }\n  }\n'];
export function graphql(
  source: '\n  subscription NewMessage($guild: String!, $channel: String!, $threadId: String) {\n    messageV2(channels: [$channel], guild: $guild, threadId: $threadId) {\n      __typename\n      id\n      ...Message\n    }\n  }\n'
): typeof documents['\n  subscription NewMessage($guild: String!, $channel: String!, $threadId: String) {\n    messageV2(channels: [$channel], guild: $guild, threadId: $threadId) {\n      __typename\n      id\n      ...Message\n    }\n  }\n'];
export function graphql(
  source: '\n  subscription MessageDeleted($guild: String!, $channel: String!, $threadId: String) {\n    messageDeleteV2(channels: [$channel], guild: $guild, threadId: $threadId) {\n      __typename\n      id\n    }\n  }\n'
): typeof documents['\n  subscription MessageDeleted($guild: String!, $channel: String!, $threadId: String) {\n    messageDeleteV2(channels: [$channel], guild: $guild, threadId: $threadId) {\n      __typename\n      id\n    }\n  }\n'];
export function graphql(
  source: '\n  mutation SendMessage(\n    $channel: String!\n    $content: String!\n    $threadId: String\n    $fileData: String\n    $fileName: String\n    $fileAlt: String\n  ) {\n    __typename\n\n    sendMessage(\n      channel: $channel\n      content: $content\n      threadId: $threadId\n      fileData: $fileData\n      fileName: $fileName\n      fileAlt: $fileAlt\n    ) {\n      __typename\n      id\n      ...Message\n    }\n  }\n'
): typeof documents['\n  mutation SendMessage(\n    $channel: String!\n    $content: String!\n    $threadId: String\n    $fileData: String\n    $fileName: String\n    $fileAlt: String\n  ) {\n    __typename\n\n    sendMessage(\n      channel: $channel\n      content: $content\n      threadId: $threadId\n      fileData: $fileData\n      fileName: $fileName\n      fileAlt: $fileAlt\n    ) {\n      __typename\n      id\n      ...Message\n    }\n  }\n'];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;

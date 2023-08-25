import { gql } from '@apollo/client';
import { graphql } from '@graphql/gql';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const EmbedFragment = gql`
  fragment Embed on Embed {
    title
    description
    url
    timestamp
    color
    type
    author {
      url
      name
      proxyIconUrl
    }
    fields {
      value
      name
      inline
    }
    image {
      url
      proxyUrl
      width
      height
    }
    provider {
      name
      url
    }
    footer {
      proxyIconUrl
      text
    }
    thumbnail {
      height
      width
      url
      proxyUrl
    }
    video {
      height
      width
      url
      proxyUrl
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const BaseMessageFragment = gql`
  fragment BaseMessage on Message {
    id
    channelId
    content
    type
    flags
    createdAt
    editedAt
    isGuest
    __typename

    author {
      __typename
      avatarUrl
      bot
      discrim
      id
      flags
      name
      roles
      system
      isWebhook
    }

    attachments {
      url
      height
      width
      filename
      size
    }

    stickers {
      id
      name
      formatType
      lottieData
    }

    reactions {
      count
      emojiId
      emojiName
      animated
    }

    messageReference {
      guildId
      channelId
      messageId
    }

    embeds {
      ...Embed
    }

    mentions {
      id
      type
      name
    }

    interaction {
      name
      user {
        id
        username
        discriminator
        avatarUrl
      }
    }

    thread {
      id
      name
      archivedAt
      locked
      messageCount
    }
  }
`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MessageFragment = gql`
  fragment Message on Message {
    __typename
    id
    ...BaseMessage

    referencedMessage {
      __typename
      id
      ...BaseMessage
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UpdatedMessageFragment = gql`
  fragment UpdatedMessage on UpdatedMessage {
    id
    content
    type
    flags
    createdAt
    editedAt

    author {
      __typename
      avatarUrl
      bot
      discrim
      id
      flags
      name
      roles
    }

    attachments {
      url
      height
      width
      filename
      size
    }

    stickers {
      id
      name
      formatType
      lottieData
    }

    reactions {
      count
      emojiId
      emojiName
      animated
    }

    messageReference {
      guildId
      channelId
      messageId
    }

    embeds {
      ...Embed
    }

    mentions {
      id
      type
      name
    }

    interaction {
      name
      user {
        id
        username
        discriminator
        avatarUrl
      }
    }

    thread {
      id
      name
      archivedAt
      locked
      messageCount
    }
  }
`;

export const messagesQuery = graphql(`
  query messagesQuery(
    $guild: String!
    $channel: String!
    $threadId: String
    $around: String
    $before: String
    $after: String
    $limit: Int
  ) {
    __typename

    channel: channelV2(guild: $guild, id: $channel) {
      id
      __typename
      ... on TextChannel {
        messageBunch(
          threadId: $threadId
          limit: $limit
          after: $after
          before: $before
          around: $around
        ) {
          __typename

          messages {
            id
            __typename
            ...Message
          }

          pinnedMessages {
            ...Message
          }
        }
      }

      ... on AnnouncementChannel {
        messageBunch(threadId: $threadId, before: $before) {
          messages {
            ...Message
          }

          pinnedMessages {
            ...Message
          }
        }
      }

      ... on VoiceChannel {
        messageBunch(threadId: $threadId, before: $before) {
          messages {
            ...Message
          }
        }
      }

      ... on ForumChannel {
        messageBunch(threadId: $threadId, before: $before) {
          messages {
            ...Message
          }
        }
      }

      ... on ThreadChannel {
        # This is not currently used but it resolves type issues
        messageBunch(
          threadId: $threadId
          limit: $limit
          after: $after
          before: $before
          around: $around
        ) {
          __typename

          messages {
            __typename
            id
            ...Message
          }
        }
      }
    }
  }
`);

export const moreMessagesQuery = graphql(`
  query MoreMessages(
    $guild: String!
    $channel: String!
    $threadId: String
    $around: String
    $before: String
    $after: String
    $limit: Int
  ) {
    __typename

    channel: channelV2(guild: $guild, id: $channel) {
      id
      __typename
      ... on TextChannel {
        messageBunch(
          threadId: $threadId
          limit: $limit
          after: $after
          before: $before
          around: $around
        ) {
          __typename

          messages {
            id
            __typename
            ...Message
          }
        }
      }
      ... on ThreadChannel {
        # This is not currently used but it resolves type issues
        messageBunch(
          threadId: $threadId
          limit: $limit
          after: $after
          before: $before
          around: $around
        ) {
          __typename

          messages {
            __typename
            id
            ...Message
          }
        }
      }
    }
  }
`);

// TODO: Copy fragments from old codebase for this.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updateMessageSubscription = graphql(`
  subscription MessageUpdated($guild: String!, $channel: String!, $threadId: String) {
    messageUpdateV2(guild: $guild, channels: [$channel], threadId: $threadId) {
      __typename
      id
      ...UpdatedMessage
    }
  }
`);

export const newMessageSubscription = graphql(`
  subscription NewMessage($guild: String!, $channel: String!, $threadId: String) {
    messageV2(channels: [$channel], guild: $guild, threadId: $threadId) {
      __typename
      id
      ...Message
    }
  }
`);

export const deletedMessageSubscription = graphql(`
  subscription MessageDeleted($guild: String!, $channel: String!, $threadId: String) {
    messageDeleteV2(channels: [$channel], guild: $guild, threadId: $threadId) {
      __typename
      id
    }
  }
`);

export const sendMessageMutation = graphql(`
  mutation SendMessage(
    $channel: String!
    $content: String!
    $threadId: String
    $fileData: String
    $fileName: String
    $fileAlt: String
  ) {
    __typename

    sendMessage(
      channel: $channel
      content: $content
      threadId: $threadId
      fileData: $fileData
      fileName: $fileName
      fileAlt: $fileAlt
    ) {
      __typename
      id
      ...Message
    }
  }
`);

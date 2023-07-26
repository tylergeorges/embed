import { gql } from 'urql';
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
const MessageFragment = gql`
  fragment BaseMessage on Message {
    id
    channelId
    content
    type
    flags
    createdAt
    editedAt
    isGuest

    author {
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

export const messagesQuery = graphql(`
  query messagesQuery($guild: String!, $channel: String!, $threadId: String, $before: String) {
    channelV2(guild: $guild, id: $channel) {
      id
      ... on TextChannel {
        messageBunch(threadId: $threadId, before: $before) {
          messages {
            ...BaseMessage
          }
        }
      }
      ... on ThreadChannel {
        # This is not currently used but it resolves type issues
        messageBunch(threadId: $threadId, before: $before) {
          messages {
            ...BaseMessage
          }
        }
      }
    }
  }
`);

// TODO: Copy fragments from old codebase for this.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updateMessageSubscription = graphql(`
  subscription updateMessageSubscription($channel: String!, $guild: String!) {
    messageUpdate(channel: $channel, guild: $guild) {
      id
      content
    }
  }
`);

// TODO: Copy fragments from old codebase for this.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updateThreadMessageSubscription = graphql(`
  subscription updateThreadMsgSubscription($channel: String!, $guild: String!, $threadId: String) {
    messageUpdateV2(channels: [$channel], guild: $guild, threadId: $threadId) {
      id
      content
    }
  }
`);

export const newMessageSubscription = graphql(`
  subscription newMessageSubscription($guild: String!, $channel: String!) {
    message(guild: $guild, channel: $channel) {
      ...BaseMessage
    }
  }
`);

export const newThreadMessageSubscription = graphql(`
  subscription newThreadMessageSubscription($guild: String!, $channel: String!, $threadId: String) {
    messageV2(channels: [$channel], threadId: $threadId, guild: $guild) {
      ...BaseMessage
    }
  }
`);

export const deletedMessageSubscription = graphql(`
  subscription MessageDeleted($channel: String!, $guild: String!) {
    messageDelete(channel: $channel, guild: $guild) {
      id
    }
  }
`);

export const deletedThreadMessageSubscription = graphql(`
  subscription ThreadMessageDeleted($channel: String!, $guild: String!, $threadId: String) {
    messageDeleteV2(channels: [$channel], guild: $guild, threadId: $threadId) {
      id
    }
  }
`);

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
  subscription updateMessageSubscription($guild: String!, $channel: String!, $threadId: String) {
    messageUpdateV2(guild: $guild, channels: [$channel], threadId: $threadId) {
      id
      content
      type
      flags
      createdAt
      editedAt

      author {
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
    }
  }
`);

export const newMessageSubscription = graphql(`
  subscription newMessageSubscription($guild: String!, $channel: String!, $threadId: String) {
    messageV2(channels: [$channel], guild: $guild, threadId: $threadId) {
      ...BaseMessage
    }
  }
`);

export const deletedMessageSubscription = graphql(`
  subscription MessageDeleted($guild: String!, $channel: String!, $threadId: String) {
    messageDeleteV2(channels: [$channel], guild: $guild, threadId: $threadId) {
      id
    }
  }
`);

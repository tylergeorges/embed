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
  query messagesQuery($guild: String!, $channel: String!, $before: String) {
    channelV2(guild: $guild, id: $channel) {
      id
      ... on TextChannel {
        messageBunch(before: $before) {
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
  subscription updateMessageSubscription($guild: String!, $channel: String!) {
    messageUpdate(guild: $guild, channel: $channel) {
      id
      content
    }
  }
`);

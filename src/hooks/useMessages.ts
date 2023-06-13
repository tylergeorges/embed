import { gql, useQuery } from 'urql';
import { graphql } from '@graphql/gql';
import { useEffect, useState } from 'react';
import { BaseMessageFragment, MessagesQueryQueryVariables } from '@graphql/graphql';
import { groupMessages } from '@util/groupMessages';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EmbedFragment = gql`
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

const messagesQuery = graphql(`
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

export const useMessages = (guild: string, channel: string) => {
  // useQuery
  // useSubscriptions
  // return fetchMore
  // return {messages, fetchMore, error, isReady, isStale}

  const [variables, setVariables] = useState<MessagesQueryQueryVariables>({ guild, channel });

  const [{ data, stale }, fetchHook] = useQuery({
    query: messagesQuery,
    variables
  });
  const ready = data?.channelV2.id === channel || false;

  const [messages, setMessages] = useState<BaseMessageFragment[]>([]);
  const [newMessageGroupLength, setNewMessageGroupLength] = useState(0);

  useEffect(() => {
    // @ts-ignore TODO: Fix this
    const msgs = ready ? data?.channelV2.messageBunch.messages : [];
    setNewMessageGroupLength(groupMessages(msgs).length);
    console.log('grouped', groupMessages(msgs).length);

    setMessages(prev => (ready ? [...msgs, ...prev] : []));
  }, [ready, data]);

  function fetchMore(before: string) {
    console.log('before: ', before);
    if (!ready) return;

    setVariables({ channel, guild, before });
    fetchHook({ requestPolicy: 'network-only' });
  }

  return {
    messages,
    fetchMore,
    newMessageGroupLength,
    isReady: ready,
    isStale: stale
  };
};

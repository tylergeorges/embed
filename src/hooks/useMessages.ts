import { gql, useQuery } from 'urql';
import { graphql } from '@graphql/gql';
import { useEffect, useState } from 'react';
import { MessageFragmentFragment, MessagesQueryQueryVariables } from '@graphql/graphql';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MessageFragment = gql`
  fragment MessageFragment on Message {
    id
    type
    channelId
    content
    author {
      bot
      id
      name
      avatarUrl
      discrim
    }
    createdAt
    editedAt
  }
`;

const messagesQuery = graphql(`
  query messagesQuery($guild: String!, $channel: String!, $before: String) {
    channelV2(guild: $guild, id: $channel) {
      id
      ... on TextChannel {
        messageBunch(before: $before) {
          messages {
            ...MessageFragment
          }
        }
      }
    }
  }

  fragment MessageFragment on Message {
    id
    type
    channelId
    content
    author {
      bot
      id
      name
      avatarUrl
      discrim
    }
    createdAt
    editedAt
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

  const [messages, setMessages] = useState<MessageFragmentFragment[]>([]);
  useEffect(() => {
    const msgs = ready ? data?.channelV2.messageBunch.messages : [];

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
    isReady: ready,
    isStale: stale
  };
};

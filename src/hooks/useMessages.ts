import { gql, useQuery, useSubscription } from 'urql';
import { graphql } from '@graphql/gql';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BaseMessageFragment,
  MessagesQueryQueryVariables,
  // @ts-ignore
  MessageFragmentFragment
} from '@graphql/graphql';
import { groupMessages } from '@util/groupMessages';
import { APIMessage } from 'discord-api-types/v10';
import { convertMessageToDiscord } from '@util/convertMessageToDiscord';
import { staticMessages } from '@components/Core/VirtualLists/staticData';

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

const newMessageSubscription = graphql(`
  subscription newMessageSubscription($guild: String!, $channel: String!) {
    message(guild: $guild, channel: $channel) {
      ...BaseMessage
    }
  }
`);

// TODO: Copy fragments from old codebase for this.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateMessageSubscription = graphql(`
  subscription updateMessageSubscription($guild: String!, $channel: String!) {
    messageUpdate(guild: $guild, channel: $channel) {
      id
      content
    }
  }
`);

interface UseMessagesProps {
  guild: string;
  channel: string;
  useStaticData?: boolean;
  thread?: string;
}

type MessageState = {
  messages: MessageFragmentFragment[];
  groupedMessages: APIMessage[][];
  firstItemIndex: number;
};

export const useMessages = ({
  guild,
  channel,
  useStaticData = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  thread
}: UseMessagesProps) => {
  const [variables, setVariables] = useState<MessagesQueryQueryVariables>({ guild, channel });

  const [messages, setMessages] = useState<BaseMessageFragment[]>([]);
  const [newMessageGroupLength, setNewMessageGroupLength] = useState(0);
  const [{ data }, fetchHook] = useQuery({
    query: messagesQuery,
    variables
  });

  const handleNewMessage = (
    // eslint-disable-next-line @typescript-eslint/default-param-last, @typescript-eslint/no-unused-vars
    _: never[] | undefined = [],
    response: { message: BaseMessageFragment }
  ) => {
    console.log(response);
    setMessages(prev => [...prev, response.message]);
  };
  const handleUpdatedMessage = (
    // eslint-disable-next-line @typescript-eslint/default-param-last, @typescript-eslint/no-unused-vars
    _: never[] | undefined = [],
    response: { messageUpdate: { content: string; id: string } }
  ) => {
    const oldMsgs = [...messages];
    const updatedMessage = response.messageUpdate;

    const messageIdx = messages.findIndex(msg => msg.id === updatedMessage.id);

    const message = oldMsgs[messageIdx];

    message.content = updatedMessage.content;
    message.editedAt = new Date().toISOString();
    setMessages(oldMsgs);
  };
  useSubscription(
    {
      variables: { guild, channel },
      query: newMessageSubscription
    },
    // @ts-ignore
    handleNewMessage
  );

  useSubscription(
    {
      variables: { guild, channel },
      query: updateMessageSubscription
    },
    // @ts-ignore
    handleUpdatedMessage
  );

  const ready = data?.channelV2.id === channel || false;

  useEffect(() => {
    if (!useStaticData) {
      // @ts-ignore TODO: Fix this
      const isReadyWithMessages = ready && data?.channelV2.messageBunch?.messages;

      // @ts-ignore
      const msgs = isReadyWithMessages ? data.channelV2?.messageBunch?.messages : [];
      if (msgs.length) {
        setNewMessageGroupLength(groupMessages(msgs).length);
        console.log('grouped', groupMessages(msgs).length);

        if (ready) {
          setMessages(prev => [...msgs, ...prev]);
        }
      }
    } else {
      const groupedStaticMsgs = groupMessages(staticMessages);
      setNewMessageGroupLength(groupedStaticMsgs.length);
      // @ts-ignore
      setMessages(prev => [...groupedStaticMsgs, ...prev]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.channelV2, useStaticData, ready]);

  const fetchMore = useCallback(
    (before: string) => {
      if (!useStaticData) {
        if (!ready) return;

        setVariables({ channel, guild, before });
        fetchHook({ requestPolicy: 'network-only' });
      }
    },
    [channel, fetchHook, guild, ready, useStaticData]
  );

  const loadMoreMessages = useCallback(() => {
    fetchMore(messages[0].id);
  }, [fetchMore, messages]);

  let messageState: MessageState;

  // @ts-ignore
  // eslint-disable-next-line prefer-const
  messageState = useMemo(() => {
    let firstItemIndex = 100_000;

    if (messages === undefined)
      return {
        messages: [],
        groupedMessages: [],
        firstItemIndex
      };

    const grouped = !useStaticData
      ? groupMessages(messages.map(convertMessageToDiscord))
      : messages;
    firstItemIndex -= grouped.length - 1;
    return {
      messages,
      groupedMessages: grouped,
      firstItemIndex
    };

    // return {
    //   messages,
    //   groupedMessages: grouped,
    //   firstItemIndex:
    //     messageState.firstItemIndex -
    //     groupMessages(messages.map(convertMessageToDiscord).slice(messageState.messages.length - messages.length)).length
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return {
    ...messageState,
    // messages: messageState.groupedMessages,
    fetchMore,
    newMessageGroupLength,
    isReady: ready,
    loadMoreMessages
  };
};

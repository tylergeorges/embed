import produce from "immer";
import { CHAT_MESSAGES, MORE_MESSAGES, NEW_DIRECT_MESSAGE, MESSAGE_UPDATED, MESSAGE_DELETED, MESSAGES_BULK_DELETED } from ".";
import { useQuery, useSubscription } from "react-apollo-hooks";
import { Messages_channel, Message, NewMessage } from "@generated";
import { generalStore } from "@store";
import { NewDirectMessage } from "@generated/NewDirectMessage";

/**
 * Fetches the messages for a DM chat
 */
export const useChatMessages = (user: string, guild: string) => {
  const query = useQuery(CHAT_MESSAGES, {
    variables: { guild, user },
    fetchPolicy: 'network-only'
  });

  const ready = !!query.data?.getMessagesForChat

  const messages = query.data?.getMessagesForChat ?? [];

  const fetchMore = () => {}

//   async function fetchMore(options?: {
//     around?: string;
//     after?: string;
//     before?: string;
//     limit?: number;
//   }) {
//     if (!user) return;
//     if (!options) {
//       const [firstMessage] = messages;
//       if (!firstMessage) return;

//       options = { before: firstMessage.id };
//     }

//     await query.fetchMore({
//       query: MORE_MESSAGES,
//       variables: { channel, thread, ...options },
//       updateQuery: (prev, { fetchMoreResult }) =>
//         produce(prev, draftState => {
//           draftState.channel.messageBunch.messages = [
//             ...fetchMoreResult.channel.messageBunch.messages,
//             ...draftState.channel.messageBunch.messages
//           ];
//         })
//     })
//   }

  useSubscription<NewDirectMessage>(NEW_DIRECT_MESSAGE, {
    // variables: { channel, guild, threadId: thread },
    onSubscriptionData({ subscriptionData }) {
      query.updateQuery(prev =>
        produce(prev, (x) => {
          console.log(x)
          const message = subscriptionData.data.directMessage as Message
          message.author.color = messages.find(m => m.author.id === message.author.id)?.author.color || 0xffffff
          if (!messages.find(m => m.id === message.id)) messages.push(message);
        })
      )}
  });

  // these are here to keep the hooks the same so React doesn't complain
  useSubscription(MESSAGE_UPDATED);
  useSubscription(MESSAGE_DELETED);
  useSubscription(MESSAGES_BULK_DELETED);

  return <any>{
    ready,
    messages,
    fetchMore,
    error: query.error,
    // @ts-ignore
    stale: query.stale
  };
};

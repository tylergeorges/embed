import produce from "immer";
import { CHAT_MESSAGES, NEW_DIRECT_MESSAGE, MESSAGE_UPDATED, MESSAGE_DELETED, MESSAGES_BULK_DELETED } from ".";
import { useQuery, useSubscription } from "react-apollo-hooks";
import { ChatMessages, Message } from "@generated";
import { NewDirectMessage } from "@generated/NewDirectMessage";
import { generalStore } from "@store";
import { Util } from "@lib/Util";

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
    variables: { guild },
    onSubscriptionData({ subscriptionData }) {
      query.updateQuery(prev =>
        produce(prev, (data?: ChatMessages) => {
          const messages = data?.getMessagesForChat;
          if (!messages) {
            console.warn('NEW_DIRECT_MESSAGE received empty initial state within subscription', subscriptionData, data);
            return;
          }

          const message = subscriptionData.data.directMessage as Message

          const chat = generalStore.chats.find(c => c.recipient.id === message.author.id)
          if (chat) {
            chat.content = message.content
            Util.moveToTop(generalStore.chats, chat)
          } else generalStore.chats.unshift({ recipient: message.author, content: message.content })
          
          if (message.author.id === user && !messages.find(m => m.id === message.id)) messages.push(message);
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

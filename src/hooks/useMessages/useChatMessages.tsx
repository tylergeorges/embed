import produce from "immer";
import { CHAT_MESSAGES, NEW_DIRECT_MESSAGE } from ".";
import { useQuery, useSubscription } from "react-apollo-hooks";
import { ChatMessages, Message as MessageData } from "@generated";
import { NewDirectMessage } from "@generated/NewDirectMessage";
import { generalStore } from "@store";
import { Util } from "@lib/Util";
import { useContext } from "react";
import { NotificationContext } from "@ui/Overlays/Notification/NotificationContext";
import Message from "@ui/Messages/Message";
import { NavLink } from "react-router-dom";
import { closeSidebar } from "@ui/shared/Channel/link";
import { Views } from "@ui/Sidebar";
import api from "@lib/embed-api";

const queryParams = new URLSearchParams(location.search)

/**
 * Fetches the messages for a DM chat
 */
export const useChatMessages = (user: string, guild: string) => {
  const spawnNotif = useContext(NotificationContext)

  const query = useQuery(CHAT_MESSAGES, {
    variables: { guild, user },
    skip: !user,
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
      const message = subscriptionData.data.directMessage as MessageData

      if (generalStore.chats) {
        const chat = generalStore.chats.find(c => c.id === message.author.id)
        if (chat) {
          chat.content = message.content
          Util.moveToTop(generalStore.chats, chat)
        } else generalStore.chats.unshift({ id: message.author.id, recipient: message.author, content: message.content })
      }

      api.emit('directMessage', {
        message
      })

      if (message.author.id !== user) {
        return spawnNotif({
          content: (
            <NavLink
              to={`/channels/${guild}/@${message.author.id}`}
              onClick={() => {
                closeSidebar()
                generalStore.setSidebarView(Views.Chats)
              }}
              children={<Message message={message} isFirstMessage={true} hideTimestamp={true} />}
              style={{ textDecoration: 'none' }}
            />
          ),
          hideAfter: +queryParams.get('notificationtimeout') || 3000
        })
      }

      // if a dm is open
      if (user) query.updateQuery(prev =>
        produce(prev, (data?: ChatMessages) => {
          const messages = data?.getMessagesForChat;
          if (!messages) {
            console.warn('NEW_DIRECT_MESSAGE received empty initial state within subscription', subscriptionData, data);
            return;
          }

          if (message.author.id === user && !messages.find(m => m.id === message.id)) messages.push(message);
        })
      )}
  });

  return {
    ready,
    messages,
    fetchMore,
    error: query.error,
    // @ts-ignore
    stale: query.stale
  };
};

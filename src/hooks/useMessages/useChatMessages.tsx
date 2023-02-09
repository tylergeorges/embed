import produce from "immer";
import { CHAT_MESSAGES, NEW_DIRECT_MESSAGE, READ_CHAT } from ".";
import { useMutation, useQuery, useSubscription } from "react-apollo-hooks";
import { ChatMessages, Message as MessageData } from "@generated";
import { NewDirectMessage } from "@generated/NewDirectMessage";
import { authStore, generalStore } from "@store";
import { Util } from "@lib/Util";
import { useContext, useEffect } from "react";
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
  const { spawn: spawnNotif, clearKey: clearNotifKey } = useContext(NotificationContext)

  const query = useQuery(CHAT_MESSAGES, {
    variables: { guild, user },
    skip: !user,
    fetchPolicy: 'network-only'
  });

  const markAsRead = useMutation(READ_CHAT)
  useEffect(() => {
    if (user) markAsRead({ variables: { guild, id: user } }) 
  }, [user])

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
        const chat = generalStore.chats.find(c => c.id === message.channelId)
        if (chat) {
          chat.content = message.content;

          const newChats = Util.moveToTopImmutable(generalStore.chats, chat);
          generalStore.setChats(newChats);
        } else {
          if (message.channelId === message.author.id) {
            generalStore.chats.unshift({ id: message.channelId, recipient: message.author, content: message.content, unreadMessages: 0 });
          }
        }
      }

      api.emit('directMessage', {
        message
      })

      if (message.channelId === user)
        markAsRead({ variables: { guild, id: user } })

      // Ensure we're not currently viewing the DM & also don't notify about own messages
      if (message.channelId !== user && message.author.id !== authStore.userID) {
        return spawnNotif({
          key: message.channelId,
          content: (
            <NavLink
              to={`/channels/${guild}/@${message.channelId}`}
              onClick={e => {
                clearNotifKey(message.channelId);

                closeSidebar();
                generalStore.setSidebarView(Views.Chats);
              }}
              children={<Message message={message} isFirstMessage={true} hideTimestamp={true} disableProfileClick={true} />}
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

          if (message.channelId === user && !messages.find(m => m.id === message.id)) messages.push(message);
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

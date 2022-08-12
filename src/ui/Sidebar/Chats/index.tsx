import {NavLink, useNavigate} from "react-router-dom";
import {observer} from "mobx-react";

import { Root, Chat, Avatar, Details, Preview, LoadingContainer, NewChatButton } from "./elements";
import CHATS from "./Chats.graphql";
import {authStore, generalStore} from "@store";
import { Chats, UserTag } from "@generated";
import { Member } from "@ui/Messages/elements";
import { useRouter } from "@hooks";
import { Loading } from "@ui/Overlays/Loading/elements";
import client from "@lib/apollo";
import USER_TAG from "@views/Messages/Header/UserTag.graphql";
import { FaPlus } from "react-icons/fa";
import { store } from "@models";

export const ChatSwitcher = observer(() => {
  if (!generalStore.chats)
    client.query<Chats>({ query: CHATS, variables: { guild: generalStore.guild.id }, fetchPolicy: 'network-only' })
      .then(({ data: { getChats: chats } }) => generalStore.setChats(chats))

  const { guild, channel } = useRouter();
  const navigate = useNavigate();

  if (!generalStore.chats) return <LoadingContainer><Loading /></LoadingContainer>

  const userId = channel?.startsWith('@') ? channel.substring(1) : null;
  if (userId && !generalStore.chats.find(r => r.recipient.id === userId)) {
    client.query<UserTag>({
      query: USER_TAG,
      variables: { guild, user: userId }
    }).then(({ data: { userData }}) => {
      if (!userData) return

      // If an external ID was passed in, change url to the WidgetBot id
      if (userId !== userData.id) navigate('@' + userData.id, { replace: true });

      if (generalStore.chats.find(r => r.recipient.id === userData.id)) return

      generalStore.setChats([
        {
          content: "",
          recipient: { ...userData, bot: false }
        },

        ...generalStore.chats,
      ]);
    });
  }

  return (
    <Root className="channels">
      {authStore.user && 'provider' in authStore.user && authStore.user.provider === 'Guild' &&
        <NewChatButton onClick={store.modal.openNewChat}><FaPlus /> New Chat</NewChatButton>}
      {generalStore.chats.map((chat) => (
        <NavLink
          key={chat.recipient.id}
          to={`/channels/${guild}/@${chat.recipient.id}`}
          children={
            <Chat selected={channel === '@'+chat.recipient.id}>
              <Avatar width={32} height={32} src={chat.recipient.avatarUrl} />
              <Details>
                <Member color={chat.recipient.color}>{chat.recipient.name}{chat.recipient.discrim !== '0000' ? `#${chat.recipient.discrim}` : ''}</Member>
                <Preview>{chat.content}</Preview>
              </Details>
            </Chat>
          }
          style={{ textDecoration: 'none' }}
        />
      ))}
    </Root>
  );
})

export default ChatSwitcher

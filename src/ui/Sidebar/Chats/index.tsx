import {NavLink, withRouter} from "react-router-dom";
import {observer} from "mobx-react";

import { Root, Chat, Avatar, Details, Preview, LoadingContainer } from "./elements";
import CHATS from "./Chats.graphql";
import {generalStore} from "@store";
import { Chats } from "@generated";
import { Member } from "@ui/Message/elements";
import { useRouter } from "@hooks";
import { Loading } from "@ui/Overlays/Loading/elements";
import client from "@lib/apollo";

export const ChatSwitcher = withRouter(observer(() => {
    if (!generalStore.chats)
        client.query<Chats>({ query: CHATS, variables: { guild: generalStore.guild.id }, fetchPolicy: 'network-only' })
            .then(({ data: { getChats: chats } }) => generalStore.setChats(chats))

    const { guild, channel } = useRouter()

    if (!generalStore.chats) return <LoadingContainer><Loading /></LoadingContainer>

    return (
        <Root className="channels">
            {generalStore.chats.map((chat) => (
                <NavLink
                    key={chat.recipient.id}
                    to={`/${guild}/@${chat.recipient.id}`}
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
    )

}))

export default ChatSwitcher

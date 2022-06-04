import {NavLink} from "react-router-dom";
import {observer} from "mobx-react";

import { Root, Chat, Avatar, Details, Preview } from "./elements";
import CHATS from "./Chats.graphql";
import {useQuery} from "react-apollo-hooks";
import {generalStore} from "@store";
import { Chats } from "@generated";
import { Member } from "@ui/Message/elements";
import { useRouter } from "@hooks";

export const ChatSwitcher = observer(({visible}) => {
    const { data: {getChats: chats} } = useQuery<Chats>(CHATS, { variables: { guild: generalStore.guild?.id }, fetchPolicy: 'network-only' })

    const { guild, channel } = useRouter()

    if (!chats) return null

    generalStore.setChats(chats)

    if (!visible) return null

    return (
            <Root className="channels">
                {chats.map((chat) => (
                <NavLink
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

});

export default ChatSwitcher

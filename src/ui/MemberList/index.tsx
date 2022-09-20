import { Avatar, MemberCardBase, MembersTitle, Root } from './elements'
import {observer} from 'mobx-react'
import { useParams } from "react-router-dom";
import { generalStore } from "@store";
import { Chats_getChats_DirectGroupChat } from "@generated";

const MemberList = observer(() => {
  const { user } = useParams();
  if (!user) return null;

  const chat = generalStore.chats?.find(c => c.id === user) as Chats_getChats_DirectGroupChat;
  if (!chat || chat.__typename !== 'DirectGroupChat') return null;

  const owner = chat.recipients.find(r => r.id === chat.ownerId);
  const recipients = [owner, ...chat.recipients.filter(r => r.id !== owner.id).sort()];

  return (
      <Root className="member-list">
        <MembersTitle>Members - {recipients.length}</MembersTitle>

        {recipients.map((member, idx) => (
          <MemberCardBase key={idx}>
            <Avatar width={32} height={32} src={member.avatarUrl} alt={`${member.name} avatar`} />
            {member.name}
          </MemberCardBase>
        ))}
        </Root>
    )
});


export default MemberList;

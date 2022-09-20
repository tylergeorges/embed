import { Avatar, MembersTitle, MemberCardBase, MemberBase, Root } from './elements'
import {observer} from 'mobx-react'
import { useParams } from "react-router-dom";
import { authStore, generalStore } from "@store";
import { Chats_getChats_DirectGroupChat } from "@generated";
import RemoveButton from "@ui/MemberList/RemoveButton";

const MemberList = observer(() => {
  const { user } = useParams();
  if (!user) return null;

  const chat = generalStore.chats?.find(c => c.id === user) as Chats_getChats_DirectGroupChat;
  if (!chat || chat.__typename !== 'DirectGroupChat') return null;

  const owner = chat.recipients.find(r => r.id === chat.ownerId);
  const recipients = [owner, ...chat.recipients.filter(r => r.id !== owner.id).sort()];

  const isGroupOwner = authStore.userID === chat.ownerId;

  return (
      <Root className="member-list">
        <MembersTitle>Members - {recipients.length}</MembersTitle>

        {recipients.map((member, idx) => (
          <MemberCardBase key={idx}>
            <MemberBase>
              <Avatar width={32} height={32} src={member.avatarUrl} alt={`${member.name} avatar`} />
              {member.name}
            </MemberBase>

            {isGroupOwner && authStore.userID !== member.id && <RemoveButton member={member.id} />}
          </MemberCardBase>
        ))}
        </Root>
    )
});


export default MemberList;

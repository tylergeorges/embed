import { MembersTitle, Root, Close } from './elements'
import {observer} from 'mobx-react'
import { useParams } from "react-router-dom";
import { authStore, generalStore } from "@store";
import { Chats_getChats_DirectGroupChat } from "@generated";
import MemberCard from "@ui/MemberList/MemberCard";
import { store } from "@models";
import * as React from "react";

const MemberList = observer(() => {
  const { user } = useParams();
  if (!user) return null;

  const chat = generalStore.chats?.find(c => c.id === user) as Chats_getChats_DirectGroupChat;
  if (!chat || chat.__typename !== 'DirectGroupChat') return null;

  const owner = chat.recipients.find(r => r.id === chat.ownerId);
  const recipients = [owner, ...chat.recipients.filter(r => r.id !== owner.id).sort()];

  const isGroupOwner = authStore.userID === chat.ownerId;

  return (
      <Root visible={store.memberlist.isOpen} className="member-list">
        {window.innerWidth < 520 && <Close onClick={store.memberlist.toggle}/>}
        <MembersTitle>Members - {recipients.length}</MembersTitle>

        {recipients.map((member, idx) => (
          <MemberCard key={idx} member={member} isGroupOwner={isGroupOwner} />
        ))}
        </Root>
    )
});


export default MemberList;

import { Avatar, MemberCardBase, MemberBase } from './elements'
import {observer} from 'mobx-react'
import { authStore } from "@store";
import { Chats_getChats_DirectGroupChat_recipients } from "@generated";
import RemoveButton from "@ui/MemberList/RemoveButton";
import { store } from "@models";
import { useState } from "react";

interface MemberCardProps {
  member: Chats_getChats_DirectGroupChat_recipients;
  isGroupOwner: boolean;
}

const MemberList = observer(({ member, isGroupOwner }: MemberCardProps) => {
  let cardRef: HTMLDivElement | null = null;

  function openProfile() {
    store.modal.openProfile(
      member.id,
      member.name,
      member.discrim,
      member.avatarUrl,
      member.bot,
      false,
      member.flags,
      false,
      undefined,
      true,

      cardRef.getBoundingClientRect().x - (innerWidth > 520 ? 320 : 150),
      cardRef.getBoundingClientRect().y + (innerWidth > 520 ? 0 : 50),
    )
  }

  return (
    <MemberCardBase innerRef={ref => cardRef = ref}>
      <MemberBase onClick={() => openProfile()}>
        <Avatar width={32} height={32} src={member.avatarUrl} alt={`${member.name} avatar`} />
        {member.name}
      </MemberBase>

      {isGroupOwner && authStore.userID !== member.id && <RemoveButton member={member.id} />}
    </MemberCardBase>
  );
});


export default MemberList;

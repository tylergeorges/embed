import { useEffect, useState } from "react";
import { RemoveButtonBase } from './elements'
import {observer} from 'mobx-react'
import { useMutation } from "react-apollo-hooks";
import REMOVE_MEMBER from './RemoveMember.graphql';
import { RemoveMember } from "@generated";
import { generalStore } from "@store";
import { useParams } from "react-router-dom";

interface RemoveButtonProps {
  member: string;
}

const RemoveButton = observer((props: RemoveButtonProps) => {
  const { user } = useParams();
  if (!user) return;

  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!pressed) return;

    setTimeout(() => {
      setPressed(false);
    }, 5000);
  }, [pressed]);

  const removeMemberMutation = useMutation<RemoveMember>(REMOVE_MEMBER);
  function handleClick() {
    if (!pressed) {
      setPressed(true);
      return;
    }

    setPressed(false);

    const chat = generalStore.chats?.find(r => r.id === user);
    if (!chat || !('recipients' in chat)) return;

    removeMemberMutation({
      variables: { guild: generalStore.guild.id, chat: chat.id, member: props.member },
    }).then(() => {
      chat.recipients = chat.recipients.filter(r => r.id !== props.member);
    })
  }

  return (
    <RemoveButtonBase pressed={pressed} role="img" width="16" height="16" viewBox="0 0 24 24" onClick={() => handleClick()}>
      <path fill="currentColor"
            d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
    </RemoveButtonBase>
  )
});


export default RemoveButton;

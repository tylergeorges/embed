import { LeaveGroup } from '@generated'
import { store } from '@models'
import { generalStore } from '@store'
import { closeSidebar } from '@ui/shared/Channel/link'
import { useMutation } from 'react-apollo-hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../Upload/elements'
import { Close, List, Root, Title, Top } from './elements'
import LEAVE_GROUP from "./LeaveGroup.graphql";
import { Views } from "@ui/Sidebar";

const LeaveGroup = () => {
  const { user } = useParams();
  const navigate = useNavigate();

  const chat = generalStore.chats?.find(r => r.id === user);
  if (!chat || !('recipients' in chat)) return null;

  const leaveGroupMutation = useMutation<LeaveGroup>(LEAVE_GROUP);
  function leaveGroup() {
    leaveGroupMutation({
      variables: { guild: generalStore.guild.id, chat: chat.id },
    })
      .then(({ data: { leaveGroup } }) => {
        store.modal.close();

        const newChats = generalStore.chats.filter(r => r.id !== chat.id);
        generalStore.setChats(newChats);

        navigate('..') // Close DM as we're not in it now
        generalStore.setSidebarView(Views.Channels);
      });
  }

  return (
    <Root className="new-chat">
      <Top className="top">
        <Title>Leave group</Title>
        <Close onClick={store.modal.close} />
      </Top>

      <List className="list">
        Are you sure you want to leave this group? You won't be able to rejoin this group unless you are re-invited.

        <Button
          variant="large"
          className="button"
          onClick={leaveGroup}
        >
          Leave Group
        </Button>
      </List>
    </Root>
  )
}

export default LeaveGroup;

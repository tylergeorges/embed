import { generalStore } from '@store'
import { observer } from 'mobx-react'
import { LeaveGroupButton } from './elements';
import Tooltip from 'rc-tooltip'
import { AddMember, Chats_getChats_DirectGroupChat, LeaveGroup } from "@generated";
import LEAVE_GROUP from './LeaveGroup.graphql';
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-apollo-hooks";
import { Views } from "@ui/Sidebar";

export default observer(() => {
    const { user } = useParams();
    if (!user) return;
    const navigate = useNavigate();

    const leaveGroupMutation = useMutation<LeaveGroup>(LEAVE_GROUP);
    function leaveGroup() {
        const chat = generalStore.chats?.find(r => r.id === user);
        if (!chat || !('recipients' in chat)) return;

        leaveGroupMutation({
            variables: { guild: generalStore.guild.id, chat: chat.id },
        })
          .then(({ data: { leaveGroup } }) => {
              const newChats = generalStore.chats.filter(r => r.id !== chat.id);
              generalStore.setChats(newChats);

              navigate('..') // Close DM as we're not in it now
              generalStore.setSidebarView(Views.Channels)
          });
    }

    return <>
        <Tooltip
            placement="bottom"
            overlay="Leave Group"
        >
            <LeaveGroupButton onClick={() => leaveGroup()} className="leave-group-button" x="0" y="0" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 512 512"><path fill="currentColor" d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z"/></LeaveGroupButton>
        </Tooltip>
    </>
})

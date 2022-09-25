import { generalStore } from '@store'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { Display, Title, List, AddMemberButton, Member, NoMembers, SearchBase } from './elements';
import { Loading } from '@ui/Overlays/Loading/elements'
import Tooltip from 'rc-tooltip'
import client from "@lib/apollo";
import { DirectUsers, DirectUsers_directUsers, AddMember, Chats_getChats_DirectGroupChat } from "@generated";
import DIRECT_USERS from "@ui/Modal/screens/Newchat/DirectUsers.graphql";
import ADD_MEMBER from './AddMember.graphql';
import { Avatar } from '@ui/MemberList/elements';
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-apollo-hooks";
import { debounce } from "lodash";
import { Field } from "@ui/Modal/screens/Newchat/elements";
import { Input } from "@ui/Modal/screens/Authenticate/elements";

export default observer(() => {
    const { user } = useParams();
    if (!user) return;

    const [right, setRight] = useState(0)
    let button: HTMLElement
    let display: HTMLDivElement

    useEffect(() => {
        setRight(innerWidth - button.getBoundingClientRect().right)

        const handleClickOutside = (event: MouseEvent) => {
            if (![display, button].some(e => e?.contains(event.target as Node))) generalStore.togglePins(false)
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    });

    let searchTerm = '';

    const fetch = (search: string) => {
        client.query<DirectUsers>({
            query: DIRECT_USERS,
            variables: {
                name: search
            },
            fetchPolicy: 'network-only'
        }).then(({ data: { directUsers } }) => {
              const chat = generalStore.chats?.find(r => r.id === user) as Chats_getChats_DirectGroupChat;
              if (!chat || !('recipients' in chat)) return;

              setDirectUsers(directUsers.filter(directUser => !chat.recipients.find(r => r.id === directUser.id)));
          });
    };
    const fetchDebounced = debounce((search: string) => fetch(search), 250);

    const setSearchTerm = (value: string) => {
        searchTerm = value;

        fetchDebounced(value);
    };

    const [directUsers, setDirectUsers] = useState<DirectUsers_directUsers[] | null>(null);

    useEffect(() => {
        if (!generalStore.addMembersOpen) {
            setDirectUsers(null);
            return;
        }

        fetch(searchTerm);
    }, [generalStore.addMembersOpen])

    const addMemberMutation = useMutation<AddMember>(ADD_MEMBER);
    function addMember(id: string) {
        const chat = generalStore.chats?.find(r => r.id === user);
        if (!chat || !('recipients' in chat)) return;

        addMemberMutation({
            variables: { guild: generalStore.guild.id, chat: chat.id, member: id },
        })
          .then(({ data: { addMember } }) => {
              (chat as Chats_getChats_DirectGroupChat).recipients.push(addMember);

              generalStore.toggleAddMembersOpen(false);
          });
    }

    return <>
        <Tooltip
            placement="bottom"
            overlay="Add Member"
        >
            <AddMemberButton innerRef={ref => (button = ref)} onClick={() => generalStore.toggleAddMembersOpen()} open={generalStore.addMembersOpen} className="add-members-button" x="0" y="0" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M21 3H24V5H21V8H19V5H16V3H19V0H21V3ZM10 12C12.205 12 14 10.205 14 8C14 5.795 12.205 4 10 4C7.795 4 6 5.795 6 8C6 10.205 7.795 12 10 12ZM10 13C5.289 13 2 15.467 2 19V20H18V19C18 15.467 14.711 13 10 13Z"></path></AddMemberButton>
        </Tooltip>

        {generalStore.addMembersOpen && <Display right={right} innerRef={ref => (display = ref)} className="add-member-display">
            <Title className="add-members-title">Choose Member</Title>
            <List className="add-members-list">

                <SearchBase>
                    <Field className="message-field">
                        <span>Search Users</span>
                        <Input
                          onChange={(e => setSearchTerm(e.target.value))}
                          autoFocus={true}
                          maxLength={2000}
                          className="input"
                        />
                    </Field>
                </SearchBase>

                {directUsers
                    ? directUsers.length
                        ? directUsers.map(member => <Member key={member.id} className="add-member-member" onClick={() => addMember(member.id)}>
                        <Avatar width={32} height={32} src={member.avatarUrl} alt={`${member.name} avatar`} />
                        {member.name}
                        </Member>)
                        : <NoMembers className="no-pins">
                            <span>Looks like there's no-one to invite to this group</span>
                          </NoMembers>
                    : <div style={{ height: '300px' }}><Loading /></div>
                }
            </List>
        </Display>}
    </>
})

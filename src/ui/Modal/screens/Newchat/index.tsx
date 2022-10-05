import {
  CreateGroup,
  CreateGroupVariables,
  DirectUsers,
  DirectUsers_directUsers
} from '@generated'
import { useRouter } from '@hooks'
import { store } from '@models'
import { generalStore } from '@store'
import { Member } from '@ui/Messages/elements'
import { closeSidebar } from '@ui/shared/Channel/link'
import { Avatar, Details } from '@ui/Sidebar/Chats/elements'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import { useNavigate } from 'react-router-dom'
import { Input } from '../Authenticate/elements'
import { Button, Checkbox } from '../Upload/elements'
import DIRECT_USERS from './DirectUsers.graphql'
import { Close, Field, List, Root, Title, Top, User, UserWrapper, SearchBase, ListBase, ActionsBase, MessageBase } from './elements'
import CREATE_GROUP from './CreateGroup.graphql'
import { debounce } from "lodash";
import client from "@lib/apollo";
import { observer } from "mobx-react";

interface SelectedUser {
  id: string;
  name: string;
}

const NewChat = observer(() => {
  const { guild } = useRouter();
  const navigate = useNavigate();
  const createGroup = useMutation<CreateGroup, CreateGroupVariables>(CREATE_GROUP);
  const [directUsers, setDirectUsers] = useState<DirectUsers_directUsers[]>([]);
  let searchTerm = '';

  const closeModal = () => {
    setUsers([]);
    setDirectUsers([]);
    store.modal.close();
  }

  const fetch = (search: string) => {
    client.query<DirectUsers>({
      query: DIRECT_USERS,
      variables: {
        name: search
      },
      fetchPolicy: 'network-only'
    }).then(({ data: { directUsers } }) => {
      setDirectUsers(directUsers);
    })
  };
  const fetchDebounced = debounce((search: string) => fetch(search), 250);

  const setSearchTerm = (value: string) => {
    searchTerm = value;

    fetchDebounced(value);
  };

  useEffect(() => {
    if (store.modal.type !== 'newchat') return;

    if (store.modal.isOpen) {
      fetch(searchTerm);
    }
  }, [store.modal.isOpen]);

  const [users, setUsers] = useState<SelectedUser[]>([]);
  const addUser = (user: SelectedUser) => {
    if (users.some(x => x.id === user.id)) return;

    setUsers([user, ...users]);
  }

  const removeUser = (userId: string) => setUsers(users.filter(x => x.id !== userId));

  const [message, setMessage] = useState('')

  return (
    <Root className="new-chat">
      <Top className="top">
        <Title>New Chat</Title>
        <Close onClick={closeModal} />
      </Top>

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

      <ListBase>
        <List className="list">
          {directUsers.map(user => (
            <UserWrapper key={user.id}>
              <Checkbox className="checkbox-field">
                <input
                  type="checkbox"
                  checked={users.some(r => r.id === user.id)}
                  onChange={e => {
                    e.target.checked ? addUser({ id: user.id, name: user.name}) : removeUser(user.id)
                  }}
                />
                <span className="checkbox">
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"></path></svg>
                </span>
                <User>
                  <Avatar width={32} height={32} src={user.avatarUrl} />
                  <Details>
                    <Member color={user.color}>{user.name}{user.discrim !== '0000' ? `#${user.discrim}` : ''}</Member>
                  </Details>
                </User>
              </Checkbox>
            </UserWrapper>
          ))}
        </List>

        <ActionsBase>
          {users.length > 1 && <MessageBase>
            <Field className="message-field">
              <span>Enter a message</span>
              <Input
                onChange={(e => setMessage(e.target.value))}
                autoFocus={true}
                maxLength={2000}
                className="input"
              />
            </Field>
          </MessageBase>}
          <Button
            variant="large"
            className="button"
            disabled={!users.length || users.length > 1 && !message}
            onClick={async () => {
              if (users.length === 1)
                navigate(`/channels/${guild}/@${users[0].id}`)
              else {
                const { data: { createGroup: group } } = await createGroup({ variables: { guild, memberIds: users.map(r => r.id), content: message}})
                generalStore.chats.unshift(group)
                navigate(`/channels/${guild}/@${group.id}`)
              }

              closeModal();
              closeSidebar()
            }}
          >
            {!users.length ? 'Select Users' : users.length === 1 ? `Message ${users[0].name}` : `Create Group with ${users.length} Users`}
          </Button>
        </ActionsBase>
      </ListBase>
    </Root>
  )
});

export default NewChat

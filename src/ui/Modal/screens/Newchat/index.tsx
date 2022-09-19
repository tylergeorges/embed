import { CreateGroup, CreateGroupVariables, DirectUsers } from '@generated'
import { useRouter } from '@hooks'
import { store } from '@models'
import { generalStore, settingsStore } from '@store'
import { Member } from '@ui/Messages/elements'
import { Loading } from '@ui/Overlays'
import { closeSidebar } from '@ui/shared/Channel/link'
import { Avatar, Details } from '@ui/Sidebar/Chats/elements'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-apollo-hooks'
import { NavLink, useNavigate } from 'react-router-dom'
import { Input } from '../Authenticate/elements'
import { Button, Checkbox } from '../Upload/elements'
import DIRECT_USERS from './DirectUsers.graphql'
import { Close, Field, List, Root, Title, Top, User, UserWrapper } from './elements'
import CREATE_GROUP from './CreateGroup.graphql'


const NewChat = () => {
  const { guild } = useRouter()
  const navigate = useNavigate()

  const createGroup = useMutation<CreateGroup, CreateGroupVariables>(CREATE_GROUP)

  const { data: { directUsers }, loading, error } = useQuery<DirectUsers>(DIRECT_USERS, { fetchPolicy: 'network-only' })

  const [users, setUsers] = useState(new Set<string>());

  const addUser = (user: string) => setUsers(set => new Set(set).add(user))

  const removeUser = (user: string) =>
    setUsers(old => {
      const set = new Set(old)
      set.delete(user)
      return set
    })

  const [message, setMessage] = useState('')

  if (loading) return <Loading />;

  if (!directUsers) return (
      <Root>
        <Top>
          <Title>Error Fetching Users</Title>
          <Close onClick={store.modal.close} />
        </Top>
        {error && <div style={{ margin: '1rem' }}>
          {error.message}
        </div>}
      </Root>
    )

  let contentField: HTMLInputElement;

  return (
    <Root className="new-chat">
      <Top className="top">
        <Title>New Chat</Title>
        <Close onClick={store.modal.close} />
      </Top>
      <List className="list">
        {directUsers.map(user => (
          <UserWrapper key={user.id}>
            <Checkbox className="checkbox-field">
              <input
                type="checkbox"
                checked={users.has(user.id)}
                onChange={e => {
                  e.target.checked ? addUser(user.id) : removeUser(user.id)
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
        {users.size > 1 && <Field className="message field">
          <span>Enter a message</span>
          <Input
            onChange={(e => setMessage(e.target.value))}
            autoFocus={true}
            maxLength={2000}
            className="input"
          />
        </Field>}
        <Button
          variant="large"
          className="button"
          disabled={!users.size || users.size > 1 && !message}
          onClick={async () => {
            if (users.size === 1)
              navigate(`/channels/${guild}/@${users.values().next().value}`)
            else {
              const { data: { group } } = await createGroup({ variables: { guild, memberIds: [...users], content: message}})
              generalStore.chats.unshift(group)
              navigate(`/channels/${guild}/@${group.id}`)
            }

            store.modal.close()
            closeSidebar()
          }}
        >
          {!users.size ? 'Select Users' : users.size === 1 ? `Message ${directUsers.find(u => u.id === users.values().next().value).name}` : `Create Group with ${users.size} Users`}
        </Button>
      </List>
    </Root>
  )
}

export default NewChat

import { DirectUsers } from '@generated'
import { useRouter } from '@hooks'
import { store } from '@models'
import { Member } from '@ui/Message/elements'
import { Loading } from '@ui/Overlays'
import { Avatar, Details } from '@ui/Sidebar/Chats/elements'
import { useQuery } from 'react-apollo-hooks'
import { NavLink } from 'react-router-dom'
import DIRECT_USERS from './DirectUsers.graphql'
import { Close, List, Root, Title, Top, User, UserWrapper } from './elements'

const NewChat = () => {
  const { guild } = useRouter()

  const { data: { directUsers }, loading, error } = useQuery<DirectUsers>(DIRECT_USERS, { fetchPolicy: 'network-only' })

  if (loading) return <Loading />;

  if (!directUsers) return (
      <Root>
        <Top>
          <Title>Error Fetching Users</Title>
          <Close onClick={store.modal.close} />
        </Top>
        <div style={{ margin: '1rem' }}>
          {error.message}
        </div>
      </Root>
    )

  return (
    <Root>
      <Top>
        <Title>New Chat</Title>
        <Close onClick={store.modal.close} />
      </Top>
      <List>
        {directUsers.map(user => (
          <UserWrapper>
            <NavLink
              key={user.id}
              to={`/channels/${guild}/@${user.id}`}
              onClick={store.modal.close}
              children={
                <User>
                    <Avatar width={32} height={32} src={user.avatarUrl} />
                    <Details>
                        <Member color={user.color}>{user.name}{user.discrim !== '0000' ? `#${user.discrim}` : ''}</Member>
                    </Details>
                </User>
              }
              style={{ textDecoration: 'none' }}
            />
          </UserWrapper>
        ))}
      </List>
    </Root>
  )
}

export default NewChat

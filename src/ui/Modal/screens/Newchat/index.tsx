import { Chats } from '@generated'
import { useRouter } from '@hooks'
import { store } from '@models'
import { Member } from '@ui/Message/elements'
import { Loading } from '@ui/Overlays'
import { Avatar, Details } from '@ui/Sidebar/Chats/elements'
import { useQuery } from 'react-apollo-hooks'
import { NavLink } from 'react-router-dom'
import CHATS from '../../../Sidebar/Chats/Chats.graphql'
import { Close, List, Root, Title, Top, User, UserWrapper } from './elements'

const NewChat = () => {
  const { guild } = useRouter()

  // need to change this to directUsers; for now using Chats for sample data
  const { data: {getChats: chats}, loading } = useQuery<Chats>(CHATS, { variables: { guild }, fetchPolicy: 'network-only' })
  
  if (loading) return <Loading />;

  return (
    <Root>
      <Top>
        <Title>New Chat</Title>
        <Close onClick={store.modal.close} /> 
      </Top>
      <List>
        {chats.map((chat) => (
          <UserWrapper>
            <NavLink
              key={chat.recipient.id}
              to={`/${guild}/@${chat.recipient.id}`}
              onClick={store.modal.close}
              children={
                <User>
                    <Avatar width={32} height={32} src={chat.recipient.avatarUrl} />
                    <Details>
                        <Member color={chat.recipient.color}>{chat.recipient.name}{chat.recipient.discrim !== '0000' ? `#${chat.recipient.discrim}` : ''}</Member>
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

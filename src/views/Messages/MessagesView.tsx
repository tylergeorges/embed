import * as React from 'react'
import Wrapper from '@ui/Wrapper'
import { Header, Fallback } from './Header'
import { Chat } from '@ui/Chat'
import { DirectChat } from '@ui/Chat/DirectChat'
import { Messages } from './Messages'
import { Loading } from '@ui/Overlays'
import { observer } from "mobx-react";
import { useEffect } from "react";
import {authStore, generalStore, settingsStore} from "@store";
import Messages2ElectricBoogaloo
  from "@views/Messages/Messages2ElectricBoogaloo";
import { useNavigate, useParams } from 'react-router-dom'
import { Views } from '@ui/Sidebar'

const queryParams = new URLSearchParams(location.search)

const MessagesView = observer(() => {
  const { guild, channel, user } = useParams()

  useEffect(() => {
    generalStore.clearThread(); // Channel changed, cant be looking at a thread anymore
    generalStore.readChannel(channel)
  }, [channel]);

  const [dmLoginFailed, setDMLoginFailed] = React.useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    if (user && !authStore.user && !queryParams.has('username') && !queryParams.has('token')) {
      let ls: Storage
      try {
        ls = localStorage
      } catch (e) {
        generalStore.toggleMenu(true)
        setDMLoginFailed(true)
      }

      if (ls) {
        navigate('..') // Close DM if not logged in
        generalStore.setSidebarView(Views.Channels)
      }
    }
  }, [user, authStore.user])

  // for DMs, if dynamic usernames or guild auth are being used, we might need to wait until the user is logged in
  if (user && !authStore.user && (queryParams.has('username') || queryParams.has('token') || dmLoginFailed)) return null;
  const chat = user ? generalStore.chats?.find(c => c.id === user) : undefined;

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {!(generalStore.activeThread && generalStore.threadFullscreen) && (
        <Wrapper hideOnMobile={Boolean(generalStore.activeThread)} showMemberList={chat && 'ownerId' in chat}>
          <React.Suspense fallback={<Fallback />}>
            <Header channel={channel} chatUser={user}/>
          </React.Suspense>

          <React.Suspense fallback={<Loading />}>
            {settingsStore.messageViewRewriteEnabled ? (
              <Messages2ElectricBoogaloo guild={guild} channel={channel} chatUser={user} />
            ) : (
              <Messages guild={guild} channel={channel} chatUser={user} />
            )}

          </React.Suspense>
          {user ? <DirectChat /> : <Chat />}
        </Wrapper>
      )}

      {generalStore.activeThread && (
        // TODO: I should use a context here realistically, rather than passing thread deep down various components
        <Wrapper threadFullscreen={generalStore.threadFullscreen}>
          <React.Suspense fallback={<Fallback />}>
            <Header channel={channel} chatUser={user} thread />
          </React.Suspense>

          <React.Suspense fallback={<Loading />}>
            {settingsStore.messageViewRewriteEnabled ? (
              <Messages2ElectricBoogaloo guild={guild} channel={channel} thread />
            ) : (
              <Messages guild={guild} channel={channel} thread />
            )}
          </React.Suspense>
          <Chat thread />
        </Wrapper>
      )}
    </div>
  )
})

export default MessagesView;

import * as React from 'react'
import Wrapper from '@ui/Wrapper'
import { Header, Fallback } from './Header'
import { Chat } from '@ui/Chat'
import { DirectChat } from '@ui/Chat/DirectChat'
import { Messages } from './Messages'
import { Loading } from '@ui/Overlays'
import { observer } from "mobx-react";
import { useEffect } from "react";
import { authStore, generalStore } from "@store";
import { useNavigate, useParams } from 'react-router-dom'
import { Views } from '@ui/Sidebar'

const MessagesView = observer(() => {
  const { guild, channel, user } = useParams()

  useEffect(() => {
    generalStore.clearThread(); // Channel changed, cant be looking at a thread anymore
  }, [channel]);

  const navigate = useNavigate()
  useEffect(() => {
    if (user && !authStore.user) {
      navigate('..') // Close DM if not logged in
      generalStore.setSidebarView(Views.Channels)
    }
  }, [user, authStore.user])

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {!(generalStore.activeThread && generalStore.threadFullscreen) && (
        <Wrapper hideOnMobile={!!generalStore.activeThread}>
          <React.Suspense fallback={<Fallback />}>
            <Header channel={channel} chatUser={user}/>
          </React.Suspense>

          <React.Suspense fallback={<Loading />}>
            <Messages guild={guild} channel={channel} chatUser={user} />
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
            <Messages guild={guild} channel={channel} chatUser={user} thread />
          </React.Suspense>
          <Chat thread />
        </Wrapper>
      )}
    </div>
  )
})

export default MessagesView;

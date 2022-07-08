import * as React from 'react'
import Wrapper from '@ui/Wrapper'
import { Header, Fallback } from './Header'
import { Chat } from '@ui/Chat'
import { Messages } from './Messages'
import { Loading } from '@ui/Overlays'
import { observer } from "mobx-react";
import { useEffect } from "react";
import { generalStore } from "@store";
import { useRouter } from '@hooks'

const MessagesView = observer(() => {
  const { guild, channel } = useRouter()

  useEffect(() => {
    generalStore.clearThread(); // Channel changed, cant be looking at a thread anymore
  }, [channel]);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {!(generalStore.activeThread && generalStore.threadFullscreen) && (
        <Wrapper hideOnMobile={!!generalStore.activeThread}>
          <React.Suspense fallback={<Fallback />}>
            <Header channel={channel} guild={guild}/>
          </React.Suspense>

          <React.Suspense fallback={<Loading />}>
            <Messages guild={guild} channel={channel} />
          </React.Suspense>
          <Chat />
        </Wrapper>
      )}

      {generalStore.activeThread && (
        // TODO: I should use a context here realistically, rather than passing thread deep down various components
        <Wrapper threadFullscreen={generalStore.threadFullscreen}>
          <React.Suspense fallback={<Fallback />}>
            <Header channel={channel} guild={guild} thread />
          </React.Suspense>

          <React.Suspense fallback={<Loading />}>
            <Messages guild={guild} channel={channel} thread />
          </React.Suspense>
          <Chat thread />
        </Wrapper>
      )}
    </div>
  )
})

export default MessagesView;

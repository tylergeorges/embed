import * as React from 'react'
import Wrapper from '@ui/Wrapper'
import { Header, Fallback } from './Header'
import { Chat } from '@ui/Chat'
import { Loading } from '@ui/Overlays'
import { observer } from "mobx-react";
import { useEffect } from "react";
import {generalStore, settingsStore} from "@store";
import { useRouter } from '@hooks'
import Messages2ElectricBoogaloo
  from "@views/Messages/Messages2ElectricBoogaloo";
import {Messages} from "@views/Messages/Messages";

const MessagesView = observer(() => {
  const { guild, channel } = useRouter()

  useEffect(() => {
    generalStore.clearThread(); // Channel changed, cant be looking at a thread anymore
  }, [channel]);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {!(generalStore.activeThread && generalStore.threadFullscreen) && (
        <Wrapper hideOnMobile={Boolean(generalStore.activeThread)}>
          <React.Suspense fallback={<Fallback />}>
            <Header channel={channel} guild={guild}/>
          </React.Suspense>

          <React.Suspense fallback={<Loading />}>
            {settingsStore.messageViewRewriteEnabled ? (
              <Messages2ElectricBoogaloo guild={guild} channel={channel} />
            ) : (
              <Messages guild={guild} channel={channel} />
            )}
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

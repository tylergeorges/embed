import * as React from 'react'
import Wrapper from '@ui/Wrapper'
import { Header, Fallback } from './Header'
import { Chat } from '@ui/Chat'
import { DirectChat } from '@ui/Chat/DirectChat'
import { Messages } from './Messages'
import { Loading } from '@ui/Overlays'
import { observer } from "mobx-react";
import { useEffect } from "react";
import { generalStore } from "@store";

interface Props {
  match: {
    params: {
      guild: string
      channel?: string
      user?: string
    }
  }
}

const MessagesView = observer((props: Props) => {
  useEffect(() => {
    generalStore.clearThread(); // Channel changed, cant be looking at a thread anymore
  },[props.match.params.channel]);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {!(generalStore.activeThread && generalStore.threadFullscreen) && (
        <Wrapper hideOnMobile={!!generalStore.activeThread}>
          <React.Suspense fallback={<Fallback />}>
            <Header channel={props.match.params.channel} chatUser={props.match.params.user} />
          </React.Suspense>

          <React.Suspense fallback={<Loading />}>
            <Messages guild={props.match.params.guild} channel={props.match.params.channel} chatUser={props.match.params.user} />
          </React.Suspense>
          {props.match.params.user ? <DirectChat /> : <Chat />}
        </Wrapper>
      )}

      {generalStore.activeThread && (
        // TODO: I should use a context here realistically, rather than passing thread deep down various components
        <Wrapper threadFullscreen={generalStore.threadFullscreen}>
          <React.Suspense fallback={<Fallback />}>
            <Header channel={props.match.params.channel} chatUser={props.match.params.user} thread />
          </React.Suspense>

          <React.Suspense fallback={<Loading />}>
            <Messages guild={props.match.params.guild} channel={props.match.params.channel} chatUser={props.match.params.user} thread />
          </React.Suspense>
          <Chat thread />
        </Wrapper>
      )}
    </div>
  )
})

export default MessagesView;

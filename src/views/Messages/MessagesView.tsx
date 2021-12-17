import * as React from 'react'
import Wrapper from '@ui/Wrapper'
import { Header, Fallback } from './Header'
import { Chat } from '@ui/Chat'
import { Messages } from './Messages'
import { Loading } from '@ui/Overlays'
import { observer } from "mobx-react";
import { useEffect } from "react";
import { generalStore } from "@store";

interface Props {
    match: {
        params: {
            channel: string,
            guild: string
        }
    }
}

const MessagesView = observer((props: Props) => {
  useEffect(() => {
    // TODO: Set to null, this is hardcoded for testing
    generalStore.setActiveThread({ // Channel changed, cant be looking at a thread anymore
      id: '919704634589851698',
      name: 'TODO: Dynamic thread name',
      archivedAt: null,
      locked: false,
      messageCount: 10,
    });
  },[props.match.params.channel]);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Wrapper>
        <React.Suspense fallback={<Fallback />}>
          <Header channel={props.match.params.channel} guild={props.match.params.guild}/>
        </React.Suspense>

        <React.Suspense fallback={<Loading />}>
          <Messages guild={props.match.params.guild} channel={props.match.params.channel} />
        </React.Suspense>
        <Chat />
      </Wrapper>

      {generalStore.activeThread && (
        <Wrapper factorSidebar={false}>
          <React.Suspense fallback={<Fallback />}>
            <Header channel={props.match.params.channel} guild={props.match.params.guild} thread />
          </React.Suspense>

          <React.Suspense fallback={<Loading />}>
            <Messages guild={props.match.params.guild} channel={props.match.params.channel} thread />
          </React.Suspense>
          <Chat />
        </Wrapper>
      )}
    </div>
  )
})

export default MessagesView;

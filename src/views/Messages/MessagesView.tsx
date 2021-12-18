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
    // TODO: use clearThread & delete below once thread opening is implemented
    // generalStore.clearThread(); // Channel changed, cant be looking at a thread anymore

    generalStore.setActiveThread({
      id: '919704456059297812',
      name: 'TODO: Dynamic thread name',
      archivedAt: null,
      locked: false,
      messageCount: 10,
    });
    generalStore.setThreadFullscreen(false);
  },[props.match.params.channel]);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {!(generalStore.activeThread && generalStore.threadFullscreen) && (
        <Wrapper>
          <React.Suspense fallback={<Fallback />}>
            <Header channel={props.match.params.channel} guild={props.match.params.guild}/>
          </React.Suspense>

          <React.Suspense fallback={<Loading />}>
            <Messages guild={props.match.params.guild} channel={props.match.params.channel} />
          </React.Suspense>
          <Chat />
        </Wrapper>
      )}

      {generalStore.activeThread && (
        <Wrapper factorSidebar={generalStore.threadFullscreen}>
          <React.Suspense fallback={<Fallback />}>
            <Header channel={props.match.params.channel} guild={props.match.params.guild} thread />
          </React.Suspense>

          <React.Suspense fallback={<Loading />}>
            <Messages guild={props.match.params.guild} channel={props.match.params.channel} thread />
          </React.Suspense>
          <Chat thread />
        </Wrapper>
      )}
    </div>
  )
})

export default MessagesView;

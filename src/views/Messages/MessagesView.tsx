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
            guild: string // TODO: lmao
        }
    }
}

const MessagesView = observer((props: Props) => {
  useEffect(() => {
    // TODO: Set to null, this is hardcoded for testing
    generalStore.setActiveThread('919704634589851698'); // Channel changed, cant be looking at a thread anymore
  },[props.match.params.channel]);

  return (
    <Wrapper>
      <React.Suspense fallback={<Fallback />}>
        <Header channel={props.match.params.channel} guild={props.match.params.guild}/>
      </React.Suspense>

      <React.Suspense fallback={<Loading />}>
        <Messages guild={props.match.params.guild} channel={props.match.params.channel} />
      </React.Suspense>
      <Chat />
    </Wrapper>
  )
})

export default MessagesView;

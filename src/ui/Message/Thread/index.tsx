import * as React from 'react'
import { Message_thread } from "@generated";
import { generalStore } from "@store";
import { Archived, MessageCount, ThreadBox, ThreadName } from "./elements";
import { Locale } from "@lib/Locale";

interface Props {
  thread: Message_thread
}

class Thread extends React.PureComponent<Props, any> {
  theme = message => theme => ({
    ...theme,
    message
  });

  render() {
    const thread = this.props.thread;

    return (
      <ThreadBox onClick={() => generalStore.setActiveThread(thread)}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ThreadName>{thread.name}</ThreadName>
          <MessageCount>{thread.messageCount} message{thread.messageCount === 1 ? '' : 's'} ›</MessageCount>
        </div>

        {thread.archivedAt && (
          <Archived>
            <i>{Locale.translate('frontend.messages.threadarchived')}</i>
          </Archived>
        )}
      </ThreadBox>
    )
  }
}

export default Thread;

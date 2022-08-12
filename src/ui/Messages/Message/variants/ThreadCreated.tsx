import {
  Message_author,
  Message_messageReference,
  Message_thread
} from "@generated";
import {
  IconsBase,
  SystemMessageBase,
  SystemMessageContentBase, SystemMessageLinkBase
} from "@ui/Messages/Message/elements";
import LargeTimestamp from "@ui/Messages/Message/LargeTimestamp";
import MessageAuthor from "@ui/Messages/Message/MessageAuthor";
import {generalStore} from "@store";
import {useCallback} from "react";
import ThreadButton from "@ui/Messages/Content/Thread/ThreadButton";
import {MessageType} from "@generated/globalTypes";

interface ThreadCreatedProps {
  createdAt: number;
  thread: Message_thread;
  author: Message_author;
  messageReference: Message_messageReference;
  messageId: string;
  messageContent: string;
}

function ThreadCreated(props: ThreadCreatedProps) {
  const openThread = useCallback(() => generalStore.setActiveThread({
    id: props.messageReference.channelId,
    name: props.messageContent,
    messageCount: 0,
    archivedAt: null,
    locked: false
  }), [props.messageId, props.messageContent]);

  if (props.thread === null)
    return (
      <SystemMessageBase>
        <SystemMessageContentBase>
          <IconsBase.ThreadCreated centerVertically={false} />
          <MessageAuthor author={props.author} onlyShowUsername={true} />{" "}
          started a thread:{" "}
          <SystemMessageLinkBase onClick={openThread}>
            {props.messageContent}
          </SystemMessageLinkBase>
        </SystemMessageContentBase>
        <LargeTimestamp timestamp={props.createdAt} />
      </SystemMessageBase>
    );

  return (
    <SystemMessageBase>
      <SystemMessageContentBase>
        <IconsBase.ThreadCreated centerVertically={false} />
        <MessageAuthor author={props.author} onlyShowUsername={true} />{" "}
        started a thread:{" "}
        <SystemMessageLinkBase onClick={openThread}>
          {props.thread.name}
        </SystemMessageLinkBase>
      </SystemMessageContentBase>
      <LargeTimestamp timestamp={props.createdAt} />
      <ThreadButton
        thread={props.thread}
        messageId={props.messageId}
        messageContent={props.messageContent}
        messageType={MessageType.ThreadCreated}
        hasReply={false}
      />
    </SystemMessageBase>
  );
}

export default ThreadCreated;

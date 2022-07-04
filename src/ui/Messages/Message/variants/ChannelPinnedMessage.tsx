import {Icons, PinnedMessageLinkBase, SystemMessageBase, SystemMessageContent} from "../elements";
import {Message_author} from "@generated";
import MessageAuthor from "@ui/Messages/Message/MessageAuthor";
import Tooltip from "rc-tooltip";
import {Twemoji} from "@ui/shared/Emoji/emoji";
import {generalStore} from "@store";
import {useCallback} from "react";
import LargeTimestamp from "@ui/Messages/Message/LargeTimestamp";

interface ChannelPinnedMessageProps {
  author: Message_author;
  createdAt: number;
}

function ChannelPinnedMessage(props: ChannelPinnedMessageProps) {
  const openPinnedMessage = useCallback(() => generalStore.togglePins(true), [])

  return (
    <SystemMessageBase>
      <Icons.Pinned />
      <SystemMessageContent>
        <MessageAuthor author={props.author} onlyShowUsername={true} />{" "}
        pinned{" "}
        <Tooltip overlay={<>Coming Soon<Twemoji>™</Twemoji></>} placement="top">
          <PinnedMessageLinkBase cursor="not-allowed">
            a message
          </PinnedMessageLinkBase>
        </Tooltip>
        {" "}
        to this channel.
        See all{" "}
        <PinnedMessageLinkBase onClick={openPinnedMessage}>
          pinned messages
        </PinnedMessageLinkBase>
        .
        <LargeTimestamp timestamp={props.createdAt} />
      </SystemMessageContent>
    </SystemMessageBase>
  );
}

export default ChannelPinnedMessage;

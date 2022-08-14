import {
  MessageSeparatorBase,
  MessageSeparatorContentBase, MessageSeparatorLineBase
} from "@ui/Messages/elements";
import moment from "moment";

interface MessageSeparatorProps {
  createdAt: number;
}

function MessageSeparator({ createdAt }: MessageSeparatorProps) {
  return (
    <MessageSeparatorBase>
      <MessageSeparatorLineBase>
        <MessageSeparatorContentBase>
          {moment(createdAt).format("MMMM D, YYYY")}
        </MessageSeparatorContentBase>
      </MessageSeparatorLineBase>
    </MessageSeparatorBase>
  );
}

export default MessageSeparator;

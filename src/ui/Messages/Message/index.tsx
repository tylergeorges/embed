import {Message as MessageData} from "@generated";
import {MessageType} from "@generated/globalTypes";
import NormalMessage from "@ui/Messages/Message/variants/NormalMessage";
import GuildMemberJoin from "@ui/Messages/Message/variants/GuildMemberJoin";
import {memo} from "react";

interface MessageProps {
  isFirstMessage?: boolean;
  message: MessageData;
}

function Message(props: MessageProps) {
  switch (props.message.type) {
    case MessageType.GuildMemberJoin:
      return (
        <GuildMemberJoin
          createdAt={props.message.createdAt}
          author={props.message.author}
        />
      );
    case MessageType.Reply:
    case MessageType.Default:
      return <NormalMessage {...props} />;
    default: {
      const errorMessage: MessageData = {
        ...props.message,
        type: MessageType.Default,
        content: `Unknown message type \`${props.message.type}\`\n\n\`\`\`json\n${JSON.stringify(props.message, null, 2)}\n\`\`\``
      };

      return (
        <NormalMessage
          message={errorMessage}
          isFirstMessage={props.isFirstMessage}
        />
      );
    }
  }
}

export default memo(Message);

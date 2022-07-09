import {CSSProperties, useState} from "react";
import {Message as MessageData} from "@generated";
import {MessageGroupBase} from "@ui/Messages/elements";
import Message from "@ui/Messages/Message";

interface MessageProps {
  messages: MessageData[];
  style?: CSSProperties;
  showButtons?: boolean;
}

function MessageGroup(props: MessageProps) {
  const [firstMessage, ...otherMessages] = props.messages;
  const [isHovered, setIsHovered] = useState(false);

  console.log("%c MessageGroup render", "color: red; font-size: 20px;");

  return (
    <MessageGroupBase
      style={props.style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Message isFirstMessage={true} message={firstMessage} isHovered={isHovered} showButtons={props.showButtons ?? true} />
      {otherMessages.map(message => (
        <Message key={message.id} message={message} showButtons={props.showButtons ?? true} />
      ))}
    </MessageGroupBase>
  );
}

export default MessageGroup;

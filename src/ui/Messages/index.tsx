import {CSSProperties} from "react";
import {Message as MessageData} from "@generated";
import {MessageGroupBase} from "@ui/Messages/elements";
import Message from "@ui/Messages/Message";

interface MessageProps {
  messages: MessageData[];
  style?: CSSProperties;
}

function MessageGroup(props: MessageProps) {
  const [firstMessage, ...otherMessages] = props.messages;

  console.log("%c MessageGroup render", "color: red; font-size: 20px;");

  return (
    <MessageGroupBase style={props.style}>
      <Message isFirstMessage={true} message={firstMessage} />
      {otherMessages.map(message => (
        <Message key={message.id} message={message} />
      ))}
    </MessageGroupBase>
  );
}

export default MessageGroup;

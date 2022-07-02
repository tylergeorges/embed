import {PureComponent, CSSProperties} from "react";
import {Message as MessageData} from "@generated";
import {MessageGroupBase} from "@ui/Messages/elements";
import Message from "@ui/Messages/Message";
import {memoize} from "lodash";

interface MessageProps {
  messages: MessageData[];
  style?: CSSProperties;
}

interface MessageState {
  firstMessage: MessageData;
  otherMessages: MessageData[];
}

class MessageGroup extends PureComponent<MessageProps, MessageState> {
  private getFirstMessage = memoize((messages: MessageData[]) => {
    console.log("getFirstMessage");
    return messages[0]
  });
  private getOtherMessages = memoize((messages: MessageData[]) => {
    console.log("getOtherMessages");
    return messages.slice(1)
  });

  render() {
    const firstMessage = this.getFirstMessage(this.props.messages);
    const otherMessages = this.getOtherMessages(this.props.messages);

    console.log("%c MessageGroup render", "color: red; font-size: 20px;");

    return (
      <MessageGroupBase style={this.props.style}>
        <Message isFirstMessage={true} message={firstMessage} />
        {otherMessages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </MessageGroupBase>
    );
  }
}

export default MessageGroup;

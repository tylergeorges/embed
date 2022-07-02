import {PureComponent} from "react";
import {Message as MessageData} from "@generated";
import {
  AuthorBase,
  MessageBase,
  UsernameBase
} from "@ui/Messages/Message/elements";
import MessageAuthor from "@ui/Messages/Message/MessageAuthor";
import Content from "@ui/Messages/Content";

interface MessageProps {
  isFirstMessage?: boolean;
  message: MessageData;
}

class Message extends PureComponent<MessageProps> {
  render() {
    console.log("%c Message render", "color: yellow; font-size: 16px;");

    if (this.props.isFirstMessage)
      return (
        <MessageBase>
          <MessageAuthor author={this.props.message.author} />
          <Content
            mentions={this.props.message.mentions}
            messageContent={this.props.message.content}
          />
        </MessageBase>
      );

    return (
      <MessageBase>
        <Content
          mentions={this.props.message.mentions}
          messageContent={this.props.message.content}
        />
      </MessageBase>
    )
  }
}

export default Message;

import {PureComponent} from "react";
import {Message as MessageData} from "@generated";
import {
  MessageBase, MessageHeaderBase, TimestampBase
} from "@ui/Messages/Message/elements";
import MessageAuthor from "@ui/Messages/Message/MessageAuthor";
import Content from "@ui/Messages/Content";
import Moment from "moment";
import Tooltip from "rc-tooltip";

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
          <MessageHeaderBase>
            <MessageAuthor author={this.props.message.author} />
          </MessageHeaderBase>
          <Content
            mentions={this.props.message.mentions}
            messageContent={this.props.message.content}
          />
        </MessageBase>
      );

    return (
      <MessageBase>
        <Tooltip
          placement="top"
          overlay={Moment(this.props.message.createdAt).format("LLLL")}
          mouseEnterDelay={1}
        >
          <TimestampBase dateTime={this.props.message.createdAt} className="short-time">
            {Moment(this.props.message.createdAt).format("h:mm A")}
          </TimestampBase>
        </Tooltip>
        <Content
          mentions={this.props.message.mentions}
          messageContent={this.props.message.content}
        />
      </MessageBase>
    )
  }
}

export default Message;

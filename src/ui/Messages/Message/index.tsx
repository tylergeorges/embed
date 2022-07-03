import {PureComponent} from "react";
import {Message as MessageData} from "@generated";
import {MessageType} from "@generated/globalTypes";
import NormalMessage from "@ui/Messages/Message/variants/NormalMessage";
import GuildMemberJoin from "@ui/Messages/Message/variants/GuildMemberJoin";

interface MessageProps {
  isFirstMessage?: boolean;
  message: MessageData;
}

class Message extends PureComponent<MessageProps> {
  render() {
    switch (this.props.message.type) {
      case MessageType.GuildMemberJoin:
        return (
          <GuildMemberJoin
            createdAt={this.props.message.createdAt}
            author={this.props.message.author}
          />
        );
      case MessageType.Reply:
      case MessageType.Default:
        return <NormalMessage {...this.props} />;
      default: {
        const errorMessage: MessageData = {
          ...this.props.message,
          type: MessageType.Default,
          content: `Unknown message type \`${this.props.message.type}\`\n\n\`\`\`json\n${JSON.stringify(this.props.message, null, 2)}\n\`\`\``
        };

        return (
          <NormalMessage
            message={errorMessage}
            isFirstMessage={this.props.isFirstMessage}
          />
        );
      }
    }
  }
}

export default Message;

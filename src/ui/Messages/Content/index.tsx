import {PureComponent} from "react";
import Markdown from "@ui/shared/markdown/render";
import {Message_mentions} from "@generated";
import {ContentBase} from "@ui/Messages/Message/elements";

interface ContentProps {
  mentions: Message_mentions[];
  messageContent: string;
  isReplyContent?: boolean;
}

class Content extends PureComponent<ContentProps> {
  render() {
    return (
      <ContentBase isReplyContent={this.props.isReplyContent}>
        <Markdown mentions={this.props.mentions}>
          {this.props.messageContent}
        </Markdown>
      </ContentBase>
    );
  }
}

export default Content;

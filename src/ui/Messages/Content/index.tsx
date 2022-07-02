import {PureComponent} from "react";
import Markdown from "@ui/shared/markdown/render";
import {Message_mentions} from "@generated";

interface ContentProps {
  mentions: Message_mentions[];
  messageContent: string;
}

class Content extends PureComponent<ContentProps> {
  render() {
    return (
      <Markdown mentions={this.props.mentions}>
        {this.props.messageContent}
      </Markdown>
    );
  }
}

export default Content;

import {memo} from "react";
import Markdown from "@ui/shared/markdown/render";
import {Message_mentions} from "@generated";
import {ContentBase} from "@ui/Messages/Message/elements";

interface ContentProps {
  mentions: Message_mentions[];
  messageContent: string;
  isReplyContent?: boolean;
}

function Content(props: ContentProps) {
  return (
    <ContentBase isReplyContent={props.isReplyContent}>
      <Markdown mentions={props.mentions}>
        {props.messageContent}
      </Markdown>
    </ContentBase>
  );
}

export default memo(Content);

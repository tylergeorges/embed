import {Children, memo, ReactNode} from "react";
import Markdown from "@ui/shared/markdown/render";
import {Message_mentions, Message_reactions} from "@generated";
import {
  ContentBase,
  EditedBase,
  MessageAccessoriesBase
} from "@ui/Messages/Message/elements";
import Tooltip from "rc-tooltip";
import Moment from "moment/moment";
import {Locale} from "@lib/Locale";
import Reactions from "@ui/Messages/Message/Reactions";

interface EditedProps {
  editedAt: number;
}

const Edited = memo((props: EditedProps) => {
  return (
    <Tooltip
      overlay={Moment(props.editedAt).format("LLLL")}
      placement="top"
      mouseEnterDelay={1}
    >
      <EditedBase>{Locale.translate("edited")}</EditedBase>
    </Tooltip>
  );
});

interface MessageAccessoriesProps {
  children?: ReactNode;
}

function MessageAccessories({children}: MessageAccessoriesProps) {
  if (children === undefined || Children.count(children) === 0)
    return <></>;

  return (
    <MessageAccessoriesBase>
      {children}
    </MessageAccessoriesBase>
  );
}

interface ContentProps {
  mentions: Message_mentions[];
  reactions: Message_reactions[] | null;
  messageContent: string;
  isReplyContent?: boolean;
  editedAt: number;
}

function Content(props: ContentProps) {
  return (
    <div>
      <ContentBase isReplyContent={props.isReplyContent}>
        <Markdown mentions={props.mentions}>
          {props.messageContent}
        </Markdown>
        {props.editedAt && <Edited editedAt={props.editedAt} />}
      </ContentBase>
      <MessageAccessories>
        {props.reactions && (
          <Reactions reactions={props.reactions} />
        )}
      </MessageAccessories>
    </div>
  );
}

export default memo(Content);

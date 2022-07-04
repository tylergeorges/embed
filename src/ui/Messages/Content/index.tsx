import {Children, memo, ReactNode} from "react";
import Markdown from "@ui/shared/markdown/render";
import {
  Message_attachments,
  Message_mentions,
  Message_reactions
} from "@generated";
import {
  ContentBase,
  EditedBase,
  MessageAccessoriesBase
} from "@ui/Messages/Message/elements";
import Tooltip from "rc-tooltip";
import Moment from "moment/moment";
import {Locale} from "@lib/Locale";
import Reactions from "@ui/Messages/Message/Reactions";
import Attachment from "@ui/Messages/Content/Attachment";

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
  active: boolean;
  children?: ReactNode;
}

function MessageAccessories({children, active}: MessageAccessoriesProps) {
  if (!active || !children || Children.count(children) === 0)
    return <></>;

  return (
    <MessageAccessoriesBase>
      {children}
    </MessageAccessoriesBase>
  );
}

interface ContentProps {
  attachments: Message_attachments[];
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
      {!props.isReplyContent && (
        <MessageAccessories active={props.reactions !== null || props.attachments.length > 0}>
          {props.attachments.map(attachment => (
            <Attachment key={attachment.url} attachment={attachment} />
          ))}
          {props.reactions && (
            <Reactions reactions={props.reactions} />
          )}
        </MessageAccessories>
      )}
    </div>
  );
}

export default memo(Content);

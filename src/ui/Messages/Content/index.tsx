import {Children, memo, ReactNode, useMemo,} from "react";
import Markdown from "@ui/shared/markdown/render";
import {
  Message_attachments,
  Message_mentions,
  Message_reactions,
  Message_stickers,
  Message_thread
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
import StickerIcon from "@images/discordAssets/sticker-icon.svg";
import AttachmentIcon from "@images/discordAssets/attachment-icon.svg";
import {
  ContentContainerBase,
  ReplyIconBase
} from "@ui/Messages/Content/elements";
import Sticker from "@ui/Messages/Content/Sticker";
import ThreadButton from "@ui/Messages/Content/Thread/ThreadButton";
import {MessageType} from "@generated/globalTypes";

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

interface ReplyIconProps {
  attachments: Message_attachments[];
  stickers: Message_stickers[];
}

function ReplyIcon(props: ReplyIconProps) {
  if (props.stickers.length > 0)
    return <ReplyIconBase src={StickerIcon} alt="sticker" />;

  if (props.attachments.length > 0)
    return <ReplyIconBase src={AttachmentIcon} alt="attachment" />;

  return null;
}

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
  stickers: Message_stickers[] | null;
  messageContent: string;
  messageType: MessageType;
  isReplyContent?: boolean;
  editedAt: number;
  thread: Message_thread;
  noThreadButton?: boolean;
}

function Content(props: ContentProps) {
  const dominantAccessoryText = useMemo(() => {
    if (!props.isReplyContent)
      return null;

    if (props.stickers.length > 0)
      return "Message with sticker(s)";

    if (props.attachments.length > 0)
      return "Message with attachment(s)";

    return null;
  }, [props.attachments, props.stickers, props.isReplyContent]);

  return (
    <>
      <ContentBase isReplyContent={props.isReplyContent}>
        <ContentContainerBase data-is-reply-content={props.isReplyContent}>
          {props.messageContent.length > 0
            ? (
              <>
                <Markdown mentions={props.mentions}>
                  {props.messageContent}
                </Markdown>
                {props.editedAt && <Edited editedAt={props.editedAt} />}
              </>
            )
            : dominantAccessoryText
          }
        </ContentContainerBase>
        {props.isReplyContent && (
          <ReplyIcon stickers={props.stickers} attachments={props.attachments} />
        )}
      </ContentBase>
      {!props.isReplyContent && (
        <MessageAccessories
          active={
            props.reactions !== null
            || props.attachments.length > 0
            || props.stickers.length > 0
            || props.thread !== null
          }
        >
          {props.attachments.map(attachment => (
            <Attachment key={attachment.url} attachment={attachment} />
          ))}
          {props.stickers.map(sticker => (
            <Sticker key={sticker.id} sticker={sticker} />
          ))}
          {props.reactions && (
            <Reactions reactions={props.reactions} />
          )}
          {(!props.noThreadButton && props.thread) && (
            <ThreadButton
              thread={props.thread}
              messageId={props.thread.id}
              messageContent={props.messageContent}
              messageType={props.messageType}
            />
          )}
        </MessageAccessories>
      )}
    </>
  );
}

export default memo(Content);

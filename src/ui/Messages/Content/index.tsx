import {Children, memo, ReactChild, ReactNode, useMemo,} from "react";
import Markdown from "@ui/shared/markdown/render";
import {
  Message as MessageData,
  Message_attachments,
  Message_referencedMessage,
  Message_stickers
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
  ContentContainerBase, ContentMessageTooltipBase,
  ReplyIconBase
} from "@ui/Messages/Content/elements";
import Sticker from "@ui/Messages/Content/Sticker";
import ThreadButton from "@ui/Messages/Content/Thread/ThreadButton";
import Message from "../Message";
import Embed from "@ui/Messages/Content/Embed";

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

interface ContentCoreProps {
  children: ReactChild;
  showTooltip: boolean;
  referencedMessage: Message_referencedMessage | null;
}

function ContentCore(props: ContentCoreProps) {
  if (!props.showTooltip)
    return <>{props.children}</>;

  return (
    <Tooltip
      overlay={
        <ContentMessageTooltipBase>
          <Message message={props.referencedMessage} isFirstMessage={true} />
        </ContentMessageTooltipBase>
      }
      placement="top"
      trigger={["click"]}
    >
      {props.children}
    </Tooltip>
  );
}

interface ContentProps {
  message: Omit<MessageData, "referencedMessage"> & Partial<MessageData>;
  isReplyContent?: boolean;
  noThreadButton?: boolean;
}

function Content(props: ContentProps) {
  const dominantAccessoryText = useMemo(() => {
    if (!props.isReplyContent)
      return null;

    if (props.message.stickers.length > 0)
      return "Message with sticker(s)";

    if (props.message.attachments.length > 0)
      return "Message with attachment(s)";

    return null;
  }, [props.message.attachments, props.message.stickers, props.isReplyContent]);

  const embedImages = useMemo(() => {
    if (!props.message.embeds || props.message.embeds.length <= 1)
      return [];

    if (!props.message.embeds.every(e => props.message.embeds[0].url === e.url))
      return [];

    const images = props.message.embeds.reduce((acc, embed) => [...acc, embed.image?.url], [])
      .filter(i => i !== null && i !== undefined);

    if (images.length === 0)
      return [];

    return images;
  }, [props.message.embeds]);

  return (
    <>
      <ContentBase isReplyContent={props.isReplyContent}>
        <ContentCore referencedMessage={props.message} showTooltip={props.isReplyContent}>
          <ContentContainerBase data-is-reply-content={props.isReplyContent}>
            {props.message.content.length > 0
              ? (
                <>
                  <Markdown mentions={props.message.mentions} isAuthorBot={props.message.author.bot}>
                    {props.message.content}
                  </Markdown>
                  {props.message.editedAt && <Edited editedAt={props.message.editedAt} />}
                </>
              )
              : dominantAccessoryText
            }
          </ContentContainerBase>
        </ContentCore>
        {props.isReplyContent && (
          <ReplyIcon stickers={props.message.stickers} attachments={props.message.attachments} />
        )}
      </ContentBase>
      {!props.isReplyContent && (
        <MessageAccessories
          active={
            props.message.reactions !== null
            || props.message.attachments.length > 0
            || props.message.stickers.length > 0
            || props.message.thread !== null
            || (props.message.embeds !== null && props.message.embeds.length > 0)
          }
        >
          {props.message.attachments.map(attachment => (
            <Attachment key={attachment.url} attachment={attachment} />
          ))}
          {props.message.stickers.map(sticker => (
            <Sticker key={sticker.id} sticker={sticker} />
          ))}
          {(props.message.embeds !== null && embedImages.length > 0)
            ? <Embed key={props.message.embeds[0].url} embed={props.message.embeds[0]} images={embedImages} />
            : props.message.embeds.map((embed) => (
              <Embed key={embed.url} embed={embed} images={undefined} />
            )
          )}
          {props.message.reactions && (
            <Reactions reactions={props.message.reactions} />
          )}
          {(!props.noThreadButton && props.message.thread) && (
            <ThreadButton
              hasReply={props.message.referencedMessage !== null}
              thread={props.message.thread}
              messageId={props.message.thread.id}
              messageContent={props.message.content}
              messageType={props.message.type}
            />
          )}
        </MessageAccessories>
      )}
    </>
  );
}

export default memo(Content);

import {Message_attachments} from "@generated";
import VideoAttachment from "@ui/Messages/Content/Attachment/VideoAttachment";
import {memo, useState} from "react";
import {SpoilerBase} from "@ui/Messages/Content/Attachment/elements";
import ImageAttachment from "@ui/Messages/Content/Attachment/ImageAttachment";

interface AttachmentProps {
  attachment: Message_attachments;
}

function AttachmentBase(props: AttachmentProps) {
  if (/\.(?:mp4|webm|mov)$/.test(props.attachment.filename)) {
    return <VideoAttachment attachment={props.attachment} />;
  }

  return <ImageAttachment attachment={props.attachment} />;
}

function AttachmentContainer(props: AttachmentProps) {
  const [showSpoiler, setShowSpoiler] = useState(false);

  if (props.attachment.filename.startsWith('SPOILER_'))
    return (
      <SpoilerBase
        data-show={showSpoiler}
        onClick={() => setShowSpoiler(true)}
      >
        <AttachmentBase attachment={props.attachment} />
      </SpoilerBase>
    );

  return (
    <AttachmentBase attachment={props.attachment} />
  );
}

function Attachment(props: AttachmentProps) {
  console.log("%cAttachment", "color: teal; font-size: 14px;");

  return <AttachmentContainer attachment={props.attachment} />;
}

export default memo(Attachment);

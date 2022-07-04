import {Message_attachments} from "@generated";
import VideoAttachment from "@ui/Messages/Content/Attachment/VideoAttachment";
import {memo} from "react";

interface AttachmentProps {
  attachment: Message_attachments;
}

function Attachment(props: AttachmentProps) {
  console.log("%cAttachment", "color: teal; font-size: 14px;");
  console.log(props.attachment);

  if (/\.(?:mp4|webm|mov)$/.test(props.attachment.filename)) {
    return (
      <VideoAttachment attachment={props.attachment} />
    );
  }

  return (
    <img src="https://via.placeholder.com/150" alt={props.attachment.filename} />
  );
}

export default memo(Attachment);

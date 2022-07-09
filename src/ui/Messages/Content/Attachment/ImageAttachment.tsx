import {Message_attachments} from "@generated";
import useSize from "@ui/Messages/Content/Attachment/useSize";

interface ImageAttachmentProps {
  attachment: Message_attachments;
}

function ImageAttachment(props: ImageAttachmentProps) {
  const { width, height } = useSize(props.attachment.width, props.attachment.height);

  return (
    <img src={props.attachment.url} alt={props.attachment.filename} style={{width, height}} />
  )
}

export default ImageAttachment;

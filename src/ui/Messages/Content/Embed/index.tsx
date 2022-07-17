import {Message_embeds} from "@generated";
import GifVEmbed from "@ui/Messages/Content/Embed/GifVEmbed";
  import ImageEmbed from "@ui/Messages/Content/Embed/ImageEmbed";
import VideoAttachment from "@ui/Messages/Content/Attachment/VideoAttachment";

export interface EmbedProps {
  embed: Message_embeds;
}

function Embed({embed}: EmbedProps) {
  if (embed.type.toLowerCase() === 'gifv')
    return <GifVEmbed embed={embed} />;

  if (embed.type.toLowerCase() === 'image')
    return <ImageEmbed embed={embed} />;

  if (embed.type.toLowerCase() === 'video')
    return <VideoAttachment attachmentOrEmbed={embed} />;

  return null;
}

export default Embed;

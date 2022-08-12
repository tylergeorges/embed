import useSize from "@ui/Messages/Content/Attachment/useSize";
import {MediaEmbedBase} from "@ui/Messages/Content/Embed/elements";
import ExpandableImage from "@ui/shared/ExpandableImage";
import {Message_embeds} from "@generated";

export interface GifVEmbedProps {
  embed: Message_embeds;
}

function ImageEmbed({embed}: GifVEmbedProps) {
  const size = useSize(embed.thumbnail.width, embed.thumbnail.height);

  return (
    <ExpandableImage
      className={MediaEmbedBase}
      src={embed.thumbnail.proxyUrl}
      originalUrl={embed.thumbnail.url}
      width={size.width}
      height={size.height}
    />
  );
}

export default ImageEmbed;

import {EmbedProps} from "@ui/Messages/Content/Embed/index";
import useSize from "@ui/Messages/Content/Attachment/useSize";
import {MediaEmbedBase} from "@ui/Messages/Content/Embed/elements";
import ExpandableImage from "@ui/shared/ExpandableImage";

function ImageEmbed({embed}: EmbedProps) {
  const size = useSize(embed.thumbnail.width, embed.thumbnail.height);

  return (
    <ExpandableImage
      className={MediaEmbedBase}
      src={embed.thumbnail.url}
      width={size.width}
      height={size.height}
    />
  );
}

export default ImageEmbed;

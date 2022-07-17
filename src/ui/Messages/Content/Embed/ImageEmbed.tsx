import {EmbedProps} from "@ui/Messages/Content/Embed/index";
import useSize from "@ui/Messages/Content/Attachment/useSize";
import {MediaEmbedBase} from "@ui/Messages/Content/Embed/elements";

function ImageEmbed({embed}: EmbedProps) {
  const size = useSize(embed.thumbnail.width, embed.thumbnail.height);

  return (
    <img
      className={MediaEmbedBase}
      src={embed.thumbnail.url}
      width={size.width}
      height={size.height}
      alt=""
    />
  );
}

export default ImageEmbed;

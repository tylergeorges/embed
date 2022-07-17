import {EmbedProps} from "@ui/Messages/Content/Embed/index";
import useSize from "@ui/Messages/Content/Attachment/useSize";
import {MediaEmbedBase} from "@ui/Messages/Content/Embed/elements";

function GifVEmbed({embed}: EmbedProps) {
  const size = useSize(embed.video.width, embed.video.height);

  return (
    <video
      className={MediaEmbedBase}
      src={embed.video.proxyUrl ?? embed.video.url}
      width={size.width}
      height={size.height}
      autoPlay
      muted
      loop
    />
  );
}

export default GifVEmbed;

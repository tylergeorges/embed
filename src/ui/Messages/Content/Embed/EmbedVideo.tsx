import {Embed_thumbnail, Embed_video} from "@generated";
import {VideoIframe, VideoThumbnail} from "@ui/Messages/Content/Embed/elements";
import VideoAttachment from "@ui/Messages/Content/Attachment/VideoAttachment";
import {ReactNode, useState} from "react";
import useSize from "@ui/Messages/Content/Attachment/useSize";
import DiscordImageFailure from "@images/discordAssets/discord-image-failure.svg";

interface ThumbnailWrapperProps {
  thumbnail?: Embed_thumbnail["url"];
  children: ReactNode;
  width: number;
  height: number;
}

function ThumbnailWrapper({ thumbnail, width, height, children }: ThumbnailWrapperProps ) {
  const [hideThumbnail, setHideThumbnail] = useState(false);
  const [error, setError] = useState(false);

  const { width: adjustedWidth, height: adjustedHeight } = useSize(width, height);

  if (!thumbnail || hideThumbnail)
    return <>{children}</>;

  return (
    <VideoThumbnail
      onClick={() => setHideThumbnail(true)}
      src={error ? DiscordImageFailure : thumbnail}
      onError={() => setError(true)}
      style={{
        width: adjustedWidth,
        height: adjustedHeight,
      }}
    />
  );
}

interface EmbedVideoProps extends Pick<Embed_video, "width" | "height"> {
  thumbnail?: Embed_thumbnail["url"];
  url: Embed_video["url"] | null;
  proxyUrl: Embed_video["proxyUrl"] | null;
}

function EmbedVideo(props: EmbedVideoProps) {
  if (props.proxyUrl !== null)
    return (
      <ThumbnailWrapper thumbnail={props.thumbnail} width={props.width} height={props.height}>
        <VideoAttachment
          attachmentOrEmbed={{
            width: props.width,
            height: props.height,
            url: props.proxyUrl,
          }}
        />
      </ThumbnailWrapper>
    );

  return (
    <ThumbnailWrapper thumbnail={props.thumbnail} width={props.width} height={props.height}>
      <VideoIframe
        width={400}
        height={225}
        src={props.url}
      />
    </ThumbnailWrapper>
  );
}

export default EmbedVideo;

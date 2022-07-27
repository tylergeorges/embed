import {EmbedStyle, YouTubeIframe} from "./elements";
import numberToRgb from "@utils/numberToRgb";
import {Message_embeds} from "@generated";
import {parseEmbedTitle} from "@ui/shared/markdown/render";

interface YouTubeEmbedProps {
  embed: Message_embeds;
}

function YouTubeEmbed({ embed }: YouTubeEmbedProps) {
  const embedColor = embed.color !== 0 && embed.color !== null
    ? numberToRgb(embed.color)
    : undefined;

  const youtubeEmbedRegex = /https?:\/\/(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/;
  const youtubeWatchMatch = youtubeEmbedRegex.exec(embed.video.url)[1];

  return (
    <EmbedStyle.Base color={embedColor} thumbnailIsLarge={true}>
      <EmbedStyle.Provider>
        {embed.provider.name}
      </EmbedStyle.Provider>
      <EmbedStyle.Author urlPresent={true}>
        <EmbedStyle.AuthorName>
          <a href={embed.author.url} target="_blank">{embed.author.name}</a>
        </EmbedStyle.AuthorName>
      </EmbedStyle.Author>
      <EmbedStyle.TitleWithUrl href={embed.url} target="_blank">
        {parseEmbedTitle(embed.title)}
      </EmbedStyle.TitleWithUrl>
      <EmbedStyle.ContentAndThumbnail thumbnailIsLarge={true}>
        <YouTubeIframe
          width={400}
          height={225}
          src={`https://www.youtube.com/embed/${youtubeWatchMatch}`}
          title="YouTube video player"
          style={{ border: "none" }}
          allow="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          allowFullScreen
        />
      </EmbedStyle.ContentAndThumbnail>
    </EmbedStyle.Base>
  );
}

export default YouTubeEmbed;

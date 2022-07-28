import {Message_embeds} from "@generated";
import GifVEmbed from "@ui/Messages/Content/Embed/GifVEmbed";
  import ImageEmbed from "@ui/Messages/Content/Embed/ImageEmbed";
import VideoAttachment from "@ui/Messages/Content/Attachment/VideoAttachment";
import {
  EmbedStyle
} from "@ui/Messages/Content/Embed/elements";
import numberToRgb from "@utils/numberToRgb";
import moment from "moment";
import {LinkMarkdown, parseEmbedTitle} from "@ui/shared/markdown/render";
import YouTubeEmbed from "@ui/Messages/Content/Embed/YouTubeEmbed";
import useSize from "@ui/Messages/Content/Embed/useSize";

export interface EmbedProps {
  embed: Message_embeds;
  images: string[] | undefined;
}

function Embed({embed, images}: EmbedProps) {
  if (embed.type.toLowerCase() === 'gifv')
    return <GifVEmbed embed={embed} />;

  if (embed.type.toLowerCase() === 'image')
    return <ImageEmbed embed={embed} />;

  if (embed.type.toLowerCase() === 'video' && !embed.thumbnail)
    return <VideoAttachment attachmentOrEmbed={embed} />;

  const embedColor = embed.color !== 0 && embed.color !== null
    ? numberToRgb(embed.color)
    : undefined;

  if (embed.video?.url?.match(/^https?:\/\/(www\.)?youtube\.com/))
    return <YouTubeEmbed embed={embed} />;

  const { width: widthImage, height: heightImage } = useSize(
    embed.type,
    embed.image,
    images?.length > 0
  );

  const { width: widthThumbnail, height: heightThumbnail, isLarge: isThumbnailLarge } = useSize(
    embed.type,
    embed.thumbnail,
    undefined
  );

  return (
    <EmbedStyle.Base color={embedColor} thumbnailIsLarge={widthImage !== null}>
      <EmbedStyle.ContentAndThumbnail thumbnailIsLarge={isThumbnailLarge}>
        <EmbedStyle.Content>
          {embed.provider && (
            <EmbedStyle.Provider>
              {embed.provider.name}
            </EmbedStyle.Provider>
          )}
          {embed.author && (
            <EmbedStyle.Author urlPresent={embed.author.url !== null}>
              {embed.author.icon && (
                <EmbedStyle.AuthorIcon src={embed.author.icon} />
              )}
              <EmbedStyle.AuthorName>
                {embed.author.url
                ? (
                  <a href={embed.author.url} target="_blank">{embed.author.name}</a>
                )
                : (
                  embed.author.name
                )}
              </EmbedStyle.AuthorName>
            </EmbedStyle.Author>
          )}
          {embed.title && (
            embed.url !== null
              ? (
                <EmbedStyle.TitleWithUrl href={embed.url} target="_blank">
                  {parseEmbedTitle(embed.title)}
                </EmbedStyle.TitleWithUrl>
              )
              : (
                <EmbedStyle.Title>{parseEmbedTitle(embed.title)}</EmbedStyle.Title>
              )
          )}
          {embed.description && (
            <EmbedStyle.Description>
              <LinkMarkdown>
                {embed.description}
              </LinkMarkdown>
            </EmbedStyle.Description>
          )}
          {embed.fields && embed.fields.length > 0 && (
            <EmbedStyle.Fields>
              {embed.fields.map(field => (
                <EmbedStyle.Field
                  key={field.name + field.value}
                  inline={field.inline}
                >
                  <EmbedStyle.FieldName>
                    {parseEmbedTitle(field.name)}
                  </EmbedStyle.FieldName>
                  <EmbedStyle.FieldValue>
                    <LinkMarkdown>
                      {field.value}
                    </LinkMarkdown>
                  </EmbedStyle.FieldValue>
                </EmbedStyle.Field>
              ))}
            </EmbedStyle.Fields>
          )}
        </EmbedStyle.Content>
        {embed.thumbnail && (
          <EmbedStyle.Image
            src={embed.thumbnail.url}
            width={widthThumbnail}
            height={heightThumbnail}
          />
        )}
      </EmbedStyle.ContentAndThumbnail>
      {((images === undefined || images?.length === 0) && embed.image) && (
        <EmbedStyle.Image
          src={embed.image.url}
          width={widthImage}
          height={heightImage}
          large={true}
        />
      )}
      {images?.length > 0 && (
        <EmbedStyle.Images amount={images.length}>
          {images.map(image => (
            <EmbedStyle.MultiImageImageContainer key={image}>
              <EmbedStyle.Image
                fillMaxSize={true}
                src={image}
                large={true}
                withMargin={false}
              />
            </EmbedStyle.MultiImageImageContainer>
          ))}
        </EmbedStyle.Images>
      )}

      {(embed.footer || embed.timestamp) && (
        <EmbedStyle.Footer>
          {embed.footer?.url && (
            <EmbedStyle.FooterIcon src={embed.footer.url} />
          )}
          {embed.footer?.text}
          {embed.timestamp && (
              <>{" • "}{moment(embed.timestamp).calendar()}</>
          )}
        </EmbedStyle.Footer>
      )}
    </EmbedStyle.Base>
  );
}

export default Embed;

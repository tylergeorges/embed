import {Message_embeds} from "@generated";
import GifVEmbed from "@ui/Messages/Content/Embed/GifVEmbed";
  import ImageEmbed from "@ui/Messages/Content/Embed/ImageEmbed";
import VideoAttachment from "@ui/Messages/Content/Attachment/VideoAttachment";
import {EmbedStyle} from "@ui/Messages/Content/Embed/elements";
import numberToRgb from "@utils/numberToRgb";
import {useMemo} from "react";
import moment from "moment";

export interface EmbedProps {
  embed: Message_embeds;
}

function Embed({embed}: EmbedProps) {
  if (embed.type.toLowerCase() === 'gifv')
    return <GifVEmbed embed={embed} />;

  if (embed.type.toLowerCase() === 'image')
    return <ImageEmbed embed={embed} />;

  if (embed.type.toLowerCase() === 'video' && !embed.thumbnail)
    return <VideoAttachment attachmentOrEmbed={embed} />;

  console.log("Embed", embed);

  const embedColor = embed.color !== 0 && embed.color !== null
    ? numberToRgb(embed.color)
    : undefined;

  const { width, height, isLarge } = useMemo(() => {
    const image = embed.image ?? embed.thumbnail;

    if (image === null)
      return { width: null, height: null, isLarge: false };

    if (/^article|image|rich$/i.test(embed.type)) {
      const proposedWidth = 400;
      const proposedHeight = proposedWidth / image.width * image.height;

      const { width, height } = proposedHeight > proposedWidth
        ? { width: 300 / image.height * image.width, height: 300 }
        : { width: proposedWidth, height: proposedHeight };

      return {
        width,
        height,
        isLarge: true
      };
    }

    const aspectRatio = image.width / image.height;
    const imageHeight = 80 / aspectRatio;
    const imageWidth = imageHeight / image.height * image.width;

    return { width: imageWidth, height: imageHeight, isLarge: false };
  }, [embed.type, embed.image, embed.thumbnail]);

  // TODO: author url
  // TODO: provider

  return (
    <EmbedStyle.Base color={embedColor}>
      <EmbedStyle.ContentAndThumbnail thumbnailIsLarge={isLarge}>
        <EmbedStyle.Content>
          {embed.author && (
            <EmbedStyle.Author urlPresent={embed.author.url !== null}>
              {embed.author.icon && (
                <EmbedStyle.AuthorIcon src={embed.author.icon} />
              )}
              <EmbedStyle.AuthorName>{embed.author.name}</EmbedStyle.AuthorName>
            </EmbedStyle.Author>
          )}
          {embed.title && (
            embed.url !== null
              ? (
                <EmbedStyle.TitleWithUrl href={embed.url} target="_blank">{embed.title}</EmbedStyle.TitleWithUrl>
              )
              : (
                <EmbedStyle.Title>{embed.title}</EmbedStyle.Title>
              )
          )}
          {embed.description && (
            <EmbedStyle.Description>{embed.description}</EmbedStyle.Description>
          )}
          {embed.fields && embed.fields.length > 0 && (
            <EmbedStyle.Fields>
              {embed.fields.map(field => (
                <EmbedStyle.Field
                  key={field.name + field.value}
                  inline={field.inline}
                >
                  <EmbedStyle.FieldName>
                    {field.name}
                  </EmbedStyle.FieldName>
                  <EmbedStyle.FieldValue>
                    {field.value}
                  </EmbedStyle.FieldValue>
                </EmbedStyle.Field>
              ))}
            </EmbedStyle.Fields>
          )}
        </EmbedStyle.Content>
        {embed.thumbnail && (
          <EmbedStyle.Image
            src={embed.thumbnail.url}
            width={width}
            height={height}
          />
        )}
      </EmbedStyle.ContentAndThumbnail>
      {embed.image && (
        <EmbedStyle.Image
          src={embed.image.url}
          width={width}
          height={height}
          large={true}
        />
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

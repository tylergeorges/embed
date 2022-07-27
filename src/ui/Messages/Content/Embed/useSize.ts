import {useMemo} from "react";
import {Message_embeds_image, Message_embeds_thumbnail} from "@generated";

function useSize(
  type: string,
  image: Message_embeds_image,
  thumbnail: Message_embeds_thumbnail,
  cancel?: boolean
) {
  const { width, height, isLarge } = useMemo(() => {
    if (cancel)
      return { width: null, height: null, isLarge: false };

    const imageOrThumbnail = image ?? thumbnail;

    if (imageOrThumbnail === null)
      return { width: null, height: null, isLarge: false };

    if (/^article|image|rich$/i.test(type)) {
      const proposedWidth = 400;
      const proposedHeight = proposedWidth / imageOrThumbnail.width * imageOrThumbnail.height;

      const { width, height } = proposedHeight > proposedWidth
        ? { width: 300 / imageOrThumbnail.height * imageOrThumbnail.width, height: 300 }
        : { width: proposedWidth, height: proposedHeight };

      return {
        width,
        height,
        isLarge: true
      };
    }

    const aspectRatio = imageOrThumbnail.width / imageOrThumbnail.height;
    const imageHeight = 80 / aspectRatio;
    const imageWidth = imageHeight / imageOrThumbnail.height * imageOrThumbnail.width;

    return { width: imageWidth, height: imageHeight, isLarge: false };
  }, [type, image, thumbnail, cancel]);

  return { width, height, isLarge };
}

export default useSize;

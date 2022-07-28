import {useMemo} from "react";
import {Message_embeds_image, Message_embeds_thumbnail} from "@generated";

function useSize(
  type: string,
  image: Message_embeds_image | Message_embeds_thumbnail,
  cancel?: boolean
) {
  const { width, height, isLarge } = useMemo(() => {
    if (cancel)
      return { width: null, height: null, isLarge: false };

    if (image === null)
      return { width: null, height: null, isLarge: false };

    if (image.__typename === "EmbedImage" || /^article|image$/i.test(type)) {
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

    const imageHeight = 80;
    const imageWidth = imageHeight / image.height * image.width;

    return { width: imageWidth, height: imageHeight, isLarge: false };
  }, [type, image, image, cancel]);

  return { width, height, isLarge };
}

export default useSize;

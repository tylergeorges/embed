import {MaxAttachmentWidth} from "@ui/Messages/Content/Attachment/elements";

function useSize(width: number, height: number, disabled?: boolean) {
  if (disabled) {
    return {
      width: undefined,
      height: undefined,
    }
  }

  const resultingWidth = Math.floor(
    Math.min(height, MaxAttachmentWidth) / height * width
  );
  const resultingHeight = Math.min(height, MaxAttachmentWidth);

  return {
      width: resultingWidth,
      height: resultingHeight,
  };
}

export default useSize;

import { EmojisIcon } from '@components/Shared/Icons/EmojisIcon';
import { IconButtonWrapper } from '@components/Shared/Icons/Buttons/IconButtonWrapper';

export const EmojisButton = () => {
  const addEmoji = () => {};
  return (
    <IconButtonWrapper tooltipDisabled onClick={addEmoji}>
      <EmojisIcon />
    </IconButtonWrapper>
  );
};

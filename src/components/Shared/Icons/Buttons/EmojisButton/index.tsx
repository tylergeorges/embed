import { EmojisIcon } from '@components/Shared/Icons/EmojisIcon';
import { IconButtonWrapper } from '@components/Shared/Icons/Buttons/IconButtonWrapper';

export const EmojisButton = () => {
  const addEmoji = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <IconButtonWrapper tooltipDisabled onClick={addEmoji}>
      <EmojisIcon />
    </IconButtonWrapper>
  );
};

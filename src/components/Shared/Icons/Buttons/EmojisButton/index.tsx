import { EmojisIcon } from '@components/Shared/Icons/EmojisIcon';
import { IconButtonWrapper } from '@components/Shared/Icons/Buttons/IconButtonWrapper';

export const EmojisButton = () => (
  <IconButtonWrapper tooltipDisabled onClick={e => e.preventDefault()}>
    <EmojisIcon />
  </IconButtonWrapper>
);

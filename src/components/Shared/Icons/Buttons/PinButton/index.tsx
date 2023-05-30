import { IconButtonWrapper } from '@components/Shared/Icons/Buttons/IconButtonWrapper';
import { PinIcon } from '@components/Shared/Icons/PinIcon';

export const PinButton = () => (
  <IconButtonWrapper button_label="Pinned Messages" tooltipPlacement="bottom">
    <PinIcon />
  </IconButtonWrapper>
);

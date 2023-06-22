import { IconButtonWrapper } from '@components/Shared/Icons/Buttons/IconButtonWrapper';
import { PinIcon } from '@components/Shared/Icons/PinIcon';
import { useCallback } from 'react';

export const PinButton = () => {
  const handlePinClick = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
  }, []);
  return (
    <IconButtonWrapper tooltipLabel="Pinned Messages" tooltipPlacement="bottom" onClick={handlePinClick}>
      <PinIcon />
    </IconButtonWrapper>
  );
};

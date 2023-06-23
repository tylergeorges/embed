import { IconButton } from '@components/Shared/Icons/Buttons/IconButton';
import { useCallback } from 'react';

export const PinButton = () => {
  const handlePinClick = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
  }, []);
  return (
    <IconButton
      name="Pin"
      tooltipLabel="Pinned Messages"
      tooltipPlacement="bottom"
      onClick={handlePinClick}
    />
  );
};

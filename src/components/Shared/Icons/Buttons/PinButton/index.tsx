import { IconButton } from '@components/Shared/Icons/Buttons/IconButton';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const PinButton = () => {
  const translate = useTranslation();

  const handlePinClick = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
  }, []);

  return (
    <IconButton
      name="Pin"
      tooltipLabel={translate.t('pinnedmessages.tooltip') as string}
      tooltipPlacement="bottom"
      onClick={handlePinClick}
    />
  );
};

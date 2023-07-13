import { IconButton } from '@icons/Buttons/IconButton';
import { useTranslation } from 'react-i18next';

export const PinButton = () => {
  const translate = useTranslation();

  return (
    <IconButton
      name="Pin"
      tooltipLabel={translate.t('pinnedmessages.tooltip') as string}
      tooltipPlacement="bottom"
      onClick={e => e.preventDefault()}
    />
  );
};

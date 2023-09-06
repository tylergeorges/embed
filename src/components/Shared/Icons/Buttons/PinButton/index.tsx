import { IconButton } from '@icons/Buttons/IconButton';
import { useTranslation } from 'react-i18next';

export const PinButton = () => {
  const { t } = useTranslation();

  return (
    <IconButton
      icon="Pin"
      tooltipLabel={t('pinnedmessages.tooltip') as string}
      tooltipPlacement="bottom"
      onClick={e => e.preventDefault()}
      buttonType="headerIcon"
    />
  );
};

import IconButton from '@icons/Buttons/IconButton';
import { useTranslation } from 'react-i18next';

export const PinButton = () => {
  const translate = useTranslation();

  const pinLabel = translate.t('pinnedmessages.tooltip') as string;

  return <IconButton icon="Pin" tooltipLabel={pinLabel} tooltipPlacement="bottom" />;
};

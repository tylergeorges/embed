import { IconButton } from '@icons/Buttons/IconButton';
import { useStoreActions, useStoreState } from '@state';
import { useTranslation } from 'react-i18next';

export const PinButton = () => {
  const translate = useTranslation();
  const setShowPinsModal = useStoreActions(state => state.ui.setShowPinsModal);
  const showPinsModal = useStoreState(state => state.ui.showPinsModal);

  const openPinsModal = () => {
    setShowPinsModal(!showPinsModal);
  };

  return (
    <IconButton
      icon="Pin"
      tooltipLabel={translate.t('pinnedmessages.tooltip') as string}
      tooltipPlacement="bottom"
      onClick={openPinsModal}
    />
  );
};

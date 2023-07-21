import IconButton from '@icons/Buttons/IconButton';
import { useStoreActions, useStoreState } from '@state';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const MembersButton = () => {
  const translate = useTranslation();
  const setMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);

  const handleButtonClick = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      setMembersListOpen(!isMembersListOpen);
    },
    [isMembersListOpen, setMembersListOpen]
  );

  const tooltipLabel = isMembersListOpen
    ? (translate.t('hidemembers.tooltip') as string)
    : (translate.t('showmembers.tooltip') as string);

  return (
    <IconButton
      tooltipPlacement="bottom"
      tooltipLabel={tooltipLabel}
      onClick={handleButtonClick}
      icon="Members"
      isActive={isMembersListOpen}
    />
  );
};

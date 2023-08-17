import { IconButton } from '@icons/Buttons/IconButton';
import { useStoreActions, useStoreState } from '@state';
import { useTranslation } from 'react-i18next';

export const MembersButton = () => {
  const { t } = useTranslation();
  const setMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);

  return (
    <IconButton
      tooltipPlacement="bottom"
      tooltipLabel={
        isMembersListOpen
          ? (t('hidemembers.tooltip') as string)
          : (t('showmembers.tooltip') as string)
      }
      onClick={() => setMembersListOpen(!isMembersListOpen)}
      icon="Members"
      isActive={isMembersListOpen}
    />
  );
};

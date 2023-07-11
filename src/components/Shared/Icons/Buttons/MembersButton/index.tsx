import { IconButton } from '@components/Shared/Icons/Buttons/IconButton';
import { useStoreActions, useStoreState } from '@state';
import { useTranslation } from 'react-i18next';

export const MembersButton = () => {
  const setMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  const translate = useTranslation();

  return (
    <IconButton
      tooltipPlacement="bottom"
      tooltipLabel={
        isMembersListOpen
          ? (translate.t('hidemembers.tooltip') as string)
          : (translate.t('showmembers.tooltip') as string)
      }
      onClick={() => setMembersListOpen(!isMembersListOpen)}
      name="Members"
      isActive={isMembersListOpen}
    />
  );
};

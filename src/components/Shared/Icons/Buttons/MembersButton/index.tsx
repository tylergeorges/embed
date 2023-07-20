import { IconButton } from '@icons/Buttons/IconButton';
import { useStoreActions, useStoreState } from '@state';
import { useTranslation } from 'react-i18next';
import { useIsModalOpen } from '@hooks/useIsModalOpen';
import ModalProvider from '@components/Providers/ModalProvider';

export const MembersButton = () => {
  const translate = useTranslation();

  const setMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);

  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);

  const isThreadsPanelOpen = useIsModalOpen('sidebar-threads-panel');

  const handleMembersClick = () => {
    if (isThreadsPanelOpen && !isMembersListOpen) {
      ModalProvider.hide('sidebar-threads-panel');
      setMembersListOpen(true);
    } else {
      setMembersListOpen(!isMembersListOpen);
    }
  };

  return (
    <IconButton
      tooltipPlacement="bottom"
      tooltipLabel={
        isMembersListOpen
          ? (translate.t('hidemembers.tooltip') as string)
          : (translate.t('showmembers.tooltip') as string)
      }
      onClick={handleMembersClick}
      icon="Members"
      isActive={isMembersListOpen}
    />
  );
};

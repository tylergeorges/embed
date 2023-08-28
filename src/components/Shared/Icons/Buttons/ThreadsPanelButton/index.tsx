import { IconButton } from '@components/Shared/Icons/Buttons/IconButton';
import { ThreadChannel } from '@graphql/graphql';
import { useStoreActions } from '@state';
import { useTranslation } from 'react-i18next';

interface ThreadsPanelButtonProps {
  thread: ThreadChannel;
}
export const ThreadsPanelButton = ({ thread }: ThreadsPanelButtonProps) => {
  const { t } = useTranslation();

  const setCurrentThread = useStoreActions(state => state.guild.setCurrentThread);

  const setIsMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);

  const setIsDomThreadsPanelOpen = useStoreActions(state => state.ui.setIsDomThreadsPanelOpen);

  const handlePanelClick = () => {
    // Adds element to DOM
    setIsDomThreadsPanelOpen(true);

    setIsMembersListOpen(false);
    setCurrentThread(thread);
  };

  return (
    <IconButton
      icon="ThreadPanel"
      color="light"
      backgroundGlowSize="xl"
      tooltipLabel={t('openthread.tooltip') as string}
      tooltipPlacement="top"
      onClick={handlePanelClick}
    />
  );
};

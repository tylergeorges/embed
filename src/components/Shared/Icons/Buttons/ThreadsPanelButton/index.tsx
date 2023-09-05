import { IconButton } from '@components/Shared/Icons/Buttons/IconButton';
import { Channel } from '@graphql/graphql';
import { useStoreActions } from '@state';
import { useTranslation } from 'react-i18next';

interface ThreadsPanelButtonProps {
  thread: Channel;
}
export const ThreadsPanelButton = ({ thread }: ThreadsPanelButtonProps) => {
  const translate = useTranslation();

  const setCurrentThread = useStoreActions(state => state.guild.setCurrentThread);

  const setIsDomThreadsPanelOpen = useStoreActions(state => state.ui.setIsDomThreadsPanelOpen);

  const handlePanelClick = () => {
    // Adds element to DOM
    setIsDomThreadsPanelOpen(true);

    setCurrentThread(thread);
  };

  return (
    <IconButton
      icon="ThreadPanel"
      color="light"
      backgroundGlowSize="xl"
      tooltipLabel={translate.t('openthread.tooltip') as string}
      tooltipPlacement="top"
      onClick={handlePanelClick}
    />
  );
};

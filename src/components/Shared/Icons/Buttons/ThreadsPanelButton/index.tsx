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

  const setIsCurrentChannelThread = useStoreActions(state => state.ui.setIsCurrentChannelThread);
  const setIsMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);
  const setIsThreadsPanelOpen = useStoreActions(state => state.ui.setIsThreadsPanelOpen);

  const handlePanelClick = () => {
    setIsCurrentChannelThread(true);
    setIsThreadsPanelOpen(true);
    setIsMembersListOpen(false);
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

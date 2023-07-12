import { IconButton } from '@components/Shared/Icons/Buttons/IconButton';
import { Channel } from '@graphql/graphql';
import { useStoreActions } from '@state';
import { useCallback } from 'react';
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

  const handlePanelClick = useCallback(() => {
    setIsCurrentChannelThread(true);
    setIsThreadsPanelOpen(true);
    setIsMembersListOpen(false);
    setCurrentThread(thread);
  }, [
    setCurrentThread,
    setIsMembersListOpen,
    setIsCurrentChannelThread,
    thread,
    setIsThreadsPanelOpen
  ]);

  return (
    <IconButton
      color="light"
      backgroundGlowSize={40}
      tooltipLabel={translate.t('openthread.tooltip') as string}
      backgroundGlowOnHover
      name="ThreadPanel"
      tooltipPlacement="bottom"
      onClick={handlePanelClick}
    />
  );
};

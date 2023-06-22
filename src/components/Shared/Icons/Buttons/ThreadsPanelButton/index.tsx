import { IconButtonWrapper } from '@components/Shared/Icons/Buttons/IconButtonWrapper';
import { ThreadsPanelIcon } from '@components/Shared/Icons/ThreadsPanelIcon';
import { Channel } from '@graphql/graphql';
import { useStoreActions } from '@state';
import { useCallback } from 'react';

interface ThreadsPanelButtonProps {
  thread: Channel;
}
export const ThreadsPanelButton = ({ thread }: ThreadsPanelButtonProps) => {
  const setCurrentThread = useStoreActions(state => state.guild.setCurrentThread);
  const setIsCurrentChannelThread = useStoreActions(state => state.ui.setIsCurrentChannelThread);
  const setIsMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);
  const setIsThreadsPanelOpen = useStoreActions(state => state.ui.setIsThreadsPanelOpen);

  const handlePanelClick = useCallback(() => {
    setIsCurrentChannelThread(true);
    setIsThreadsPanelOpen(true);
    setIsMembersListOpen(false);
    setCurrentThread(thread);
  }, [setCurrentThread, setIsMembersListOpen, setIsCurrentChannelThread, thread, setIsThreadsPanelOpen]);

  return (
    <IconButtonWrapper
      iconBackgroundSize={40}
      tooltipLabel="Open Thread"
      tooltipPlacement="top"
      backgroundGlowOnHover
      onClick={handlePanelClick}
    >
      <ThreadsPanelIcon customSize={30} />
    </IconButtonWrapper>
  );
};

import { IconButton } from '@components/Shared/Icons/Buttons/IconButton';
import { useAppRouter } from '@lib/hooks';
import { useStoreActions, useStoreState } from '@state';
import { useCallback } from 'react';

export const ThreadsButton = () => {
  const setShowThreadsModal = useStoreActions(state => state.ui.setShowThreadsModal);
  const showThreadsModal = useStoreState(state => state.ui.showThreadsModal);
  const guildChannels = useStoreState(state => state.guild.guildChannels);

  const { channelId } = useAppRouter();

  const channelThreadsLength = String(guildChannels[channelId].threads?.length);

  const openThreadsModal = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      setShowThreadsModal(!showThreadsModal);
    },
    [setShowThreadsModal, showThreadsModal]
  );

  return (
    <IconButton
      color="light"
      tooltipLabel="Threads"
      name="ThreadHash"
      tooltipPlacement="bottom"
      tooltipDisabledIfActive
      isActive={showThreadsModal}
      iconContent={channelThreadsLength !== '0' ? channelThreadsLength : null}
      onClick={openThreadsModal}
    />
  );
};

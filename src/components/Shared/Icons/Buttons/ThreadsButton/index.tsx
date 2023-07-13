import { IconButton } from '@components/Shared/Icons/Buttons/IconButton';
import { useAppRouter } from '@hooks/useAppRouter';
import { useStoreActions, useStoreState } from '@state';

export const ThreadsButton = () => {
  const setShowThreadsModal = useStoreActions(state => state.ui.setShowThreadsModal);
  const showThreadsModal = useStoreState(state => state.ui.showThreadsModal);
  const guildChannels = useStoreState(state => state.guild.guildChannels);

  const { channelId } = useAppRouter();

  const channelThreadsLength = String(guildChannels[channelId].threads?.length);

  const openThreadsModal = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowThreadsModal(!showThreadsModal);
  };

  return (
    <IconButton
      icon="ThreadHash"
      color="light"
      tooltipLabel="Threads"
      tooltipPlacement="bottom"
      tooltipDisabledIfActive
      isActive={showThreadsModal}
      iconContent={channelThreadsLength !== '0' ? channelThreadsLength : null}
      onClick={openThreadsModal}
    />
  );
};

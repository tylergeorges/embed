import { IconButton } from '@components/Shared/Icons/Buttons/IconButton';
import { useAppRouter } from '@hooks/useAppRouter';
import { useStoreActions, useStoreState } from '@state';
import { useTranslation } from 'react-i18next';
import { Channel as IChannel } from '@graphql/graphql';

export const ThreadsButton = () => {
  const { channelId } = useAppRouter();
  const { t } = useTranslation();

  const setShowThreadsModal = useStoreActions(state => state.ui.setShowThreadsModal);
  const showThreadsModal = useStoreState(state => state.ui.showThreadsModal);
  const guildChannels = useStoreState(state => state.guild.guildChannels);

  const channel = guildChannels[channelId] as IChannel;

  const threadsLen = channel?.threads?.length ?? 0;

  const numOfThreads = threadsLen === 0 ? null : String(threadsLen);

  const openThreadsModal = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowThreadsModal(!showThreadsModal);
  };

  return (
    <IconButton
      icon="ThreadHash"
      color="light"
      tooltipLabel={t('threads.label') as string}
      tooltipPlacement="bottom"
      tooltipDisabledIfActive
      isActive={showThreadsModal}
      iconContent={numOfThreads}
      onClick={openThreadsModal}
    />
  );
};

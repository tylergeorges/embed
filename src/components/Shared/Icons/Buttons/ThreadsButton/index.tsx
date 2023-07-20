import { IconButton } from '@components/Shared/Icons/Buttons/IconButton';
import { useAppRouter } from '@hooks/useAppRouter';
import { useStoreActions, useStoreState } from '@state';
import { useTranslation } from 'react-i18next';

export const ThreadsButton = () => {
  const { channelId } = useAppRouter();
  const translate = useTranslation();

  const setShowThreadsModal = useStoreActions(state => state.ui.setShowThreadsModal);
  const showThreadsModal = useStoreState(state => state.ui.showThreadsModal);
  const guildChannels = useStoreState(state => state.guild.guildChannels);

  const numOfThreads = guildChannels[channelId].threads?.length;

  const openThreadsModal = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowThreadsModal(!showThreadsModal);
  };

  return (
    <IconButton
      icon="ThreadHash"
      color="light"
      tooltipLabel={translate.t('threads.label') as string}
      tooltipPlacement="bottom"
      tooltipDisabledIfActive
      isActive={showThreadsModal}
      // @ts-ignore
      iconContent={numOfThreads || null}
      onClick={openThreadsModal}
    />
  );
};

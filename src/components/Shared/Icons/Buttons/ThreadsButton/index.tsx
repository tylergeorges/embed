import IconButton from '@components/Shared/Icons/Buttons/IconButton';
import { useStoreActions, useStoreState } from '@state';
import { memo, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const ThreadsButton = memo(() => {
  // const { channelId } = useAppRouter();
  const translate = useRef(useTranslation());

  const tooltipLabel = useRef('');

  useEffect(() => {
    if (!tooltipLabel.current) {
      tooltipLabel.current = translate.current.t('threads.label') as string;
    }
  }, [translate]);

  const setShowThreadsModal = useStoreActions(state => state.ui.setShowThreadsModal);
  const showThreadsModal = useStoreState(state => state.ui.showThreadsModal);
  const guildChannels = useStoreState(state => state.guild.guildChannels);

  const currentChannel = useStoreState(state => state.guild.currentChannel);
  const currentChannelThreads = currentChannel ? guildChannels[currentChannel?.id]?.threads : [];

  // eslint-disable-next-line no-nested-ternary
  const numOfThreads = currentChannel
    ? currentChannelThreads?.length === 0
      ? null
      : currentChannelThreads?.length
    : null;

  const openThreadsModal = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      setShowThreadsModal(!showThreadsModal);
    },
    [showThreadsModal, setShowThreadsModal]
  );

  return (
    <IconButton
      icon="ThreadHash"
      color="light"
      tooltipLabel={tooltipLabel.current}
      tooltipPlacement="bottom"
      tooltipDisabledIfActive
      isActive={showThreadsModal}
      // @ts-ignore
      iconContent={numOfThreads ?? null}
      onClick={openThreadsModal}
    />
  );
});

ThreadsButton.displayName = 'ThreadsButton';
ThreadsButton.whyDidYouRender = true;

export default ThreadsButton;

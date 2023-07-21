import Popout from '@components/Overlays/Modal/Popout/index';
import { useStoreState, useStoreActions } from '@state';
import { Fragment, RefObject, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import ChannelThreads from './ChannelThreads';
import NoThreads from './NoThreads';

interface ThreadsPopoutProps {
  popoutFor: RefObject<HTMLDivElement>;
}

const ThreadsPopout = memo(({ popoutFor }: ThreadsPopoutProps) => {
  const translate = useTranslation();
  const threadsTitle = translate.t('threads.label');

  const { channel: channelId } = useRouter().query;

  const showThreadsModal = useStoreState(state => state.ui.showThreadsModal);
  const guildChannels = useStoreState(state => state.guild.guildChannels);
  const setShowThreadsModal = useStoreActions(state => state.ui.setShowThreadsModal);

  const currentChannelThreads = guildChannels[channelId as string]?.threads ?? [];

  const hideThreadsModal = useCallback(() => {
    setShowThreadsModal(false);
  }, [setShowThreadsModal]);

  return (
    <Popout
      title={threadsTitle}
      TitleIcon="ThreadHash"
      isOpen={showThreadsModal}
      hideModal={hideThreadsModal}
      popoutFor={popoutFor.current}
    >
      {currentChannelThreads.length > 0 ? (
        <Fragment key="popout-threads-wrapper">
          <ChannelThreads threads={currentChannelThreads} />
        </Fragment>
      ) : (
        <Fragment key="poout-no-threads-wrapper">
          <NoThreads />
        </Fragment>
      )}
    </Popout>
  );
});

ThreadsPopout.whyDidYouRender = true;
ThreadsPopout.displayName = 'ThreadsPopout';

export default ThreadsPopout;

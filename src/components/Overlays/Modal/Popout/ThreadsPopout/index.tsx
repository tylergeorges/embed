import { Popout } from '@components/Overlays/Modal/Popout/index';
import { useAppRouter } from '@hooks/useAppRouter';
import { useStoreState, useStoreActions } from '@state';
import { ReactElement, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ThreadChannel } from '@graphql/graphql';
import { ChannelThreads } from './ChannelThreads';
import { NoThreads } from './NoThreads';

interface ThreadsPopoutProps {
  children: ReactElement<any, any>;
}

export const ThreadsPopout = ({ children }: ThreadsPopoutProps) => {
  const { t } = useTranslation();
  const { channelId } = useAppRouter();

  const showThreadsModal = useStoreState(state => state.ui.showThreadsModal);
  const guildChannels = useStoreState(state => state.guild.guildChannels);
  const setShowThreadsModal = useStoreActions(state => state.ui.setShowThreadsModal);

  const childrenRef = useRef<HTMLDivElement>(null);

  const currentChannelThreads = (guildChannels[channelId]?.threads as ThreadChannel[]) ?? [];

  const hideThreadsModal = useCallback(() => {
    setShowThreadsModal(false);
  }, [setShowThreadsModal]);

  return (
    <>
      <Popout
        title={t('threads.label')}
        TitleIcon="ThreadHash"
        isOpen={showThreadsModal}
        hideModal={hideThreadsModal}
        popoutFor={childrenRef.current}
      >
        {currentChannelThreads.length > 0 ? (
          <ChannelThreads threads={currentChannelThreads} />
        ) : (
          <NoThreads />
        )}
      </Popout>

      <div ref={childrenRef}>{children}</div>
    </>
  );
};

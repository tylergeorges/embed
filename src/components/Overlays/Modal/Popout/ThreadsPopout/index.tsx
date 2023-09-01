import { Popout } from '@components/Overlays/Modal/Popout/index';
import { useAppRouter } from '@hooks/useAppRouter';
import { useStoreState, useStoreActions } from '@state';
import { ReactElement, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { threadsQuery } from '@hooks/messagesQuery';
import { FetchingDataSpinner } from '@components/Core/VirtualLists/listComponents';
import { ThreadChannel } from '@graphql/graphql';
import { ChannelThreads } from './ChannelThreads';
import { NoThreads } from './NoThreads';

interface ThreadsPopoutProps {
  children: ReactElement<any, any>;
}

export const ThreadsPopout = ({ children }: ThreadsPopoutProps) => {
  const { t } = useTranslation();
  const { channelId, guildId } = useAppRouter();

  const { data, loading } = useQuery(threadsQuery, {
    variables: { channel: channelId, guild: guildId }
  });

  const showThreadsModal = useStoreState(state => state.ui.showThreadsModal);
  const guildChannels = useStoreState(state => state.guild.guildChannels);
  const setShowThreadsModal = useStoreActions(state => state.ui.setShowThreadsModal);

  const childrenRef = useRef<HTMLDivElement>(null);

  const currentChannelThreads = guildChannels[channelId]?.threads ?? [];

  const hideThreadsModal = useCallback(() => {
    setShowThreadsModal(false);
  }, [setShowThreadsModal]);

  const ready = !loading && data;
  const channelHasThreads = currentChannelThreads.length > 0;

  function getPopoutContent() {
    if (!ready) return <FetchingDataSpinner />;

    if (!channelHasThreads) return <NoThreads />;

    return <ChannelThreads threads={data.channel.threads as ThreadChannel[]} />;
  }

  return (
    <>
      <Popout
        title={t('threads.label')}
        TitleIcon="ThreadHash"
        isOpen={showThreadsModal}
        hideModal={hideThreadsModal}
        popoutFor={childrenRef.current}
      >
        {getPopoutContent()}
      </Popout>

      <div ref={childrenRef}>{children}</div>
    </>
  );
};

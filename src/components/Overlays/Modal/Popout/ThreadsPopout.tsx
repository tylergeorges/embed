import { Popout } from '@components/Overlays/Modal/Popout/index';
import * as Styles from '@components/Overlays/Modal/styles';
import { ThreadsPanelButton } from '@components/Shared/Icons/Buttons/ThreadsPanelButton';
import { NoThreadsIcon } from '@components/Shared/Icons/NoThreadsIcon';
import { useAppRouter } from '@lib/hooks';
import { useStoreState, useStoreActions } from '@state';
import { ReactElement, useMemo, useRef } from 'react';

interface ThreadsPopoutProps {
  children: ReactElement<any, any>;
}
export const ThreadsPopout = ({ children }: ThreadsPopoutProps) => {
  const showThreadsModal = useStoreState(state => state.ui.showThreadsModal);
  const setShowThreadsModal = useStoreActions(state => state.ui.setShowThreadsModal);
  const childrenRef = useRef<HTMLDivElement>(null);

  const hideThreadsModal = () => {
    setShowThreadsModal(false);
  };

  const guildChannels = useStoreState(state => state.guild.guildChannels);

  const { guildId, channelId, router } = useAppRouter();

  const currentChannelThreads = guildChannels[channelId]?.threads ?? [];

  const channelHasThreads = useMemo(
    () => currentChannelThreads.length > 0,
    [currentChannelThreads.length]
  );

  // if (!showThreadsModal) return null;

  return (
    <>
      <Popout
        title="Threads"
        TitleIcon="ThreadHash"
        isOpen={showThreadsModal}
        hideModal={hideThreadsModal}
        popoutFor={childrenRef.current}
      >
        {channelHasThreads ? (
          <Styles.ThreadsPopoutContent className="popout-threads_content">
            <Styles.ThreadsPopoutListHeader className="popout-threads_list_header">
              OLDER THREADS
            </Styles.ThreadsPopoutListHeader>

            <Styles.ThreadsPopoutList className="popout-threads_list_container">
              {' '}
              {currentChannelThreads.map(thread => (
                <Styles.ThreadsPopoutListItem
                  className="popout-threads_list_item"
                  key={thread.id}
                  onClick={() =>
                    router.push(`/channels/${guildId}/${channelId}?thread=${thread.id}`)
                  }
                >
                  <Styles.ThreadName className="popout-threads_list_threadname">
                    {thread.name}
                  </Styles.ThreadName>

                  <ThreadsPanelButton thread={thread} />
                </Styles.ThreadsPopoutListItem>
              ))}
            </Styles.ThreadsPopoutList>
          </Styles.ThreadsPopoutContent>
        ) : (
          <Styles.NoThreadsContent className="popout-no_threads_content">
            <NoThreadsIcon />
            <Styles.NoThreadsHeader>There are no threads.</Styles.NoThreadsHeader>
          </Styles.NoThreadsContent>
        )}
      </Popout>

      <div ref={childrenRef}>{children}</div>
    </>
  );
};

import { Popover } from '@components/Overlays/Modal/Popover';
import {
  ThreadsPopoverListItem,
  ThreadsPopoverContent,
  ThreadsPopoverListHeader,
  ThreadName,
  ThreadsPopoverList,
  NoThreadsContent,
  NoThreadsHeader
} from '@components/Overlays/Modal/elements';
import { ThreadsPanelButton } from '@components/Shared/Icons/Buttons/ThreadsPanelButton';
import { NoThreadsIcon } from '@components/Shared/Icons/NoThreadsIcon';
import { ThreadsIcon } from '@components/Shared/Icons/ThreadsIcon';
import { useAppRouter } from '@lib/hooks';
import { useStoreState, useStoreActions } from '@state';
import { ReactElement, useMemo, useRef } from 'react';

interface ThreadsPopoverProps {
  children: ReactElement<any, any>;
}
export const ThreadsPopover = ({ children }: ThreadsPopoverProps) => {
  const showThreadsModal = useStoreState(state => state.ui.showThreadsModal);
  const setShowThreadsModal = useStoreActions(state => state.ui.setShowThreadsModal);
  const childrenRef = useRef<HTMLDivElement>(null);

  const hideThreadsModal = () => {
    setShowThreadsModal(false);
  };

  const guildChannels = useStoreState(state => state.guild.guildChannels);

  const { guildId, channelId, router } = useAppRouter();

  const currentChannelThreads = guildChannels[channelId]?.threads ?? [];

  const channelHasThreads = useMemo(() => currentChannelThreads.length > 0, [currentChannelThreads.length]);
  return (
    <>
      <Popover
        title="Threads"
        TitleIcon={ThreadsIcon}
        isOpen={showThreadsModal}
        hideModal={hideThreadsModal}
        popoverFor={childrenRef.current}
      >
        {channelHasThreads ? (
          <ThreadsPopoverContent className="popover-threads_content">
            <ThreadsPopoverListHeader className="popover-threads_list_header">OLDER THREADS</ThreadsPopoverListHeader>
            <ThreadsPopoverList className="popover-threads_list_container">
              {' '}
              {currentChannelThreads.map(thread => (
                <ThreadsPopoverListItem
                  className="popover-threads_list_item"
                  key={thread.id}
                  onClick={() => router.push(`/channels/${guildId}/${channelId}?thread=${thread.id}`)}
                >
                  <ThreadName className="popover-threads_list_threadname">{thread.name}</ThreadName>

                  <ThreadsPanelButton thread={thread} />
                </ThreadsPopoverListItem>
              ))}
            </ThreadsPopoverList>
          </ThreadsPopoverContent>
        ) : (
          <NoThreadsContent className="popover-no_threads_content">
            <NoThreadsIcon />
            <NoThreadsHeader>There are no threads.</NoThreadsHeader>
          </NoThreadsContent>
        )}
      </Popover>

      <div ref={childrenRef}>{children}</div>
    </>
  );
};

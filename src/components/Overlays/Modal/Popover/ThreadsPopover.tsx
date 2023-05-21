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
import { NoThreadsIcon } from '@components/Shared/Icons/NoThreadsIcon';
import { ThreadsIcon } from '@components/Shared/Icons/ThreadsIcon';
import { useStoreState, useStoreActions } from '@state';
import { useRouter } from 'next/router';
import { ReactElement, useRef } from 'react';
import { RouterQuery } from 'types/routerQuery';

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

  const channelThreads = useStoreState(state => state.guild.channelThreads);
  const router = useRouter();

  const { guild: guildId, channel: channelId } = router.query as RouterQuery;

  const currentChannelThreads = channelThreads[channelId]?.threads ?? [];

  return (
    <>
      <Popover
        title="Threads"
        TitleIcon={ThreadsIcon}
        isOpen={showThreadsModal}
        hideModal={hideThreadsModal}
        popoverFor={childrenRef.current}
      >
        {currentChannelThreads.length > 0 ? (
          <ThreadsPopoverContent>
            <>
              <ThreadsPopoverListHeader>OLDER THREADS</ThreadsPopoverListHeader>
              <ThreadsPopoverList>
                {' '}
                {currentChannelThreads.map(thread => (
                  <ThreadsPopoverListItem
                    key={thread.id}
                    onClick={() =>
                      router.push(`/channels/${guildId}/${channelId}?thread=${thread.id}`)
                    }
                  >
                    <ThreadName>{thread.name}</ThreadName>
                  </ThreadsPopoverListItem>
                ))}
              </ThreadsPopoverList>
            </>
          </ThreadsPopoverContent>
        ) : (
          <NoThreadsContent>
            <NoThreadsIcon />
            <NoThreadsHeader>There are no threads.</NoThreadsHeader>
          </NoThreadsContent>
        )}
      </Popover>

      <div ref={childrenRef}>{children}</div>
    </>
  );
};

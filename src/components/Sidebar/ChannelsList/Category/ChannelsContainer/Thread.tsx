import { ThreadNameInner } from '@components/Sidebar/ChannelsList/elements';
import { IThread } from '@state/stores/guild';
import { useRouter } from 'next/router';
import { forwardRef } from 'react';
import { RouterQuery } from 'types/routerQuery';

interface ThreadProps {
  thread: IThread;
  isActive: boolean;
  handleContextMenuClick: (e: React.MouseEvent) => void;
}
export const Thread = forwardRef<HTMLAnchorElement, ThreadProps>(
  ({ thread, handleContextMenuClick, isActive }, ref) => {
    const router = useRouter();

    const { channel, guild } = router.query as RouterQuery;
    return (
      <ThreadNameInner
        active_state={isActive}
        href={`/channels/${guild}/${channel}?thread=${thread.id}`}
        // We only want to set the ref for the current channel
        ref={ref}
        draggable={false}
        className="channel-name"
        onContextMenu={handleContextMenuClick}
      >
        {thread.name}
      </ThreadNameInner>
    );
  }
);

Thread.displayName = 'Thread';

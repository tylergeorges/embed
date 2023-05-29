import { ThreadNameInner } from '@components/Sidebar/ChannelsList/elements';
import { useAppRouter } from '@lib/hooks';
import { IThread } from '@state/stores/guild';
import { forwardRef } from 'react';

interface ThreadProps {
  thread: IThread;
  isActive: boolean;
  handleContextMenuClick: (e: React.MouseEvent) => void;
}
export const Thread = forwardRef<HTMLAnchorElement, ThreadProps>(
  ({ thread, handleContextMenuClick, isActive }, ref) => {
    const { channelId, guildId } = useAppRouter();
    return (
      <ThreadNameInner
        active_state={isActive}
        href={`/channels/${guildId}/${channelId}?thread=${thread.id}`}
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

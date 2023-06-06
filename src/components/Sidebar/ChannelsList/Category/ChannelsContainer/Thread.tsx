import { ThreadNameInner } from '@components/Sidebar/ChannelsList/elements';

import { IThread } from '@state/stores/guild';
import { forwardRef } from 'react';

interface ThreadProps {
  thread: IThread;
  isActive: boolean;
  handleContextMenuClick: (e: React.MouseEvent) => void;
  currentChannelUrl: string;
}
export const Thread = forwardRef<HTMLAnchorElement, ThreadProps>(
  ({ thread, handleContextMenuClick, isActive, currentChannelUrl }, ref) => (
    <ThreadNameInner
      active_state={isActive}
      href={`${currentChannelUrl}?thread=${thread.id}`}
      className="thread-name channel-name"
      ref={ref}
      draggable={false}
      onContextMenu={handleContextMenuClick}
    >
      {thread.name}
    </ThreadNameInner>
  )
);

Thread.displayName = 'Thread';

import * as Styles from '@components/Sidebar/ChannelsList/styles';

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
    <Styles.ThreadNameInner
      active_state={isActive}
      href={`${currentChannelUrl}?thread=${thread.id}`}
      className=" channel-name"
      ref={ref}
      draggable={false}
      onContextMenu={handleContextMenuClick}
    >
      {thread.name}
    </Styles.ThreadNameInner>
  )
);

Thread.displayName = 'Thread';

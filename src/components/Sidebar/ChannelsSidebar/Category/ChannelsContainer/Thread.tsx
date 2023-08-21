import * as Styles from '@components/Sidebar/ChannelsSidebar/styles';
import { forwardRef } from 'react';
import { IThread } from 'types/guild.types';

interface ThreadProps {
  thread: IThread;
  isActive: boolean;
  handleContextMenuClick: (e: React.MouseEvent) => void;
  currentChannelUrl: string;
}
export const Thread = forwardRef<HTMLAnchorElement, ThreadProps>(
  ({ thread, handleContextMenuClick, isActive, currentChannelUrl }, ref) => (
    <Styles.ThreadNameInner
      isActive={isActive}
      href={`${currentChannelUrl}?thread=${thread.id}`}
      className="channel-name"
      ref={ref}
      draggable={false}
      onContextMenu={handleContextMenuClick}
    >
      {thread.name}
    </Styles.ThreadNameInner>
  )
);

Thread.displayName = 'Thread';

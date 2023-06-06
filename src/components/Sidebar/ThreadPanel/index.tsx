import { MessageContainer } from '@components/Core/Container/MessageContainer';
import { ThreadPanelHeader } from '@components/Header/ThreadPanelHeader';

import {
  ThreadsPanelContainer,
  ThreadsPanelSeperator,
  ThreadPanelWrapper
} from '@components/Sidebar/elements';
import { useStoreState } from '@state';
import { mediaQuery } from '@stitches';

export const ThreadPanel = () => {
  const isThreadsPanelOpen = useStoreState(state => state.ui.isThreadsPanelOpen);
  const isCurrentChannelThread = useStoreState(state => state.ui.isCurrentChannelThread);

  return (
    <ThreadPanelWrapper
      mobile={{
        '@initial': false,
        [`${mediaQuery.small}`]: true
      }}
      isOpen={isThreadsPanelOpen && isCurrentChannelThread}
    >
      <ThreadsPanelSeperator className="panel-threads_seperator" />

      <ThreadsPanelContainer
        className="thread-panel_wrapper"
        isOpen={isThreadsPanelOpen && isCurrentChannelThread}
      >
        <ThreadPanelHeader />

        <MessageContainer guildName="ew" />
      </ThreadsPanelContainer>
    </ThreadPanelWrapper>
  );
};

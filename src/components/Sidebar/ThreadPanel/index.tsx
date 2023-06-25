import { MessageContainer } from '@components/Core/TextChannelContainer/MessageContainer';
import { ThreadPanelHeader } from '@components/Header/ThreadPanelHeader';

import {
  ThreadsPanelContainer,
  ThreadsPanelSeperator,
  ThreadPanelWrapper
} from '@components/Sidebar/elements';
import { useStoreState } from '@state';

export const ThreadPanel = () => {
  const isThreadsPanelOpen = useStoreState(state => state.ui.isThreadsPanelOpen);
  const isCurrentChannelThread = useStoreState(state => state.ui.isCurrentChannelThread);

  return (
    <ThreadPanelWrapper
      mobile={{
        '@initial': false,
        '@small': true
      }}
      isOpen={isThreadsPanelOpen && isCurrentChannelThread}
    >
      <ThreadsPanelSeperator
        className="panel-threads_seperator"
        isOpen={isThreadsPanelOpen && isCurrentChannelThread}
      />

      <ThreadsPanelContainer
        className="thread-panel_wrapper"
        isOpen={isThreadsPanelOpen && isCurrentChannelThread}
      >
        <ThreadPanelHeader />

        <MessageContainer />
      </ThreadsPanelContainer>
    </ThreadPanelWrapper>
  );
};

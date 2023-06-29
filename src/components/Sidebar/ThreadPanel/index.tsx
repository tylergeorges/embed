import { MessageContainer } from '@components/Core/TextChannelContainer/MessageContainer';
import { ThreadPanelHeader } from '@components/Header/ThreadPanelHeader';

import * as Styles from '@components/Sidebar/styles';
import { useStoreState } from '@state';

export const ThreadPanel = () => {
  const isThreadsPanelOpen = useStoreState(state => state.ui.isThreadsPanelOpen);
  const isCurrentChannelThread = useStoreState(state => state.ui.isCurrentChannelThread);

  return (
    <Styles.ThreadPanelWrapper
      mobile={{
        '@initial': false,
        '@small': true
      }}
      isOpen={isThreadsPanelOpen && isCurrentChannelThread}
    >
      <Styles.ThreadsPanelSeperator
        className="panel-threads_seperator"
        isOpen={isThreadsPanelOpen && isCurrentChannelThread}
      />

      <Styles.ThreadsPanelContainer
        className="thread-panel_wrapper"
        isOpen={isThreadsPanelOpen && isCurrentChannelThread}
      >
        <ThreadPanelHeader />

        <MessageContainer />
      </Styles.ThreadsPanelContainer>
    </Styles.ThreadPanelWrapper>
  );
};

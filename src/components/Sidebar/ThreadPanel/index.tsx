import * as Styles from '@components/Sidebar/styles';
import { MessageContainer } from '@components/Core/TextChannelContainer/MessageContainer';
import { ThreadPanelHeader } from '@components/Header/ThreadPanelHeader';

import { useStoreState } from '@state';

export const ThreadPanel = () => {
  const isThreadsPanelOpen = useStoreState(state => state.ui.isThreadsPanelOpen);

  return (
    <Styles.ThreadPanelWrapper
      mobile={{
        '@initial': false,
        '@small': true
      }}
      isOpen={isThreadsPanelOpen}
    >
      <Styles.ThreadsPanelSeperator
        className="panel-threads_seperator"
        isOpen={isThreadsPanelOpen}
      />

      <Styles.ThreadsPanelContainer className="thread-panel_wrapper" isOpen={isThreadsPanelOpen}>
        <ThreadPanelHeader />

        <MessageContainer />
      </Styles.ThreadsPanelContainer>
    </Styles.ThreadPanelWrapper>
  );
};

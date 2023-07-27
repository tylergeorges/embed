import * as Styles from '@components/Sidebar/styles';

import { ThreadPanelHeader } from '@components/Header/ThreadPanelHeader';
import { ThreadMessageContainer } from '@components/Core/TextChannelContainer/ThreadChannelContainer/ThreadMessageContainer';

interface ThreadChannelContainerProps {
  startPanelHideTransition: () => void;
}

export const ThreadChannelContainer = ({
  startPanelHideTransition
}: ThreadChannelContainerProps) => (
  <Styles.ThreadsPanelContainer>
    <ThreadPanelHeader startPanelHideTransition={startPanelHideTransition} />
    <ThreadMessageContainer />
  </Styles.ThreadsPanelContainer>
);

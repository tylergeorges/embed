import * as Styles from '@components/Header/styles';
import { Icons } from '@icons/index';
import { CloseButton } from '@icons/Buttons/CloseButton';
import { useStoreState } from '@state';
import { FullscreenButton } from '@icons/Buttons/FullscreenButton';
import { Header } from '@components/Header';

interface ThreadPanelHeaderProps {
  startPanelHideTransition: () => void;
}
export const ThreadPanelHeader = ({ startPanelHideTransition }: ThreadPanelHeaderProps) => {
  const currentThread = useStoreState(state => state.guild.currentThread);

  return (
    <Header>
      <Styles.ThreadPanelHeaderIconContainer>
        <CloseButton onClick={startPanelHideTransition} />

        <Styles.ThreadPanelHeaderIconContent>
          <Icons icon="ThreadHash" color="channel" type="headerIcon" />

          {currentThread?.name}
        </Styles.ThreadPanelHeaderIconContent>
      </Styles.ThreadPanelHeaderIconContainer>

      <FullscreenButton />
    </Header>
  );
};

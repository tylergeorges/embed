import * as Styles from '@components/Header/styles';
import { Hamburger } from '@icons/Buttons/Hamburger';
import { Icons } from '@icons/index';
import { CloseButton } from '@icons/Buttons/CloseButton';
import { useStoreState } from '@state';
import { useMediaQuery } from '@hooks/useMediaQuery';

interface ThreadPanelHeaderProps {
  handleClose: () => void;
}
export const ThreadPanelHeader = ({ handleClose }: ThreadPanelHeaderProps) => {
  const windowIsMobile = useMediaQuery('screen and (max-width: 768px)');

  const currentThread = useStoreState(state => state.guild.currentThread);

  return (
    <Styles.ThreadPanelHeaderRoot>
      <Styles.ThreadPanelHeaderIconContainer>
        <Styles.ThreadPanelHeaderIconContent>
          {windowIsMobile && <Hamburger />}
          <Icons icon="ThreadHash" color="dark" type="headerIcon" />
          {currentThread?.name}
        </Styles.ThreadPanelHeaderIconContent>
        <CloseButton onClick={handleClose} />
      </Styles.ThreadPanelHeaderIconContainer>
    </Styles.ThreadPanelHeaderRoot>
  );
};

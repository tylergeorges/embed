import * as Styles from '@components/Header/styles';
import { Hamburger } from '@icons/Buttons/Hamburger';
import { Icons } from '@icons/index';
import { CloseButton } from '@icons/Buttons/CloseButton';
import { useStoreActions, useStoreState } from '@state';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { useAppRouter } from '@hooks/useAppRouter';

export const ThreadPanelHeader = () => {
  const windowIsMobile = useMediaQuery('screen and (max-width: 768px)');

  const setIsThreadsPanelOpen = useStoreActions(state => state.ui.setIsThreadsPanelOpen);
  const setIsCurrentChannelThread = useStoreActions(state => state.ui.setIsCurrentChannelThread);

  const { channelId, guildId, router } = useAppRouter();
  const currentThread = useStoreState(state => state.guild.currentThread);

  const closePanel = () => {
    setIsThreadsPanelOpen(false);
    setIsCurrentChannelThread(false);
    router.push(`/channels/${guildId}/${channelId}`);
  };

  return (
    <Styles.ThreadPanelHeaderRoot>
      <Styles.ThreadPanelHeaderIconContainer>
        <Styles.ThreadPanelHeaderIconContent>
          {windowIsMobile && <Hamburger />}
          <Icons icon="ThreadHash" color="dark" type="headerIcon" />
          {currentThread?.name}
        </Styles.ThreadPanelHeaderIconContent>
        <CloseButton onClick={closePanel} />
      </Styles.ThreadPanelHeaderIconContainer>
    </Styles.ThreadPanelHeaderRoot>
  );
};

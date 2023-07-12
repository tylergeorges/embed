import * as Styles from '@components/Header/styles';
import { Hamburger } from '@icons/Buttons/Hamburger';
import { Icons } from '@icons/index';
import { CloseButton } from '@icons/Buttons/CloseButton';
import { useStoreActions, useStoreState } from '@state';
import { useCallback } from 'react';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { useAppRouter } from '@hooks/useAppRouter';

export const ThreadPanelHeader = () => {
  const setIsThreadsPanelOpen = useStoreActions(state => state.ui.setIsThreadsPanelOpen);
  const setIsCurrentChannelThread = useStoreActions(state => state.ui.setIsCurrentChannelThread);
  const windowIsMobile = useMediaQuery('screen and (max-width: 768px)');

  const { channelId, guildId, router } = useAppRouter();
  const currentThread = useStoreState(state => state.guild.currentThread);

  const closePanel = useCallback(() => {
    setIsThreadsPanelOpen(false);
    setIsCurrentChannelThread(false);
    router.push(`/channels/${guildId}/${channelId}`);
  }, [setIsCurrentChannelThread, setIsThreadsPanelOpen, channelId, guildId, router]);

  if (!currentThread) return <></>;

  return (
    <Styles.ThreadPanelHeaderRoot>
      <Styles.ThreadPanelHeaderIconContainer>
        <Styles.ThreadPanelHeaderIconContent>
          {windowIsMobile && <Hamburger />}
          <Icons name="ThreadHash" color="dark" type="headerIcon" />
          {currentThread.name}
        </Styles.ThreadPanelHeaderIconContent>
        <CloseButton onClick={closePanel} />
      </Styles.ThreadPanelHeaderIconContainer>
    </Styles.ThreadPanelHeaderRoot>
  );
};

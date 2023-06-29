import * as Styles from '@components/Header/styles';
import { Hamburger } from '@components/Shared/Icons/Buttons/Hamburger';
import { useStoreActions, useStoreState } from '@state';
import { useCallback } from 'react';
import { useMediaQuery, useAppRouter } from '@lib/hooks';
import { Icons } from '@components/Shared/Icons/Icons';
import { IconButton } from '@components/Shared/Icons/Buttons/IconButton';

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
        <IconButton
          name="Close"
          backgroundGlowOnHover
          onClick={closePanel}
          backgroundGlowSize={30}
        />
      </Styles.ThreadPanelHeaderIconContainer>
    </Styles.ThreadPanelHeaderRoot>
  );
};

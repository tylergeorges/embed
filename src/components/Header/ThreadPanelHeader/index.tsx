import { Header } from '@components/Header';
import {
  ThreadPanelHeaderIconContainer,
  ThreadPanelHeaderRoot,
  ThreadPanelHeaderIconContent
} from '@components/Header/elements';
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

  return (
    <Header isChannelHeader={false} shadowEnabled>
      <ThreadPanelHeaderRoot className="panel-thread_header_root">
        <ThreadPanelHeaderIconContainer className="panel-thread_header_icon_container">
          <ThreadPanelHeaderIconContent className="panel-thread_header_icon_content">
            {windowIsMobile && <Hamburger />}
            <Icons name="ThreadHash" color="dark" css={{ marginX: '$sm' }} />
            {currentThread?.name}
          </ThreadPanelHeaderIconContent>
          <IconButton name="Close" backgroundGlowOnHover onClick={closePanel} />
        </ThreadPanelHeaderIconContainer>
      </ThreadPanelHeaderRoot>
    </Header>
  );
};

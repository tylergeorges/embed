import { Header } from '@components/Header';
import {
  ThreadPanelHeaderIconContainer,
  ThreadPanelHeaderRoot,
  ThreadPanelHeaderIconContent
} from '@components/Header/elements';
import { CloseButton } from '@components/Shared/Icons/Buttons/CloseButton';
import { Hamburger } from '@components/Shared/Icons/Buttons/Hamburger';
import { ThreadsIcon } from '@components/Shared/Icons/ThreadsIcon';
import { useStoreActions, useStoreState } from '@state';
import { useCallback } from 'react';
import { useMediaQuery, useAppRouter } from '@lib/hooks';

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
            <ThreadsIcon
              css={{ marginLeft: 8, marginRight: 8, path: { fill: 'rgb(128, 132, 142)' } }}
            />
            {currentThread?.name}
          </ThreadPanelHeaderIconContent>
          <CloseButton onClick={closePanel} />
        </ThreadPanelHeaderIconContainer>
      </ThreadPanelHeaderRoot>
    </Header>
  );
};

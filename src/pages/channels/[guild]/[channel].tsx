/* eslint-disable no-alert */
import React, { memo } from 'react';
import { ChannelsSidebar } from '@components/Sidebar/ChannelsSidebar';
import { useStoreState } from '@state';
import { TextChannelContainer } from '@components/Core/TextChannelContainer';
import * as Styles from '@components/Core/styles';
import { useContextMenu } from '@hooks/useContextMenu';
import dynamic from 'next/dynamic';
import { GuestFormModal } from '@components/Overlays/Modal/GuestFormModal';

// dynamic imports since they are conditionally rendered, helps with bundle size
const ChannelTopicModal = dynamic(() =>
  import('@components/Overlays/Modal/InformationModal/ChannelTopicModal').then(
    mod => mod.ChannelTopicModal
  )
);

const ThreadPanel = dynamic(() =>
  import('@components/Sidebar/ThreadPanel').then(mod => mod.ThreadPanel)
);

const ContextMenu = dynamic(() =>
  import('@components/Overlays/ContextMenu').then(mod => mod.ContextMenu)
);

function GuildChannel() {
  const { disableBrowserMenu } = useContextMenu();

  const isDomThreadsPanelOpen = useStoreState(state => state.ui.isDomThreadsPanelOpen);

  const showContextMenu = useStoreState(state => state.ui.showContextMenu);
  const showTopicModal = useStoreState(state => state.ui.showTopicModal);

  return (
    <Styles.Main onContextMenu={disableBrowserMenu}>
      {showContextMenu && <ContextMenu />}

      <Styles.InnerMain>
        {showTopicModal && <ChannelTopicModal />}
        <GuestFormModal />
        <ChannelsSidebar />

        <TextChannelContainer />
      </Styles.InnerMain>
      {isDomThreadsPanelOpen && <ThreadPanel />}
    </Styles.Main>
  );
}

export default memo(GuildChannel);

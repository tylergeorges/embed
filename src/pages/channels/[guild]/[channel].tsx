/* eslint-disable no-alert */
import React, { memo } from 'react';
import { useStoreState } from '@state';
import { TextChannelContainer } from '@components/Core/TextChannelContainer';
import dynamic from 'next/dynamic';

// dynamic imports since they are conditionally rendered, helps with bundle size
const ChannelTopicModal = dynamic(() =>
  import('@components/Overlays/Modal/InformationModal/ChannelTopicModal').then(
    mod => mod.ChannelTopicModal
  )
);

const ThreadPanel = dynamic(() =>
  import('@components/Sidebar/ThreadPanel').then(mod => mod.ThreadPanel)
);

function GuildChannel() {
  const isDomThreadsPanelOpen = useStoreState(state => state.ui.isDomThreadsPanelOpen);

  const showTopicModal = useStoreState(state => state.ui.showTopicModal);

  return (
    <>
      {showTopicModal && <ChannelTopicModal />}

      <TextChannelContainer />
      {isDomThreadsPanelOpen && <ThreadPanel />}
    </>
  );
}

export default memo(GuildChannel);

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

function GuildChannel() {
  const showTopicModal = useStoreState(state => state.ui.showTopicModal);

  return (
    <>
      {showTopicModal && <ChannelTopicModal />}

      <TextChannelContainer />
    </>
  );
}

export default memo(GuildChannel);

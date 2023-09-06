import React, { memo, useEffect } from 'react';
import { useStoreState, useStoreActions } from '@state';
import { TextChannelContainer } from '@components/Core/TextChannelContainer';
import dynamic from 'next/dynamic';
import { useAppRouter } from '@hooks/useAppRouter';

// dynamic imports since they are conditionally rendered, helps with bundle size
const ChannelTopicModal = dynamic(() =>
  import('@components/Overlays/Modal/InformationModal/ChannelTopicModal').then(
    mod => mod.ChannelTopicModal
  )
);

function GuildChannel() {
  const { threadId, channelId } = useAppRouter();

  const showTopicModal = useStoreState(state => state.ui.showTopicModal);
  const guildChannels = useStoreState(state => state.guild.guildChannels);
  const currentThread = useStoreState(state => state.guild.currentThread);

  const setIsMembersListOpen = useStoreActions(state => state.ui.setIsMembersListOpen);
  const setIsDomThreadsPanelOpen = useStoreActions(state => state.ui.setIsDomThreadsPanelOpen);
  const setCurrentThread = useStoreActions(state => state.guild.setCurrentThread);

  useEffect(() => {
    if (threadId && !currentThread) {
      // Adds element to DOM

      const thread = guildChannels[channelId]?.threads?.find(thread => thread.id === threadId);

      if (thread) {
        setIsDomThreadsPanelOpen(true);
        setIsMembersListOpen(false);
        setCurrentThread(thread);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentThread, setCurrentThread, threadId]);
  return (
    <>
      {showTopicModal && <ChannelTopicModal />}

      <TextChannelContainer />
    </>
  );
}

export default memo(GuildChannel);

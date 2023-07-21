import * as Styles from '@components/Header/styles';
import ThreadsPopout from '@components/Overlays/Modal/Popout/ThreadsPopout';
import { Icons } from '@components/Shared/Icons';
import { Hamburger } from '@components/Shared/Icons/Buttons/Hamburger';
import { MembersButton } from '@components/Shared/Icons/Buttons/MembersButton';
import { PinButton } from '@components/Shared/Icons/Buttons/PinButton';
import ThreadsButton from '@components/Shared/Icons/Buttons/ThreadsButton';
import * as SkeletonStyles from '@components/Shared/SkeletonLoaders';
import { useStoreActions, useStoreState } from '@state';
import { memo, useRef } from 'react';

export const ChannelHeader = memo(() => {
  const setShowTopicModal = useStoreActions(state => state.ui.setShowTopicModal);
  const currentChannel = useStoreState(state => state.guild.currentChannel);

  const threadsButtonRef = useRef<HTMLDivElement>(null);

  const openTopicModal = () => {
    setShowTopicModal(true);
  };

  return (
    <Styles.ChannelHeaderRoot>
      <Styles.ChannelHeaderNameWrapper role="dialog" aria-modal="true">
        <Hamburger />

        <Styles.ChannelNameTopicWrapper>
          {currentChannel ? (
            <>
              <Icons icon="TextChannelHash" size="small" color="dark" />
              <Styles.ChannelHeaderName>{currentChannel.name}</Styles.ChannelHeaderName>
              <Styles.ChannelHeaderTopic onClick={openTopicModal}>
                {currentChannel.topic}
              </Styles.ChannelHeaderTopic>
            </>
          ) : (
            <>
              <SkeletonStyles.SkeletonLine size="xs" borderRadius="round" />
              <SkeletonStyles.SkeletonLine size="lg" borderRadius="semiRound" />
              <SkeletonStyles.SkeletonLine size="xxl" borderRadius="round" />
            </>
          )}
        </Styles.ChannelNameTopicWrapper>
      </Styles.ChannelHeaderNameWrapper>

      <div ref={threadsButtonRef}>
        <ThreadsButton />
      </div>

      <ThreadsPopout popoutFor={threadsButtonRef} />

      <PinButton />
      <MembersButton />
    </Styles.ChannelHeaderRoot>
  );
});

ChannelHeader.displayName = 'ChannelHeader';

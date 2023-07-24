/* eslint-disable no-nested-ternary */
import * as Styles from '@components/Header/styles';
import { ThreadsPopout } from '@components/Overlays/Modal/Popout/ThreadsPopout';
import { Icons } from '@components/Shared/Icons';
import { Hamburger } from '@components/Shared/Icons/Buttons/Hamburger';
import { MembersButton } from '@components/Shared/Icons/Buttons/MembersButton';
import { PinButton } from '@components/Shared/Icons/Buttons/PinButton';
import { ThreadsButton } from '@components/Shared/Icons/Buttons/ThreadsButton';
import * as SkeletonStyles from '@components/Shared/SkeletonLoaders';
import { useStoreActions, useStoreState } from '@state';

export const ChannelHeader = () => {
  const setShowTopicModal = useStoreActions(state => state.ui.setShowTopicModal);
  const currentChannel = useStoreState(state => state.guild.currentChannel);
  const currentThread = useStoreState(state => state.guild.currentThread);

  const isCurrentChannelThread = useStoreState(state => state.ui.isCurrentChannelThread);

  const openTopicModal = () => {
    setShowTopicModal(true);
  };

  return (
    <Styles.ChannelHeaderRoot>
      <Styles.ChannelHeaderNameWrapper role="dialog" aria-modal="true">
        <Hamburger />

        <Styles.ChannelNameTopicWrapper>
          {!isCurrentChannelThread && currentChannel ? (
            <>
              <Icons icon="TextChannelHash" size="small" color="dark" />
              <Styles.ChannelHeaderName>{currentChannel.name}</Styles.ChannelHeaderName>
              <Styles.ChannelHeaderTopic onClick={openTopicModal}>
                {currentChannel.topic}
              </Styles.ChannelHeaderTopic>
            </>
          ) : isCurrentChannelThread && currentThread ? (
            <>
              <Icons icon="TextChannelHash" size="small" color="dark" />
              <Styles.ChannelHeaderName>{currentThread.name}</Styles.ChannelHeaderName>
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

      <ThreadsPopout>
        <ThreadsButton />
      </ThreadsPopout>

      <PinButton />
      <MembersButton />
    </Styles.ChannelHeaderRoot>
  );
};

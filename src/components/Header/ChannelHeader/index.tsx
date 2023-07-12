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

  const openTopicModal = () => {
    setShowTopicModal(true);
  };

  return (
    <Styles.ChannelHeaderRoot>
      <Styles.ChannelHeaderNameWrapper role="dialog" aria-modal="true">
        <Hamburger />

        <Styles.ChannelNameTopicWrapper>
          {currentChannel ? (
            <Icons name="TextChannelHash" size="small" color="dark" />
          ) : (
            <SkeletonStyles.SkeletonLine size="xs" borderRadius="round" />
          )}
          {currentChannel ? (
            <Styles.ChannelHeaderName>{currentChannel.name}</Styles.ChannelHeaderName>
          ) : (
            <SkeletonStyles.SkeletonLine size="lg" borderRadius="semiRound" />
          )}

          {currentChannel ? (
            <Styles.ChannelHeaderTopic onClick={openTopicModal}>
              {currentChannel.topic}
            </Styles.ChannelHeaderTopic>
          ) : (
            <SkeletonStyles.SkeletonLine size="xxl" borderRadius="round" />
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

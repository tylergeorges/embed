import * as Styles from '@components/Header/styles';
import { ThreadsPopout } from '@components/Overlays/Modal/Popout/ThreadsPopout';
import { ModalContextState } from '@components/Providers/ModalProvider';
import { Icons } from '@components/Shared/Icons';
import { Hamburger } from '@components/Shared/Icons/Buttons/Hamburger';
import { MembersButton } from '@components/Shared/Icons/Buttons/MembersButton';
import { PinButton } from '@components/Shared/Icons/Buttons/PinButton';
import { ThreadsButton } from '@components/Shared/Icons/Buttons/ThreadsButton';
import * as SkeletonStyles from '@components/Shared/SkeletonLoaders';
import { useStoreState } from '@state';
import { useContext } from 'react';

export const ChannelHeader = () => {
  const currentChannel = useStoreState(state => state.guild.currentChannel);
  const { show } = useContext(ModalContextState);

  const openTopicModal = () => {
    show('channel-topic-modal');
    // show('channel-topic-modal', { currentChannel });
  };

  return (
    <Styles.ChannelHeaderRoot>
      <Styles.ChannelHeaderNameWrapper role="dialog" aria-modal="true">
        <Hamburger />

        <Styles.ChannelNameTopicWrapper>
          {currentChannel ? (
            <>
              <Icons icon="TextChannelHash" size="regular" color="channel" />
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

      <ThreadsPopout>
        <ThreadsButton />
      </ThreadsPopout>

      <PinButton />
      <MembersButton />
    </Styles.ChannelHeaderRoot>
  );
};

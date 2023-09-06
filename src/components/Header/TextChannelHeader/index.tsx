import { Header } from '@components/Header';
import * as Styles from '@components/Header/styles';
import { ThreadsPopout } from '@components/Overlays/Modal/Popout/ThreadsPopout';
import { Icons } from '@components/Shared/Icons';
import { Hamburger } from '@components/Shared/Icons/Buttons/Hamburger';
import { PinButton } from '@components/Shared/Icons/Buttons/PinButton';
import { ThreadsButton } from '@components/Shared/Icons/Buttons/ThreadsButton';
import * as SkeletonStyles from '@components/Shared/SkeletonLoaders';
import { useStoreActions, useStoreState } from '@state';

interface ChannelHeaderProps {
  channelName?: string;
  topic?: string;
}

export const TextChannelHeader = ({ channelName, topic }: ChannelHeaderProps) => {
  const setShowTopicModal = useStoreActions(state => state.ui.setShowTopicModal);
  const currentChannel = useStoreState(state => state.guild.currentChannel);

  const openTopicModal = () => {
    setShowTopicModal(true);
  };

  return (
    <Header>
      <Hamburger />
      <Styles.ChannelHeaderNameWrapper role="dialog" aria-modal="true">
        <Styles.ChannelNameTopicWrapper>
          {currentChannel || channelName ? (
            <>
              <Icons icon="TextChannelHash" size="sm" color="channel" />

              <Styles.ChannelHeaderName>
                {channelName ?? currentChannel?.name}
              </Styles.ChannelHeaderName>

              <Styles.ChannelHeaderTopic onClick={openTopicModal}>
                {topic ?? currentChannel?.topic}
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

      {!topic && !channelName && (
        <>
          <ThreadsPopout>
            <ThreadsButton />
          </ThreadsPopout>

          <PinButton />
        </>
      )}
    </Header>
  );
};

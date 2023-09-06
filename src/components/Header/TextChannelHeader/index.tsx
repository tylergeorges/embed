import { Header } from '@components/Header';
import * as Styles from '@components/Header/styles';
import { ThreadsPopout } from '@components/Overlays/Modal/Popout/ThreadsPopout';
import { Icons } from '@components/Shared/Icons';
import { Hamburger } from '@components/Shared/Icons/Buttons/Hamburger';
import { MembersButton } from '@components/Shared/Icons/Buttons/MembersButton';
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
      <Styles.ChannelHeaderWrapper>
        <Hamburger />
        <Styles.ChannelNameTopicWrapper>
          {currentChannel || channelName ? (
            <>
              <Styles.ChannelNameIconWrapper>
                <Icons icon="TextChannelHash" size="sm" color="channel" marginX="xs" />

                <Styles.ChannelHeaderName>
                  {channelName ?? currentChannel?.name}
                </Styles.ChannelHeaderName>
              </Styles.ChannelNameIconWrapper>

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

        {!topic && !channelName && (
          <>
            <ThreadsPopout>
              <ThreadsButton />
            </ThreadsPopout>

            <PinButton />
            <MembersButton />
          </>
        )}
      </Styles.ChannelHeaderWrapper>
    </Header>
  );
};

import * as Styles from '@components/Header/styles';
import { ThreadsPopout } from '@components/Overlays/Modal/Popout/ThreadsPopout';
import { Hash } from '@components/Shared/Channel/styles';
import { Hamburger } from '@components/Shared/Icons/Buttons/Hamburger';
import { MembersButton } from '@components/Shared/Icons/Buttons/MembersButton';
import { PinButton } from '@components/Shared/Icons/Buttons/PinButton';
import { ThreadsButton } from '@components/Shared/Icons/Buttons/ThreadsButton';
import { useStoreActions, useStoreState } from '@state';

export const ChannelHeader = () => {
  const setShowTopicModal = useStoreActions(state => state.ui.setShowTopicModal);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const currentChannel = useStoreState(state => state.guild.currentChannel);

  const openTopicModal = () => {
    setShowTopicModal(true);
  };
  return (
    <Styles.ChannelHeaderRoot>
      <Styles.ChannelHeaderNameWrapper role="dialog" aria-modal="true">
        <Hamburger />

        <Styles.ChannelNameTopicWrapper>
          <Hash channelHeader />

          <Styles.ChannelHeaderName>{currentChannel?.name}</Styles.ChannelHeaderName>

          <Styles.ChannelHeaderTopic onClick={openTopicModal}>
            {currentChannel?.topic}
          </Styles.ChannelHeaderTopic>
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

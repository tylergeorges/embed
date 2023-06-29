import * as Styles from '@components/Header/styles';
import { Hash } from '@components/Shared/Channel/elements';
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
    <Styles.ChannelHeaderRoot className="text-channel_header">
      <Styles.ChannelHeaderNameWrapper
        role="dialog"
        aria-modal="true"
        className="text-channel_header_name_container"
      >
        <Hamburger />
        <Styles.ChannelNameTopicWrapper className="text-channel_name_topic_container">
          <Hash channelHeader />
          <Styles.ChannelHeaderName className="text-channel_header_name">
            {currentChannel?.name}
          </Styles.ChannelHeaderName>
          <Styles.ChannelHeaderTopic
            className="text-channel_header_description"
            onClick={openTopicModal}
          >
            {currentChannel?.topic}
          </Styles.ChannelHeaderTopic>
        </Styles.ChannelNameTopicWrapper>
      </Styles.ChannelHeaderNameWrapper>

      <ThreadsButton />
      <PinButton />
      <MembersButton />
    </Styles.ChannelHeaderRoot>
  );
};

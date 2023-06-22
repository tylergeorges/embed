import {
  ChannelHeaderRoot,
  ChannelHeaderNameWrapper,
  ChannelNameTopicWrapper,
  ChannelHeaderTopic,
  ChannelHeaderName
} from '@components/Header/elements';
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
    <ChannelHeaderRoot className="text-channel_header">
      <ChannelHeaderNameWrapper role="dialog" aria-modal="true" className="text-channel_header_name_container">
        <Hamburger />
        <ChannelNameTopicWrapper className="text-channel_name_topic_container">
          <Hash channelHeader />
          <ChannelHeaderName className="text-channel_header_name">{currentChannel?.name}</ChannelHeaderName>
          <ChannelHeaderTopic className="text-channel_header_description" onClick={openTopicModal}>
            {currentChannel?.topic}
          </ChannelHeaderTopic>
        </ChannelNameTopicWrapper>
      </ChannelHeaderNameWrapper>

      <ThreadsButton />
      <PinButton />
      <MembersButton />
    </ChannelHeaderRoot>
  );
};

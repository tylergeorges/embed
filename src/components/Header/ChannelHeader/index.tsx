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
import { useStoreActions } from '@state';

interface ChannelHeaderProps {
  channelTopic: string;
  channelName: string;
}
export const ChannelHeader = ({ channelTopic, channelName }: ChannelHeaderProps) => {
  const setShowTopicModal = useStoreActions(state => state.ui.setShowTopicModal);

  const openTopicModal = () => {
    setShowTopicModal(true);
  };
  return (
    <ChannelHeaderRoot className="text-channel_header">
      <ChannelHeaderNameWrapper
        role="dialog"
        aria-modal="true"
        className="text-channel_header_name_container"
      >
        <Hamburger />
        <ChannelNameTopicWrapper className="text-channel_name_topic_container">
          <Hash channelHeader />
          <ChannelHeaderName className="text-channel_header_name">{channelName}</ChannelHeaderName>
          <ChannelHeaderTopic className="text-channel_header_description" onClick={openTopicModal}>
            {channelTopic}
          </ChannelHeaderTopic>
        </ChannelNameTopicWrapper>
      </ChannelHeaderNameWrapper>

      <ThreadsButton />
      <PinButton />
      <MembersButton />
    </ChannelHeaderRoot>
  );
};

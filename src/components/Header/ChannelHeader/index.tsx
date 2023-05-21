import {
  ChannelHeaderRoot,
  ChannelHeaderNameWrapper,
  ChannelNameTopicWrapper,
  ChannelHeaderTopic,
  ChannelHeaderName
} from '@components/Header/elements';
import { Hamburger } from '@components/Header/ChannelHeader/Hamburger';
import { MembersButton } from '@components/Header/ChannelHeader/MembersButton';
import { PinButton } from '@components/Header/ChannelHeader/PinButton';
import { useStoreActions } from '@state';
import { ThreadsButton } from '@components/Header/ChannelHeader/ThreadsButton';

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
    <ChannelHeaderRoot className="text-channel_header" css={{ backgroundColor: '$background' }}>
      <ChannelHeaderNameWrapper
        role="dialog"
        aria-modal="true"
        className="text-channel_header_name_container"
        css={{ backgroundColor: '$background' }}
      >
        <Hamburger />

        <ChannelNameTopicWrapper className="text-channel_name_topic_container">
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

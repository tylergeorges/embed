import { InformationModal } from '@components/Overlays/Modal/InformationModal';
import * as Styles from '@components/Overlays/Modal/styles';

interface ChannelTopicModalProps {
  currentChannel: {
    name: string;
    topic: string;
  };
}
export const ChannelTopicModal = ({ currentChannel }: ChannelTopicModalProps) => (
  <InformationModal modalId="channel-topic-modal" title={`#${currentChannel?.name}` ?? ''}>
    <Styles.ChannelTopicModalContent>{currentChannel?.topic ?? ''}</Styles.ChannelTopicModalContent>
  </InformationModal>
);

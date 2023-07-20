import { InformationModal } from '@components/Overlays/Modal/InformationModal';
import * as Styles from '@components/Overlays/Modal/styles';
import ModalProvider from '@components/Providers/ModalProvider';

interface ChannelTopicModalProps {
  currentChannel: {
    name: string;
    topic: string;
  };

  hideModal: () => void;

  isOpen: boolean;
}
export const ChannelTopicModal = ({
  currentChannel,
  hideModal,
  isOpen
}: ChannelTopicModalProps) => {
  const hideTopicModal = () => {
    ModalProvider.hide('channel-topic-modal', true);

    hideModal();
  };

  return (
    <InformationModal isOpen={isOpen} hideModal={hideTopicModal} title={currentChannel?.name ?? ''}>
      <Styles.ChannelTopicModalContent>{currentChannel.topic}</Styles.ChannelTopicModalContent>
    </InformationModal>
  );
};

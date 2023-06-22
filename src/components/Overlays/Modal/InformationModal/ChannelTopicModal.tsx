import { InformationModal } from '@components/Overlays/Modal/InformationModal';
import { ChannelTopicModalContent } from '@components/Overlays/Modal/elements';
import { useStoreActions, useStoreState } from '@state';

/** Modal for a Text Channel's Topic  */
export const ChannelTopicModal = () => {
  const showTopicModal = useStoreState(state => state.ui.showTopicModal);
  const setShowTopicModal = useStoreActions(state => state.ui.setShowTopicModal);
  const currentChannel = useStoreState(state => state.guild.currentChannel);

  const hideTopicModal = () => {
    setShowTopicModal(false);
  };

  return (
    <InformationModal isOpen={showTopicModal} hideModal={hideTopicModal} title={`#${currentChannel?.name}`}>
      <ChannelTopicModalContent className="modal-channel_topic_content">{currentChannel?.topic}</ChannelTopicModalContent>
    </InformationModal>
  );
};

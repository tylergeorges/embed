import { InformationModal } from '@components/Overlays/Modal/InformationModal';
import * as Styles from '@components/Overlays/Modal/styles';
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
    <InformationModal
      isOpen={showTopicModal}
      hideModal={hideTopicModal}
      title={`#${currentChannel?.name}`}
    >
      <Styles.ChannelTopicModalContent className="modal-channel_topic_content">
        {currentChannel?.topic}
      </Styles.ChannelTopicModalContent>
    </InformationModal>
  );
};

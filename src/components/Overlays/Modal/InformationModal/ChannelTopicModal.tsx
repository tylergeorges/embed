import { InformationModal } from '@components/Overlays/Modal/InformationModal';
import * as Styles from '@components/Overlays/Modal/styles';
import { useStoreActions, useStoreState } from '@state';

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
      title={(currentChannel && currentChannel.name) || ''}
    >
      <Styles.ChannelTopicModalContent>
        {(currentChannel && currentChannel.topic) || ''}
      </Styles.ChannelTopicModalContent>
    </InformationModal>
  );
};

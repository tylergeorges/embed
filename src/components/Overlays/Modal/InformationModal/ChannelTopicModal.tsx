import { InformationModal } from '@components/Overlays/Modal/InformationModal';
import * as Styles from '@components/Overlays/Modal/styles';
import { useStoreState } from '@state';

export const ChannelTopicModal = () => {
  const currentChannel = useStoreState(state => state.guild.currentChannel);

  return (
    <InformationModal modalId="channel-topic-modal" title={`#${currentChannel?.name}` ?? ''}>
      <Styles.ChannelTopicModalContent>
        {currentChannel?.topic ?? ''}
      </Styles.ChannelTopicModalContent>
    </InformationModal>
  );
};

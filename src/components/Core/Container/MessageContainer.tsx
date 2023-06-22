import { TextBox } from '@components/Core/Container/TextBox';

import { useStoreState } from '@state';
import { useState } from 'react';
import { MessagesList } from '@components/Core/VirtualLists/MessagesList';
import { useMessages } from '@hooks/useMessages';
import { MessageWrapper } from './elements';

interface MessageContainerProps {
  /** Used if the device is mobile and the backdrop over the container is shown. */
  onBackdropClick?: () => void;
}

export const MessageContainer = ({ onBackdropClick }: MessageContainerProps) => {
  const [isListRendered, setIsListRendered] = useState(false);

  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);

  const { groupedMessages, loadMoreMessages, isReady, firstItemIndex } = useMessages({
    guild: '585454996800405509',
    channel: '585458921888808960'
  });

  const handleBottomStateChanged = () => {
    if (!isListRendered) {
      setIsListRendered(true);
    }
  };

  return (
    <MessageWrapper
      className="message-wrapper non-dragable"
      draggable={false}
      membersListOpen={isMembersListOpen}
      onClick={onBackdropClick}
      mobile={{
        '@initial': false,
        '@small': true
      }}
    >
      <MessagesList
        groupedMessages={groupedMessages}
        startReached={loadMoreMessages}
        isReady={isReady}
        firstItemIndex={firstItemIndex}
        handleBottomStateChanged={handleBottomStateChanged}
      />
      <TextBox />
    </MessageWrapper>
  );
};

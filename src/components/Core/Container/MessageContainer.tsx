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
  // const { guildId, channelId } = useAppRouter();

  const { groupedMessages, loadMoreMessages, isReady, firstItemIndex } = useMessages({
    // guild: guildId,
    // channel: channelId
    guild: '585454996800405509',
    channel: '585840022511550494'
  });

  const handleBottomStateChanged = () => {
    if (!isListRendered) {
      setIsListRendered(true);
    }
  };

  return (
    <MessageWrapper
      className="message-wrapper "
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

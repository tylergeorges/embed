import { TextBox } from '@components/Core/TextChannelContainer/TextBox';

import { useStoreState } from '@state';
import { useState } from 'react';
import { MessageRenderer } from '@components/Core/VirtualLists/MessageRenderer';
import { useMessages } from '@hooks/useMessages';
import * as Styles from './styles';

export const MessageContainer = () => {
  const [isListRendered, setIsListRendered] = useState(false);

  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);

  const { groupedMessages, loadMoreMessages, isReady, firstItemIndex } = useMessages({
    guild: '585454996800405509',
    channel: '585840022511550494',
    thread: ''
  });

  const handleBottomStateChanged = () => {
    if (!isListRendered) {
      setIsListRendered(true);
    }
  };

  return (
    <Styles.MessageWrapper
      draggable={false}
      membersListOpen={isMembersListOpen}
      mobile={{
        '@initial': false,
        '@small': true
      }}
    >
      <MessageRenderer
        groupedMessages={groupedMessages}
        startReached={loadMoreMessages}
        isReady={isReady}
        firstItemIndex={firstItemIndex}
        handleBottomStateChanged={handleBottomStateChanged}
      />

      <TextBox />
    </Styles.MessageWrapper>
  );
};

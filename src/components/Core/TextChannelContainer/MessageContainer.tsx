import { TextBox } from '@components/Core/TextChannelContainer/TextBox';

import { useStoreState } from '@state';
import { useCallback, useState } from 'react';
import { MessageRenderer } from '@components/Core/VirtualLists/MessageRenderer';
import { useAppRouter } from '@hooks/useAppRouter';
import { useMessages } from '@hooks/useMessages';
import * as Styles from './styles';

export const MessageContainer = () => {
  const [isListRendered, setIsListRendered] = useState(false);

  const { channelId, guildId } = useAppRouter();
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);

  const { groupedMessages, loadMoreMessages, isReady, firstItemIndex } = useMessages({
    // guild: '585454996800405509',
    // channel: '585840022511550494',
    guild: guildId,
    channel: channelId,
    type: 'text-channel'
  });

  const handleBottomStateChanged = useCallback(() => {
    if (!isListRendered) {
      setIsListRendered(true);
    }
  }, [isListRendered]);

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

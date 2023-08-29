import { TextBox } from '@components/Core/TextChannelContainer/TextBox';
import { useStoreState } from '@state';
import { useCallback, useState } from 'react';
import { MessageListRenderer } from '@components/Core/VirtualLists/MessageListRenderer';
import { useAppRouter } from '@hooks/useAppRouter';
import { useMessages } from '@hooks/useMessages';
import { useMessageSubscription } from '@hooks/useMessageSubscription';
import { MessageRenderer } from '@components/Providers/MessageRenderer';
import * as Styles from './styles';

interface MessageContainerProps {
  channelIsThread?: boolean;
}

export const MessageContainer = ({ channelIsThread }: MessageContainerProps) => {
  const [isListRendered, setIsListRendered] = useState(false);
  const { channelId: channel, guildId: guild, threadId } = useAppRouter();

  const { groupedMessages, loadMoreMessages, isReady, firstItemIndex, updateQuery } = useMessages({
    guild,
    channel,
    threadId: channelIsThread ? threadId : undefined
  });

  useMessageSubscription({
    guild,
    channel,
    threadId: channelIsThread ? threadId : undefined,
    updateQuery
  });

  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);

  const handleBottomStateChanged = useCallback(() => {
    if (!isListRendered) {
      setIsListRendered(true);
    }
  }, [isListRendered]);

  return (
    <MessageRenderer>
      <Styles.MessageWrapper
        draggable={false}
        membersListOpen={isMembersListOpen}
        mobile={{
          '@initial': false,
          '@small': true
        }}
      >
        <MessageListRenderer
          startReached={loadMoreMessages}
          messages={groupedMessages}
          isReady={isReady}
          firstItemIndex={firstItemIndex}
          handleBottomStateChanged={handleBottomStateChanged}
        />

        <TextBox />
      </Styles.MessageWrapper>
    </MessageRenderer>
  );
};

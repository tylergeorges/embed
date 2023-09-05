import { TextBox } from '@components/Core/TextChannelContainer/TextBox';
import { useStoreState } from '@state';
import { MessageListRenderer } from '@components/Core/VirtualLists/MessageListRenderer';
import { useAppRouter } from '@hooks/useAppRouter';
import { useMessages } from '@hooks/useMessages';
import { useMessageSubscription } from '@hooks/useMessageSubscription';
import { useCallback, useRef, useState } from 'react';
import { VirtuosoHandle } from 'react-virtuoso';
import { MessageRenderer } from '@components/Providers/MessageRenderer';
import * as Styles from './styles';

interface MessageContainerProps {
  channelIsThread?: boolean;
}

export const MessageContainer = ({ channelIsThread }: MessageContainerProps) => {
  const [atBottom, setAtBottom] = useState(false);

  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  const listRef = useRef<VirtuosoHandle>(null);

  const canSend = useStoreState(state => state.guild.currentChannel)?.canSend;
  const user = useStoreState(state => state.user.data);

  const { channelId: channel, guildId: guild, threadId: thread } = useAppRouter();

  const threadId = channelIsThread ? thread : undefined;

  const { loadMoreMessages, firstItemIndex, updateQuery, groupedMessages } = useMessages({
    guild,
    channel,
    threadId: channelIsThread ? threadId : undefined
  });

  const scrollToBottom = useCallback(
    ({ forceScroll }: { forceScroll?: boolean }) => {
      if (atBottom || forceScroll) {
        listRef.current?.scrollTo({ top: 9999, behavior: 'auto' });
      }
    },
    [atBottom]
  );

  useMessageSubscription({
    guild,
    channel,
    threadId: channelIsThread ? threadId : undefined,
    updateQuery,
    scrollToBottom
  });

  const handleBottomStateChanged = useCallback((bottom: boolean) => {
    setAtBottom(bottom);
  }, []);

  const handleTopStateChanged = useCallback(
    (top: boolean) => {
      if (top) {
        loadMoreMessages();
      }
    },
    [loadMoreMessages]
  );

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
          messages={groupedMessages}
          handleBottomStateChanged={handleBottomStateChanged}
          ref={listRef}
          handleTopStateChanged={handleTopStateChanged}
          firstItemIndex={firstItemIndex}
        />

        <TextBox
          scrollToBottom={scrollToBottom}
          channelIsThread={channelIsThread}
          canSend={!!canSend && !!user}
          isAuthed={!!user}
        />
      </Styles.MessageWrapper>
    </MessageRenderer>
  );
};

import { VirtualListMessageWrapper } from '@components/Core/VirtualLists/elements';
import { loadMoreStaticMessages } from '@components/Core/VirtualLists/staticData';
import { Spinner, SpinnerWrapper } from '@components/Overlays/Loading/elements';
import { groupMessages } from '@util/groupMessages';
import MessageGroup, { MessageRendererProvider } from '@widgetbot/message-renderer';
import { APIMessage } from 'discord-api-types/v10';
import { useRef, useState } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

type TMessageGroup = APIMessage[];

const FetchingDataSpinner = () => (
  <SpinnerWrapper type="fetchingMessages">
    <Spinner type="fetchingMessages" />
  </SpinnerWrapper>
);

const Message = (index: number, data: TMessageGroup) => (
  <VirtualListMessageWrapper>
    <MessageGroup messages={data} thread={false} />
  </VirtualListMessageWrapper>
);

type TGroupedMessages = TMessageGroup[];

interface MessagesListProps {
  groupedMessages: TGroupedMessages;
}
export const MessagesList = ({ groupedMessages }: MessagesListProps) => {
  const [messages, setMessages] = useState(groupedMessages);
  const [isListRendered, setIsListRendered] = useState(false);
  const listRef = useRef<VirtuosoHandle>(null);

  const handleTopStateChange = (isTopReached: boolean) => {
    const canFetchData = isListRendered && isTopReached;
    if (canFetchData) {
      const olderMessages = groupMessages(loadMoreStaticMessages);

      setMessages(recentMessages => [...olderMessages, ...recentMessages]);
    }
  };

  const handleBottomStateChange = (isBottomReached: boolean) => {
    if (isBottomReached) {
      setIsListRendered(true);
    }
  };
  return (
    <>
      <MessageRendererProvider>
        {({ themeClass }) => (
          <div className={themeClass} style={{ height: '100%', width: '100%' }}>
            <Virtuoso
              initialTopMostItemIndex={messages.length}
              data={messages}
              style={{ height: '100%' }}
              topItemCount={0}
              ref={listRef}
              itemContent={Message}
              components={{ Header: FetchingDataSpinner }}
              atTopStateChange={handleTopStateChange}
              atBottomStateChange={handleBottomStateChange}
            />
          </div>
        )}
      </MessageRendererProvider>
    </>
  );
};

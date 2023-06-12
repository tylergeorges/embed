import { VirtualListContainer, VirtualListMessageWrapper } from '@components/Core/VirtualLists/elements';
import { Spinner, SpinnerWrapper } from '@components/Overlays/Loading/elements';
import MessageGroup, { MessageRendererProvider } from '@widgetbot/message-renderer';
import { APIMessage } from 'discord-api-types/v10';
import { useRef } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

const FetchingDataSpinner = () => (
  <SpinnerWrapper type="fetchingMessages">
    <Spinner type="fetchingMessages" />
  </SpinnerWrapper>
);

const Message = (index: number, data: APIMessage[]) => (
  <VirtualListMessageWrapper>
    <MessageGroup messages={data} thread={false} />
  </VirtualListMessageWrapper>
);

type GroupedMessages = APIMessage[][];

interface MessagesListProps {
  groupedMessages: GroupedMessages;
  handleTopStateChange: (topState: boolean) => void;
}

export const MessagesList = ({ groupedMessages, handleTopStateChange }: MessagesListProps) => {
  const listRef = useRef<VirtuosoHandle>(null);
  // const [isAtBottom, setIsAtBottom] = useState(false);
  // const listRendered = useRef(false);

  // const handleBottomState = (atBottom: boolean) => {
  //   if (!listRendered.current) {
  //     listRendered.current = true;
  //     setIsAtBottom(true);
  //   } else {
  //     setIsAtBottom(atBottom);
  //   }
  // };

  return (
    <VirtualListContainer>
      <MessageRendererProvider>
        {({ themeClass }) => (
          <div className={themeClass} style={{ height: '100%', width: '100%' }}>
            <Virtuoso
              data={groupedMessages}
              style={{
                height: '100%',
                overflowX: 'hidden'
              }}
              initialTopMostItemIndex={groupedMessages.length}
              ref={listRef}
              atTopStateChange={handleTopStateChange}
              itemContent={Message}
              components={{ Header: FetchingDataSpinner }}
              followOutput="auto"
            />
          </div>
        )}
      </MessageRendererProvider>
    </VirtualListContainer>
  );
};

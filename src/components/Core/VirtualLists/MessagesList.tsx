import { VirtualListContainer, VirtualListMessageWrapper } from '@components/Core/VirtualLists/elements';
import { Spinner, SpinnerWrapper } from '@components/Overlays/Loading/elements';
import MessageGroup, { MessageRendererProvider } from '@widgetbot/message-renderer';
import { APIMessage } from 'discord-api-types/v10';
import { Virtuoso } from 'react-virtuoso';

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
  firstItemIndex: number;
  handleBottomStateChanged?: (atBottom: boolean) => void;
  startReached?: (index: number) => void;
}

export const MessagesList = ({ groupedMessages, startReached, firstItemIndex, handleBottomStateChanged }: MessagesListProps) => (
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
            initialTopMostItemIndex={100 - 1}
            firstItemIndex={firstItemIndex}
            startReached={startReached}
            alignToBottom
            atBottomStateChange={handleBottomStateChanged}
            atBottomThreshold={2}
            itemContent={Message}
            overscan={100}
            components={{ Header: FetchingDataSpinner }}
            followOutput={(isAtBottom: boolean) => {
              if (isAtBottom) {
                return 'auto'; // can be 'auto' or false to avoid scrolling
              }

              return false;
            }}
          />
        </div>
      )}
    </MessageRendererProvider>
  </VirtualListContainer>
);

import { VirtualListMessageWrapper } from '@components/Core/VirtualLists/elements';
import { Spinner, SpinnerWrapper } from '@components/Overlays/Loading/elements';
import MessageGroup from '@widgetbot/message-renderer';
import { APIMessage } from 'discord-api-types/v10';
import { Components, Virtuoso } from 'react-virtuoso';

const FetchingDataSpinner = () => (
  <SpinnerWrapper type="fetchingMessages">
    <Spinner type="fetchingMessages" />
  </SpinnerWrapper>
);
type ListComponents = Components<APIMessage[], any> | undefined;

const listComponents: ListComponents = { Header: FetchingDataSpinner };

const Message = (index: number, data: APIMessage[]) => (
  <VirtualListMessageWrapper>
    {/* @ts-ignore */}
    <MessageGroup messages={data} thread={false} />
  </VirtualListMessageWrapper>
);

type GroupedMessages = APIMessage[][];
interface MessagesListProps {
  groupedMessages: GroupedMessages;
  firstItemIndex: number;
  isReady: boolean;
  handleBottomStateChanged?: (atBottom: boolean) => void;
  startReached?: (index: number) => void;
}
export const MessageRenderer = ({
  isReady,
  groupedMessages,
  startReached,
  firstItemIndex,
  handleBottomStateChanged
}: MessagesListProps) => {
  const followOutput = (isAtBottom: boolean) => {
    if (isAtBottom) {
      return 'auto'; // can be 'auto' or false to avoid scrolling
    }

    return false;
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', boxSizing: 'content-box' }}>
      {isReady && (
        <Virtuoso
          data={groupedMessages}
          style={{
            overflowX: 'hidden',
            height: '100%'
          }}
          // initialTopMostItemIndex={groupedMessages.length - 1}
          // initialTopMostItemIndex={100 - 1}
          // firstItemIndex={50}
          firstItemIndex={firstItemIndex}
          startReached={startReached}
          atBottomStateChange={handleBottomStateChanged}
          atBottomThreshold={2}
          itemContent={Message}
          defaultItemHeight={100}
          overscan={100}
          components={listComponents}
          followOutput={followOutput}
        />
      )}
    </div>
  );
};

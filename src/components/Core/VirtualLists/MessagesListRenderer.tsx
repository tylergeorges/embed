import { listComponents } from '@components/Core/VirtualLists/listComponents';
import * as Styles from '@components/Core/VirtualLists/styles';
import MessageGroup from '@widgetbot/message-renderer';
import { APIMessage } from 'discord-api-types/v10';
import { Virtuoso } from 'react-virtuoso';

const Message = (index: number, data: APIMessage[]) => (
  <Styles.VirtualListMessageWrapper>
    <MessageGroup messages={data} thread={false} />
  </Styles.VirtualListMessageWrapper>
);

interface MessagesListProps {
  handleBottomStateChanged?: (atBottom: boolean) => void;
  messages: APIMessage[][];
  isReady: boolean;
  firstItemIndex: number;
  startReached?: (index: number) => void;
}

export const MessagesListRenderer = ({
  startReached,
  handleBottomStateChanged,
  messages,
  isReady,
  firstItemIndex
}: MessagesListProps) => {
  const followOutput = (isAtBottom: boolean) => {
    if (isAtBottom) {
      return 'auto'; // can be 'auto' or false to avoid scrolling
    }

    return false;
  };
  return (
    <Styles.VirtualListContainer>
      {isReady && (
        <Virtuoso
          data={messages}
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
    </Styles.VirtualListContainer>
  );
};

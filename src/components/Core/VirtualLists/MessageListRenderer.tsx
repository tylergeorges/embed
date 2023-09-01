import { listComponents } from '@components/Core/VirtualLists/listComponents';
import * as Styles from '@components/Core/VirtualLists/styles';
import MessageGroup from '@widgetbot/message-renderer';
import { APIMessage } from 'discord-api-types/v10';
import { forwardRef } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

const Message = (index: number, data: APIMessage[]) => (
  <Styles.VirtualListMessageWrapper>
    <MessageGroup messages={data} thread={false} />
  </Styles.VirtualListMessageWrapper>
);

interface MessagesListProps {
  messages: APIMessage[][];
  firstItemIndex: number;
  handleBottomStateChanged: (bottom: boolean) => void;
  handleTopStateChanged: (top: boolean) => void;
}

export const MessageListRenderer = forwardRef<VirtuosoHandle, MessagesListProps>(
  ({ messages, firstItemIndex, handleBottomStateChanged, handleTopStateChanged }, ref) => (
    <Styles.VirtualListContainer>
      <Virtuoso
        atTopStateChange={handleTopStateChanged}
        data={messages}
        firstItemIndex={firstItemIndex}
        atBottomStateChange={handleBottomStateChanged}
        atBottomThreshold={17}
        itemContent={Message}
        defaultItemHeight={50}
        overscan={200}
        components={listComponents}
        followOutput={isAtBottom => (isAtBottom ? 'auto' : false)}
        ref={ref}
      />
    </Styles.VirtualListContainer>
  )
);

MessageListRenderer.displayName = 'MessageListRenderer';

// import { Message } from '@components/Core/Container/Message';
import {
  VirtualListContainer,
  VirtualListMessageWrapper
} from '@components/Core/VirtualLists/elements';
import { Spinner, SpinnerWrapper } from '@components/Overlays/Loading/elements';
import { ReactNode, useRef } from 'react';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  IndexRange,
  InfiniteLoader,
  List,
  ListRowProps
} from 'react-virtualized';
import { loadMoreStaticMessages } from '@components/Core/VirtualLists/staticData';
// import { MessageSkeleton } from '@components/Core/Container/MessageSkeleton';
import Message from '@root/Message';
import { APIMessage } from 'discord-api-types/v10';

interface MessageListProps {
  messages: APIMessage[];
  getKey: (rowIndex: number) => string;
}

type RegisterList = (registeredChild: any) => void;

export const MessagesList = ({ messages, getKey }: MessageListProps) => {
  const listRef = useRef<List | null>(null);
  const registerListRef = useRef<RegisterList | null>(null);
  const recentListWidth = useRef<number>(0);

  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      keyMapper: getKey
      // defaultHeight: 100
    })
  );

  const resizeList = () => {
    cache.current.clearAll();

    if (listRef.current) {
      listRef.current?.recomputeRowHeights();
    }
  };

  const messageRenderer = ({ key, index, style, parent }: ListRowProps) => {
    let listItem: ReactNode;

    if (index >= messages.length) {
      listItem = (
        <SpinnerWrapper type="fetchingMessages">
          <Spinner type="fetchingMessages" />
        </SpinnerWrapper>
      );
    }
    // else if (isScrolling && !isVisible && index <= messages.length - 1) {
    //   const message = messages[index];

    //   listItem = <MessageSkeleton message={message} />;
    // }
    else {
      const message = messages[index];
      listItem = <Message message={message} />;
      // listItem = <Message message={message} />;
      // listItem = <Message message={message} />;
    }

    return (
      <CellMeasurer
        style={{ width: recentListWidth.current }}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
        cache={cache.current}
      >
        <VirtualListMessageWrapper style={style}>{listItem}</VirtualListMessageWrapper>
      </CellMeasurer>
    );
  };

  const setListRef = (ref: List) => {
    listRef.current = ref;

    if (registerListRef.current) {
      registerListRef.current(ref);
    }
  };

  const isRowLoaded = ({ index }: { index: number }) => index < messages.length;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadMoreRows = async (indexRange: IndexRange) => loadMoreStaticMessages;
  // const loadMoreRows = async (indexRange: IndexRange) => loadMore();

  return (
    <VirtualListContainer>
      <InfiniteLoader
        rowCount={messages.length + 1}
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
      >
        {({ onRowsRendered, registerChild }) => {
          registerListRef.current = registerChild;

          return (
            <AutoSizer>
              {({ width, height }) => {
                if (recentListWidth.current && recentListWidth.current !== width) {
                  setTimeout(() => {
                    resizeList();
                  }, 0);
                }

                recentListWidth.current = width;
                registerListRef.current = registerChild;
                return (
                  <List
                    rowCount={messages.length + 1}
                    rowRenderer={messageRenderer}
                    rowHeight={cache.current.rowHeight}
                    overscanRowCount={1}
                    deferredMeasurementCache={cache.current}
                    height={height}
                    onRowsRendered={onRowsRendered}
                    width={width}
                    ref={setListRef}
                  />
                );
              }}
            </AutoSizer>
          );
        }}
      </InfiniteLoader>
    </VirtualListContainer>
  );
};

// import { Message } from '@components/Core/Container/Message';
import {
  VirtualListContainer,
  VirtualListMessageWrapper
} from '@components/Core/VirtualLists/elements';
import { Spinner, SpinnerWrapper } from '@components/Overlays/Loading/elements';
import { ReactNode, useEffect, useRef } from 'react';
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
import { APIMessage } from 'discord-api-types/v10';
import MessageGroup, { MessageRendererProvider } from '@lib/message-renderer/src';
// import { MessageSkeleton } from '@components/Core/Container/MessageSkeleton';

interface MessageListProps {
  groupedMessages: APIMessage[][];
  getKey: (rowIndex: number) => string;
}

type RegisterList = (registeredChild: any) => void;

export const MessagesList = ({ groupedMessages, getKey }: MessageListProps) => {
  const listRef = useRef<List | null>(null);
  const registerListRef = useRef<RegisterList | null>(null);
  const recentListWidth = useRef<number>(0);
  const autoSizerTimeout = useRef<NodeJS.Timeout | null>(null);
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true, //! dont remove this or list will break!
      keyMapper: getKey,
      defaultHeight: 100
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

    if (index >= groupedMessages.length) {
      listItem = (
        <SpinnerWrapper type="fetchingMessages">
          <Spinner type="fetchingMessages" />
        </SpinnerWrapper>
      );
    } else {
      const messageGroup = groupedMessages[index];
      // listItem = <MessageSkeleton />;

      listItem = (
        <MessageRendererProvider>
          {({ themeClass }) => (
            <div className={themeClass}>
              <MessageGroup thread={false} messages={messageGroup} />
            </div>
          )}
        </MessageRendererProvider>
      );
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

  const isRowLoaded = ({ index }: { index: number }) => index < groupedMessages.length;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadMoreRows = async (indexRange: IndexRange) => loadMoreStaticMessages;
  // const loadMoreRows = async (indexRange: IndexRange) => loadMore();

  useEffect(
    () => () => {
      if (autoSizerTimeout.current) {
        clearTimeout(autoSizerTimeout.current);
      }
    },
    []
  );
  return (
    <VirtualListContainer>
      <InfiniteLoader
        rowCount={groupedMessages.length + 1}
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
      >
        {({ onRowsRendered, registerChild }) => {
          registerListRef.current = registerChild;

          return (
            <AutoSizer>
              {({ width, height }) => {
                if (recentListWidth.current && recentListWidth.current !== width) {
                  autoSizerTimeout.current = setTimeout(() => {
                    resizeList();
                  }, 0);
                }

                recentListWidth.current = width;
                registerListRef.current = registerChild;
                return (
                  <List
                    rowCount={groupedMessages.length + 1}
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

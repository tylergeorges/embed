// import { Message } from '@components/Core/Container/Message';
import {
  VirtualListContainer,
  VirtualListMessageWrapper
} from '@components/Core/VirtualLists/elements';
import { Spinner, SpinnerWrapper } from '@components/Overlays/Loading/elements';
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
import { groupMessages } from '@util/groupMessages';
// import { Message } from '@graphql/graphql';
import { APIMessage } from 'discord-api-types/v10';
import MessageGroup, { MessageRendererProvider } from '@widgetbot/message-renderer';
import { ReactNode, useEffect, useRef, useState } from 'react';

type GroupedMessages = APIMessage[][];

interface MessageListProps {
  groupedMessages: GroupedMessages;
}

type RegisterList = (registeredChild: any) => void;
type LoadedRowsMap = {
  [index: number]: {
    loaded: boolean;
  };
};

type MeasureCallbacks = {
  [index: number]: () => void;
};

export const MessagesList = ({ groupedMessages }: MessageListProps) => {
  const listRef = useRef<List | null>(null);
  const loadedRowsMap = useRef<LoadedRowsMap>({});
  const measureCallbacks = useRef<MeasureCallbacks>({});
  const registerListRef = useRef<RegisterList | null>(null);
  const recentListWidth = useRef<number>(0);
  const autoSizerTimeout = useRef<NodeJS.Timeout | null>(null);
  const [messages, setMessages] = useState<GroupedMessages>(groupedMessages);
  const [isFetching, setIsFetching] = useState(false);
  const isMounted = useRef(false);

  // ! LAST MESSAGE SHOWN = TOTAL LENGTH OF MESSAGE ARRAY
  const lastMeasuredIndex = useRef(0);

  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true, //! dont remove this or list will break!
      // keyMapper: getKey,
      defaultHeight: 100
    })
  );
  useEffect(
    () => () => {
      if (autoSizerTimeout.current) {
        clearTimeout(autoSizerTimeout.current);
      }

      isMounted.current = false;
    },
    []
  );

  const resizeList = () => {
    if (listRef.current) {
      console.log('clearing cache in resize list ');
      cache.current.clearAll();
      listRef.current.recomputeRowHeights();

      if (!isMounted.current) {
        isMounted.current = true;
      }
    }
  };

  const messageRenderer = ({ key, index, style, parent }: ListRowProps) => {
    const normalizedIndex = messages.length - index;

    const getContent = (measure: () => void) => {
      let listItem: ReactNode;
      measureCallbacks.current[normalizedIndex] = measure;

      if (!loadedRowsMap.current[normalizedIndex]) {
        loadedRowsMap.current[normalizedIndex] = { loaded: true };
        // lastMeasuredIndex.current = index;
        if (normalizedIndex < lastMeasuredIndex.current) {
          lastMeasuredIndex.current = normalizedIndex;
        } else {
          lastMeasuredIndex.current += normalizedIndex;
        }
      }

      if (normalizedIndex === messages.length) {
        listItem = (
          <SpinnerWrapper type="fetchingMessages">
            <Spinner type="fetchingMessages" />
          </SpinnerWrapper>
        );
      } else {
        const messageGroup = messages[normalizedIndex];
        if (messageGroup && messageGroup.length) {
          listItem = <MessageGroup messages={messageGroup} thread={false} />;
        }
      }

      return listItem;
    };

    return (
      <CellMeasurer
        style={{ ...style, width: recentListWidth.current }}
        columnIndex={0}
        parent={parent}
        rowIndex={index}
        cache={cache.current}
        key={key}
      >
        {({ measure }) => (
          <VirtualListMessageWrapper style={style}>{getContent(measure)}</VirtualListMessageWrapper>
        )}
      </CellMeasurer>
    );
  };

  const setListRef = (ref: List) => {
    if (listRef.current === null) {
      listRef.current = ref;
    }
    if (registerListRef.current) {
      registerListRef.current(ref);
    }
  };

  const isRowLoaded = ({ index }: { index: number }) => {
    // We do this because the order of messages is reversed
    // 0 -> length

    // 0 = most recent message
    // length = last message in batch

    // So if the index passed in is 2
    // And the message array length is 10
    // The actual message thats displayed is 8 because 10 - 2 = 8

    // if the index is the last item in the list fetch more data
    const atTopOfList = isMounted.current && !isFetching && lastMeasuredIndex.current === index;
    // const atTopOfList = lastMeasuredIndex.current === index;
    // const atTopOfList = lastMeasuredIndex.current === index - 2;
    if (atTopOfList && !isFetching && isMounted.current) {
      console.log('fetch more', atTopOfList, lastMeasuredIndex.current, index);
    }

    return !atTopOfList;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadMoreRows = async (indexRange: IndexRange) => {
    if (!isFetching && isMounted.current) {
      console.log('fetching');
      setIsFetching(true);

      const moreMessages = groupMessages(loadMoreStaticMessages);
      setMessages(prev => [...prev, ...moreMessages]);
    }
  };

  return (
    <VirtualListContainer>
      <InfiniteLoader
        // rowCount={messages.length + 1}
        isRowLoaded={isRowLoaded}
        // threshold={1}
        threshold={0}
        rowCount={messages.length + 1}
        loadMoreRows={loadMoreRows}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer>
            {({ width, height }) => {
              if (recentListWidth.current !== width) {
                autoSizerTimeout.current = setTimeout(() => {
                  resizeList();
                }, 0);
              }
              registerListRef.current = registerChild;

              recentListWidth.current = width;

              return (
                <MessageRendererProvider>
                  {({ themeClass }) => (
                    <div className={themeClass}>
                      <List
                        rowCount={messages.length + 1}
                        rowRenderer={messageRenderer}
                        rowHeight={cache.current.rowHeight}
                        deferredMeasurementCache={cache.current}
                        height={height}
                        onRowsRendered={onRowsRendered}
                        width={width}
                        ref={setListRef}
                        // scrollToIndex={messages.length + 1}
                        scrollToAlignment="end"
                      />
                    </div>
                  )}
                </MessageRendererProvider>
              );
            }}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </VirtualListContainer>
  );
};

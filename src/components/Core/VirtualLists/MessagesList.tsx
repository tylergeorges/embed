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
// import { MessageSkeleton } from '@components/Core/Container/MessageSkeleton';
import { groupMessages } from '@util/groupMessages';
// import { Message } from '@graphql/graphql';
import { APIMessage } from 'discord-api-types/v10';
import MessageGroup, { MessageRendererProvider } from '@widgetbot/message-renderer';

interface MessageListProps {
  groupedMessages: APIMessage[][];
  getKey: (rowIndex: number) => string;
}

type RegisterList = (registeredChild: any) => void;
type LoadedRowsMap = {
  [index: number]: {
    loaded: boolean;
  };
};

export const MessagesList = ({ groupedMessages, getKey }: MessageListProps) => {
  const listRef = useRef<List | null>(null);
  const loadedRowsMap = useRef<LoadedRowsMap>({});
  const registerListRef = useRef<RegisterList | null>(null);
  const recentListWidth = useRef<number>(0);
  const autoSizerTimeout = useRef<NodeJS.Timeout | null>(null);
  // const [canLoadRows, setCanLoadRows] = useState(false);
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true, //! dont remove this or list will break!
      keyMapper: getKey,
      defaultHeight: 100
    })
  );
  useEffect(
    () => () => {
      if (autoSizerTimeout.current) {
        clearTimeout(autoSizerTimeout.current);
      }
    },
    [listRef, groupedMessages.length]
  );

  const resizeList = () => {
    if (listRef.current) {
      cache.current.clearAll();
      listRef.current.recomputeRowHeights();
    }
  };

  const messageRenderer = ({ key, index, style, parent }: ListRowProps) => {
    let listItem: ReactNode;
    if (!loadedRowsMap.current[index]) {
      loadedRowsMap.current[index] = { loaded: true };
    }

    if (index === 0) {
      listItem = (
        <SpinnerWrapper type="fetchingMessages">
          <Spinner type="fetchingMessages" />
        </SpinnerWrapper>
      );
    } else {
      const messageGroup = groupedMessages[index - 1];
      if (messageGroup && messageGroup.length) {
        listItem = <MessageGroup messages={messageGroup} thread={false} />;
      }
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

  const isRowLoaded = ({ index }: { index: number }) => !!loadedRowsMap.current[index];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadMoreRows = async (indexRange: IndexRange) => {
    // }
    const moreMessages = groupMessages(loadMoreStaticMessages);

    groupedMessages.unshift(...moreMessages);
    cache.current.clear(2, 0);
  };
  // new Promise(resolve => {

  //   return resolve();
  // });
  return (
    <VirtualListContainer>
      <InfiniteLoader
        rowCount={groupedMessages.length + 1}
        isRowLoaded={isRowLoaded}
        threshold={1}
        loadMoreRows={loadMoreRows}
      >
        {({ onRowsRendered, registerChild }) => (
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
                <MessageRendererProvider>
                  {({ themeClass }) => (
                    <div className={themeClass}>
                      <List
                        // rowCount={Infinity}
                        rowCount={groupedMessages.length + 1}
                        rowRenderer={messageRenderer}
                        rowHeight={cache.current.rowHeight}
                        overscanRowCount={0}
                        deferredMeasurementCache={cache.current}
                        height={height}
                        onRowsRendered={onRowsRendered}
                        width={width}
                        ref={setListRef}
                        scrollToIndex={groupedMessages.length + 1}
                        scrollToAlignment="start"
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

import {useMessages} from "@hooks";
import {generalStore} from "@store";
import {addNotification} from "notify";
import {Locale} from "@lib/Locale";
import {formatError, groupMessages} from "@views/Messages/utils";
import ErrorAhoy from "@ui/Overlays/ErrorAhoy";
import {Info, Loading, NoMessages} from "@ui/Overlays";
import {useCallback, useMemo, useState} from "react";
import {MessagesWrapper, ScrollerSpacer} from "@views/Messages/elements";
import { Virtuoso } from "react-virtuoso";
import MessageGroup from "@ui/Messages";
import { useChatMessages } from "../../hooks/useMessages/useChatMessages";
import { ApolloQueryResult } from "apollo-client";

const maxMessagesToLoad = 30;

interface MessagesProps {
  guild: string;
  channel?: string;
  chatUser?: string;
  thread?: boolean;
}

function Messages2ElectricBoogaloo({ guild, channel, chatUser, thread = false }: MessagesProps) {
  const channelMessageHandler = useMessages(channel, guild, thread ? generalStore.activeThread.id : null)
  const chatMessageHandler = useChatMessages(chatUser, guild)

  const { messages, error, ready, stale, fetchMore } = channel ? channelMessageHandler : chatMessageHandler

  const groupedMessages = useMemo(() => groupMessages(messages), [messages]);
  const [firstItemIndex, setFirstItemIndex] = useState(100000);
  const loadMoreMessages = useCallback(async () => {
    // DM's are currently not paginated.
    if (chatUser) return;

    const { data } = await fetchMore({
      limit: maxMessagesToLoad,
      before: messages[0].id
    }) as ApolloQueryResult<any>; // needs cast due to DMs not being paginated

    setFirstItemIndex(firstItemIndex - groupMessages(data.channel.messageBunch.messages).length);
  }, [fetchMore, firstItemIndex, groupedMessages]);

  if (error) {
    addNotification({
      level: 'warning',
      title: Locale.translate('notif.loaderror.messages'),
      message: formatError(error),
      autoDismiss: 0,
    });

    return <ErrorAhoy message={formatError(error)} />;
  }

  if (!ready)
    return <Loading />;

  if (!groupedMessages.length)
    return (
      <NoMessages className="no-messages">
        <Info>{Locale.translate('nomessages')}</Info>
      </NoMessages>
    );

  return (
    <MessagesWrapper stale={stale}>
      <Virtuoso
        data={groupedMessages}
        firstItemIndex={firstItemIndex}
        overscan={100}
        startReached={loadMoreMessages}
        initialTopMostItemIndex={maxMessagesToLoad - 1}
        alignToBottom={true}
        followOutput={(isAtBottom: boolean) => {
          if (isAtBottom) {
            return 'auto' // can be 'auto' or false to avoid scrolling
          }

          return false;
        }}
        atBottomThreshold={100}
        components={{
          Footer: () => <ScrollerSpacer />,
        }}
        itemContent={(index, messageGroup) => (
          <MessageGroup messages={messageGroup} key={messageGroup[0].id} thread={thread} />
        )}
      />
    </MessagesWrapper>
  );
}

export default Messages2ElectricBoogaloo;

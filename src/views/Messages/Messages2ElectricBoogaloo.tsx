import {useMessages} from "@hooks";
import {generalStore} from "@store";
import {addNotification} from "notify";
import {Locale} from "@lib/Locale";
import {
  formatError,
  groupMessagesByDay
} from "@views/Messages/utils";
import ErrorAhoy from "@ui/Overlays/ErrorAhoy";
import {Info, Loading, NoMessages} from "@ui/Overlays";
import {useCallback, useMemo, useRef, useState} from "react";
import {MessagesWrapper, ScrollerSpacer} from "@views/Messages/elements";
import {Virtuoso, VirtuosoHandle} from "react-virtuoso";
import MessageGroup from "@ui/Messages";
import { useChatMessages } from "../../hooks/useMessages/useChatMessages";
import MessageSeparator from "@ui/Messages/MessageSeparator";

const maxMessagesToLoad = 50;

interface MessagesProps {
  guild: string;
  channel?: string;
  chatUser?: string;
  thread?: boolean;
}

function Messages2ElectricBoogaloo({ guild, channel, chatUser, thread = false }: MessagesProps) {
  const { messages, error, ready, stale, fetchMore } = channel ?
    useMessages(channel, guild, thread ? generalStore.activeThread.id : null) :
    useChatMessages(chatUser, guild);
  const virtuosoRef = useRef<VirtuosoHandle>(null);

  const groupedMessages = useMemo(() => groupMessagesByDay(messages), [messages]);
  const [firstItemIndex, setFirstItemIndex] = useState(100000);
  const loadMoreMessages = useCallback(async () => {
    // DMs are currently not paginated.
    if (chatUser) return;
    if (!confirm("Are you sure you want to load more messages?")) return;

    const { data } = await fetchMore({
      limit: maxMessagesToLoad,
      before: messages[0].id
    });

    const newMessagesGrouped = groupMessagesByDay(data.channel.messageBunch.messages);
    const newItemIndex = 100000 - groupedMessages.length - newMessagesGrouped.length;
    console.log("newItemIndex", newItemIndex);

    setFirstItemIndex(newItemIndex);
    // virtuosoRef.current?.scrollToIndex(newItemIndex + 2)
  }, [fetchMore, firstItemIndex, groupedMessages, messages]);

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

  console.log("groupedMessages", groupedMessages);

  return (
    <MessagesWrapper stale={stale}>
      <Virtuoso
        ref={virtuosoRef}
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
        atBottomThreshold={2}
        components={{
          Footer: () => <ScrollerSpacer />,
        }}
        itemContent={(index, messageGroup) => (
          messageGroup.type === "MESSAGE_GROUP"
            ? <MessageGroup messages={messageGroup.group} key={messageGroup.group[0].id} />
            : <MessageSeparator key={messageGroup.date} createdAt={messageGroup.date} />
        )}
      />
    </MessagesWrapper>
  );
}

export default Messages2ElectricBoogaloo;

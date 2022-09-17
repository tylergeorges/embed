import {useMessages} from "@hooks";
import {generalStore} from "@store";
import {addNotification} from "notify";
import {Locale} from "@lib/Locale";
import {formatError, groupMessages} from "@views/Messages/utils";
import ErrorAhoy from "@ui/Overlays/ErrorAhoy";
import {Info, Loading, NoMessages} from "@ui/Overlays";
import {useCallback, useEffect, useMemo} from "react";
import {MessagesWrapper, ScrollerSpacer} from "@views/Messages/elements";
import { Virtuoso } from "react-virtuoso";
import MessageGroup from "@ui/Messages";

const maxMessagesToLoad = 30;

interface MessagesProps {
  guild: string;
  channel: string;
  thread?: boolean;
}

const firstItemIndexStart = 100_000;

function Messages2ElectricBoogaloo({ guild, channel, thread = false }: MessagesProps) {
  const { messages, error, ready, stale, fetchMore } = useMessages(
    channel,
    guild,
    thread ? generalStore.activeThread.id : null
  );

  const messageState = useMemo(() => {
    if (messages === undefined)
      return {
        messages: [],
        groupedMessages: [],
        firstItemIndex: firstItemIndexStart,
      };

    if (messageState === undefined)
      return {
        messages: messages,
        groupedMessages: groupMessages(messages),
        firstItemIndex: firstItemIndexStart - groupMessages(messages).length,
      }

    return {
      messages,
      groupedMessages: groupMessages(messages),
      firstItemIndex:
        messageState.firstItemIndex
        - groupMessages(
          messages.slice(messageState.messages.length - messages.length)
        ).length,
    }
  }, [messages]);

  const loadMoreMessages = useCallback(
    async () => fetchMore({
      before: messageState.messages[0]?.id,
      limit: maxMessagesToLoad,
    }), [messageState]);

  useEffect(() => {
    void loadMoreMessages()
  }, [channel, guild, thread]);

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

  if (!messageState.groupedMessages.length)
    return (
      <NoMessages className="no-messages">
        <Info>{Locale.translate('nomessages')}</Info>
      </NoMessages>
    );

  return (
    <MessagesWrapper stale={stale}>
      <Virtuoso
        data={messageState.groupedMessages}
        firstItemIndex={messageState.firstItemIndex}
        overscan={100}
        startReached={() => void loadMoreMessages()}
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
          <MessageGroup messages={messageGroup} key={messageGroup[0].id} thread={thread} />
        )}
      />
    </MessagesWrapper>
  );
}

export default Messages2ElectricBoogaloo;

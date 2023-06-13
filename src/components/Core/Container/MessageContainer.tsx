/* eslint-disable no-plusplus */
import { TextBox } from '@components/Core/Container/TextBox';
import { useTranslation } from 'react-i18next';
import { useStoreState } from '@state';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { groupMessages } from '@util/groupMessages';
import { MessagesList } from '@components/Core/VirtualLists/MessagesList';
import { convertMessageToDiscord } from '@util/convertMessageToDiscord';
import { useMessages } from '@hooks/useMessages';
import { APIMessage } from 'discord-api-types/v10';
import { MessageFragmentFragment } from '@graphql/graphql';
import { MessageWrapper } from './elements';

interface MessageContainerProps {
  /** Used if the device is mobile and the backdrop over the container is shown. */
  onBackdropClick?: () => void;
}

type MessageState = {
  messages: MessageFragmentFragment[];
  groupedMessages: APIMessage[][];
  firstItemIndex: number;
};

export const MessageContainer = ({ onBackdropClick }: MessageContainerProps) => {
  const translate = useTranslation();
  const currentChannel = { name: 'placeholder-name' };

  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);

  // const handleTopStateChange = (isTopReached: boolean) => {
  //   const canFetchData = isTopReached;
  //   if (canFetchData) {
  //     const olderMessages = groupMessages(loadMoreStaticMessages);
  //
  //     setMessages(recentMessages => [...olderMessages, ...recentMessages]);
  //   }
  // };

  const { messages, fetchMore, isReady } = useMessages('585454996800405509', '585840022511550494');

  const fetchTimeout = useRef<NodeJS.Timeout>(null);
  const [isListRendered, setIsListRendered] = useState(false);

  useEffect(
    () => () => {
      if (fetchTimeout.current) {
        clearTimeout(fetchTimeout.current);
      }
    },
    []
  );

  const loadMoreMessages = useCallback(async () => {
    fetchMore(messages[0].id);
  }, [fetchMore, messages]);

  let messageState: MessageState;

  // eslint-disable-next-line prefer-const
  messageState = useMemo(() => {
    const firstItemIndexStart = 100_000;

    if (messages === undefined)
      return {
        messages: [],
        groupedMessages: [],
        firstItemIndex: firstItemIndexStart
      };

    const grouped = groupMessages(messages.map(convertMessageToDiscord));

    if (messageState === undefined)
      return {
        messages,
        groupedMessages: grouped,
        firstItemIndex: firstItemIndexStart - grouped.length
      };

    return {
      messages,
      groupedMessages: grouped,
      firstItemIndex:
        messageState.firstItemIndex -
        groupMessages(messages.map(convertMessageToDiscord).slice(messageState.messages.length - messages.length)).length
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  if (!isReady) return <p>Loading...</p>;

  const handleBottomStateChanged = () => {
    if (!isListRendered) {
      setIsListRendered(true);
    }
  };
  return (
    <>
      <MessageWrapper
        className="message-wrapper non-dragable"
        draggable={false}
        membersListOpen={isMembersListOpen}
        onClick={onBackdropClick}
        mobile={{
          '@initial': false,
          '@small': true
        }}
      >
        <MessagesList
          groupedMessages={messageState.groupedMessages}
          startReached={loadMoreMessages}
          firstItemIndex={messageState.firstItemIndex}
          handleBottomStateChanged={handleBottomStateChanged}
        />
        <TextBox channelName={translate.t('input.message', { CHANNEL: currentChannel?.name as string }) as string} />
      </MessageWrapper>
    </>
  );
};

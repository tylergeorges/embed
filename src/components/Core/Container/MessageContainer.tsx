/* eslint-disable no-plusplus */
import { TextBox } from '@components/Core/Container/TextBox';
import { useTranslation } from 'react-i18next';
import { useStoreState } from '@state';
import { useCallback, useMemo, useState } from 'react';
import { groupMessages } from '@util/groupMessages';
import { MessagesList } from '@components/Core/VirtualLists/MessagesList';
import { convertMessageToDiscord } from '@util/convertMessageToDiscord';
import { useMessages } from '@hooks/useMessages';
import { MessageWrapper } from './elements';

interface MessageContainerProps {
  /** Used if the device is mobile and the backdrop over the container is shown. */
  onBackdropClick?: () => void;
}

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

  const groupedMessages = useMemo(() => groupMessages(messages.map(m => convertMessageToDiscord(m))), [messages]);
  const [firstItemIndex, setFirstItemIndex] = useState(10000);

  const loadMoreMessages = useCallback(() => {
    console.log('loadMoreMessages');
    fetchMore(messages[0].id);

    console.log('fetchMore ran.');
    console.log('firstItemIndex', firstItemIndex);
    console.log('groupedMessages.length', groupedMessages.length);

    setFirstItemIndex(firstItemIndex - groupedMessages.length);
  }, [messages, fetchMore, firstItemIndex, groupedMessages]);

  if (!isReady) return <p>Loading...</p>;

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
        <MessagesList groupedMessages={groupedMessages} startReached={loadMoreMessages} />
        <TextBox channelName={translate.t('input.message', { CHANNEL: currentChannel?.name as string }) as string} />
      </MessageWrapper>
    </>
  );
};

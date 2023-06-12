/* eslint-disable no-plusplus */
import { TextBox } from '@components/Core/Container/TextBox';
import { useTranslation } from 'react-i18next';
import { useStoreState } from '@state';
import { generateMessage, loadMoreStaticMessages, staticMessages } from '@components/Core/VirtualLists/staticData';
import { useMemo, useState } from 'react';
import { groupMessages } from '@util/groupMessages';
import { MessagesList } from '@components/Core/VirtualLists/MessagesList';
import { MessageWrapper } from './elements';

interface MessageContainerProps {
  /** Used if the device is mobile and the backdrop over the container is shown. */
  onBackdropClick?: () => void;
}

export const MessageContainer = ({ onBackdropClick }: MessageContainerProps) => {
  const translate = useTranslation();
  const currentChannel = { name: 'placeholder-name' };

  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  const groupedMessages = useMemo(() => groupMessages(staticMessages), []);

  const [messages, setMessages] = useState(groupedMessages);

  const handleTopStateChange = (isTopReached: boolean) => {
    const canFetchData = isTopReached;
    if (canFetchData) {
      const olderMessages = groupMessages(loadMoreStaticMessages);

      setMessages(recentMessages => [...olderMessages, ...recentMessages]);
    }
  };

  const addMessages = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newMessagesArr = [generateMessage(), generateMessage(), generateMessage(), generateMessage()];

    const newMessages = groupMessages(newMessagesArr);

    setMessages(olderMessages => [...olderMessages, ...newMessages]);
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
        <MessagesList groupedMessages={messages} handleTopStateChange={handleTopStateChange} />
        <button onClick={addMessages} type="button">
          Push new messages
        </button>
        <TextBox channelName={translate.t('input.message', { CHANNEL: currentChannel?.name as string }) as string} />
      </MessageWrapper>
    </>
  );
};

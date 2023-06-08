/* eslint-disable no-plusplus */
import { TextBox } from '@components/Core/Container/TextBox';
import { useTranslation } from 'react-i18next';
import { useStoreState } from '@state';
import { staticMessages } from '@components/Core/VirtualLists/staticData';
import { useMemo } from 'react';
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

  // const getMessageKey = (rowIndex: number) => {
  //   if (rowIndex >= staticMessages.length) return 'end';
  //   const message = staticMessages[rowIndex];
  //   return message.id;
  // };

  const groupedMessages = useMemo(() => groupMessages(staticMessages), []);
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
        <MessagesList groupedMessages={groupedMessages} />
        {/* <MessagesList groupedMessages={groupedMessages} /> */}
        <TextBox
          channelName={
            translate.t('input.message', { CHANNEL: currentChannel?.name as string }) as string
          }
        />
      </MessageWrapper>
    </>
  );
};

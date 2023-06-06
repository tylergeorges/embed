/* eslint-disable no-plusplus */
import { TextBox } from '@components/Core/Container/TextBox';
import { useTranslation } from 'react-i18next';
import { useStoreState } from '@state';
import { staticMessages } from '@components/Core/VirtualLists/staticData';
import { MessagesList } from '@components/Core/VirtualLists/MessagesList';
import { useMemo } from 'react';
import { groupMessages } from '@util/groupMessages';

import { MessageWrapper } from './elements';

interface MessageContainerProps {
  /** Name of the guild. */
  guildName?: string;

  onClick?: () => void;
}

/** This component handles rendering the current text channel's messages.
 *
 * @param guildName                 Name of the guild.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MessageContainer = ({ onClick, guildName }: MessageContainerProps) => {
  const translate = useTranslation();
  const currentChannel = { name: 'placeholder-name' };

  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);

  const getMessageKey = (rowIndex: number) => {
    if (rowIndex >= staticMessages.length) return 'end';
    const message = staticMessages[rowIndex];
    return message.id;
  };

  const groupedMessages = useMemo(() => groupMessages(staticMessages), []);
  return (
    <>
      <MessageWrapper
        className="message-wrapper non-dragable"
        draggable={false}
        membersListOpen={isMembersListOpen}
        onClick={onClick}
        mobile={{
          '@initial': false,
          '@small': true
        }}
      >
        <MessagesList groupedMessages={groupedMessages} getKey={getMessageKey} />
        <TextBox
          channelName={
            translate.t('input.message', { CHANNEL: currentChannel?.name as string }) as string
          }
        />
      </MessageWrapper>
    </>
  );
};

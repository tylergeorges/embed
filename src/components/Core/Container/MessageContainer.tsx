import { TextBox } from '@components/Core/Container/TextBox';
import { useTranslation } from 'react-i18next';
import { useStoreState } from '@state';

import { staticMessages } from '@components/Core/VirtualLists/staticData';
import { MessagesList } from '@components/Core/VirtualLists/MessagesList';
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
    if (rowIndex > staticMessages.length - 1) return '';
    const message = staticMessages[rowIndex];
    return `${message.id}-${message.author.id}-${message.createdAt}`;
  };
  return (
    <>
      <MessageWrapper
        className="message-wrapper non-draggable"
        draggable={false}
        membersListOpen={isMembersListOpen}
        onClick={onClick}
        css={{
          position: 'relative',
          '@media screen  and (max-width: 768px)': {
            transition: 'transform 0.3s ease 0s',
            transform: `translateX(0px) !important`,
            width: '100% !important',
            height: '100%'
          }
        }}
      >
        <MessagesList messages={staticMessages} getKey={getMessageKey} />
        <TextBox
          channelName={
            translate.t('input.message', { CHANNEL: currentChannel?.name as string }) as string
          }
        />
      </MessageWrapper>
    </>
  );
};

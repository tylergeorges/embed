import { TextBox } from '@components/Core/Container/TextBox';
import { useTranslation } from 'react-i18next';
import { useStoreState } from '@state';
import { MessageWrapper } from './elements';

interface MessageContainerProps {
  /** Name of the guild. */
  guildName: string;

  onClick: () => void;
}

/** This component handles rendering the current text channel's messages.
 *
 * @param guildName                 Name of the guild.
 */
export const MessageContainer = ({ guildName, onClick }: MessageContainerProps) => {
  const translate = useTranslation();
  const currentChannel = { name: 'text-channel-name' };
  const isMembersListOpen = useStoreState(state => state.ui.isMembersListOpen);
  return (
    <MessageWrapper
      className="message-wrapper non-draggable"
      draggable={false}
      membersListOpen={isMembersListOpen}
      onClick={onClick}
    >
      <div className="channel-welcome_header_con non-draggable">
        <p className="channel-welcome_header non-draggable" draggable={false}>
          Welcome to <br /> {guildName}
        </p>
        <p className="channel-welcome_subheader non-draggable" draggable={false}>
          This is the beginning of this server.
        </p>
      </div>

      <TextBox
        channelName={
          translate.t('input.message', { CHANNEL: currentChannel?.name as string }) as string
        }
      />
    </MessageWrapper>
  );
};

import { MessageWrapper } from './elements';

interface MessageContainerProps {
  /** Name of the guild. */
  guildName: string;
}

/** This component handles rendering the current text channel's messages.
 *
 * @param guildName                 Name of the guild.
 */
export const MessageContainer = ({ guildName }: MessageContainerProps) => (
  <MessageWrapper>
    <div className="channel-welcome_header_con">
      <p className="channel-welcome_header">
        Welcome to <br /> {guildName}
      </p>
      <p className="channel-welcome_subheader">This is the beginning of this server.</p>
    </div>
  </MessageWrapper>
);

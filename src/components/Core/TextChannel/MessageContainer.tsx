import { MessageWrapper } from '@/components/Core';

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
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '10%',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <p style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: 0 }}>Welcome to {guildName}</p>
      <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)' }}>
        This is the beginning of this server.
      </p>
    </div>
  </MessageWrapper>
);

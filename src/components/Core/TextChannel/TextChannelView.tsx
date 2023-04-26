import { MessageContainer } from '@components/Core/TextChannel/MessageContainer';
import { MessageInput } from '@components/Core/TextChannel/MessageInput';
import { TextChannelHeader } from '@components/Core/TextChannel/TextChannelHeader';



interface MessageViewProps  {
    /** The name of the current text channel. */
    channel: string;
  /** Name of the guild. */
  guildName: string;
}

/** The overall text channel view container.
 *
 * This component contains the message input to send messages,
 * the current text channels header, and all the messages for the current text channel.
 *
 * @param channel         The name of the current text channel.
 * @param guildName       Name of the guild.
 */
export const TextChannelView = ({ channel, guildName }: MessageViewProps) => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', width: '100%' }}>
    <TextChannelHeader channel={channel} />
    <MessageContainer guildName={guildName} />
    <MessageInput channel={channel} />
  </div>
);

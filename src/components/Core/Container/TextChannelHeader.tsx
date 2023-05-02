import { Header } from '@components/Header';
import { ChannelHeaderContainer } from '@components/Header/elements';

interface TextChannelHeaderProps {
  /** The name of the current text channel. */
  channelName: string;
}

/** This component is a Text Channel Header wrapper and displays the name of the current text channel.
 *
 * @param channel                   The name of the current text channel.
 */
export const TextChannelHeader = ({ channelName }: TextChannelHeaderProps) => (
  <ChannelHeaderContainer className="text-channel_header_container">
    <Header name={channelName} shadowEnabled isChannelHeader />
  </ChannelHeaderContainer>
);

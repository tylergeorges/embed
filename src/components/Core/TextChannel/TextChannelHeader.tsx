import { Header } from '@components/Header/Header';

interface TextChannelHeaderProps {
  /** The name of the current text channel. */
  channel: string;
}

/** This component is a Text Channel Header wrapper and displays the name of the current text channel.
 *
 * @param channel                   The name of the current text channel.
 */
export const TextChannelHeader = ({ channel }: TextChannelHeaderProps) => (
  <div>
    <Header header_name={channel} shadowEnabled isChannelHeader />
  </div>
);

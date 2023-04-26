import { BaseMessageProps } from '@/components/Core/TextChannel/TextChannelView';
import { Header } from '@/components/Header/Header';

/** This component is a Text Channel Header wrapper and displays the name of the current text channel.
 *
 * @param channel                   The name of the current text channel.
 */
export const TextChannelHeader = ({ channel }: BaseMessageProps) => (
  <div>
    <Header header_name={channel} shadowEnabled isChannelHeader />
  </div>
);

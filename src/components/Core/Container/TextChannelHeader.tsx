import { Header } from '@components/Header';
import { ChannelHeaderContainer } from '@components/Header/elements';

/** This component is a Text Channel Header wrapper and displays the name of the current text channel.
 *
 * @param channel                   The name of the current text channel.
 */
export const TextChannelHeader = () => (
  <ChannelHeaderContainer className="text-channel_header_container">
    <Header
      name="placeholder-name"
      channel_description="random channel topic that should overflow so i can test to see how it loos random channel topic that should overflow so i can test to see how it loos random channel topic that should overflow so i can test to see how it loos random channel topic that should overflow so i can test to see how it loos
      "
      shadowEnabled
      isChannelHeader
    />
  </ChannelHeaderContainer>
);

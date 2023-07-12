import { Header } from '@components/Header';
import * as Styles from '@components/Header/styles';

/** This component is a Text Channel Header wrapper and displays the name of the current text channel.
 *
 * @param channel The name of the current text channel.
 */
export const TextChannelHeader = () => (
  <Styles.ChannelHeaderContainer>
    <Header shadowEnabled isChannelHeader />
  </Styles.ChannelHeaderContainer>
);

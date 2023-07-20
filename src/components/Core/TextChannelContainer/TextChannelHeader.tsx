import { Header } from '@components/Header';
import * as Styles from '@components/Header/styles';

export const TextChannelHeader = () => (
  <Styles.ChannelHeaderContainer draggable={false}>
    <Header shadowEnabled isChannelHeader />
  </Styles.ChannelHeaderContainer>
);

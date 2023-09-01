import { Header } from '@components/Header';
import * as Styles from '@components/Header/styles';

interface TextChannelHeaderProps {
  channelName?: string;
  topic?: string;
}

export const TextChannelHeader = ({ channelName, topic }: TextChannelHeaderProps) => (
  <Styles.ChannelHeaderContainer draggable={false}>
    <Header shadowEnabled isChannelHeader name={channelName} topic={topic} />
  </Styles.ChannelHeaderContainer>
);

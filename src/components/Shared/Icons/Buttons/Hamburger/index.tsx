import { useStoreActions, useStoreState } from '@state';
import * as Styles from './styles';

interface Props {
  thread?: boolean;
}

export const Hamburger = ({ thread = false }: Props) => {
  const isChannelsListOpen = useStoreState(state => state.ui.isChannelsListOpen);
  const setIsChannelsListOpen = useStoreActions(state => state.ui.setIsChannelsListOpen);

  const toggleChannelsList = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setIsChannelsListOpen(!isChannelsListOpen);
  };

  return (
    <Styles.Ham open={isChannelsListOpen} thread={thread} onClick={toggleChannelsList}>
      <Styles.Burger />
    </Styles.Ham>
  );
};

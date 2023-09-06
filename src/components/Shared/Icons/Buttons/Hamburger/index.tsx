import { useStoreActions, useStoreState } from '@state';
import * as Styles from './styles';

export const Hamburger = () => {
  const isChannelsListOpen = useStoreState(state => state.ui.isChannelsListOpen);
  const setIsChannelsListOpen = useStoreActions(state => state.ui.setIsChannelsListOpen);

  const toggleChannelsList = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setIsChannelsListOpen(!isChannelsListOpen);
  };

  return (
    <Styles.Ham open={isChannelsListOpen} onClick={toggleChannelsList}>
      <Styles.Burger />
    </Styles.Ham>
  );
};

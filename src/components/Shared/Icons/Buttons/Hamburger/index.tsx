import { useStoreActions, useStoreState } from '@state';
import * as Styles from './styles';

export const Hamburger = () => {
  const isChannelsListOpen = useStoreState(state => state.ui.isChannelsListOpen);
  const setIsChannelsListOpen = useStoreActions(state => state.ui.setIsChannelsListOpen);

  return (
    <Styles.Ham
      open={isChannelsListOpen}
      // @ts-ignore
      // eslint-disable-next-line react/jsx-no-bind
      onClick={e => {
        e.preventDefault();

        setIsChannelsListOpen(!isChannelsListOpen);
      }}
    >
      <Styles.Burger />
    </Styles.Ham>
  );
};

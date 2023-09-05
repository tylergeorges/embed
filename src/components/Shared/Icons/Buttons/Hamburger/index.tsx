import { SyntheticEvent } from 'react';
import { useStoreActions, useStoreState } from '@state';
import * as Styles from './styles';

interface Props {
  thread?: boolean;
}

export const Hamburger = ({ thread = false }: Props) => {
  const isChannelsListOpen = useStoreState(state => state.ui.isChannelsListOpen);
  const setIsChannelsListOpen = useStoreActions(state => state.ui.setIsChannelsListOpen);

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();

    setIsChannelsListOpen(!isChannelsListOpen);
  };

  return (
    <Styles.Ham
      open={isChannelsListOpen}
      thread={thread}
      // @ts-ignore
      // eslint-disable-next-line react/jsx-no-bind
      onClick={handleClick}
    >
      <Styles.Burger />
    </Styles.Ham>
  );
};

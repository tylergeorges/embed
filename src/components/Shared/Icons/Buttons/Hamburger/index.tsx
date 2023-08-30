import ModalProvider from '@components/Providers/ModalProvider';
import { SyntheticEvent, useContext } from 'react';
import { useIsModalOpen } from '@hooks/useIsModalOpen';
import * as Styles from './styles';

interface Props {
  thread?: boolean;
}

export const Hamburger = ({ thread = false }: Props) => {
  const isChannelsListOpen = useIsModalOpen('sidebar-channels-list');
  const { hide, show } = useContext(ModalProvider.context);

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();

    if (isChannelsListOpen) {
      hide('sidebar-channels-list');
    } else {
      show('sidebar-channels-list');
    }
  };

  return (
    <Styles.Ham
      // open={isChannelsListOpen}
      thread={thread}
      // @ts-ignore
      // eslint-disable-next-line react/jsx-no-bind
      onClick={handleClick}
    >
      <Styles.Burger />
    </Styles.Ham>
  );
};

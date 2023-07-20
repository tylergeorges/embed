import ModalProvider from '@components/Providers/ModalProvider';
import { SyntheticEvent } from 'react';
import { useIsModalOpen } from '@hooks/useIsModalOpen';
import * as Styles from './styles';

interface Props {
  thread?: boolean;
}

export const Hamburger = ({ thread = false }: Props) => {
  const isChannelsListOpen = useIsModalOpen('sidebar-channels-list');

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();

    if (isChannelsListOpen) {
      ModalProvider.hide('sidebar-channels-list');
    } else {
      ModalProvider.show('sidebar-channels-list');
    }
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

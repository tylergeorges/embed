import { IconButton } from '@components/Shared/Icons/Buttons/IconButton';
import { useStoreActions, useStoreState } from '@state';
import { useCallback } from 'react';

export const ThreadsButton = () => {
  const setShowThreadsModal = useStoreActions(state => state.ui.setShowThreadsModal);
  const showThreadsModal = useStoreState(state => state.ui.showThreadsModal);

  const openThreadsModal = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      setShowThreadsModal(!showThreadsModal);
      console.log(showThreadsModal);
    },
    [setShowThreadsModal, showThreadsModal]
  );

  return (
    <IconButton
      color="light"
      tooltipLabel="Threads"
      name="ThreadHash"
      tooltipPlacement="bottom"
      onClick={openThreadsModal}
    />
  );
};

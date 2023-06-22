import { ThreadsPopover } from '@components/Overlays/Modal/Popover/ThreadsPopover';
import { IconButtonWrapper } from '@components/Shared/Icons/Buttons/IconButtonWrapper';
import { ThreadsIcon } from '@components/Shared/Icons/ThreadsIcon';
import { useStoreActions, useStoreState } from '@state';
import { useCallback } from 'react';

export const ThreadsButton = () => {
  const setShowThreadsModal = useStoreActions(state => state.ui.setShowThreadsModal);
  const showThreadsModal = useStoreState(state => state.ui.showThreadsModal);

  const openThreadsModal = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      console.log('click');
      setShowThreadsModal(!showThreadsModal);
    },
    [setShowThreadsModal, showThreadsModal]
  );

  return (
    <>
      <ThreadsPopover>
        <IconButtonWrapper tooltipLabel="Threads" tooltipPlacement="bottom" onClick={openThreadsModal}>
          <ThreadsIcon color="light" />
        </IconButtonWrapper>
      </ThreadsPopover>
    </>
  );
};
